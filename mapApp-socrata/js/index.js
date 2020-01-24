var mymap = '', //globalmap variable
    globalColorSet1 = ["#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#7F6084", "#77A033", "#33558B", "#E59566"], // Colorset1 default colors
    markerGroup = '',
    selected = false,
    globaldataObj = [],
    scientNameObj = [];
    tofKeys = []; //empty x graph data initialize

    window.onload = function() {
      this.setTimeout(function() {
            // set dimensions of divs after load

      document.getElementById("paddlow").style.height = (newHeight - document.getElementById('totalboxcardcontainer').offsetHeight - 25) + "px";

      document.getElementById("chartContainer").style.height = (document.getElementById("paddlow").offsetHeight - document.getElementById("fonthead1").offsetHeight - 25) + "px";

    //  document.getElementById("chartContainer").style.width = (document.getElementById("paddlow").offsetWidth + 650) + "px";

      }, 10);
    }

    // Read spreadsheet data - Fill in the dashboard
    function ttinit() {
        var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/17bGkdKcKbd8ibcRrI7Asw5JhGGN6XJTaEk2nIapWByU/pubhtml";

        Tabletop.init( { key: publicSpreadsheetUrl,
                         callback: showInfo1,
                         simpleSheet: true } )
        
      }
    
      var ism = 0, //Impervious Surface Managed
          tgm = 0, //Total Gallons Managed
          tof = []; //Type of Facility
