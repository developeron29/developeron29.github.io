var mymap = '', //globalmap variable
    globalColorSet1 = ["#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#7F6084", "#77A033", "#33558B", "#E59566"], // Colorset1 default colors
    globalColorSetExtend = [
      "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" , "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0", "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" , "#9348af" ,"#01ac53" ,"#c5a4fb", "#996635","#b11573" ,"#4bb473" ,"#75d89e" , "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" , "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d","#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977","#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b","#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf","#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234","#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
      "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647","#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647","#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7","#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8","#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16","#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce","#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
      "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba","#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043","#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56","#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f","#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
      "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9","#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4","#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06","#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a","#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065","#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35","#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44","#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67","#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff","#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"],
    markerGroup = '',
    heatGroup = '',
    selected = false,
    globaldataObj = [],
    spuDataObj = [],
    sprDataObj = [],
    spuLoaded = false,
    sprLoaded = false,
    currentSource = '';
    filteredList = [],
    filteredListFlag = false,
    scientNameObj = [],
    tofKeys = []; //empty x graph data initialize

    
    window.onload = function() {
      this.setTimeout(function() {
      // set dimensions of divs after load

      var win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth,
      y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
      var newHeight = y;
     // document.getElementById("paddlow").style.height = (newHeight - document.getElementById('totalboxcardcontainer').offsetHeight - 25) + "px";

      //document.getElementById("chartContainer").style.height = (document.getElementById("paddlow").offsetHeight - document.getElementById("fonthead1").offsetHeight - 25) + "px";

    //  document.getElementById("chartContainer").style.width = (document.getElementById("paddlow").offsetWidth + 650) + "px";

      }, 10);
      CanvasJS.addColorSet("customColorset", globalColorSetExtend);
     
    }

    function showAllMarkers() {
      var cs = $("input[type=radio][name=invasiveSelector]:checked").val();
      if(cs.localeCompare("sdoteab") == 0 || cs.localeCompare("sdotgm") == 0 || cs.localeCompare("sdotalb") == 0 || cs.localeCompare("sdotsww") == 0 || cs.localeCompare("sdotbbb") == 0 ) {
        console.log(1);
        mapPlot(1); //show all
      }
      else if(cs.localeCompare("spueab") == 0 || cs.localeCompare("spugm") == 0 || cs.localeCompare("spualb") == 0 || cs.localeCompare("spusww") == 0 || cs.localeCompare("spubbb") == 0 ) {
        console.log(2);
        mapPlotSPU(1); //show all
      }
      else if(cs.localeCompare("spreab") == 0 || cs.localeCompare("sprgm") == 0 || cs.localeCompare("spralb") == 0 || cs.localeCompare("sprsww") == 0 || cs.localeCompare("sprbbb") == 0 ) {
        console.log(3);
        mapPlotSPR(1); //show all
      } else {
        console.log('noden? ');
      }
    }

    // plot markers to map
    function mapPlot(label) {
      document.getElementById('heatmap-toggle').checked = false;
      if(label == 1) { // show all
        filteredList = globaldataObj;
        $("#sbheadfont1").text(Object.keys(scientNameObj).length);
        filteredListFlag = false;
      } else {
        filteredList = globaldataObj.filter(function(obj) {
          console.log(obj["attributes"]["SCIENTIFIC_NAME"], label);
          return obj["attributes"]["SCIENTIFIC_NAME"].toUpperCase().trim().localeCompare(label.toUpperCase().trim()) == 0;
        });
        $("#sbheadfont1").text(1);
        filteredListFlag = true;
      }

      //reinstantiate marker group
      mymap.removeLayer(markerGroup);
      mymap.removeLayer(heatGroup);
      markerGroup = L.layerGroup().addTo(mymap);

      var len = filteredList.length;
      $("#sbheadfont").text(len);
      console.log('f ', filteredList, label);
      filteredList.forEach(function(data) {
        var sc = data["attributes"]["SCIENTIFIC_NAME"];
        scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
        
        // Markers
        if(data["geometry"]) {

          var lat = data["geometry"]["y"],
          long = data["geometry"]["x"];
            // Initialize map circle markers
            var circle = L.circle([lat, long], {
              color: "yellow",
              weight: 1,
              opacity: 0.5,
              fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
              fillOpacity: 1.0,
              radius: 160
            }).addTo(markerGroup);     
          
          var aH = data["attributes"];
          // Add popup to markers
          circle.bindPopup("OBJECTID: " + aH["OBJECTID"] + "<br> COMPKEY: " + aH["COMPKEY"] + "<br> UNITID: " + aH["UNITID"] + "<br> UNITDESC: " + aH["UNITDESC"] + "<br> CONDITION: " + aH["CONDITION"] + "<br> CONDITION_ASSESSMENT_DATE: " + aH["CONDITION_ASSESSMENT_DATE"] + "<br>CURRENT_STATUS: " + aH["CURRENT_STATUS"] + "<br> PRIMARYDISTRICTCD: " + aH["PRIMARYDISTRICTCD"] + "<br> SECONDARYDISTRICTCD: " + aH["SECONDARYDISTRICTCD"] + "<br> OVERRIDEYN: " + aH["OVERRIDEYN"] + "<br> COMPTYPE: " + aH["COMPTYPE"] + "<br> SEGKEY: " + aH["SEGKEY"] + "<br> UNITTYPE: " + aH["UNITTYPE"] + "<br> OWNERSHIP: " + aH["OWNERSHIP"] + "<br> CURRENT_STATUS_DATE: " + aH["CURRENT_STATUS_DATE"] + "<br> LAST_VERIFY_DATE: " + aH["LAST_VERIFY_DATE"] + "<br> PLANTED_DATE: " + aH["PLANTED_DATE"] + "<br> BOTANICAL_NAME: " + aH["BOTANICAL_NAME"] + "<br> SCIENTIFIC_NAME: " + aH["SCIENTIFIC_NAME"] + "<br> HERITAGE: " + aH["HERITAGE"] + "<br> EXCEPTIONAL: " + aH["EXCEPTIONAL"] + "<br> CODEREQ: " + aH["CODEREQ"] + "<br> GSI" + aH["GSI"] + "<br> GREEN_FACTOR: " + aH["GREEN_FACTOR"] + "<br> WIRES: " + aH["WIRES"] + "<br> CABLED: " + aH["CABLED"] + "<br> CLEARANCE_PROBLEM: " + aH["CLEARANCE_PROBLEM"] + "<br> SPACETYPE: " + aH["SPACETYPE"] + "<br> SITETYPE: " + aH["SITETYPE"] + "<br> GROWSPACE: " + aH["GROWSPACE"] + "<br> DIAM: " + aH["DIAM"] + "<br> CONDITION_RATING: " + aH["CONDITION_RATING"] + "<br> FUNDING_SOURCE: " + aH["FUNDING_SOURCE"] + "<br> WATER_THROUGH_YR1" + aH["WATER_THROUGH_YR1"] + "<br> WATER_THROUGH_YR2: " + aH["WATER_THROUGH_YR2"] + "<br> WATER_THROUGH_YR3: " + aH["WATER_THROUGH_YR3"] + "<br> OWNERDIAM: " + aH["OWNERDIAM"] + "<br> EXPDATE: " + aH["EXPDATE"] + "<br> COMMON_NAME: " + aH["COMMON_NAME"] + "<br> TREEHEIGHT: " + aH["TREEHEIGHT"] + "<br> ASBUILTPLANNO: " + aH["ASBUILTPLANNO"] + "<br> LANDSCAPEAREAASSOC: " + aH["LANDSCAPEAREAASSOC"] + "<br> COMMENTS: " + aH["COMMENTS"] + "<br> OVERRIDECOMMENT: " + aH["OVERRIDECOMMENT"] + "<br> SHAPE_LNG: " + aH["SHAPE_LNG"] + "<br> SHAPE_LAT: " + aH["SHAPE_LAT"] + "<br> IRRIGATESYSYN: " + aH["IRRIGATESYSYN"] + "<br> ASSETGROUPID: " + aH["ASSETGROUPID"] + "<br> ASSETGROUPDESC: " + aH["ASSETGROUPDESC"] + "<br> MODDATE: " + aH["MODDATE"] + "<br>MODBY: " + aH["MODBY"] + "<br> TOTAL_RANK: " + aH["TOTAL_RANK"] + "<br> TOTAL_COUNT: " + aH["TOTAL_COUNT"] + "<br> GENUS: " + aH["GENUS"] + "<br> UFMAINTMGMTUNIT: " + aH["UFMAINTMGMTUNIT"]);
         } // end of if check
         else {
           console.log('no geom', data);
         }
  
        });
    }

        // plot markers to map - SPU
        function mapPlotSPU(label) {
          document.getElementById('heatmap-toggle').checked = false;
          if(label == 1) { // show all
            filteredList = globaldataObj;
            $("#sbheadfont1").text(Object.keys(scientNameObj).length);
            filteredListFlag = false;
          } else {
            filteredList = globaldataObj.filter(function(obj) {
              return obj["UT_SPECIES"] == label;
            });
            $("#sbheadfont1").text(1);
            filteredListFlag = true;
          }
    
          //reinstantiate marker group
          mymap.removeLayer(markerGroup);
          mymap.removeLayer(heatGroup);
          markerGroup = L.layerGroup().addTo(mymap);
    
          var len = filteredList.length;
          $("#sbheadfont").text(len);
    
          filteredList.forEach(function(data) {
            var sc = data["UT_SPECIES"];
            scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;

            // Markers
              // Markers
          
              var lat = data["Lat"],
              long = data["Long"];

                // Initialize map circle markers
                var circle = L.circle([lat, long], {
                  color: "yellow",
                  weight: 1,
                  opacity: 0.5,
                  fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
                  fillOpacity: 1.0,
                  radius: 160
                }).addTo(markerGroup);     
              
              var aH = data["attributes"];
              // Add popup to markers
              circle.bindPopup("FID: " + data["FID"] + "<br> OBJECTID: " + data["OBJECTID"] + "<br> UT_TREE_FE: " + data["UT_TREE_FE"] + "<br> UT_CMN_NAM: " + data["UT_CMN_NAM"] + "<br> UT_COMMON_: " + data["UT_COMMON_"] + "<br> UT_SPCS_NA: " + data["UT_SPCS_NA"] + "<br> UT_SPECIES: " + data["UT_SPECIES"] + "<br> UT_SITE_KE: " + data["UT_SITE_KE"] + "<br> UT_TREE_ID: " + data["UT_TREE_ID"] + "<br> UT_TREESIT: " + data["UT_TREESIT"] + "<br> UT_LAND_US: " + data["UT_LAND_US"] + "<br> UT_LONG_CO: " + data["UT_LONG_CO"] + "<br> UT_LAT_COO: " + data["UT_LAT_COO"] + "<br> UT_OWNER_N: " + data["UT_OWNER_N"] + "<br> UT_PLANTED: " + data["UT_PLANTED"] + "<br> UT_FUNDER_: " + data["UT_FUNDER_"] + "<br> UT_NOTES_T: " + data["UT_NOTES_T"] + "<br> UT_EDITOR_: " + data["UT_EDITOR_"] + "<br> UT_EDIT_DA: " + data["UT_EDIT_DA"] + "<br> GENUS: " + data["GENUS"] + "<br> Lat: " + data["Lat"] + "<br> Long: " + data["Long"]);
      
            });
        }

        // plot markers to map
        function mapPlotSPR(label) {
          document.getElementById('heatmap-toggle').checked = false;
          if(label == 1) { // show all
            filteredList = globaldataObj;
            $("#sbheadfont1").text(Object.keys(scientNameObj).length);
            filteredListFlag = false;
          } else {
            filteredList = globaldataObj.filter(function(obj) {
              return obj["SPECIES"] == label;
            });
            $("#sbheadfont1").text(1);
            filteredListFlag = true;
          }
    
          //reinstantiate marker group
          mymap.removeLayer(markerGroup);
          mymap.removeLayer(heatGroup);
          markerGroup = L.layerGroup().addTo(mymap);
    
          var len = filteredList.length;
          $("#sbheadfont").text(len);
    
          filteredList.forEach(function(data) {
            var sc = data["SPECIES"];
            scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;

            // Markers
              // Markers
          
                var lat = data["Lat"],
                long = data["Long"];

                // Initialize map circle markers
                var circle = L.circle([lat, long], {
                  color: "yellow",
                  weight: 1,
                  opacity: 0.5,
                  fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
                  fillOpacity: 1.0,
                  radius: 160
                }).addTo(markerGroup);     
              
              var aH = data["attributes"];
              // Add popup to markers
              circle.bindPopup("OBJECTID: " + data["OBJECTID"] + "<br> PARK: " + data["PARK"] + "<br> SPECIES: " + data["SPECIES"] + "<br> COMMON: " + data["COMMON"] + "<br> DBH_WL: " + data["DBH_WL:"] + "<br> HEIGHT_WL: " + data["HEIGHT_WL"] + "<br> GENUS: " + data["GENUS"] + "<br> Lat: " + data["Lat"] + "<br> Long: " + data["Long"]);
      
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
      heatGroup = L.layerGroup().addTo(mymap);
      
      // create the control
      var command = L.control({position: 'topright'});

      command.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'command');

          div.innerHTML = '<form style="background-color:white; padding:2px;border-radius:5px;"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="heatmap-toggle"><label class="custom-control-label" for="heatmap-toggle" style="color:black;padding:5px;">Heatmap</label></div> </form>'; 
          return div;
      };

      command.addTo(mymap);

      // add the event handler
      function handleCommand() {
          var cs = $("input[type=radio][name=invasiveSelector]:checked").val();
          console.log('cs', cs);
          if(this.checked) {
          var tempdata = [];
          if (filteredListFlag) {
            tempdata = filteredList;
          } else {
            tempdata = globaldataObj;
          }
          var tempHeatData = [];
          tempdata.forEach(function(data) {
            
            console.log('cs ', cs);

            if(cs.localeCompare("sdoteab") == 0 || cs.localeCompare("sdotgm") == 0 || cs.localeCompare("sdotalb") == 0 || cs.localeCompare("sdotsww") == 0 || cs.localeCompare("sdotbbb") == 0 ) {
             if(data["geometry"] && data["geometry"]["y"] && data["geometry"]["x"]) {
              console.log(1.1, data, data["geometry"]["y"],data["geometry"]["x"]);
              tempHeatData.push([data["geometry"]["y"],data["geometry"]["x"],5]);
             }  else {
               console.log('no geom');
             }
            }
            else {
              console.log(1.2, data, data["Lat"], data["Long"]);
              tempHeatData.push([data["Lat"], data["Long"],5]);
            }
          });

          mymap.removeLayer(markerGroup);
          mymap.removeLayer(heatGroup);
          heatGroup = L.layerGroup().addTo(mymap);
          var heat = L.heatLayer(tempHeatData, {radius: 25}).addTo(heatGroup);
        } else {
          if (filteredListFlag) { 
            if(cs.localeCompare("sdoteab") == 0 || cs.localeCompare("sdotgm") == 0 || cs.localeCompare("sdotalb") == 0 || cs.localeCompare("sdotsww") == 0 || cs.localeCompare("sdotbbb") == 0 ) {
              console.log(1);
              var fs = filteredList[0]["attributes"]["SCIENTIFIC_NAME"];
              mapPlot(fs);
            }
            else if(cs.localeCompare("spueab") == 0 || cs.localeCompare("spugm") == 0 || cs.localeCompare("spualb") == 0 || cs.localeCompare("spusww") == 0 || cs.localeCompare("spubbb") == 0 ) {
              console.log(2);
              var fs = filteredList[0]["UT_SPECIES"];
              mapPlotSPU(fs);
            }
            else if(cs.localeCompare("spreab") == 0 || cs.localeCompare("sprgm") == 0 || cs.localeCompare("spralb") == 0 || cs.localeCompare("sprsww") == 0 || cs.localeCompare("sprbbb") == 0 ) {
              console.log(3);
              var fs = filteredList[0]["SPECIES"];
              mapPlotSPR(fs);
            } else {
              console.log('noden? ');
            }
            
          }
          else {
            if(cs.localeCompare("sdoteab") == 0 || cs.localeCompare("sdotgm") == 0 || cs.localeCompare("sdotalb") == 0 || cs.localeCompare("sdotsww") == 0 || cs.localeCompare("sdotbbb") == 0 ) {
              console.log(1);
              mapPlot(1); //show all
            }
            else if(cs.localeCompare("spueab") == 0 || cs.localeCompare("spugm") == 0 || cs.localeCompare("spualb") == 0 || cs.localeCompare("spusww") == 0 || cs.localeCompare("spubbb") == 0 ) {
              console.log(2);
              mapPlotSPU(1); //show all
            }
            else if(cs.localeCompare("spreab") == 0 || cs.localeCompare("sprgm") == 0 || cs.localeCompare("spralb") == 0 || cs.localeCompare("sprsww") == 0 || cs.localeCompare("sprbbb") == 0 ) {
              console.log(3);
              mapPlotSPR(1); //show all
            } else {
              console.log('noden? ');
            }
          }
        }
        
      }

      document.getElementById ("heatmap-toggle").addEventListener ("click", handleCommand, false);

      // create the control
      var commandlist = L.control({position: 'topleft'});

      commandlist.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'commandlist');

          div.innerHTML = '<div style="padding:5px;background-color:white;border-radius:5px;"><b>Select Pest Source</b><div  id="cover1"><b>Loading...</b><img src="http://ayushnarula.com/mapApp-socrata/images/load.gif" height="52" width="52"/></div><br>'+
          '<form>'+
          '    <div><b><input type="radio" name="invasiveName" value="eab" /> Emerald Ash Borer</b></div>'+
          '    <div id="eabDiv">'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sdoteab" checked> SDOT <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spueab"> SPU <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spreab"> SPR<br>'+
          '    </div>'+
          '    <div> <b><input type="radio" name="invasiveName" value="gm" /> Gypsy Moth</b></div>'+
          '    <div id="gmDiv">'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sdotgm"> SDOT <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spugm"> SPU <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sprgm"> SPR<br>'+
          '    </div>'+
          '    <div> <b><input type="radio" name="invasiveName" value="alb" /> Asian Longhorn Beetle</b></div>'+
          '    <div id="albDiv">'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sdotalb"> SDOT <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spualb"> SPU <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spralb"> SPR<br>'+
          '    </div>'+
          '    <div><b> <input type="radio" name="invasiveName" value="sww" /> Sirex Wood Wasp</b></div>'+
          '    <div id="swwDiv">'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sdotsww"> SDOT <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spusww"> SPU <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sprsww"> SPR<br>'+
          '    </div>'+
          '    <div><b> <input type="radio" name="invasiveName" value="bbb" /> Bronze Birch Borer</b></div>'+
          '    <div id="bbbDiv">'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sdotbbb"> SDOT <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="spubbb"> SPU <br>'+
          '        &nbsp; <input type="radio" name="invasiveSelector" value="sprbbb"> SPR<br>'+
          '    </div>'+
          '</form>'+          
          '</div>';
            
          
          return div;
      };
      setTimeout(function() {
        $("div#cover1").hide();
        $("input[type=radio]").attr('disabled', false);
      }, 100);
      commandlist.addTo(mymap);

      $("#eabDiv").show();
      $("#gmDiv").hide();
      $("#albDiv").hide();
      $("#swwDiv").hide();
      $("#bbbDiv").hide();

      $('input[type=radio][name=invasiveName]').change(function() {
        if (this.value == 'eab') {
          $("#eabDiv").show();
          $("#gmDiv").hide();
          $("#albDiv").hide();
          $("#swwDiv").hide();
          $("#bbbDiv").hide();
        }
        else if (this.value == 'gm') {
          $("#eabDiv").hide();
          $("#gmDiv").show();
          $("#albDiv").hide();
          $("#swwDiv").hide();
          $("#bbbDiv").hide();
        }
        else if (this.value == 'alb') {
          $("#eabDiv").hide();
          $("#gmDiv").hide();
          $("#albDiv").show();
          $("#swwDiv").hide();
          $("#bbbDiv").hide();
        }
        else if (this.value == 'sww') {
          $("#eabDiv").hide();
          $("#gmDiv").hide();
          $("#albDiv").hide();
          $("#swwDiv").show();
          $("#bbbDiv").hide();
        }
        else if (this.value == 'bbb') {
          $("#eabDiv").hide();
          $("#gmDiv").hide();
          $("#albDiv").hide();
          $("#swwDiv").hide();
          $("#bbbDiv").show();
        }
      });

      // $().change(function() {
      //   var thisVal = this.value;
      //   console.log('this val', thisVal);
      // });

      // Pest selection handler
      $('input[type=radio][name=invasiveSelector]').change(function(){
        var selected = this.value;
        console.log('se', selected);
        $("input[type=radio]").attr('disabled', true);
        // Hide Loading screen
          $("div#cover1").show();

          if(selected.localeCompare("sdoteab") == 0) {
          globaldataObj = [];
          scientNameObj = [];
          setTimeout(function() {
            trampoline(buildData.bind(this, 0, 'FRAXINUS')); // Emerald Ash Borer
            console.log('called');
          },999);
          setTimeout(function() {
            $("div#cover1").hide();
            $("input[type=radio]").attr('disabled', false);
          },2000);
        } else if (selected.localeCompare("spueab") == 0) {
          // Emerald Ash borer SPU data load
          // data
          setTimeout(function() {
            globaldataObj = [];
            scientNameObj = [];
            if(spuDataObj && spuDataObj.length > 0) {
              globaldataObj = spuDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0;
              });
              dataMapperSPU();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            } else {
              loadSPU(function() {
                globaldataObj = spuDataObj.filter(function(item) {
                  return item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0;
                });
                dataMapperSPU();
                setTimeout(function() {
                  $("div#cover1").hide();
                  $("input[type=radio]").attr('disabled', false);
                },2000);
              });
            }

          },999);

        } else if (selected.localeCompare("spreab") == 0) {
           // Emerald Ash borer SPR data load
          // data
          setTimeout(function() {
            globaldataObj = [];
            scientNameObj = [];

            if(sprDataObj && sprDataObj.length > 0) {
              globaldataObj = sprDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0;
              });
              dataMapperSPR();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            } else {
              loadSPR(function() {
                globaldataObj = sprDataObj.filter(function(item) {
                  return item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0;
                });
                dataMapperSPR();
                setTimeout(function() {
                  $("div#cover1").hide();
                  $("input[type=radio]").attr('disabled', false);
                },2000);
              });
            }
            
          }, 999);

        } else if(selected.localeCompare("sdotgm") == 0) {
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          trampoline(buildData.bind(this, 0, 'ACER')); // Gypsy Moth

          },999);
          setTimeout(function() {
            $("div#cover1").hide();
            $("input[type=radio]").attr('disabled', false);
          },2000);
        } else if (selected.localeCompare("spugm") == 0) {
          // Emerald Ash borer SPU data load
          // data
          setTimeout(function() {

            globaldataObj = [];
            scientNameObj = [];
            if(spuDataObj && spuDataObj.length > 0) {
              globaldataObj = spuDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("ACER") == 0;
              });
              dataMapperSPU();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            } else {
              loadSPU(function() {
                globaldataObj = spuDataObj.filter(function(item) {
                  return item["GENUS"].toUpperCase().localeCompare("ACER") == 0;
                });
                dataMapperSPU();
                setTimeout(function() {
                  $("div#cover1").hide();
                  $("input[type=radio]").attr('disabled', false);
                },2000);
              });

            }
          },999);
        } else if (selected.localeCompare("sprgm") == 0) {
          // Emerald Ash borer SPR data load
         // data
         setTimeout(function() {

            globaldataObj = [];
            scientNameObj = [];
            if(sprDataObj && sprDataObj.length > 0) {
              globaldataObj = sprDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("ACER") == 0;
              });
              dataMapperSPR();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            } else {
              loadSPR(function() {
                globaldataObj = sprDataObj.filter(function(item) {
                  return item["GENUS"].toUpperCase().localeCompare("ACER") == 0;
                });
                dataMapperSPR();
                setTimeout(function() {
                  $("div#cover1").hide();
                  $("input[type=radio]").attr('disabled', false);
                },2000);
              });
            }

          },999);

          } else if(selected.localeCompare("sdotbbb") == 0) {
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          trampoline(buildData.bind(this, 0, 'BETULA')); // Bronze Birch Borer
          },999);
          setTimeout(function() {
            $("div#cover1").hide();
            $("input[type=radio]").attr('disabled', false);
          },2000);
        } else if (selected.localeCompare("spubbb") == 0) {
          // Emerald Ash borer SPU data load
          // data
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          if(spuDataObj && spuDataObj.length > 0) {
            globaldataObj = spuDataObj.filter(function(item) {
              return item["GENUS"].toUpperCase().localeCompare("BETULA") == 0;
            });
            dataMapperSPU();
            setTimeout(function() {
              $("div#cover1").hide();
              $("input[type=radio]").attr('disabled', false);
            },2000);
          } else {
            loadSPU(function() {
              globaldataObj = spuDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("BETULA") == 0;
              });
              dataMapperSPU();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            });
          }

          },999);

        } else if (selected.localeCompare("sprbbb") == 0) {
          // Emerald Ash borer SPR data load
        // data
        setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          if(sprDataObj && sprDataObj.length > 0) {
            globaldataObj = sprDataObj.filter(function(item) {
              return item["GENUS"].toUpperCase().localeCompare("BETULA") == 0;
            });
            dataMapperSPR();
            setTimeout(function() {
              $("div#cover1").hide();
              $("input[type=radio]").attr('disabled', false);
            },2000);
          } else {
            loadSPR(function() {
              globaldataObj = sprDataObj.filter(function(item) {
                return item["GENUS"].toUpperCase().localeCompare("BETULA") == 0;
              });
              dataMapperSPR();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            });
          }
        
          },999);

        } else if(selected.localeCompare("sdotsww") == 0) {
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          trampoline(thunkedBuildDataSWW.bind(this, 0)); // Sirex wood wasp
          },999);
          setTimeout(function() {
            $("div#cover1").hide();
            $("input[type=radio]").attr('disabled', false);
          },2000);
        } else if (selected.localeCompare("spusww") == 0) {
          // Emerald Ash borer SPU data load
          // data
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          if(spuDataObj && spuDataObj.length > 0) {
            globaldataObj = spuDataObj.filter(function(item) {
              return (item["GENUS"].toUpperCase().localeCompare("PINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("PICEA") == 0 || item["GENUS"].toUpperCase().localeCompare("ABIES") == 0);
            });
            dataMapperSPU();
            setTimeout(function() {
              $("div#cover1").hide();
              $("input[type=radio]").attr('disabled', false);
            },2000);
          } else {
            loadSPU(function() {
              globaldataObj = spuDataObj.filter(function(item) {
                return (item["GENUS"].toUpperCase().localeCompare("PINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("PICEA") == 0 || item["GENUS"].toUpperCase().localeCompare("ABIES") == 0);
              });
              dataMapperSPU();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            })
          }
          
          },999);

        } else if (selected.localeCompare("sprsww") == 0) {
          // Emerald Ash borer SPR data load
          // data
          setTimeout(function() {

            globaldataObj = [];
            scientNameObj = [];
            if(sprDataObj && sprDataObj.length > 0) {
              globaldataObj = sprDataObj.filter(function(item) {
                return (item["GENUS"].toUpperCase().localeCompare("PINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("PICEA") == 0 || item["GENUS"].toUpperCase().localeCompare("ABIES") == 0);
              });
              dataMapperSPR();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            } else {
              loadSPR(function(){
                globaldataObj = sprDataObj.filter(function(item) {
                  return (item["GENUS"].toUpperCase().localeCompare("PINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("PICEA") == 0 || item["GENUS"].toUpperCase().localeCompare("ABIES") == 0);
                });
                dataMapperSPR();
                setTimeout(function() {
                  $("div#cover1").hide();
                  $("input[type=radio]").attr('disabled', false);
                },2000);
              });
            }

          },999);

        } else if(selected.localeCompare("sdotalb") == 0) {
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          trampoline(thunkedBuildDataALB.bind(this,0));
          },999);
          setTimeout(function() {
            $("div#cover1").hide();
          },2000);
          console.log('called');

        } else if (selected.localeCompare("spualb") == 0) {
          // Emerald Ash borer SPU data load
          // data
          setTimeout(function() {

          globaldataObj = [];
          scientNameObj = [];
          if(spuDataObj && spuDataObj.length > 0) {
            globaldataObj = spuDataObj.filter(function(item) {
              return (item["GENUS"].toUpperCase().localeCompare("ACER") == 0 || item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("BETULA") == 0 || item["GENUS"].toUpperCase().localeCompare("PLATANUS") == 0 || item["GENUS"].toUpperCase().localeCompare("ULMUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SORBUS") == 0 || item["GENUS"].toUpperCase().localeCompare("CERCIDPHYLLUM") == 0 || item["GENUS"].toUpperCase().localeCompare("AESCULUS") == 0 || item["GENUS"].toUpperCase().localeCompare("KOELREUTERIA") == 0 || item["GENUS"].toUpperCase().localeCompare("POPLUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SALIX") == 0 || item["GENUS"].toUpperCase().localeCompare("ALBIZIA") == 0);
            });
            dataMapperSPU();
            setTimeout(function() {
              $("div#cover1").hide();
              $("input[type=radio]").attr('disabled', false);
            },2000);
          } else {
            loadSPU(function() {
              globaldataObj = spuDataObj.filter(function(item) {
                return (item["GENUS"].toUpperCase().localeCompare("ACER") == 0 || item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("BETULA") == 0 || item["GENUS"].toUpperCase().localeCompare("PLATANUS") == 0 || item["GENUS"].toUpperCase().localeCompare("ULMUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SORBUS") == 0 || item["GENUS"].toUpperCase().localeCompare("CERCIDPHYLLUM") == 0 || item["GENUS"].toUpperCase().localeCompare("AESCULUS") == 0 || item["GENUS"].toUpperCase().localeCompare("KOELREUTERIA") == 0 || item["GENUS"].toUpperCase().localeCompare("POPLUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SALIX") == 0 || item["GENUS"].toUpperCase().localeCompare("ALBIZIA") == 0);
              });
              dataMapperSPU();
              setTimeout(function() {
                $("div#cover1").hide();
                $("input[type=radio]").attr('disabled', false);
              },2000);
            });
          }
          
          },999);

        } else if (selected.localeCompare("spralb") == 0) {
          // Emerald Ash borer SPR data load
        // data
        setTimeout(function() {

        globaldataObj = [];
        scientNameObj = [];
        if(sprDataObj && sprDataObj.length > 0) {
          globaldataObj = sprDataObj.filter(function(item) {
            return (item["GENUS"].toUpperCase().localeCompare("ACER") == 0 || item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("BETULA") == 0 || item["GENUS"].toUpperCase().localeCompare("PLATANUS") == 0 || item["GENUS"].toUpperCase().localeCompare("ULMUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SORBUS") == 0 || item["GENUS"].toUpperCase().localeCompare("CERCIDPHYLLUM") == 0 || item["GENUS"].toUpperCase().localeCompare("AESCULUS") == 0 || item["GENUS"].toUpperCase().localeCompare("KOELREUTERIA") == 0 || item["GENUS"].toUpperCase().localeCompare("POPLUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SALIX") == 0 || item["GENUS"].toUpperCase().localeCompare("ALBIZIA") == 0);
          });
          dataMapperSPR();
          setTimeout(function() {
            $("div#cover1").hide();
            $("input[type=radio]").attr('disabled', false);
          },2000);
        } else {
          loadSPR(function(){
            globaldataObj = sprDataObj.filter(function(item) {
              return (item["GENUS"].toUpperCase().localeCompare("ACER") == 0 || item["GENUS"].toUpperCase().localeCompare("FRAXINUS") == 0 || item["GENUS"].toUpperCase().localeCompare("BETULA") == 0 || item["GENUS"].toUpperCase().localeCompare("PLATANUS") == 0 || item["GENUS"].toUpperCase().localeCompare("ULMUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SORBUS") == 0 || item["GENUS"].toUpperCase().localeCompare("CERCIDPHYLLUM") == 0 || item["GENUS"].toUpperCase().localeCompare("AESCULUS") == 0 || item["GENUS"].toUpperCase().localeCompare("KOELREUTERIA") == 0 || item["GENUS"].toUpperCase().localeCompare("POPLUS") == 0 || item["GENUS"].toUpperCase().localeCompare("SALIX") == 0 || item["GENUS"].toUpperCase().localeCompare("ALBIZIA") == 0);
            });
            dataMapperSPR();
            setTimeout(function() {
              $("div#cover1").hide();
              $("input[type=radio]").attr('disabled', false);
            },2000);
          })
        }

        },999);

      }

      });

      // Trampoline - using trampoline prevents stack overflow issues- invloves Thunks!
      function trampoline(fn) {
        var op = fn;
        while (op != null && typeof op === 'function') {
          op = op();
        }
      }

      function buildData(n, genus) {
        // Asian Longhorned beetles - //Build multiple - 1
        function buildDatainternal(offset, genus) {
          console.log('inside build data internal', offset, genus);
          jQuery.ajax({
            url: "https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6/query?where=UPPER(GENUS)%20like%20%27" + genus + "%27&outFields=*&outSR=4326&f=json&resultOffset="+offset,
            success: function(result) {
                if(result["features"] && result["features"].length > 0) {
                  console.log('of', offset, result["features"].length);
                  globaldataObj = globaldataObj.concat(result["features"]);
                  if(result["features"].length == 1000) {
                    console.log('next', offset, parseInt(offset)+1000);
                    trampoline(buildDatainternal.bind(this, parseInt(offset)+1000, genus));
                  } else {
                    console.log('total', globaldataObj.length);
                    dataMapper();
                    // Hide Loading Screen
                    setTimeout(function() {
                      document.getElementById("cover").style.display = "none";
                    });
                    return null;
                  }
                } else {
                  console.log('total', globaldataObj.length);
                  dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
                  return null;
                }
            },
            error: function(err) {
              console.log("There is an error: ", err);
              dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
              return null;
            },
            async: false
          }); // end of ajax call
          
        }

        return buildDatainternal.bind(this, n, genus);
      }

      function thunkedBuildDataALB(n) {
        // Asian Longhorned beetles - //Build multiple - 1
        function buildDataALB(offset) {
      
          jQuery.ajax({
            url: "https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6/query?where=UPPER(GENUS)%20like%20%27FRAXINUS%27%20OR%20UPPER(GENUS)%20like%20%27ACER%27%20OR%20UPPER(GENUS)%20like%20%27BETULA%27%20OR%20UPPER(GENUS)%20like%20%27PLATANUS%27%20OR%20UPPER(GENUS)%20like%20%27ULMUS%27%20OR%20UPPER(GENUS)%20like%20%27SORBUS%27%20OR%20UPPER(GENUS)%20like%20%27CERCIDPHYLLUM%27%20OR%20UPPER(GENUS)%20like%20%27AESCULUS%27%20OR%20UPPER(GENUS)%20like%20%27KOELREUTERIA%27%20OR%20UPPER(GENUS)%20like%20%27POPLUS%27%20OR%20UPPER(GENUS)%20like%20%27SALIX%27%20OR%20UPPER(GENUS)%20like%20%27ALBIZIA%27&outFields=*&outSR=4326&f=json&resultOffset="+offset,
            success: function(result) {
                if(result["features"] && result["features"].length > 0) {
                  console.log('of', offset, result["features"].length);
                  globaldataObj = globaldataObj.concat(result["features"]);
                  if(result["features"].length == 1000) {
                    console.log('next', offset, parseInt(offset)+1000);
                    trampoline(buildDataALB.bind(this, parseInt(offset)+1000));
                  } else {
                    console.log('total', globaldataObj.length);
                    dataMapper();
                    // Hide Loading Screen
                    setTimeout(function() {
                      document.getElementById("cover").style.display = "none";
                    });
                    return null;
                  }
                } else {
                  console.log('total', globaldataObj.length);
                  dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
                  return null;
                }
            },
            error: function(err) {
              console.log("There is an error: ", err);
              dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
              return null;
            },
            async: false
          }); // end of ajax call
          
        }

        return buildDataALB.bind(this, n);
      }

      function thunkedBuildDataSWW(n) {
        // Sirex wood wasp - //Build multiple - 1
        function buildDataSWW(offset) {
      
          jQuery.ajax({
            url: "https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6/query?where=UPPER(GENUS)%20like%20%27PINUS%27%20OR%20UPPER(GENUS)%20like%20%27PICEA%27%20OR%20UPPER(GENUS)%20like%20%27ABIES%27&outFields=*&outSR=4326&f=json&resultOffset="+offset,
            success: function(result) {
                if(result["features"] && result["features"].length > 0) {
                  console.log('of', offset, result["features"].length);
                  globaldataObj = globaldataObj.concat(result["features"]);
                  if(result["features"].length == 1000) {
                    console.log('next', offset, parseInt(offset)+1000);
                    trampoline(buildDataSWW.bind(this, parseInt(offset)+1000));
                  } else {
                    console.log('total', globaldataObj.length);
                    dataMapper();
                    // Hide Loading Screen
                    setTimeout(function() {
                      document.getElementById("cover").style.display = "none";
                    });
                    return null;
                  }
                } else {
                  console.log('total', globaldataObj.length);
                  dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
                  return null;
                }
            },
            error: function(err) {
              console.log("There is an error: ", err);
              dataMapper();
                  // Hide Loading Screen
                  setTimeout(function() {
                    document.getElementById("cover").style.display = "none";
                  });
              return null;
            },
            async: false
          }); // end of ajax call
          
        }

        return buildDataSWW.bind(this, n);
      }

      function dataMapper() {

      var len = globaldataObj.length;
      $("#sbheadfont").text(len);
      mymap.removeLayer(markerGroup);
      markerGroup = L.layerGroup().addTo(mymap);
      console.log('dat', globaldataObj);
      globaldataObj.forEach(function(data) {
      var sc = data["attributes"]["SCIENTIFIC_NAME"];
      scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
      
      // Markers

        if(data["geometry"]) {
          var lat = data["geometry"]["y"],
          long = data["geometry"]["x"];
            // Initialize map circle markers
            var circle = L.circle([lat, long], {
              color: "yellow",
              weight: 1,
              opacity: 0.5,
              fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
              fillOpacity: 1.0,
              radius: 160
            }).addTo(markerGroup);     
          
          var aH = data["attributes"];
          // Add popup to markers
          circle.bindPopup("OBJECTID: " + aH["OBJECTID"] + "<br> COMPKEY: " + aH["COMPKEY"] + "<br> UNITID: " + aH["UNITID"] + "<br> UNITDESC: " + aH["UNITDESC"] + "<br> CONDITION: " + aH["CONDITION"] + "<br> CONDITION_ASSESSMENT_DATE: " + aH["CONDITION_ASSESSMENT_DATE"] + "<br>CURRENT_STATUS: " + aH["CURRENT_STATUS"] + "<br> PRIMARYDISTRICTCD: " + aH["PRIMARYDISTRICTCD"] + "<br> SECONDARYDISTRICTCD: " + aH["SECONDARYDISTRICTCD"] + "<br> OVERRIDEYN: " + aH["OVERRIDEYN"] + "<br> COMPTYPE: " + aH["COMPTYPE"] + "<br> SEGKEY: " + aH["SEGKEY"] + "<br> UNITTYPE: " + aH["UNITTYPE"] + "<br> OWNERSHIP: " + aH["OWNERSHIP"] + "<br> CURRENT_STATUS_DATE: " + aH["CURRENT_STATUS_DATE"] + "<br> LAST_VERIFY_DATE: " + aH["LAST_VERIFY_DATE"] + "<br> PLANTED_DATE: " + aH["PLANTED_DATE"] + "<br> BOTANICAL_NAME: " + aH["BOTANICAL_NAME"] + "<br> SCIENTIFIC_NAME: " + aH["SCIENTIFIC_NAME"] + "<br> HERITAGE: " + aH["HERITAGE"] + "<br> EXCEPTIONAL: " + aH["EXCEPTIONAL"] + "<br> CODEREQ: " + aH["CODEREQ"] + "<br> GSI" + aH["GSI"] + "<br> GREEN_FACTOR: " + aH["GREEN_FACTOR"] + "<br> WIRES: " + aH["WIRES"] + "<br> CABLED: " + aH["CABLED"] + "<br> CLEARANCE_PROBLEM: " + aH["CLEARANCE_PROBLEM"] + "<br> SPACETYPE: " + aH["SPACETYPE"] + "<br> SITETYPE: " + aH["SITETYPE"] + "<br> GROWSPACE: " + aH["GROWSPACE"] + "<br> DIAM: " + aH["DIAM"] + "<br> CONDITION_RATING: " + aH["CONDITION_RATING"] + "<br> FUNDING_SOURCE: " + aH["FUNDING_SOURCE"] + "<br> WATER_THROUGH_YR1" + aH["WATER_THROUGH_YR1"] + "<br> WATER_THROUGH_YR2: " + aH["WATER_THROUGH_YR2"] + "<br> WATER_THROUGH_YR3: " + aH["WATER_THROUGH_YR3"] + "<br> OWNERDIAM: " + aH["OWNERDIAM"] + "<br> EXPDATE: " + aH["EXPDATE"] + "<br> COMMON_NAME: " + aH["COMMON_NAME"] + "<br> TREEHEIGHT: " + aH["TREEHEIGHT"] + "<br> ASBUILTPLANNO: " + aH["ASBUILTPLANNO"] + "<br> LANDSCAPEAREAASSOC: " + aH["LANDSCAPEAREAASSOC"] + "<br> COMMENTS: " + aH["COMMENTS"] + "<br> OVERRIDECOMMENT: " + aH["OVERRIDECOMMENT"] + "<br> SHAPE_LNG: " + aH["SHAPE_LNG"] + "<br> SHAPE_LAT: " + aH["SHAPE_LAT"] + "<br> IRRIGATESYSYN: " + aH["IRRIGATESYSYN"] + "<br> ASSETGROUPID: " + aH["ASSETGROUPID"] + "<br> ASSETGROUPDESC: " + aH["ASSETGROUPDESC"] + "<br> MODDATE: " + aH["MODDATE"] + "<br>MODBY: " + aH["MODBY"] + "<br> TOTAL_RANK: " + aH["TOTAL_RANK"] + "<br> TOTAL_COUNT: " + aH["TOTAL_COUNT"] + "<br> GENUS: " + aH["GENUS"] + "<br> UFMAINTMGMTUNIT: " + aH["UFMAINTMGMTUNIT"]);
  
        } else {
          console.log('dd', data);
        }
        
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
        if(chart) {
          chart.destroy();
        }
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
          animationEnabled: true, // set to true	
          colorSet: "customColorset",	
          axisX:{
            labelMaxWidth: 80, //
            labelFontSize: 14,
			      labelWrap: true,   // so that the x-axis labels stay straight
            interval: 1, //
            //labelAutoFit: true 
          },
          data: [
            {
              // Column for column type graphs
              type: "column",
              click: function(e){ 
                console.log(e);
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

      } // end of data mapper

        // Loadin SPU SPR
        function loadSPU(callback) {
        // Load SPU
        Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1xogwFe4s6NNhrvL8lar_41amhbnGR_dgGw_mbRMvM7U/pubhtml',
        callback: function(data, tabletop) { 
          console.log('spu', data);
          spuDataObj = data;
          spuLoaded = true;
          if(callback) {
            callback();
          }
        },
        simpleSheet: true } );

      }

        //loadSPU();

        function loadSPR(callback) {
          // Load SPR
          Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1IsQh8FWVOAf_p1mmYV83dxh0ghdBAHLB_lynnxb6Aa0/pubhtml',
          callback: function(data, tabletop) { 
            console.log('spr', data);
            sprDataObj = data;
            sprLoaded = true;
            if(callback) {
              callback();
            }
          },
          simpleSheet: true } );
        }

       // loadSPR();

        // SPU data mapper
        function dataMapperSPU() {

          var len = globaldataObj.length;
          $("#sbheadfont").text(len);
          mymap.removeLayer(markerGroup);
          markerGroup = L.layerGroup().addTo(mymap);

          globaldataObj.forEach(function(data) {
          var sc = data["UT_SPECIES"];
          scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
          
          // Markers
      
            var lat = data["Lat"],
            long = data["Long"];

            // Initialize map circle markers
              var circle = L.circle([lat, long], {
                color: "yellow",
                weight: 1,
                opacity: 0.5,
                fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
                fillOpacity: 1.0,
                radius: 160
              }).addTo(markerGroup);     
            
            var aH = data;
            // Add popup to markers
            circle.bindPopup("FID: " + data["FID"] + "<br> OBJECTID: " + data["OBJECTID"] + "<br> UT_TREE_FE: " + data["UT_TREE_FE"] + "<br> UT_CMN_NAM: " + data["UT_CMN_NAM"] + "<br> UT_COMMON_: " + data["UT_COMMON_"] + "<br> UT_SPCS_NA: " + data["UT_SPCS_NA"] + "<br> UT_SPECIES: " + data["UT_SPECIES"] + "<br> UT_SITE_KE: " + data["UT_SITE_KE"] + "<br> UT_TREE_ID: " + data["UT_TREE_ID"] + "<br> UT_TREESIT: " + data["UT_TREESIT"] + "<br> UT_LAND_US: " + data["UT_LAND_US"] + "<br> UT_LONG_CO: " + data["UT_LONG_CO"] + "<br> UT_LAT_COO: " + data["UT_LAT_COO"] + "<br> UT_OWNER_N: " + data["UT_OWNER_N"] + "<br> UT_PLANTED: " + data["UT_PLANTED"] + "<br> UT_FUNDER_: " + data["UT_FUNDER_"] + "<br> UT_NOTES_T: " + data["UT_NOTES_T"] + "<br> UT_EDITOR_: " + data["UT_EDITOR_"] + "<br> UT_EDIT_DA: " + data["UT_EDIT_DA"] + "<br> GENUS: " + data["GENUS"] + "<br> Lat: " + data["Lat"] + "<br> Long: " + data["Long"]);
     
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
            if(chart) {
              chart.destroy();
            }
            var chart = new CanvasJS.Chart("chartContainer", {
              theme: "light1", // "light2", "dark1", "dark2"
              animationEnabled: true, // set to true	
              colorSet: "customColorset",	
              axisX:{
                labelMaxWidth: 80, //
                labelFontSize: 14,
                labelWrap: true,   // so that the x-axis labels stay straight
                interval: 1, //
                //labelAutoFit: true 
              },
              data: [
                {
                  // Column for column type graphs
                  type: "column",
                  click: function(e){ 
                    mapPlotSPU(e["dataPoint"]["label"]);
                  },
                  mousemove: function(e) {
                    document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
                  },
                  dataPoints: dataPointsArr
                }
              ]
            });
            chart.render();
    
          } // end of data mapper SPU


        // SPR data mapper
        function dataMapperSPR() {

          var len = globaldataObj.length;
          $("#sbheadfont").text(len);
          mymap.removeLayer(markerGroup);
          markerGroup = L.layerGroup().addTo(mymap);

          globaldataObj.forEach(function(data) {
          var sc = data["SPECIES"];
          scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
          
          // Markers
      
            var lat = data["Lat"],
            long = data["Long"];

            // Initialize map circle markers
              var circle = L.circle([lat, long], {
                color: "yellow",
                weight: 1,
                opacity: 0.5,
                fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
                fillOpacity: 1.0,
                radius: 160
              }).addTo(markerGroup);     
            
            var aH = data;
            // Add popup to markers
            circle.bindPopup("OBJECTID: " + data["OBJECTID"] + "<br> PARK: " + data["PARK"] + "<br> SPECIES: " + data["SPECIES"] + "<br> COMMON: " + data["COMMON"] + "<br> DBH_WL: " + data["DBH_WL:"] + "<br> HEIGHT_WL: " + data["HEIGHT_WL"] + "<br> GENUS: " + data["GENUS"] + "<br> Lat: " + data["Lat"] + "<br> Long: " + data["Long"]);
     
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
            if(chart) {
              chart.destroy();
            }
            var chart = new CanvasJS.Chart("chartContainer", {
              theme: "light1", // "light2", "dark1", "dark2"
              animationEnabled: true, // set to true	
              colorSet: "customColorset",	
              axisX:{
                labelMaxWidth: 80, //
                labelFontSize: 14,
                labelWrap: true,   // so that the x-axis labels stay straight
                interval: 1, //
                //labelAutoFit: true 
              },
              data: [
                {
                  // Column for column type graphs
                  type: "column",
                  click: function(e){ 
                    mapPlotSPR(e["dataPoint"]["label"]);
                  },
                  mousemove: function(e) {
                    document.getElementsByClassName("canvasjs-chart-canvas")[1].style.cursor = "pointer"; // change cursor to pointer on mousemove
                  },
                  dataPoints: dataPointsArr
                }
              ]
            });
            chart.render();
    
          } // end of data mapper SPR


        trampoline(buildData.bind(this, 0, 'FRAXINUS')); // Emerald Ash Borer

    }

      window.addEventListener('DOMContentLoaded', ttinitsocrata);
