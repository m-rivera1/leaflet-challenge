 // Store json data in variable
 var queryUrl = 	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features); 
});

function createFeatures(earthquakeData) { // *** earthquakeData is the DATA coming from up above's query ***

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeaturePrep(feature, layer) { // **** GRAB only what is needed from the DATA *****
    layer.bindPopup("<h3>Magnitude:" + feature.properties.mag + "</h3><h3>Location: " + feature.properties.place +
      "</h3><hr><p>When" + new Date(feature.properties.time) + "</p>")
      console.log(feature.properties.mag,feature.properties.place,feature.properties.time);
  }
  
  function onEachFeaturePrep(feature, latlng) { // **** GRAB only what is needed from the DATA *****
    L.circle(latlng), {    
      fillOpacity: 0.75,
      color: "white",
      fillColor: "green",
      // Adjust radius
     radius: 2000
      }//.addTo(myMap););

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, { // *** CALL the geoJSON function on the DATA
        onEachFeature: onEachFeaturePrep

  });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);

function makeMap(earthquakes) {

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

}}}