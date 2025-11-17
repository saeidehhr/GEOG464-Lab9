// Initialize base map
const map = L.map("map").setView([55, -70], 5);

// Add base tile layer (OpenStreetMap)
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// PART 1
// Load GeoJSON of weather stations
const stationsURL = "https://raw.githubusercontent.com/brubcam/GEOG-464_Lab-8/refs/heads/main/DATA/climate-stations.geojson";

// Fetch GeoJSON and add to map
function loadStations(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: onEachStation,
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, stationStyle(feature)) 
      }).addTo(map);
    })
    .catch(err => console.error("Error loading GeoJSON:", err));
}




// Popup and click handler for each station
function onEachStation(feature, layer) {
  const props = feature.properties;
  const popup = `
    <strong>${props.name}</strong><br>
    Province: ${props.province}<br>
  `;
  layer.bindPopup(popup);
}
// Q1:
// The .then() method handles the successful resolution of a Promise.
// When fetch() completes without errors, the returned data is passed
// into .then(), where we define the next steps (e.g., parsing JSON,
// adding layers to the map).
//
// The .catch() method handles any errors that occur during the fetch
// request or within any previous .then(). It prevents the script from
// failing silently and allows us to display or log a useful error message.

// Q2:
 function onEachStation(feature, layer) {
  const props = feature.properties;

  const popup = `
    <strong>${props.STATION_NAME}</strong><br>
    Province: ${props.ENG_PROV_NAME}<br>
    Station ID: ${props.STN_ID}<br>
    Elevation: ${props.ELEVATION} m<br>
  `;
  layer.bindPopup(popup);

  layer.on("click", () => {
    document.getElementById("station-name").innerHTML = `<strong>${props.STATION_NAME}</strong>`;

        if (props.CLIMATE_IDENTIFIER) {
      document.getElementById("climate-data").innerHTML = "<p>Loading climate data...</p>";
      fetchClimateData(props.CLIMATE_IDENTIFIER);
    } else {
      document.getElementById("climate-data").innerHTML = "<p>No climate data available for this station.</p>";
    }
  });
}


