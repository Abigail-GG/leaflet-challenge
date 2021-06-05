// Creating map object
var map = L.map("mapid", {
  center: [40.00, -110.00],
  zoom: 4.5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 500,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(map);
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
d3.json(queryUrl).then(function(data) {
  console.log(data)
  var featuresarray = data.features
  for (var i = 0; i < featuresarray.length; i++) {
  var mycoordinates= featuresarray[i].geometry.coordinates
  var magnitud = featuresarray[i].properties.mag
  var mysize = magnitud*10000
  var myplace = featuresarray[i].properties.place
  var mydate = featuresarray[i].properties.time
  var EarthquakeDepth = featuresarray[i].geometry.coordinates[2];
  var color = "";
  if (EarthquakeDepth > -10 && EarthquakeDepth <= 10){
    color = '#33cc33'
  }
  else if (EarthquakeDepth > 10 && EarthquakeDepth <= 30)
  {
    color = '#ccff66'
  }
  else if (EarthquakeDepth > 30 && EarthquakeDepth <= 50)
  {
    color = '#ffcc66'
  }
  else if (EarthquakeDepth > 50 && EarthquakeDepth <= 70)
  {
    color = '#ff9900'
  }
  else if (EarthquakeDepth > 70 && EarthquakeDepth <= 90)
  {
    color = '#ff6600'
  }
  else if (EarthquakeDepth > 90)
  {
    color = 'ff0000'
  }
    L.circle([mycoordinates[1],mycoordinates[0]], {
      stroke: true,
      fillOpacity: 0.50,
      color: "white",
	  weight: 0.50,
      fillColor: color,
      radius: mysize
    }).bindPopup("<h3>" + myplace +
    "</h3><hr><p>" + new Date(mydate) + "</p>" + 
    "</h3><hr><p>Magnitud: " + magnitud + "</p>").addTo(map)
  }
});
/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<i style="background: #33cc33"></i><span>-10 - 10</span><br>';
  div.innerHTML += '<i style="background: #ccff66"></i><span>10 - 30</span><br>';
  div.innerHTML += '<i style="background: #ffcc66"></i><span>30 - 50</span><br>';
  div.innerHTML += '<i style="background: #ff9900"></i><span>50 - 70</span><br>';
  div.innerHTML += '<i style="background: #ff6600"></i><span>70 - 90</span><br>';
  div.innerHTML += '<i style="background: #ff0000"></i><span>90+</span><br>';
    return div;
};
legend.addTo(map);

