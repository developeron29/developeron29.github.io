/* Map */
var map = L.map('mapid').setView([47.649019, -122.347977], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Add markers to a layer
var cdwac_layerGroup = L.layerGroup().addTo(map);
var swac_layerGroup = L.layerGroup().addTo(map);
var wsac_layerGroup = L.layerGroup().addTo(map);
var alum_layerGroup = L.layerGroup().addTo(map);

var greenIcon = new L.Icon({
    iconUrl: 'https://marker.nanoka.fr/map_pin-64C81E-FFF-64C81E-%E2%97%89-40.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    });

    // Map marker color selector
function getIcon(category) {
    var val = category;
    var color = '00FFFF';
    switch(val) {
        case "To School": 
            color = '0000FF'
            break;
        case "To Work": 
            color = '7FFF00'
            break;
        case "To Volunteer": 
            color = 'DC143C'
            break;
        case "To gather in Faith/Spiritual Communities": 
            color = 'FF8C00'
            break;
        case "To buy groceries, to eat/drink, to shop": 
            color = 'FF1493'
            break;
        case "For building community": 
            color = 'FF00FF'
            break;
        case "For healthcare": 
            color = 'FFD700'
            break;
        case "For Arts": 
            color = 'ADFF2F'
            break;
        case "For Recreation": 
            color = 'F08080'
            break;
        case "Electronic Communities": 
            color = '20B2AA'
            break;
        case "Other": 
            color = '40E0D0'
            break;
        default: 
            color = '00FFFF';
            break;
    } 
    return new L.Icon({
    iconUrl: 'https://marker.nanoka.fr/map_pin-' + color + '-FFF-' + color + '-%E2%97%89-40.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    });
}

var optionsMatrix = {
    "CDWAC": {},
    "SWAC": {},
    "WSAC": {},
    "Alum": {}
};

/* Tabletop spreadsheet */
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1fMTeTnEivgAqMP0_XjHvpn-GxV8nsnEqMZAvwogUtjI/pubhtml';
console.log('publicin')
function init() {
    console.log('in');
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
//   alert('Successfully processed!')
  // Create options matrix
  console.log(data);
  for(let i = 0; i < data.length; i++) {
      if( data[i]["alum"].localeCompare("y") !== 0 ) {
        optionsMatrix[data[i]["committee"]][data[i]["category"]] = 1;    
      } else {
        if(optionsMatrix["Alum"][data[i]["committee"]] ) {
            optionsMatrix["Alum"][data[i]["committee"]][data[i]["category"]] = 1;
            
        } else {
            optionsMatrix["Alum"][data[i]["committee"]] = {};
            optionsMatrix["Alum"][data[i]["committee"]][data[i]["category"]] = 1;
        }
      }
  }
  // Generate list
  //CDWAC
  var cdwac_inset = Object.keys(optionsMatrix["CDWAC"]);
  for(let i = 0; i < cdwac_inset.length; i++) {
      $(".cdwac_list").append("<li class='cdwac_" + cdwac_inset[i].toLowerCase().replace(" ", "_") + "' id='cdwac_list_member' > <input type='checkbox' disabled> " + cdwac_inset[i] + "</li>")
  }
  //SWAC
  var swac_inset = Object.keys(optionsMatrix["SWAC"]);
  for(let i = 0; i < swac_inset.length; i++) {
      $(".swac_list").append("<li class='swac_" + swac_inset[i].toLowerCase().replace(" ", "_") + "' id='swac_list_member' > <input type='checkbox' disabled> " + swac_inset[i] + "</li>")
  }
  // WSAC
  var wsac_inset = Object.keys(optionsMatrix["WSAC"]);
  for(let i = 0; i < wsac_inset.length; i++) {
      $(".wsac_list").append("<li class='wsac_" + wsac_inset[i].toLowerCase().replace(" ", "_") + "' id='wsac_list_member' > <input type='checkbox' disabled> " + wsac_inset[i] + "</li>")
  }

  // CDWAC markers - check
  $("#cdwac_check_type").change(function() {
        if(this.checked) {
            var sourceObj = {};
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("CDWAC") == 0) {
                    // Marker
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])}).addTo(cdwac_layerGroup);
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    // Check source
                    sourceObj[data[t]["source"]] = 1;
                }
            }
            $("#sourcePara").text(Object.keys(sourceObj).length);

        } else {
            cdwac_layerGroup.clearLayers();
            $("#sourcePara").text(0);
        }
    });

    // SWAC markers - check
  $("#swac_check_type").change(function() {
        if(this.checked) {
            var sourceObj = {};
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("SWAC") == 0) {
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])}).addTo(swac_layerGroup);
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    // Check source
                    sourceObj[data[t]["source"]] = 1;
                }
            }
            $("#sourcePara").text(Object.keys(sourceObj).length);
        } else {
            swac_layerGroup.clearLayers();
            $("#sourcePara").text(0);
        }
    });


    // WSAC markers - check
  $("#wsac_check_type").change(function() {
        if(this.checked) {
            var sourceObj = {};
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("WSAC") == 0) {
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])}).addTo(wsac_layerGroup);
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    // Check source
                    sourceObj[data[t]["source"]] = 1;             }
            }
            $("#sourcePara").text(Object.keys(sourceObj).length);
        } else {
            wsac_layerGroup.clearLayers();
            $("#sourcePara").text(0);
        }
    });

    // Alum markers - check
  $("#alum_check_type").change(function() {
    if(this.checked) {
        var sourceObj = {};
        for(let t = 0; t < data.length; t++) {
            if(data[t]["alum"].localeCompare("y") == 0) {
                var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])}).addTo(alum_layerGroup);
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                // Check source
                sourceObj[data[t]["source"]] = 1;
            }
        }
        $("#sourcePara").text(Object.keys(sourceObj).length);
    } else {
        alum_layerGroup.clearLayers();
        $("#sourcePara").text(0);
    }
});
}

window.addEventListener('DOMContentLoaded', init);



/* Pie Chart (Neighour) */
var options = {
    chart: {
        type: 'pie',
    },
    series: [44, 55],
    labels: ["Downtown", "Capitol Hill"],
            legend: {
                show: false
            },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            }
        }
    }]
}
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();