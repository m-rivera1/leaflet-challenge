 // Store json data in variable
 var queryUrl = 	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features); 

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
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


function createFeatures(earthquakeData) { // *** earthquakeData is the DATA coming from up above's query ***

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeaturePrep(feature, layer) { // **** GRAB only what is needed from the DATA *****
    layer.bindPopup("<h3>Magnitude: </h3>" + feature.properties.mag + "<h3>Location: </h3>" + feature.properties.place +
      "<h3>When: </h3> " + new Date(feature.properties.time) + "<h3> Depth: </h3>" + feature.geometry.coordinates[2] + ' km')
    }; 


  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, { // *** CALL the geoJSON function on the DATA
    onEachFeature: onEachFeaturePrep,
// Found this pointToLayer function here: https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/"      
    pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: (feature.properties.mag) *5,
      fillColor: circleColor(feature.geometry.coordinates[2]),
      color: "black",
      fillOpacity: 0.5,
      weight: .5,
      stroke: true,
    }).addTo(myMap)
       }

  
});
// color based on how deep in the depth in the earth the earthquake was  
// function circleColor(depth) {
//   return depth > 90?'red':
//   depth > 69?'orange':
//   depth > 49?'blue':
//   depth > 29?'yellow':
//   depth > 9?'pink':
//   'purple';

  function circleColor(depth) {
    return depth > 90?'#800026':
           depth > 69?'#BD0026':
           depth > 49?'#E31A1C':
           depth > 29?'#FC4E2A':
           depth > 9? '#FFEDA0':
                       '#FEB24C';
  
}
   

// // Set up the legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend"),
    grades = ["-10-10","11-29","30-49","50-69","70-89","90+"],
    labels = [];
      

    
for (var i = 0; i < grades.length; i++) {
    div.innerHTML += '<i style="background:' + circleColor(grades[i]) + '"></i> ' +
    grades[i] + '<br>' ;
    // div.innerHTML += '<i style="background:' + circleColor(grades[i] +1) + '"></i> ' +
    // grades[i] + '<br>' ;    
    // div.innerHTML += '<i style=”background:' + circleColor(grades[i] + 1) + '"></i> ' + grades[i] + 
    //                   (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
  };


// Adding legend to the map
legend.addTo(myMap);
  



 }
 
  