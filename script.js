let url = "https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=2019-03-22"

fetch(url).then(function(response) {//
  return response.text();
}).then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.log('Fetch Error :-S', err);
});

var map = L.map('map').setView([60.192059, 24.945831], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var wmsLayer = L.tileLayer.wms(url, {
    layers: 'eo:EO_FSC'
}).addTo(map);





//let url = "https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=2019-03-22"

//fetch(url).then(function(response) {//
  //return response.text();
//}).then(function(data) {
  //console.log(data);
//}).catch(function(err) {
  //console.log('Fetch Error :-S', err);
//});

//var map = L.map('map').setView([60.192059, 24.945831], 5);
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //  maxZoom: 19,
    //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);
//var wmsLayer = L.tileLayer.wms(url, {
  //  layers: 'eo:EO_FSC'
//}).addTo(map);