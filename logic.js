 // Store json data in variable
 var queryUrl = 	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features); 

// establishing variable for magnidude
//var mag = feature.properties.mag
});

  // Create a map object
  var myMap = L.map("map", {
    center: [37.09024, -95.712891],
    zoom: 5,
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id:"mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap)

  //function circleColor(depth)
    // color based on how deep in the depth in the earth the earthquake was
  
  // function circleColor(depth) {
  //   var color = "";
  //   if (feature.geometry.coordinates[3] > 90) {
  //     color = "red";
  //   }
  //   else if (feature.geometry.coordinates[3] > 69 ) {
  //     color = "orange";
  //   }
  //   else if (feature.geometry.coordinates[3]> 49) {
  //     color = "light orange";
  //   }
  //   else if (feature.geometry.coordinates[3]> 29) {
  //     color = "yellow";
  //   }    
  //   else if (feature.geometry.coordinates[3]> 9) {
  //       color = "light yellow";
  //   }
  //   else {
  //     color = "light green";
  //   }
function createFeatures(earthquakeData) { // *** earthquakeData is the DATA coming from up above's query ***

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeaturePrep(feature, layer) { // **** GRAB only what is needed from the DATA *****
    layer.bindPopup("<h3>Magnitude: </h3>" + feature.properties.mag + "<h3>Location: </h3>" + feature.properties.place +
      "<h3>When: </h3> " + new Date(feature.properties.time))
    }; 

  // color based on how deep in the depth in the earth the earthquake was
//   function circleColor(depth)
//     var color = " ";
//     if (feature.geometry.coordinates[3] > 90) {
//   color = "red";
//     }
//     else if (feature.geometry.coordinates[3] > 69 ) {
//       color = "orange";
//     }
//     else if (feature.geometry.coordinates[3]> 49) {
//       color = "light orange";
//     }
//     else if (feature.geometry.coordinates[3]> 29) {
//       color = "yellow";
//     }    
//     else if (feature.geometry.coordinates[3]> 9) {
//         color = "light yellow";
//     }
//     else {
//       color = "light green";
// }  

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, { // *** CALL the geoJSON function on the DATA
        onEachFeature: onEachFeaturePrep,
  // Found this pointToLayer function here: https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/"      
        pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
        	radius: (feature.properties.mag) *5,
          color: "blue",
          fillOpacity: 0.5,
          weight: .5,


        }).addTo(myMap)
      }

  });

// Set up the legend
var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = feature.options.limits;
    var colors = feature.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo =   
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

}






    // Sending our earthquakes layer to the createMap function
    // makeMap(earthquakes);

// function makeMap(earthquakes) {}

  // Create a map object
//   var myMap = L.map("map", {
//     center: [37.09024, -95.712891],
//     zoom: 5,
//   });

//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id:"mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap)
// }
   