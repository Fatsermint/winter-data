let currentDate = new Date().getTime()


document.querySelectorAll(".changes-map-mode").forEach(el => {
  el.addEventListener("click", () => {
    reloadData(el.getAttribute("data-mode"))
  })
})

const layerTypes = {
  lake_ice: 'eo:EO_MR_VIIRS_LIE',
  snow: 'eo:EO_FSC',
  rannikko_jarvi: 'eo:EO_MR_SLSTR_SST_SEASONAL_MONTH'
}
let selected = "lake_ice"

let url = `https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${currentDate}`
const reloadAutoCheckBox = document.querySelector("#reloadAuto")

let map = L.map('map').setView([62.192059, 24.945831], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  opacity: 2
}).addTo(map)
  


const dateSelector = document.querySelector("#date")

dateSelector.addEventListener("input", (event) => {
  console.log(dateSelector.value)
  currentDate = new Date(dateSelector.value).getTime()
  url = `https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${new Date(currentDate).toISOString().substring(0, 10)}`
  if (reloadAutoCheckBox.checked) {
    reloadData()
  };
});

let wmsLayer
function reloadData(layerType) {
  if (wmsLayer) wmsLayer.removeFrom(map)
  wmsLayer = L.tileLayer.wms(url, {
    layers: layerTypes[layerType || selected],
    opacity: 0.7
  }).addTo(map)
  if (layerType) selected = layerType
  console.log(selected)
} 
reloadData()
function addDays(amount) {
  currentDate += 1000 * 3600 * 24 * amount;
  dateSelector.value = new Date(currentDate).toISOString().substring(0, 16)

  console.log(dateSelector.value)
  url = `https://geoserver2.ymparisto.fi/geoserver/eo/wms?time=${new Date(currentDate).toISOString().substring(0, 10)}`
  console.log(new Date(currentDate).toISOString().substring(0, 16))
  if (reloadAutoCheckBox.checked) {
    reloadData()
  };
}
const value = document.querySelector("#opacityValue")
const input = document.querySelector("#opacity")
value.innerHTML = input.value + "&nbsp;%"
input.addEventListener("input", (event) => {
  value.innerHTML = event.target.value + "&nbsp;%"
  wmsLayer.setOpacity(Number(input.value) * 0.01)
});



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