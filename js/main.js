$(document).ready(function() {
  var windowHeight = $(window).height();
  $('#mapContainer').height(windowHeight);
  $('#switchMode').on('click', switchMode);
  $('#drawHousingsButton').on('click', drawHousings);
  $('#centerMapButton').on('click', centerMap);
  $('#drawDistrictsButton').on('click', drawDistricts);
  $('#drawNeighborhoodsButton').on('click', drawNeighborhood);
  getData();
});

const INIT_POINT = {
  lat: 40.7291,
  lng: -73.9965
};

var googleMap, dataManager, idsDataBases, data;

function initMap() {
  googleMap = new GoogleMap(INIT_POINT);
  googleMap.showMap();
}

function switchMode() {
  googleMap.changeToNightMode();
}

function drawHousings() {
  googleMap.drawHousings(data['housing']);
}

function getData() {
  dataManager = new DataManager();
  idsDataBases = dataManager.getKeysURLS();
  data = dataManager.getDataFromURLS();
}

function centerMap() {
  googleMap.centerMap(INIT_POINT);
}

function drawDistricts() {
  googleMap.drawDistricts(data['districts']);
}

function drawNeighborhood() {
  googleMap.drawNeighborhood(data['neighborhood']);
}
