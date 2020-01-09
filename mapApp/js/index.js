window.onload = function () {
    // set map height
    var newHeight = $(window).height();
    $("#chartContainer").height(newHeight - $("#totalboxcardcontainer").height() - $("#twoboxcontainer").height()  - $("#fonthead1").height()- 120);
/*
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Top Oil Reserves"
        },
        axisY: {
            title: "Reserves(MMbbl)"
        },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "MMbbl = one million barrels",
            dataPoints: [      
                { y: 300878, label: "Venezuela" },
                { y: 266455,  label: "Saudi" },
                { y: 169709,  label: "Canada" },
                { y: 158400,  label: "Iran" },
                { y: 142503,  label: "Iraq" },
                { y: 101500, label: "Kuwait" },
                { y: 97800,  label: "UAE" },
                { y: 80000,  label: "Russia" }
            ]
        }]
    });
    chart.render();
    */
    // set chart height
    this.console.log(document.documentElement.clientHeight);
    var newHeight = $(window).height();
    $("#mapid").height(newHeight - 15);

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
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

        // draw chart
        var options = {
            series: [{
              data: Object.values(tof)
            }],
            chart: {
              type: 'bar',
              height: 380
            },
            plotOptions: {
              bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,

              }
            },
            colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
              '#f48024', '#69d2e7'],
            xaxis: {
              categories: Object.keys(tof)
            },
            yaxis: {
              labels: {
                show: true
              }
            },
            title: {
                text: 'Project by GSI Type',
                align: 'center',
                floating: true
            },
            subtitle: {
                text: '(Click graph to filter)',
                align: 'center',
            },
            tooltip: {
              theme: 'dark',
              x: {
                show: false
              },
              y: {
                title: {
                  formatter: function () {
                    return ''
                  }
                }
              }
            },
            legend: {
                show: false
              }
        }
        ;
        let myChart = new ApexCharts(document.querySelector("#chartContainer"), options);
        myChart.render();
    }
      
      window.addEventListener('DOMContentLoaded', ttinit);