// PART 2- Q2-Q3-Q9
function fetchClimateData(climateID) {
  const apiURL = `https://api.weather.gc.ca/collections/climate-daily/items?limit=10&sortby=-LOCAL_DATE&CLIMATE_IDENTIFIER=${climateID}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(json => {
      if (!json.features || json.features.length === 0) {
        document.getElementById("climate-data").innerHTML = "<p>No recent climate data available.</p>";
        return;
      }

      const props = json.features[0].properties;

      // ساخت HTML بر اساس مقدارهای غیر null
      let html = `<p><strong>Date:</strong> ${props.LOCAL_DATE}</p>`;

      if (props.MEAN_TEMPERATURE !== null) {
        html += `<p><strong>Mean Temp:</strong> ${props.MEAN_TEMPERATURE} °C</p>`;
      }

      if (props.MAX_TEMPERATURE !== null) {
        html += `<p><strong>Max Temp:</strong> ${props.MAX_TEMPERATURE} °C</p>`;
      }

      if (props.MIN_TEMPERATURE !== null) {
        html += `<p><strong>Min Temp:</strong> ${props.MIN_TEMPERATURE} °C</p>`;
      }

      if (props.TOTAL_PRECIPITATION !== null) {
        html += `<p><strong>Total Precipitation:</strong> ${props.TOTAL_PRECIPITATION} mm</p>`;
      }

      if (props.RAINFALL_AMOUNT !== null) {
        html += `<p><strong>Rainfall:</strong> ${props.RAINFALL_AMOUNT} mm</p>`;
      }

      if (props.SNOWFALL_AMOUNT !== null) {
        html += `<p><strong>Snowfall:</strong> ${props.SNOWFALL_AMOUNT} mm</p>`;
      }

      document.getElementById("climate-data").innerHTML = html;
    })
    .catch(error => {
      console.error("Error fetching climate data:", error);
      document.getElementById("climate-data").innerHTML = "<p>Error loading climate data.</p>";
    });
}

    //Q4 - a:
   function fetchClimateData(climateID) {
  let year = 2020;
  const yearFilter = `${year}-01-01/${year}-12-31`;

  const apiURL = `https://api.weather.gc.ca/collections/climate-daily/items?limit=10&sortby=-LOCAL_DATE&datetime=${yearFilter}&CLIMATE_IDENTIFIER=${climateID}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(json => {
      if (!json.features || json.features.length === 0) {
        document.getElementById("climate-data").innerHTML = `<p>No climate data available for ${year}.</p>`;
        return;
      }

      const props = json.features[0].properties;

      document.getElementById("climate-data").innerHTML = `
        <p><strong>Date:</strong> ${props.LOCAL_DATE}</p>
        <p><strong>Mean Temp (°C):</strong> ${props.MEAN_TEMPERATURE}</p>
        <p><strong>Total Precipitation (mm):</strong> ${props.TOTAL_PRECIPITATION}</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching climate data:", error);
      document.getElementById("climate-data").innerHTML = "<p>Error loading climate data.</p>";
    });
}
  //Q4 - b:
function fetchClimateData(climateID) {
  let year = 2025;
  const yearFilter = `${year}-01-01/${year}-12-31`;

  const apiURL = `https://api.weather.gc.ca/collections/climate-daily/items?limit=10&sortby=-LOCAL_DATE&datetime=${yearFilter}&CLIMATE_IDENTIFIER=${climateID}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(json => {
      if (!json.features || json.features.length === 0) {
        document.getElementById("climate-data").innerHTML = `<p>No climate data available for ${year}.</p>`;
        return;
      }

      const props = json.features[0].properties;

      document.getElementById("climate-data").innerHTML = `
        <p><strong>Date:</strong> ${props.LOCAL_DATE}</p>
        <p><strong>Mean Temp (°C):</strong> ${props.MEAN_TEMPERATURE}</p>
        <p><strong>Total Precipitation (mm):</strong> ${props.TOTAL_PRECIPITATION}</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching climate data:", error);
      document.getElementById("climate-data").innerHTML = "<p>Error loading climate data.</p>";
    });
}
 // PART 3

  //Q5-a:
 // PART 5 – Style for stations based on elevation
function stationStyle(feature) {
  let fillColor;
  const elevation = feature.properties.ELEVATION;

  if (elevation < 100) {
    fillColor = '#91bfdb'; // Low
  } else if (elevation >= 100 && elevation < 300) {
    fillColor = '#fee08b'; // Medium
  } else {
    fillColor = '#fc8d59'; // High
  }

  return {
    radius: 6,
    fillColor: fillColor,
    color: "#fff",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
}

// PART 4-5-6-7 – Load stations and add legend
function loadStations(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      const stationsLayer = L.geoJSON(data, {
        onEachFeature: onEachStation,
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, stationStyle(feature))
      });

      
      const markers = L.markerClusterGroup();
      stationsLayer.eachLayer(layer => {
        markers.addLayer(layer);
      });
      markers.addTo(map); 

      
      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      });

      const OpenStreetMap_CH = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        bounds: [[45, 5], [48, 11]]
      });

      
      const baseMaps = {
        "OpenStreetMap": osm,
        "OpenStreetMap Switzerland": OpenStreetMap_CH
      };

      const overlayMaps = {
        "Climate Stations": markers
      };

      
      L.control.layers(baseMaps, overlayMaps).addTo(map);
      L.control.scale().addTo(map);

      
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const colors = ['#91bfdb', '#fee08b', '#fc8d59'];
        const labels = ['< 100 m', '100–300 m', '> 300 m'];

        div.innerHTML += '<b>Elevation (m)</b><br>';
        for (let i = 0; i < labels.length; i++) {
          div.innerHTML += `<i style="background:${colors[i]}"></i> ${labels[i]}<br>`;
        }
        return div;
      };
      legend.addTo(map);
    })
    .catch(err => console.error("Error loading GeoJSON:", err));
}












 


// PART 5


// Load map
loadStations(stationsURL);