/*
      // Fetch latitude longitude from the geocoding library
      function getLtLg(addr) {
        // Check for '/', 'to', 'and'
        if(addr.includes(' / ')) {
          addr = addr.split(' / ')[0];
        }
        if(addr.includes(' to ')) {
          addr = addr.split(' to ')[0];
        }
        if(addr.includes(' and ')) {
          addr = addr.split(' and ')[0];
        }
        addr = addr + ' seattle'; // restrict to Seattle
        //Get Latitude Longitude
        return jQuery.ajax({
          url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr.replace(' ', '+') + "&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s",
          success: function(result) {
            return result;
          },
          async: false
        });
      }

      function showAllMarkers() {
        mapPlot(1); //show all
      }

      // plot markers to map
      function mapPlot(label) {
        if(label == 1) { // show all
          filteredList = globaldataObj;
        } else {
          filteredList = globaldataObj.filter(function(obj) {
            return obj["Type of Facility"] == label;
          });
        }
        
        // Update dashboard based on filtered lists
        $("#sbheadfont").text(filteredList.length); // total projects
        ism = 0; tgm = 0;
        filteredList.forEach(element => {
            ism = parseInt(ism) + parseInt(element["Impervious Surface Managed"]); 
            tgm = parseInt(tgm) + parseInt(element["Total Gallons Managed"]);
        });
        $("#sbheadfont1").text(ism);
        $("#sbheadfont11").text(tgm);

        //reinstantiate marker group
        mymap.removeLayer(markerGroup);
        markerGroup = L.layerGroup().addTo(mymap);
        
        // add filtered markers to map
        filteredList.forEach(elem => {
          //Render map markers
          var place = getLtLg(elem["Address"])["responseJSON"];

          if(place && place.results && place.results.length > 0 && (place["results"][0]["geometry"]["location_type"]).localeCompare("APPROXIMATE") !== 0) { // If location is approximate, then localtion lat long are not an exact find
                      
            var lat = place["results"][0]["geometry"]["location"]["lat"],
            long = place["results"][0]["geometry"]["location"]["lng"];
            
            // initialize circle markers
            var circle = L.circle([lat, long], {
              color: "yellow",
              weight: 1,
              opacity: 0.5,
              fillColor: globalColorSet1[tofKeys.indexOf(elem["Type of Facility"])],
              fillOpacity: 1.0,
              radius: 220
            }).addTo(markerGroup);
            
            // add popup to circular popups
            circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Installed:  " + elem["Installed"] + "<br>Address:  " + elem["Address"] + "<br>Infiltration:   " + elem["Infiltration"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Pond Depth:  " + elem["Pond_Depth"] + "<br># of Swales: " + elem["# of Swales"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");

          } else {
            var errorx = document.getElementById("baseError")
            setTimeout(function() {
              errorx.style.display = "block";
            });
            setTimeout(function() {
              errorx.style.display = "none";
            }, 30000);
          }

        });
      }
*/
      function showinfo1() {

      }
      // Process fetched data
      function showInfo(data, tabletop) {
        globaldataObj = data; // assign data globally
        $("#sbheadfont").text(data.length); // total projects
        data.forEach(element => {
            ism = parseInt(ism) + parseInt(element["Impervious Surface Managed"]); 
            tgm = parseInt(tgm) + parseInt(element["Total Gallons Managed"]);
            tof[element["Type of Facility"]] = isNaN(tof[element["Type of Facility"]]) ? 1 : tof[element["Type of Facility"]] = tof[element["Type of Facility"]] + 1;

        });
        $("#sbheadfont1").text(ism);
        $("#sbheadfont11").text(tgm);

        var dataPointsArr = [];
        Object.keys(tof).forEach(elem => {
          dataPointsArr.push({
            label: elem,
            y: tof[elem]
          });
        });

        // Render Chart
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
          animationEnabled: true, // set to true		
          axisX:{
            labelMaxWidth: 80, //
            labelFontSize: 14,
			      labelWrap: true,   // so that the x-axis labels stay straight
			      interval: 1, //
          },
          data: [
            {
              // Column for column type graphs
              type: "column",
              click: function(e){ 
                mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints: dataPointsArr
            }
          ]
        });
        chart.render();

        tofKeys = Object.keys(tof);

        data.forEach(elem => {
          //Render map markers
          var place = getLtLg(elem["Address"])["responseJSON"];
          
          if(place && place.results && place.results.length > 0 && (place["results"][0]["geometry"]["location_type"]).localeCompare("APPROXIMATE") !== 0) {
                      
            var lat = place["results"][0]["geometry"]["location"]["lat"],
            long = place["results"][0]["geometry"]["location"]["lng"];
            
            // Initialize map circle markers
            var circle = L.circle([lat, long], {
              color: "yellow",
              weight: 1,
              opacity: 0.5,
              fillColor: globalColorSet1[tofKeys.indexOf(elem["Type of Facility"])],
              fillOpacity: 1.0,
              radius: 220
            }).addTo(markerGroup);
            
            // Add popup to markers
            circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Installed:  " + elem["Installed"] + "<br>Address:  " + elem["Address"] + "<br>Infiltration:   " + elem["Infiltration"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Pond Depth:  " + elem["Pond_Depth"] + "<br># of Swales: " + elem["# of Swales"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");

          } else {
            var errorx = document.getElementById("baseError");
            setTimeout(function() {
              errorx.style.display = "block";
            });
            setTimeout(function() {
              errorx.style.display = "none";
            }, 30000);
          }

        });

        // Hide Loading screen
        setTimeout(function() {
          console.log('caled');
          document.getElementById("cover").style.display = "none";
        });

        // Update lat long in the spreadsheet
        setTimeout(function() {
          console.log('exec');
          jQuery.ajax({
            url: "https://script.google.com/macros/s/AKfycbxlXXo67OTBijK6UbJABKMb_mL8ZgwHW_Sgc483b6DQvtD5Q2eu/exec",
            success: function(result) {
              console.log(result);
              return result;
            },
            async: true
          });
        });
    }
      
    // Handle Socrata data
    function ttinitsocrata() {
    // set map height
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

    var newHeight = y;
  

      document.getElementById("mapid").style.height = (newHeight - 20) + "px" ;

      var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      });

      var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      });

      var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });

      mymap = L.map('mapid', {
        center: [47.6205063,-122.3514661], // Seattle
        zoom: 11,
        layers: [CartoDB_Voyager, Esri_WorldImagery, CartoDB_DarkMatter]
      });

      var baseMaps = {
        "Voyager": CartoDB_Voyager,
        "World Imagery": Esri_WorldImagery,
        "Dark Matter": CartoDB_DarkMatter
      };

      L.control.layers(baseMaps).addTo(mymap);

      markerGroup = L.layerGroup().addTo(mymap);


      jQuery.ajax({
        url: "https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6/query?where=UPPER(GENUS)%20like%20%27%25FRAXINUS%25%27&outFields=*&outSR=4326&f=json",
        success: function(result) {
          console.log('res',result);
          var len = result["features"].length;
          $("#sbheadfont").text(len);

      result["features"].forEach(function(data) {
      var sc = data["attributes"]["SCIENTIFIC_NAME"];
      scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
      
      // Markers
                 
        var lat = data["geometry"]["y"],
        long = data["geometry"]["x"];
          // Initialize map circle markers
          var circle = L.circle([lat, long], {
            color: "yellow",
            weight: 1,
            opacity: 0.5,
            fillColor: 'lightblue',
            fillOpacity: 1.0,
            radius: 220
          }).addTo(markerGroup);     
        
        var aH = data["attributes"];
        // Add popup to markers
        circle.bindPopup("OBJECTID: " + aH["OBJECTID"] + "<br> COMPKEY: " + aH["COMPKEY"] + "<br> UNITID: " + aH["UNITID"] + "<br> UNITDESC: " + aH["UNITDESC"] + "<br> CONDITION: " + aH["CONDITION"] + "<br> CONDITION_ASSESSMENT_DATE: " + aH["CONDITION_ASSESSMENT_DATE"] + "<br>CURRENT_STATUS: " + aH["CURRENT_STATUS"] + "<br> PRIMARYDISTRICTCD: " + aH["PRIMARYDISTRICTCD"] + "<br> SECONDARYDISTRICTCD: " + aH["SECONDARYDISTRICTCD"] + "<br> OVERRIDEYN: " + aH["OVERRIDEYN"] + "<br> COMPTYPE: " + aH["COMPTYPE"] + "<br> SEGKEY: " + aH["SEGKEY"] + "<br> UNITTYPE: " + aH["UNITTYPE"] + "<br> OWNERSHIP: " + aH["OWNERSHIP"] + "<br> CURRENT_STATUS_DATE: " + aH["CURRENT_STATUS_DATE"] + "<br> LAST_VERIFY_DATE: " + aH["LAST_VERIFY_DATE"] + "<br> PLANTED_DATE: " + aH["PLANTED_DATE"] + "<br> BOTANICAL_NAME: " + aH["BOTANICAL_NAME"] + "<br> SCIENTIFIC_NAME: " + aH["SCIENTIFIC_NAME"] + "<br> HERITAGE: " + aH["HERITAGE"] + "<br> EXCEPTIONAL: " + aH["EXCEPTIONAL"] + "<br> CODEREQ: " + aH["CODEREQ"] + "<br> GSI" + aH["GSI"] + "<br> GREEN_FACTOR: " + aH["GREEN_FACTOR"] + "<br> WIRES: " + aH["WIRES"] + "<br> CABLED: " + aH["CABLED"] + "<br> CLEARANCE_PROBLEM: " + aH["CLEARANCE_PROBLEM"] + "<br> SPACETYPE: " + aH["SPACETYPE"] + "<br> SITETYPE: " + aH["SITETYPE"] + "<br> GROWSPACE: " + aH["GROWSPACE"] + "<br> DIAM: " + aH["DIAM"] + "<br> CONDITION_RATING: " + aH["CONDITION_RATING"] + "<br> FUNDING_SOURCE: " + aH["FUNDING_SOURCE"] + "<br> WATER_THROUGH_YR1" + aH["WATER_THROUGH_YR1"] + "<br> WATER_THROUGH_YR2: " + aH["WATER_THROUGH_YR2"] + "<br> WATER_THROUGH_YR3: " + aH["WATER_THROUGH_YR3"] + "<br> OWNERDIAM: " + aH["OWNERDIAM"] + "<br> EXPDATE: " + aH["EXPDATE"] + "<br> COMMON_NAME: " + aH["COMMON_NAME"] + "<br> TREEHEIGHT: " + aH["TREEHEIGHT"] + "<br> ASBUILTPLANNO: " + aH["ASBUILTPLANNO"] + "<br> LANDSCAPEAREAASSOC: " + aH["LANDSCAPEAREAASSOC"] + "<br> COMMENTS: " + aH["COMMENTS"] + "<br> OVERRIDECOMMENT: " + aH["OVERRIDECOMMENT"] + "<br> SHAPE_LNG: " + aH["SHAPE_LNG"] + "<br> SHAPE_LAT: " + aH["SHAPE_LAT"] + "<br> IRRIGATESYSYN: " + aH["IRRIGATESYSYN"] + "<br> ASSETGROUPID: " + aH["ASSETGROUPID"] + "<br> ASSETGROUPDESC: " + aH["ASSETGROUPDESC"] + "<br> MODDATE: " + aH["MODDATE"] + "<br>MODBY: " + aH["MODBY"] + "<br> TOTAL_RANK: " + aH["TOTAL_RANK"] + "<br> TOTAL_COUNT: " + aH["TOTAL_COUNT"] + "<br> GENUS: " + aH["GENUS"] + "<br> UFMAINTMGMTUNIT: " + aH["UFMAINTMGMTUNIT"]);

      });

        var dataPointsArr = [];
        Object.keys(scientNameObj).forEach(elem => {
          dataPointsArr.push({
            label: elem,
            y: scientNameObj[elem]
          });
        });

        $("#sbheadfont1").text(Object.keys(scientNameObj).length);

        // Render Chart
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
          animationEnabled: true, // set to true		
          axisX:{
            labelMaxWidth: 80, //
            labelFontSize: 14,
			      labelWrap: true,   // so that the x-axis labels stay straight
			      interval: 1, //
          },
          data: [
            {
              // Column for column type graphs
              type: "column",
              click: function(e){ 
                //mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints: dataPointsArr
            }
          ]
        });
        chart.render();


           // Hide Loading screen
            setTimeout(function() {
              document.getElementById("cover").style.display = "none";
            });
        },
        error: function(err) {
          console.log("There is an error: ", err);
        },
        async: false
      })
    }

      window.addEventListener('DOMContentLoaded', ttinitsocrata);
