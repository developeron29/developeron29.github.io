var mymap = '', //globalmap variable
    globalColorSetExtend = [
      "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" , "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0", "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" , "#9348af" ,"#01ac53" ,"#c5a4fb", "#996635","#b11573" ,"#4bb473" ,"#75d89e" , "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" , "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d","#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977","#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b","#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf","#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234","#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
      "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647","#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647","#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7","#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8","#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16","#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce","#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
      "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba","#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043","#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56","#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f","#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
      "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9","#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4","#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06","#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a","#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065","#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35","#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44","#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67","#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff","#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"],
    markerGroup = '',
    heatGroup = '',
    selected = false,
    globaldataObj = [],
    globalUserObj = {},
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

    }

    function showAllMarkers() {
        mapPlot(1); //show all

    }

    // Evaluate color of cluster
    function getClusterColor(cluster) {
      var tempClusterColor = {};
      cluster.forEach(function(clus) {
        tempClusterColor[clus["options"]["fillColor"]] = tempClusterColor[clus["options"]["fillColor"]] ? tempClusterColor[clus["options"]["fillColor"]] + 1 : 1;
      });
      var sortedObj = {};
      if(tempClusterColor && Object.keys(tempClusterColor).length > 0) {
        sortedObj = Object.keys(tempClusterColor).sort(function(a,b) {
          return tempClusterColor[b] - tempClusterColor[a]; 
        }).reduce(function(prev, curr, i){
          prev[i] = tempClusterColor[curr];
          return prev;
        });
      }
      
      return sortedObj ? sortedObj : 'black';
    }

    // plot markers to map
    function mapPlot(label) {
      document.getElementById('heatmap-toggle').checked = false;
      if(label == 1) { // show all
        filteredList = globaldataObj;
       // $("#sbheadfont1").text(Object.keys(scientNameObj).length);
        filteredListFlag = false;
      } else {
        filteredList = globaldataObj.filter(function(obj) {
          return obj["speciesNameCommon"].toUpperCase().trim().localeCompare(label.toUpperCase().trim()) == 0;
        });
      //  $("#sbheadfont1").text(1);
        filteredListFlag = true;
      }

      //reinstantiate marker group
      mymap.removeLayer(markerGroup);
      mymap.removeLayer(heatGroup);
      // markerGroup = L.markerClusterGroup({
      //   //disableClusteringAtZoom: 13,
      //   spiderfyOnMaxZoom: false,
      //   singleMarkerMode: true,
      //   iconCreateFunction: function(cluster) {
      //     var getColor = getClusterColor(cluster.getAllChildMarkers());
      //     return L.divIcon({ html: '<span style="padding:7px;border-radius:20px;background-color:' + "yellow" + ';color:white;"><b>' + cluster.getChildCount() + '</b></span>' });
      //   }
      // }).addTo(mymap);
      markerGroup = L.layerGroup().addTo(mymap);
      var len = filteredList.length;
      $("#sbheadfont").text(len);
      var tempConifers = 0, tempDeciduous = 0;

      filteredList.forEach(function(data) {
        var sc = data["speciesNameCommon"];
        scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
        data["treeType"] == "conifer" ? tempConifers++ : tempDeciduous++;

        // Markers
        if(data["coords"]) {

          var lat = data["coords"]["Pc"],
          long = data["coords"]["Vc"];
          //   // Initialize map circle markers
          //   var circle = L.circle([lat, long], {
          //     color: "yellow",
          //     weight: 1,
          //     opacity: 0.3,
          //     fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
          //     fillOpacity: 0.7,
          //     radius: 70
          //   }).addTo(markerGroup);     

          var confierIcon = L.icon({
            iconUrl: data["treeType"] == "conifer" ? 'icons/conifer.png' : 'icons/deciduous.png',
            iconSize: [35, 45], // size of the icon
          }); 

          var circle = L.marker([lat, long], {icon: confierIcon}).addTo(markerGroup);
          
          var aH = data;
          // , d = new Date();
          // d.setTime(aH["created_at"]["seconds"]*1000);
          // var utcDate = new Date(d.toUTCString());
          // utcDate.setHours(utcDate.getHours()-8);
          // var usDate = new Date(utcDate);
          // Add popup to markers
          circle.bindPopup("<div style=''>Species Name (Common): " + aH["speciesNameCommon"] + "<br>Species Name (Scientific): " + aH["speciesNameScientific"] + "<br>Tree Type: " + aH["treeType"] + "<br>Created At (PST): " + "" + "<br>Username: " + aH["username"] + "<br>Is Validated: " + aH["isValidated"] + "<br>Land Use Category: " + aH["landUseCategory"] + "<br>Location Type: " + aH["locationType"] + "<br>Notes: " + aH["notes"] + "<br><img src='" + aH["photo"]["url"] + "' height='200' style='max-width:100%;'/>" + "</div>");

         } // end of if check
         else {
           console.log('no geom', data);
         }
  
        });
        $("#sbheadfont1").text(tempConifers);
        $("#sbheadfont2").text(tempDeciduous);
    }

        
    // Handle Socrata data
    function ttinitsocrata() {
      CanvasJS.addColorSet("customColorset", globalColorSetExtend);

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

      var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
      });
    
      mymap = L.map('mapid', {
        center: [47.6205063,-122.3514661], // Seattle
        zoom: 11,
        layers: [CartoDB_Voyager, Esri_WorldImagery, CartoDB_DarkMatter, watercolor]
      });

      var baseMaps = {
        "Normal": CartoDB_Voyager,
        "Aerial": Esri_WorldImagery,
        "Dark": CartoDB_DarkMatter,
        "Watercolor": watercolor
      };

      L.control.layers(baseMaps).addTo(mymap);

      // markerGroup = L.markerClusterGroup({
      // //  disableClusteringAtZoom: 13,
      //   spiderfyOnMaxZoom: false,
      //   singleMarkerMode: true
      // }).addTo(mymap);
      markerGroup = L.layerGroup().addTo(mymap);
      heatGroup = L.layerGroup().addTo(mymap);

    var customLayer = L.geoJSON(null, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>'+feature.properties["UCWS_ALT_NAME"] + '</h3>');
      }
    });

    var runLayer = omnivore.kml('u1.kml', null, customLayer)
    .on('ready', function() {
        mymap.fitBounds(runLayer.getBounds());
    })
    .addTo(mymap);

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
          if(this.checked) {
          var tempdata = [];
          if (filteredListFlag) {
            tempdata = filteredList;
          } else {
            tempdata = globaldataObj;
          }
          var tempHeatData = [];
          tempdata.forEach(function(data) {
            
             if(data["coords"]) {
              tempHeatData.push([data["coords"]["Pc"],data["coords"]["Vc"],125]);
             } else {
               console.log('no geom');
             }
            
          });

          mymap.removeLayer(markerGroup);
          mymap.removeLayer(heatGroup);
          heatGroup = L.layerGroup().addTo(mymap);
          var heat = L.heatLayer(tempHeatData, {radius: 25}).addTo(heatGroup);
        } else {
          if (filteredListFlag) { 
              var fs = filteredList[0]["speciesNameCommon"];
              mapPlot(fs);
          }
          else {
              mapPlot(1); //show all
          }
        }
        
      }

      document.getElementById ("heatmap-toggle").addEventListener ("click", handleCommand, false);

      // Trampoline - using trampoline prevents stack overflow issues- invloves Thunks!
      function trampoline(fn) {
        var op = fn;
        while (op != null && typeof op === 'function') {
          op = op();
        }
      }

      function buildData(n, genus) {
        function buildDatainternal(offset, genus) {

          var tempDataArr = [];
               
          // Initialize Firebase
            // Web app's Firebase configuration - iSeaTree-prod
            var firebaseConfig = {
              apiKey: "AIzaSyB-txtWPzPYmBylItEc9vcZRMh5oKWB-qc",
              authDomain: "iseatree-dev.firebaseapp.com",
              databaseURL: "https://iseatree-dev.firebaseio.com",
              projectId: "iseatree-dev",
              storageBucket: "iseatree-dev.appspot.com",
              messagingSenderId: "135495017909",
              appId: "1:135495017909:web:7ce3c041e73788b51ba5fc"
            };

          firebase.initializeApp(firebaseConfig);
          firebase.auth().onAuthStateChanged(function(user) {
            // Auth user for secure DB access
            if(user) {
              
                const db = firebase.firestore();
                db.collection("trees")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            doc.data()["isValidated"] ? tempDataArr.push(doc.data()) : "";
                        });
                        globaldataObj = tempDataArr;
                        dataMapper();
                        // Hide Loading Screen
                        setTimeout(function() {
                          document.getElementById("cover").style.display = "none";
                        });
                      // search users
                      // db.collection("users")
                      // .get()
                      // .then(function(querySnapshot) {
                      //   querySnapshot.forEach(function(doc) {
                      //     globalUserObj[doc.id] = doc.data();;
                      //   });

                      // }).catch(function(err) {
                      //   console.log("Error getting documents: ", error);
                      // });
                    return null;
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    dataMapper();
                    // Hide Loading Screen
                    setTimeout(function() {
                      document.getElementById("cover").style.display = "none";
                    });
                    return null;
                });

            }
           
         });

         // Auth - Hardcoding for now
         var email = "test@email.com";
         var password = "test123";
         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error', error);
        });
          
        }

        return buildDatainternal.bind(this, n, genus);
      }

      function dataMapper() {

      var len = globaldataObj.length;
      $("#sbheadfont").text(len);
      mymap.removeLayer(markerGroup);

      // markerGroup = L.markerClusterGroup({
      //   // disableClusteringAtZoom: 20,
      //   singleMarkerMode: true,
      //   spiderfyOnMaxZoom: false,
      //   singleMarkerMode: true
      //   // ,
      //   // iconCreateFunction: function(cluster) {
      //   //   var getColor = getClusterColor(cluster.getAllChildMarkers());
      //   //   return L.divIcon({ html: '<span style="padding:7px;border-radius:20px;background-color:' + "yellow" + ';color:green;"><b>' + cluster.getChildCount() + '</b></span>' });
      //   // }
      // }).addTo(mymap);

      markerGroup = L.layerGroup().addTo(mymap);
      var tempConifers = 0, tempDeciduous = 0;
      globaldataObj.forEach(function(data) {
      var sc = data["speciesNameCommon"];
      scientNameObj[sc] = scientNameObj[sc] ? scientNameObj[sc] + 1 : 1;
      data["treeType"] == "conifer" ? tempConifers++ : tempDeciduous++;
      // Markers

        if(data["coords"]) {
          var lat = data["coords"]["Pc"],
          long = data["coords"]["Vc"];
            // Initialize map circle markers
            // var circle = L.circle([lat, long], {
            //   color: "yellow",
            //   weight: 1,
            //   opacity: 0.3,
            //   fillColor: globalColorSetExtend[Object.keys(scientNameObj).indexOf(sc)],
            //   fillOpacity: 0.7,
            //   radius: 70
            // }).addTo(markerGroup);  

            var confierIcon = L.icon({
              iconUrl: data["treeType"] == "conifer" ? 'icons/conifer.png' : 'icons/deciduous.png',
              iconSize: [35, 45], // size of the iconm
          }); 

          var circle = L.marker([lat, long], {icon: confierIcon}).addTo(markerGroup);
          
          var aH = data;
          // , d = new Date();
          // d.setTime(aH["created_at"]["seconds"]*1000);
          // var utcDate = new Date(d.toUTCString());
          // utcDate.setHours(utcDate.getHours()-8);
          // var usDate = new Date(utcDate);
          // Add popup to markers
          circle.bindPopup("<div style=''>Species Name (Common): " + aH["speciesNameCommon"] + "<br>Species Name (Scientific): " + aH["speciesNameScientific"] + "<br>Tree Type: " + aH["treeType"] + "<br>Created At (PST): " + "" + "<br>Username: " + aH["username"] + "<br>Is Validated: " + aH["isValidated"] + "<br>Land Use Category: " + aH["landUseCategory"] + "<br>Location Type: " + aH["locationType"] + "<br>Notes: " + aH["notes"] + "<br><img src='" + aH["photo"]["url"] + "' height='200' style='max-width:100%;'/>" + "</div>");
  

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
        $("#sbheadfont1").text(tempConifers);
        $("#sbheadfont2").text(tempDeciduous);
        // Render Chart
        if(chart) {
          chart.destroy();
        }
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
          animationEnabled: true, // set to true	
          colorSet:  "customColorset",	
          axisX:{
            labelMaxWidth: 60, //
            labelFontSize: 12,
			      labelWrap: true,   // so that the x-axis labels stay straight
            labelAutoFit: true 
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
        setTimeout(function() {
          chart.render();
        }, 1000);

      } // end of data mapper
           globaldataObj = [];
          scientNameObj = [];
          setTimeout(function() {
            trampoline(buildData.bind(this, 0, 'FRAXINUS')); // Emerald Ash Borer
          },500);

    }

      window.addEventListener('DOMContentLoaded', ttinitsocrata);
