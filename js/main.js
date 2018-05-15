// Principal palette #646E74, #262D31, #D4D5D8, #A3A7AD, #448F9C
var lightsButton, parametersButtons = {},
  boroughsButtons = {};
var googleMap, dataManager, idsDataBases, data;
const BOROUGHS = [
  "MANHATTAN",
  "BRONX",
  "BROOKLYN",
  "QUEENS",
  "STATEN ISLAND"
];

$(document).ready(function() {
  lightsButton = $('#switchModeButton').on('click', switchMode);
  let sb = $('#safetyButton');
  let ab = $('#affordabilityButton');
  let db = $('#distanceButton');
  $('#parametersButtons').on('change', function(event) {
    parametersButtons["SAFETY"] = sb[0].control.checked;
    parametersButtons["AFFORDABILITY"] = ab[0].control.checked;
    parametersButtons["DISTANCE"] = db[0].control.checked;
  });

  $("#boroughsButtons").on('click', function(event) {
    let btn = event['target'];
    switch (btn['id']) {
      case 'bronxButton':
        googleMap.drawDistrictsInBorough(data[BOROUGHS[1]], BOROUGHS[1], !btn['control']['checked']);
        boroughsButtons[BOROUGHS[1]] = !btn['control']['checked'];
        break;
      case 'brooklinButton':
        googleMap.drawDistrictsInBorough(data[BOROUGHS[2]], BOROUGHS[2], !btn['control']['checked']);
        boroughsButtons[BOROUGHS[2]] = !btn['control']['checked'];
        break;
      case 'manhattanButton':
        googleMap.drawDistrictsInBorough(data[BOROUGHS[0]], BOROUGHS[0], !btn['control']['checked']);
        boroughsButtons[BOROUGHS[0]] = !btn['control']['checked'];
        break;
      case 'queensButton':
        googleMap.drawDistrictsInBorough(data[BOROUGHS[3]], BOROUGHS[3], !btn['control']['checked']);
        boroughsButtons[BOROUGHS[3]] = !btn['control']['checked'];
        break;
      case 'statenIslandButton':
        googleMap.drawDistrictsInBorough(data[BOROUGHS[4]], BOROUGHS[4], !btn['control']['checked']);
        boroughsButtons[BOROUGHS[4]] = !btn['control']['checked'];
        break;
      default:
        break;
    }
  });

  $("#searchButton").on('click', function() {
    $("#mainNavbar").collapse("hide");
    search(boroughsButtons, parametersButtons);
  });

  getData();
});

const INIT_POINT = {
  lat: 40.7291,
  lng: -73.9965
};

function initMap() {
  googleMap = new GoogleMap(INIT_POINT);
  googleMap.showMap();
}

function switchMode() {
  googleMap.changeToNightMode();
  if (googleMap.isNightMode()) {
    lightsButton.text('Turn off!');
  } else {
    lightsButton.text('Turn on!');
  }
}

function search(boroughs, parameters) {
  googleMap.clearMarkers();
  googleMap.clearShapes();

  if (parameters["DISTANCE"]) {
    let min = null;
    for (let b in boroughs) {
      let ans = googleMap.distanceBeetwenPointAndDistricts(data[b]['districts'], INIT_POINT);
      for (let x = 0; x < ans.length; x++) {
        if (x == 0 && min == null) {
          min = {};
          min = ans[x];
        } else {
          if (ans[x]['value'] < min['value']) {
            min = ans[x];
          }
        }
      }
      min['borough'] = b;
    }

    for (let x = 0; x < data[min['borough']]['districts'].length; x++) {
      if (data[min['borough']]['districts'][x]['id'] == min['id']) {
        googleMap.drawDistrict(data[min['borough']]['districts'][x]['geometry']['coordinates'], min['borough'], 'districts');
        break;
      }
    }

  } else if (parameters["SAFETY"] || parameters["AFFORDABILITY"]) {
    alert("Coming soon!");
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
