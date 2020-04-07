var mymap = '', //globalmap variable
    globalColorSet1 = [  "#C0504E","#4F81BC","#D8D8D8","#FFFF00" ], // Colorset1 default colors
    markerGroup = '',
    selected = false,
    globaldataObj = [],
    tofKeys = []; //empty x graph data initialize
    funderBioKeys = [], //empty x graph data initialize
    funderRainKeys = []; //empty x graph data initialize
    funderFuture = [];
    funderConv = [];

window.onload = function () {
    
    // set map height
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

    var newHeight = y;
  
    // set dimensions of divs after load
    this.setTimeout(function() {

      document.getElementById("paddlow").style.height = (newHeight - document.getElementById('totalboxcardcontainer').offsetHeight - document.getElementById('twoboxcontainer').offsetHeight - 25) + "px";

      document.getElementById("chartContainer").style.height = (document.getElementById("paddlow").offsetHeight - document.getElementById("fonthead1").offsetHeight - 25) + "px";

      document.getElementById("chartContainer").style.width = (document.getElementById("paddlow").offsetWidth + 250) + "px";

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

      
    }, 500);
    // new color set
    CanvasJS.addColorSet("customShades",
    globalColorSet1 );

}

    // Read spreadsheet data - Fill in the dashboard ToDO - source to this dataset https://drive.google.com/file/d/1WeS0hJig-6zhUi3agLjuoUsSKqSgFxHB/view?usp=sharing
    function ttinit() {
     //   var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/2PACX-1vSGiyag26Pi7AjSdl3nNwdrZ0vy2FnRECsSz0GHAGJ0huT2M6i1wbNDBSZJCQxn9MK7wFChmUNsS7_E/pubhtml";
		var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1itxzteNztm5EUOmE8p_fOlenphHYdCXeHoSBooj0yA4/pubhtml"; 
        Tabletop.init( { key: publicSpreadsheetUrl,
                         callback: showInfo,
                         simpleSheet: true } )
        
      }
    
      var ism = 0, //Vegetated Area Managed
          tgm = 0, //Total Gallons Managed
          // tof = []; //Type of Facility
          funderBio = [], // Bioretention funders
          funderRain = [];

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
            return obj["Funder"] == label;
          });
        }

        // Update dashboard based on filtered lists
        $("#sbheadfont").text(filteredList.length); // total projects
        ism = 0; tgm = 0;
        filteredList.forEach(element => {
            ism = parseInt(ism) + parseInt(element["Vegetated Area Managed"]); 
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
          var place = getLtLg(elem["Project Address (for Google Maps)"])["responseJSON"];

          if(place && place.results && place.results.length > 0 && (place["results"][0]["geometry"]["location_type"]).localeCompare("APPROXIMATE") !== 0) { // If location is approximate, then localtion lat long are not an exact find
                      
            var lat = place["results"][0]["geometry"]["location"]["lat"],
            long = place["results"][0]["geometry"]["location"]["lng"];

            if (elem["Type of Facility"].localeCompare("Raingarden") == 0) {
              // Initialize map rectangle markers
              var latLng = L.latLng([lat, long]);
              var currentPoint = mymap.latLngToContainerPoint(latLng);
              var width = 3.5;
              var height = 3.5;
              var xDifference = width / 2;
              var yDifference = height / 2;
              var southWest = L.point((currentPoint.x - xDifference), (currentPoint.y - yDifference));
              var northEast = L.point((currentPoint.x + xDifference), (currentPoint.y + yDifference));
              var bounds = L.latLngBounds(mymap.containerPointToLatLng(southWest),mymap.containerPointToLatLng(northEast));
              var rectangle = L.rectangle(bounds, {color: "#ff0000", weight: 4}).addTo(markerGroup);
            
            // Add popup to markers
            rectangle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Vegetated Area Managed:  " + elem["Vegetated Area Managed"] + "<br>Address:  " + elem["Address (for pop up)"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Swales per project: " + elem["Swales per project"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Top_Swale:  " + elem["Top_Swale"] + "<br>Bottom_Swale:  " + elem["Bottom_Swale"] + "<br>Discharge Area:  " + elem["Discharge Area"]  + "<br>Funder:  " + elem["Funder"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");
    
            } else {
              // Initialize map circle markers
              var circle = L.circle([lat, long], {
                color: "yellow",
                weight: 1,
                opacity: 0.5,
                fillColor: elem["Funder"] == "Future Projects" ? "white" : globalColorSet1[["Raingarden","Bioretention","","Conveyance"].indexOf(elem["Type of Facility"])],
                fillOpacity: 1.0,
                radius: 220
              }).addTo(markerGroup);
              
              // Add popup to markers
              circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Vegetated Area Managed:  " + elem["Vegetated Area Managed"] + "<br>Address:  " + elem["Address (for pop up)"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Swales per project: " + elem["Swales per project"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Top_Swale:  " + elem["Top_Swale"] + "<br>Bottom_Swale:  " + elem["Bottom_Swale"] + "<br>Discharge Area:  " + elem["Discharge Area"]  + "<br>Funder:  " + elem["Funder"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");
            }

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

      // Process fetched data
      function showInfo(data, tabletop) {
        globaldataObj = data; // assign data globally
        $("#sbheadfont").text(data.length); // total projects
        data.forEach(element => {
            ism = parseInt(ism) + parseInt(element["Vegetated Area Managed"]); 
            tgm = parseInt(tgm) + parseInt(element["Total Gallons Managed"]);
            if(isNaN(funderBio[element["Funder"]]) && element["Funder"].localeCompare("Future Projects") !== 0) {
              funderBio[element["Funder"]] = 0;
            }
            if(isNaN(funderRain[element["Funder"]]) && element["Funder"].localeCompare("Future Projects") !== 0) {
              funderRain[element["Funder"]] = 0;
            }
            if(isNaN(funderFuture[element["Funder"]])) {
              funderFuture[element["Funder"]] = 0;
            }
            if(isNaN(funderConv[element["Funder"]]) && element["Funder"].localeCompare("Future Projects") !== 0) {
              funderConv[element["Funder"]] = 0;
            }
            if(element["Type of Facility"].localeCompare("Bioretention") == 0) { // Bioretention facility
              funderBio[element["Funder"]] = funderBio[element["Funder"]] = funderBio[element["Funder"]] + 1;
            } else if(element["Type of Facility"].localeCompare("Raingarden") == 0) { // Raingarden facility
              funderRain[element["Funder"]] = funderRain[element["Funder"]] = funderRain[element["Funder"]] + 1;
            } else if(element["Type of Facility"].localeCompare("Conveyance") == 0) { // Conveyance facility
              funderConv[element["Funder"]] = funderConv[element["Funder"]] = funderConv[element["Funder"]] + 1;
            } else if(element["Funder"].localeCompare("Future Projects") == 0) { // Future projects funder
              funderFuture[element["Funder"]] = funderFuture[element["Funder"]] = funderFuture[element["Funder"]] + 1;
            } else {
              console.log('vary ', element["Type of Facility"]);
            }

        });
        $("#sbheadfont1").text(ism);
        $("#sbheadfont11").text(tgm);
        var dataPointsBioArr = [];
        var dataPointsRainArr = [];
        var dataPointsFuture = [];
        var dataPointsConv = [];

        // Bioretention array
        Object.keys(funderBio).forEach(function(elem) {
          dataPointsBioArr.push({
            label: elem,
            y: funderBio[elem]
          });
        });

        // Raingarden array
        Object.keys(funderRain).forEach(function(elem) {
          dataPointsRainArr.push({
            label: elem,
            y: funderRain[elem]
          });
        });
        console.log(funderFuture);
        // Future points array
      /*
        Object.keys(funderFuture).forEach(function(elem) {
          dataPointsFuture.push({
            label: elem,
            y: funderFuture[elem]
          });
        });
      */

      dataPointsFuture.push({
        label: "Future Projects",
        y: funderFuture["Future Projects"],
        x: Object.keys(funderBio).length 
      });
      console.log('final future', funderFuture, Object.keys(funderFuture), Object.keys(funderFuture).indexOf("Future Projects"));

        // Conveyance points array
        Object.keys(funderConv).forEach(function(elem) {
          dataPointsConv.push({
            label: elem,
            y: funderConv[elem]
          });
        });

        // Render Chart
        var chart = new CanvasJS.Chart("chartContainer", {
          colorSet: "customShades",
          toolTip: {
            shared: true
          },
          animationEnabled: true, // set to true		
          axisX:{
            labelMaxWidth: 80, //
            labelFontSize: 12,
			      labelWrap: true,   // so that the x-axis labels stay straight
			      interval: 1, //
          },
          data: [
            {
              // Column for column type graphs
              type: "column",
              bevelEnabled: true,
              name: "Raingarden",
              click: function(e){ 
                 mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints: dataPointsRainArr
            // }
            },
            {
              // Column for column type graphs
              type: "column",
              bevelEnabled: true,
              name: "Bioretention",
              click: function(e){ 
                mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints: dataPointsBioArr
            },
            {
              // Column for column type graphs
              type: "column",
              bevelEnabled: true,
              name: "Future Projects",
              click: function(e){ 
                   mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints:dataPointsFuture
            },
            
            {
              // Column for column type graphs
              type: "column",
              bevelEnabled: true,
              name: "Conveyance",
              click: function(e){ 
                 mapPlot(e["dataPoint"]["label"]);
              },
              mousemove: function(e) {
                document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
              },
              dataPoints: dataPointsConv
            // }
            }
            
            
          ]
        });
        chart.render();

        funderKeys = Object.keys(funderBio);

        data.forEach(elem => {
          //Render map markers
          var place = getLtLg(elem["Project Address (for Google Maps)"])["responseJSON"];
          
          if(place && place.results && place.results.length > 0 && (place["results"][0]["geometry"]["location_type"]).localeCompare("APPROXIMATE") !== 0) {
                      
            var lat = place["results"][0]["geometry"]["location"]["lat"],
            long = place["results"][0]["geometry"]["location"]["lng"];

            // shapes into circles and rectangles
            if (elem["Type of Facility"].localeCompare("Raingarden") == 0) {
              // Initialize map rectangle markers
              var latLng = L.latLng([lat, long]);
              var currentPoint = mymap.latLngToContainerPoint(latLng);
              var width = 3.5;
              var height = 3.5;
              var xDifference = width / 2;
              var yDifference = height / 2;
              var southWest = L.point((currentPoint.x - xDifference), (currentPoint.y - yDifference));
              var northEast = L.point((currentPoint.x + xDifference), (currentPoint.y + yDifference));
              var bounds = L.latLngBounds(mymap.containerPointToLatLng(southWest),mymap.containerPointToLatLng(northEast));
              var rectangle = L.rectangle(bounds, {color: "#ff0000", weight: 4}).addTo(markerGroup);
            
            // Add popup to markers
            rectangle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Vegetated Area Managed:  " + elem["Vegetated Area Managed"] + "<br>Address:  " + elem["Address (for pop up)"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Swales per project: " + elem["Swales per project"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Top_Swale:  " + elem["Top_Swale"] + "<br>Bottom_Swale:  " + elem["Bottom_Swale"] + "<br>Discharge Area:  " + elem["Discharge Area"]  + "<br>Funder:  " + elem["Funder"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");
    
            } else {
              // Initialize map circle markers
              var circle = L.circle([lat, long], {
                color: "yellow",
                weight: 1,
                opacity: 0.5,
                fillColor: elem["Funder"] == "Future Projects" ? "white" : globalColorSet1[["Raingarden","Bioretention","","Conveyance"].indexOf(elem["Type of Facility"])],
                fillOpacity: 1.0,
                radius: 220
              }).addTo(markerGroup);
              
              // Add popup to markers
              circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Vegetated Area Managed:  " + elem["Vegetated Area Managed"] + "<br>Address:  " + elem["Address (for pop up)"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Swales per project: " + elem["Swales per project"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Top_Swale:  " + elem["Top_Swale"] + "<br>Bottom_Swale:  " + elem["Bottom_Swale"] + "<br>Discharge Area:  " + elem["Discharge Area"]  + "<br>Funder:  " + elem["Funder"] + "<br>Comments:  " + elem["Comments"] + " <br> <a href='http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long +"' target='_blank'> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> </a> ");
            }
              // change marker size on zoom
              // mymap.on('zoomend', function() {
              //   var currentZoom = mymap.getZoom();
              //   console.log('cc', currentZoom);
              //   circle.setRadius((250-(currentZoom*4)));
              // });

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
          document.getElementById("cover").style.display = "none";
        });

        // Update lat long in the spreadsheet // ToDO SET UP MACRO ON NEW DATASHEET
        setTimeout(function() {
          jQuery.ajax({
            url: "https://script.google.com/macros/s/AKfycbxewGQ1GhBegzZSLj7qkJpk8S0ovM9Ddi077M9j48QimMBriDd-/exec?callback=?",
            success: function(result) {
              console.log(result);
              return result;
            },
            async: true
          });
        });
    }
      
      window.addEventListener('DOMContentLoaded', ttinit);
