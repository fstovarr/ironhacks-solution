// Principal palette #646E74, #262D31, #D4D5D8, #A3A7AD, #448F9C
var lightsButton, housingsButton, districtsButton, neighborhoodButton, clearMarkersButton;
$(document).ready(function() {
  lightsButton = $('#switchModeButton').on('click', switchMode);
  housingsButton = $('#drawHousingsButton').on('click', drawHousings);
  $('#centerMapButton').on('click', centerMap);
  districtsButton = $('#drawDistrictsButton').on('click', drawDistricts);
  neighborhoodButton = $('#drawNeighborhoodsButton').on('click', drawNeighborhood);
  clearMarkersButton = $('#clearMarkersButton').on('click', clearMarkers);
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
  googleMap.distanceBeetwen({
    lat: 49,
    lng: -73
  }, INIT_POINT, 'DRIVING');
}

function switchMode() {
  googleMap.changeToNightMode();
  if (googleMap.isNightMode()) {
    lightsButton.html('Turn off!');
  } else {
    lightsButton.html('Turn on!');
  }
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

function clearMarkers() {
  googleMap.clearMarkers();
  googleMap.clearShapes();
}
