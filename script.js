let currentDate = new Date().getTime()


let url =`https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${currentDate}`
const reloadAutoCheckBox = document.querySelector("#reloadAuto")

var map = L.map('map').setView([62.192059, 24.945831], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
;
var wmsLayer = L.tileLayer.wms(url, {
    layers: 'eo:EO_MR_VIIRS_LIE'
}).addTo(map);
function reloadData() {
  wmsLayer.removeFrom(map)
  wmsLayer = L.tileLayer.wms(url, {
    layers: 'eo:EO_MR_VIIRS_LIE',
    opacity: input.value * 0.01,
}).addTo(map);
}
function addDays(amount) {
  currentDate += 1000 * 3600 * 24 * amount;
  url =`https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${new Date(currentDate).toISOString().substring(0, 10)}`;
  console.log(new Date(currentDate));
  if (reloadAutoCheckBox.checked)  {
    reloadData()
    console.log("ADSSSSSSSSSSSSSS")
  }
}
const value = document.querySelector("#opacityValue")
const input = document.querySelector("#opacity")
value.textContent = input.value
input.addEventListener("input", (event) =>{
  value.textContent = event.target.value
  console.log(input.value)

})
const dateSelector =  document.querySelector("#date")

dateSelector.addEventListener("input", (event) => {
  console.log(dateSelector.value)
  currentDate = dateSelector.value
  url =`https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${new Date(currentDate).toISOString().substring(0, 10)}`
  if (reloadAutoCheckBox.checked)  {
    reloadData()
    console.log("ADSSSSSSSSSSSSSS")
  }
})


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