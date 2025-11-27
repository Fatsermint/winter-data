let currentDate = new Date().getTime()


let url =`https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${currentDate}`
let days = 0;
/* function getData (){
  fetch(url).then(function(response) {//
    return response.text();
  }).then(function(data) {
    console.log(data);
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}   */


var map = L.map('map').setView([62.192059, 24.945831], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var wmsLayer = L.tileLayer.wms(url, {
    layers: 'eo:EO_MR_VIIRS_LIE'
}).addTo(map);
function reloadData() {
  wmsLayer.removeFrom(map)
  wmsLayer = L.tileLayer.wms(url, {
    layers: 'eo:EO_MR_VIIRS_LIE',
    opacity: 0.57
}).addTo(map);
}
function addDays(amount) {
  currentDate += 1000 * 3600 * 24 * amount
  url =`https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${new Date(currentDate).toISOString().substring(0, 10)}`

  console.log(new Date(currentDate))

  reloadData()
}




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