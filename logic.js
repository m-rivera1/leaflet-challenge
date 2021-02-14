// Store our API endpoint inside queryUrl
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
 // "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
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

// Store json data in variable
  var queryUrl = 	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"


  // Perform a GET request to the query URL
  d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    //createFeatures(data.features);
    console.log(data); 
  })
  
  // Add circles to map
  L.circle(countries[i].location, {    
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 1500
    }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
  
  





