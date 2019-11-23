/* Global Variables */
  var markers = [];
  var sourceNumber = 0;
  var neighourhoodObj = {};
  var globalSourceObj = {};

/* Map */
var map = L.map('mapid').setView([47.649019, -122.347977], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/* Heat map controls */
var heat = '';

// Listen to heatmap toggle
$("#heatmap-toggle").change(function(){
    if(this.checked) {
        map.removeLayer(cdwac_layerGroup);
        map.removeLayer(swac_layerGroup);
        map.removeLayer(wsac_layerGroup);
        map.removeLayer(alum_layerGroup);
        var coords_cdwac = Object.values(cdwac_layerGroup["_layers"]).map(function(layer) {
            return [layer["_latlng"]["lat"], layer["_latlng"]["lng"], 50];
        });
        var coords_swac = Object.values(swac_layerGroup["_layers"]).map(function(layer) {
            return [layer["_latlng"]["lat"], layer["_latlng"]["lng"], 50];
        });
        var coords_wsac = Object.values(wsac_layerGroup["_layers"]).map(function(layer) {
            return [layer["_latlng"]["lat"], layer["_latlng"]["lng"], 50];
        });
        var coords_alum = Object.values(alum_layerGroup["_layers"]).map(function(layer) {
            return [layer["_latlng"]["lat"], layer["_latlng"]["lng"], 50];
        });

        heat = L.heatLayer(coords_cdwac.concat(coords_swac, coords_wsac, coords_alum)).addTo(map);
    } else {
        resetHeatmap();
    }
});

function resetHeatmap() {
    $("#heatmap-toggle").prop("checked", false);
    map.removeLayer(heat);
    map.addLayer(cdwac_layerGroup);
    map.addLayer(swac_layerGroup);
    map.addLayer(wsac_layerGroup);
    map.addLayer(alum_layerGroup);
}

// Resize map
$(window).on("resize", function () { $("#mapid").height($(window).height() - 200); map.invalidateSize(); }).trigger("resize");
$(window).on("resize", function () { $("#chart").width($("#chart").parent().width() + 50);}).trigger("resize");

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
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
// add index to data
  data.map(function(d,index) {
      d.index = index;
      return d;
  });
  // Create options matrix
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
      $(".cdwac_list").append("<li class='cdwac_" + cdwac_inset[i].toLowerCase().replace(" ", "_") + "' id='cdwac_list_member' > <input type='checkbox' id='cdwac_list_member_checkbox' disabled> " + cdwac_inset[i] + "</li>")
  }
  $(".cdwac_list").hide();

  //SWAC
  var swac_inset = Object.keys(optionsMatrix["SWAC"]);
  for(let i = 0; i < swac_inset.length; i++) {
      $(".swac_list").append("<li class='swac_" + swac_inset[i].toLowerCase().replace(" ", "_") + "' id='swac_list_member' > <input type='checkbox' id='swac_list_member_checkbox' disabled> " + swac_inset[i] + "</li>")
  }
  $(".swac_list").hide();

  // WSAC
  var wsac_inset = Object.keys(optionsMatrix["WSAC"]);
  for(let i = 0; i < wsac_inset.length; i++) {
      $(".wsac_list").append("<li class='wsac_" + wsac_inset[i].toLowerCase().replace(" ", "_") + "' id='wsac_list_member' > <input type='checkbox' id='wsac_list_member_checkbox' disabled> " + wsac_inset[i] + "</li>")
  }
  $(".wsac_list").hide();

    // ALUM
  var alum_inset = Object.keys(optionsMatrix["Alum"]);
  for(let i = 0; i < alum_inset.length; i++) {
    if(alum_inset[i].localeCompare("CDWAC") == 0) {
        $(".alum_list").append("<li class='alum_cdwac'> CDWAC <br><ul class='alum_cdwac_list' id='alum_cdwac_list'> </ul></li>");
        var alum_inset_cat = Object.keys(optionsMatrix["Alum"][alum_inset[i]]);
        for(let j = 0; j < alum_inset_cat.length; j++) {
            $("#alum_cdwac_list").append("<li id='alum_cdwac_option'> <input type='checkbox' id='alum_cdwac_option_checkbox'> " + alum_inset_cat[j] + "</li>");
        }
    } else if(alum_inset[i].localeCompare("SWAC") == 0) {
        $(".alum_list").append("<li class='alum_swac'> SWAC <br> <ul class='alum_swac_list' id='alum_swac_list'> </ul></li>");
        var alum_inset_cat = Object.keys(optionsMatrix["Alum"][alum_inset[i]]);
        for(let j = 0; j < alum_inset_cat.length; j++) {
            $("#alum_swac_list").append("<li id='alum_swac_option'> <input type='checkbox' id='alum_swac_option_checkbox'> " + alum_inset_cat[j] + "</li>");
        }
    } else if(alum_inset[i].localeCompare("WSAC") == 0) {
        $(".alum_list").append("<li class='alum_wsac'> WSAC <br> <ul class='alum_wsac_list' id='alum_wsac_list'> </ul></li>");
        var alum_inset_cat = Object.keys(optionsMatrix["Alum"][alum_inset[i]]);
        for(let j = 0; j < alum_inset_cat.length; j++) {
            $("#alum_wsac_list").append("<li id='alum_wsac_option'> <input type='checkbox' id='alum_wsac_option_checkbox'> " + alum_inset_cat[j] + "</li>");
        }
    }
  }
  $(".alum_list").hide();

  // un-disable category options - after inset options available
  $("#cdwac_check_type").prop("disabled", false);
  $("#swac_check_type").prop("disabled", false);
  $("#wsac_check_type").prop("disabled", false);
  $("#alum_check_type").prop("disabled", false);

  // CDWAC markers - check
  $("#cdwac_check_type").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        // var sourceObj = {};
        if(this.checked) {
            $(".cdwac_list").show();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("CDWAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // Marker
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])});
                    var _id = markers.length == 0 ? 0 : markers.length;
                    marker._id = _id;
                    data[t]["marker_id"] = _id;
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    marker.addTo(cdwac_layerGroup);
                    markers.push(marker);
                    // Check source
                    // sourceObj[data[t]["source"]] = 1;
                    if(globalSourceObj[data[t]["source"]] && globalSourceObj[data[t]["source"]] > 0) {
                        globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] + 1;
                    } else {
                        globalSourceObj[data[t]["source"]] = 1;
                    }
                   if(neighourhoodObj[data[t]["neighborhood"]] && neighourhoodObj[data[t]["neighborhood"]] > 0) {
                    neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] + 1;
                   } else {
                    neighourhoodObj[data[t]["neighborhood"]] = 1;
                   }
                }
            }
            // sourceNumber =  sourceNumber == 0 ? Object.keys(sourceObj).length : (Object.keys(sourceObj).length + sourceNumber)
            // $("#sourcePara").text(sourceNumber);
            $("#cdwac_list_member #cdwac_list_member_checkbox").prop("disabled",false);
            $("#cdwac_list_member #cdwac_list_member_checkbox").prop("checked", true);
        } else {
            cdwac_layerGroup.clearLayers();
            $(".cdwac_list").hide();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("CDWAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // sourceObj[data[t]["source"]] = 1;
                    globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] > 0 ? globalSourceObj[data[t]["source"]] - 1 : 0;
                    neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] > 0 ? neighourhoodObj[data[t]["neighborhood"]] - 1 : 0;
                }
            }
            // sourceNumber = sourceNumber - Object.keys(sourceObj).length;
            // $("#sourcePara").text(sourceNumber);
            $("#cdwac_list_member #cdwac_list_member_checkbox").prop("checked",false);
            $("#cdwac_list_member #cdwac_list_member_checkbox").prop("disabled",true);
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));

    });

    $("#cdwac_list_member #cdwac_list_member_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.committee.localeCompare("CDWAC") == 0 && item.category.localeCompare(member) == 0 && item["alum"].localeCompare("y") !== 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude,item.longitude,item.marker_id, item.index, item.neighborhood, item.source);
        });

        
        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(cdwac_layerGroup);
                markers.push(marker);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
            });

        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                cdwac_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));
    });

    // SWAC markers - check
  $("#swac_check_type").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var sourceObj = {};
        if(this.checked) {
            $(".swac_list").show();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("SWAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // Marker
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])});
                    var _id = markers.length == 0 ? 0 : markers.length;
                    marker._id = _id;
                    data[t]["marker_id"] = _id;
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    marker.addTo(swac_layerGroup);
                    markers.push(marker);
                    // Check source
                    // sourceObj[data[t]["source"]] = 1;
                    if(globalSourceObj[data[t]["source"]] && globalSourceObj[data[t]["source"]] > 0) {
                        globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] + 1;
                    } else {
                        globalSourceObj[data[t]["source"]] = 1;
                    }
                    if(neighourhoodObj[data[t]["neighborhood"]] && neighourhoodObj[data[t]["neighborhood"]] > 0) {
                        neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] + 1;
                    } else {
                        neighourhoodObj[data[t]["neighborhood"]] = 1;
                    }
                }
            }
            // sourceNumber =  sourceNumber == 0 ? Object.keys(sourceObj).length : (Object.keys(sourceObj).length + sourceNumber)
            // $("#sourcePara").text(sourceNumber);
            $("#swac_list_member #swac_list_member_checkbox").prop("disabled",false);
            $("#swac_list_member #swac_list_member_checkbox").prop("checked", true);
        } else {
            $(".swac_list").hide();
            swac_layerGroup.clearLayers();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("SWAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // sourceObj[data[t]["source"]] = 1;
                    globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] > 0 ? globalSourceObj[data[t]["source"]] - 1 : 0;
                    neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] > 0 ? neighourhoodObj[data[t]["neighborhood"]] - 1 : 0;
                }
            }
            // sourceNumber = sourceNumber - Object.keys(sourceObj).length;
            // $("#sourcePara").text(sourceNumber);
            $("#swac_list_member #swac_list_member_checkbox").prop("checked",false);
            $("#swac_list_member #swac_list_member_checkbox").prop("disabled",true);
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));

    });


    // SWAC inset options check
    $("#swac_list_member #swac_list_member_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.committee.localeCompare("SWAC") == 0 && item.category.localeCompare(member) == 0 && item["alum"].localeCompare("y") !== 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude,item.longitude,item.marker_id, item.index, item.neighborhood, item.source);
        });

        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(swac_layerGroup);
                markers.push(marker);
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
             });


        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                swac_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));
    });

    // WSAC markers - check
  $("#wsac_check_type").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var sourceObj = {};
        if(this.checked) {
            $(".wsac_list").show();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("WSAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // Marker
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])});
                    var _id = markers.length == 0 ? 0 : markers.length;
                    marker._id = _id;
                    data[t]["marker_id"] = _id;
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    marker.addTo(wsac_layerGroup);
                    markers.push(marker);
                    // Check source
                    // sourceObj[data[t]["source"]] = 1;         
                    if(globalSourceObj[data[t]["source"]] && globalSourceObj[data[t]["source"]] > 0) {
                        globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] + 1;
                    } else {
                        globalSourceObj[data[t]["source"]] = 1;
                    }
                    if(neighourhoodObj[data[t]["neighborhood"]] && neighourhoodObj[data[t]["neighborhood"]] > 0) {
                        neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] + 1;
                    } else {
                        neighourhoodObj[data[t]["neighborhood"]] = 1;
                    }
                }
            }
            sourceNumber =  sourceNumber == 0 ? Object.keys(sourceObj).length : (Object.keys(sourceObj).length + sourceNumber)
            $("#sourcePara").text(sourceNumber);
            $("#wsac_list_member #wsac_list_member_checkbox").prop("disabled",false);
            $("#wsac_list_member #wsac_list_member_checkbox").prop("checked", true);
        } else {
            $(".wsac_list").hide();
            wsac_layerGroup.clearLayers();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["committee"].localeCompare("WSAC") == 0 && data[t]["alum"].localeCompare("y") !== 0) {
                    // sourceObj[data[t]["source"]] = 1;
                    globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] > 0 ? globalSourceObj[data[t]["source"]] - 1 : 0;
                    neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] > 0 ? neighourhoodObj[data[t]["neighborhood"]] - 1 : 0;
                }
            }
            // sourceNumber = sourceNumber - Object.keys(sourceObj).length;
            // $("#sourcePara").text(sourceNumber);
            $("#wsac_list_member #wsac_list_member_checkbox").prop("checked",false);
            $("#wsac_list_member #wsac_list_member_checkbox").prop("disabled",true);
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));

    });

    // WSAC inset options check
    $("#wsac_list_member #wsac_list_member_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.committee.localeCompare("WSAC") == 0 && item.category.localeCompare(member) == 0 && item["alum"].localeCompare("y") !== 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude, item.longitude, item.marker_id, item.index, item.neighborhood, item.source);
        });

        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(wsac_layerGroup);
                markers.push(marker);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
            });


        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                wsac_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj),Object.keys(neighourhoodObj));
    });

    // Alum markers - check
  $("#alum_check_type").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var sourceObj = {};
        if(this.checked) {
            $(".alum_list").show();
            for(let t = 0; t < data.length; t++) {
                if(data[t]["alum"].localeCompare("y") == 0) {
                    // Marker
                    var marker = L.marker([data[t]["latitude"], data[t]["longitude"]], {icon: getIcon(data[t]["category"])});
                    var _id = markers.length == 0 ? 0 : markers.length;
                    marker._id = _id;
                    data[t]["marker_id"] = _id;
                    marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                    marker.addTo(alum_layerGroup);
                    markers.push(marker);
                    // Check source
                    // sourceObj[data[t]["source"]] = 1;
                    if(globalSourceObj[data[t]["source"]] && globalSourceObj[data[t]["source"]] > 0) {
                        globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] + 1;
                    } else {
                        globalSourceObj[data[t]["source"]] = 1;
                    }
                    if(neighourhoodObj[data[t]["neighborhood"]] && neighourhoodObj[data[t]["neighborhood"]] > 0) {
                        neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] + 1;
                    } else {
                        neighourhoodObj[data[t]["neighborhood"]] = 1;
                    }
                }
            }
            sourceNumber =  sourceNumber == 0 ? Object.keys(sourceObj).length : (Object.keys(sourceObj).length + sourceNumber)
            $("#sourcePara").text(sourceNumber);
            $("#alum_cdwac_option #alum_cdwac_option_checkbox").prop("checked",true);
            $("#alum_swac_option #alum_swac_option_checkbox").prop("checked",true);
            $("#alum_wsac_option #alum_wsac_option_checkbox").prop("checked",true);
        } else {
            $(".alum_list").hide();
            alum_layerGroup.clearLayers();
            $("#alum_cdwac_option #alum_cdwac_option_checkbox").prop("checked",false);
            $("#alum_swac_option #alum_swac_option_checkbox").prop("checked",false);
            $("#alum_wsac_option #alum_wsac_option_checkbox").prop("checked",false);
            for(let t = 0; t < data.length; t++) {
                if(data[t]["alum"].localeCompare("y") == 0) {
                    globalSourceObj[data[t]["source"]] = globalSourceObj[data[t]["source"]] > 0 ? globalSourceObj[data[t]["source"]] - 1 : 0;
                    neighourhoodObj[data[t]["neighborhood"]] = neighourhoodObj[data[t]["neighborhood"]] > 0 ? neighourhoodObj[data[t]["neighborhood"]] - 1 : 0;
                }
            }
            // sourceNumber = sourceNumber - Object.keys(sourceObj).length;
            // $("#sourcePara").text(sourceNumber);
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));
    });

    // Alum inset options check - CDWAC
    $("#alum_cdwac_option #alum_cdwac_option_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.alum.localeCompare('y') == 0 && item.committee.localeCompare("CDWAC") == 0 && item.category.localeCompare(member) == 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude, item.longitude, item.marker_id, item.index, item.neighborhood, item.source);
        });

        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(alum_layerGroup);
                markers.push(marker);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
            });


        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                alum_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));
    });
    
    // Alum inset options check - SWAC
    $("#alum_swac_option #alum_swac_option_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.alum.localeCompare('y') == 0 && item.committee.localeCompare("SWAC") == 0 && item.category.localeCompare(member) == 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude, item.longitude, item.marker_id, item.index, item.neighborhood, item.source);
        });

        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(alum_layerGroup);
                markers.push(marker);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
            });


        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                alum_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj), Object.keys(neighourhoodObj));
    });

    // Alum inset options check - WSAC
    $("#alum_wsac_option #alum_wsac_option_checkbox").change(function() {
        if($('#heatmap-toggle').is(":checked")) {
            resetHeatmap();
        }
        var member = $(this).parent().text().trim(),
        coordinates = data.filter(function(item) {
            if(item.alum.localeCompare('y') == 0 && item.committee.localeCompare("WSAC") == 0 && item.category.localeCompare(member) == 0) {
                return true;
            }
        }).map(function(item) {
            return new Array(item.latitude, item.longitude, item.marker_id, item.index, item.neighborhood, item.source);
        });

        if(this.checked) {
            coordinates.forEach(function(elem) {
                var marker = L.marker([elem[0], elem[1]], {icon: getIcon(member)});
                var _id = markers.length == 0 ? 0 : markers.length;
                marker._id = _id;
                var t = elem[3];
                data[t]["marker_id"] = _id;
                marker.bindPopup("Neighborhood: " + data[t]["neighborhood"] + " <br> " + "Source: " + data[t]["source"] + " <br> " + "Committee: " + data[t]["committee"] + " <br> " + "Name: " + data[t]["name"]).openPopup();
                marker.addTo(alum_layerGroup);
                markers.push(marker);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] + 1;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] + 1;
            });


        } else {
            // Remove markers
            coordinates.forEach(function(elem) {
                alum_layerGroup.removeLayer(markers[elem[2]]);
                neighourhoodObj[elem[4]] = neighourhoodObj[elem[4]] > 0 ? neighourhoodObj[elem[4]] - 1 : 0;
                globalSourceObj[elem[5]] = globalSourceObj[elem[5]] > 0 ? globalSourceObj[elem[5]] - 1 : 0;
            });
        }
        $("#sourcePara").text(Object.keys(globalSourceObj).filter(function(iter) {
            return globalSourceObj[iter] != 0;
        }).length);
        buildPie(Object.values(neighourhoodObj),Object.keys(neighourhoodObj));
    });
}

window.addEventListener('DOMContentLoaded', init);


/* Pie Chart (Neighbor) */

var options = {
    chart: {
        type: 'pie',
    },
    series: [1],
    labels: ["neighbor"],
            legend: {
                show: false
            },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 300
            }
        }
    }]
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

function buildPie(series, labels) {
    chart.updateOptions({
        series: series,
        labels: labels
    })
}

// buildPie([1],["Neighourhood"])