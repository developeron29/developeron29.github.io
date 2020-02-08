 jQuery.ajax({
          url: "https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6/query?where=UPPER(GENUS)%20like%20%27FRAXINUS%27%20OR%20UPPER(GENUS)%20like%20%27ACER%27%20OR%20UPPER(GENUS)%20like%20%27BETULA%27%20OR%20UPPER(GENUS)%20like%20%27PLATANUS%27%20OR%20UPPER(GENUS)%20like%20%27ULMUS%27%20OR%20UPPER(GENUS)%20like%20%27SORBUS%27%20OR%20UPPER(GENUS)%20like%20%27CERCIDPHYLLUM%27%20OR%20UPPER(GENUS)%20like%20%27AESCULUS%27%20OR%20UPPER(GENUS)%20like%20%27KOELREUTERIA%27%20OR%20UPPER(GENUS)%20like%20%27POPLUS%27%20OR%20UPPER(GENUS)%20like%20%27SALIX%27%20OR%20UPPER(GENUS)%20like%20%27ALBIZIA%27&outFields=*&outSR=4326&f=json&resultOffset="+offset,
          success: function(result) {
              if(result["features"] && result["features"].length > 0) {
                console.log('of', offset, result["features"].length);
                globaldataObj = globaldataObj.concat(result["features"]);
                if(result["features"].length == 1000) {
                  console.log('next', offset, parseInt(offset)+1000);
                  buildDataALB(parseInt(offset)+1000);
                }
              } else {
                console.log('total', globaldataObj.length);
              }
          },
          error: function(err) {
            console.log("There is an error: ", err);
          },
          async: false
        }); // end of ajax call
