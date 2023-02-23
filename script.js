const input = document.querySelector("#inputIp");
const button = document.querySelector("button");

// Campos
const ipCamp = document.querySelector("#ip");
const locationCamp = document.querySelector("#location");
const timezoneCamp = document.querySelector("#timezone");
const ispCamp = document.querySelector("#isp");

// Mapa
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var latlng = L.latLng(34.04915, -118.09462);
map.panTo(latlng);

L.marker([34.04915, -118.09462])
  .addTo(map)
  .bindPopup("Your IP is from here!")
  .openPopup();

const tratamento = (e) => {
  console.log(e);

  const { ip, location, isp } = e;

  ipCamp.innerHTML = ip;
  locationCamp.innerHTML = location.city;
  timezoneCamp.innerHTML = "UTC " + location.timezone;
  ispCamp.innerHTML = isp;

  console.log(location);

  // Mapa
  var latlng = L.latLng(location.lat, location.lng);
  map.panTo(latlng);

  L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup("Your IP is from here!")
    .openPopup();
};

const transformarEmJson = (response) => {
  return response.json();
};

const erro = () => {
  console.log("Algo deu errado...");
};

const api = (ip) => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_mwViFEdwi1vF58siIToNZiPzmxhd2&ipAddress=${ip}`
  )
    .then(transformarEmJson)
    .then(tratamento)
    .catch(erro);
};

button.onclick = (e) => {
  e.preventDefault();

  console.log(input.value);

  api(input.value);
};
