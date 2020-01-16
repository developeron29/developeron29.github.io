var mymap = ''; //globalmap variable
var globalColorSet1 = ["#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#7F6084", "#77A033", "#33558B", "#E59566"]; // Colorset1 default colors

window.onload = function () {
    // set map height
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

    var newHeight = y;
  
    this.console.log('h1', newHeight, document.getElementById("padrightblock").offsetHeight,  document.getElementById("chartContainer").offsetHeight, newHeight - document.getElementById("padrightblock").offsetHeight);
  
    document.getElementById("paddlow").style.height = (newHeight - document.getElementById('totalboxcardcontainer').offsetHeight - document.getElementById('twoboxcontainer').offsetHeight - 15) + "px";

    document.getElementById("chartContainer").style.height = (document.getElementById("paddlow").offsetHeight - document.getElementById("fonthead1").offsetHeight - 25) + "px"

    //;
    this.console.log((newHeight - document.getElementById('totalboxcardcontainer').offsetHeight - document.getElementById('twoboxcontainer').offsetHeight  - document.getElementById('fonthead1').offsetHeight - 30) + "px", document.getElementById("chartContainer").offsetHeight);
    //document.getElementById("chartContainer").style.height  = document.getElementById("chartContainer").style.height + (newHeight - document.getElementById("padrightblock").offsetHeight);

    this.console.log( 'heights', newHeight, document.getElementById("paddlow").offsetHeight );

    // set chart height
    $("#mapid").height(newHeight - 15);

    mymap = L.map('mapid').setView([47.6131746,-122.4821483], 13); //Seattle
    var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    CartoDB_DarkMatter.addTo(mymap);

}

    // Read spreadsheet data - Fill in the dashboard
    function ttinit() {
        var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/17bGkdKcKbd8ibcRrI7Asw5JhGGN6XJTaEk2nIapWByU/pubhtml";

        Tabletop.init( { key: publicSpreadsheetUrl,
                         callback: showInfo,
                         simpleSheet: true } )
        
      }
    
      var ism = 0, //Impervious Surface Managed
          tgm = 0, //Total Gallons Managed
            tof = []; //Type of Facility

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
            console.log(addr, '\n', result, '\n')
            return result;
          },
          async: false
        });
      }

      function showInfo(data, tabletop) {
        console.log(data);
        $("#sbheadfont").text(data.length); // total projects
        data.forEach(element => {
            ism = parseInt(ism) + parseInt(element["Impervious Surface Managed"]); 
            tgm = parseInt(tgm) + parseInt(element["Total Gallons Managed"]);
            console.log(element["Type of Facility"]);
            tof[element["Type of Facility"]] = isNaN(tof[element["Type of Facility"]]) ? 1 : tof[element["Type of Facility"]] = tof[element["Type of Facility"]] + 1;

        });
        $("#sbheadfont1").text(ism);
        $("#sbheadfont11").text(tgm);
        console.log(tof);

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
          animationEnabled: true, // change to true		
          data: [
            {
              // Change type to "bar", "area", "spline", "pie",etc.
              type: "column",
              dataPoints: dataPointsArr
            }
          ]
        });
        chart.render();

        var tofKeys = Object.keys(tof);

        data.forEach(elem => {
          //Render map markers
          var place = getLtLg(elem["Address"])["responseJSON"];
          
          if(place && place.results && place.results.length > 0) {
                      
            var lat = place["results"][0]["geometry"]["location"]["lat"],
            long = place["results"][0]["geometry"]["location"]["lng"];
            
            var circle = L.circle([lat, long], {
              color: "yellow",
              weight: 1,
              opacity: 0.5,
              fillColor: globalColorSet1[tofKeys.indexOf(elem["Type of Facility"])],
              fillOpacity: 1.0,
              radius: 50
            }).addTo(mymap);
            
            circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Installed:  " + elem["Installed"] + "<br>Address:  " + elem["Address"] + "<br>Infiltration:   " + elem["Infiltration"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Pond Depth:  " + elem["Pond_Depth"] + "<br>Comments:  " + elem["Comments"] + " <br> <img src='" + "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + long +"&fov=80&heading=70&pitch=0&key=AIzaSyDeaBVGly94ol9D4z7AINwYLyAq6uJed8s" + "' width='300' height='200' /> ").openPopup();

          } else {
            console.log("no place");
          }

          console.log('place', place);

          /*
          if (place && place.length > 0) {
            console.log('col', globalColorSet1[tofKeys.indexOf(elem["Type of Facility"])])
            var circle = L.circle([place[0]["lat"], place[0]["lon"]], {
              color: 'yellow',
              fillColor: globalColorSet1[tofKeys.indexOf(elem["Type of Facility"])],
              fillOpacity: 1.0,
              radius: 50
            }).addTo(mymap);
            //get nearest street images
            var imgID = getImg(place[0]["lat"],place[0]["lon"])["responseJSON"];
            
            imgID = imgID["features"].length > 0 ? imgID["features"][0]["properties"]["key"] : 0;

            var imgUrl = imgID == 0 ? "https://dummyimage.com/640x4:3/" :  "https://images.mapillary.com/" + imgID + "/thumb-640.jpg"
            
            circle.bindPopup("Project Name: "+ elem["Project Name"] + "<br>Project ID: " + elem["Project_ID"] + " <br>Type of Facility:  " + elem["Type of Facility"] + "<br>Installed:  " + elem["Installed"] + "<br>Address:  " + elem["Address"] + "<br>Infiltration:   " + elem["Infiltration"] + "<br>Total Gallons Managed (Annually):  " + elem["Total Gallons Managed"] + "<br>Drain:  " + elem["Drain"] + "<br>Weir:  " + elem["Weir"] + "<br>Liner:  " + elem["Liner"] + "<br>Pond Depth:  " + elem["Pond_Depth"] + "<br>Comments:  " + elem["Comments"] + " <br> <img src='" + imgUrl + "' width='300' height='200' /> ").openPopup();
          } else {
            console.log('no place');
          }
*/
        });

        $("#cover").hide();
    }
      
      window.addEventListener('DOMContentLoaded', ttinit);
