
// Leaflet map
var mymap = L.map('mapid').setView([47.649019, -122.347977], 9);

var latitude = '', 
    longitude = '',
    placeName = '';

// Leaflet map setup
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ',
    id: 'mapbox.streets'
}).addTo(mymap);

//Add markers to a layer
var layerGroup = L.layerGroup().addTo(mymap);

   
    function initialize() {
        // autocomplete places implementation
        var input = document.getElementById('autocomplete_search');
        var options = {
                        types: ['address'],
                        }
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        var seattle = {lat: 47.649019, lng: -122.347977};
        // The map, centered at Uluru
        
        var circle = new google.maps.Circle(
            {
                center: seattle,
                radius: 10
            }
        );
        autocomplete.setBounds(circle.getBounds());
        autocomplete.addListener('place_changed', function () {
        
        var place = autocomplete.getPlace();
        placeName = place.name;
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();

        var coords = [latitude, longitude];
        var greenIcon = new L.Icon({
            iconUrl: 'https://marker.nanoka.fr/map_pin-64C81E-FFF-64C81E-%E2%97%89-40.svg',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
            });
            // Map marker color selector
        function getIcon() {
            var e = document.getElementById("categoryDiv");
            var val = e.options[e.selectedIndex].value;
            console.log('val', val);
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
        var marker = L.marker(coords, {icon: getIcon()}).addTo(layerGroup);
        marker.bindPopup(place.name).openPopup();
        mymap.panTo(coords);

        });
    
   
    // var marker = new google.maps.Marker({position: uluru, map: map});
}

// Show and hide other input box, based on chosen category
$("#otherBox").hide();
$("#categoryDiv").change(function() {
    var e = document.getElementById("categoryDiv");
    var val = e.options[e.selectedIndex].value;
    if(val.localeCompare("Other") == 0) {
        $("#otherBox").show();
    } else {
        $("#otherBox").hide();
    }
    console.log(val);
});

// Notification section
function showNotify(type) {
    switch(type) {
        case "success":
                $("div#notifySuccess").removeClass("hidden");
                setTimeout(function() {
                    $("div#notifySuccess").addClass("hidden");
                }, 3000);
            break;
        case "fail":
                $("div#notifyFail").removeClass("hidden");
                setTimeout(function() {
                    $("#notifyFail").hide();
                    $("div#notifyFail").addClass("hidden");
                }, 3000);
            break;  
    }
}

function resetInputs() {
    $("#categoryDiv").prop('selectedIndex', 0);
    $("#neighourhoodDiv").prop('selectedIndex', 0);
    $("#committeeDiv").prop('selectedIndex', 0);
    $("#committeeDiv").prop('selectedIndex', 0);
    $("#autocomplete_search").val("");
    $("#sourceDiv").val("");
}

function saveForm() {
    $("#submitBtn").attr("disabled", true);
    var category = $("#categoryDiv option:selected").text();
    if(category.localeCompare("Other") == 0) {
        category = $("#otherBox").val();
    }
    var neighourhood = $("#neighourhoodDiv option:selected").text();
    var source = $("#sourceDiv").val();
    var committee = $("#committeeDiv option:selected").text();
    console.log(category, neighourhood, source, committee, placeName, latitude, longitude);
    $.post("https://script.google.com/macros/s/AKfycbzfoH4mWLCJNcOWwmqnVr6qiDGpwVhXUNaZLsHPyP6MIkV-CpA/exec?id=%3DRow%28%29-1&category=" + category + "&neighourhood=" + neighourhood + "&source=" + source + "&committee=" + committee + "&name=" + placeName + "&longitude=" + longitude + "&latitude=" + latitude, function(data) {
        $('#submitBtn').removeAttr("disabled");
        resetInputs();
        showNotify("success");
        console.log(data);
    });
}

function clearMap() {
    layerGroup.clearLayers();
}