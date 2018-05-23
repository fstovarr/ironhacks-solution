// Principal palette #646E74, #262D31, #D4D5D8, #A3A7AD, #448F9C

// Variable declarations
var lightsButton, parametersButtons = {},
  boroughsButtons = {},
  buttonsGroup = [],
  heatMapButton;
var googleMap, dataManager, idsDataBases, data;

// Constants
const BOROUGHS = [
  "MANHATTAN",
  "BRONX",
  "BROOKLYN",
  "QUEENS",
  "STATEN ISLAND"
];

const INIT_POINT = {
  lat: 40.7291,
  lng: -73.9965
};

const CENTER_NY = {
  lat: 40.72592801736515,
  lng: -73.9503690946566
}

$(document).ready(function() {
  console.log("");
  lightsButton = $('#switchModeButton').on('click', switchMode);
  let sb = $('#safetyButton');
  let ab = $('#affordabilityButton');
  let db = $('#distanceButton');

  $('#parametersButtons').on('change', function(event) {
    parametersButtons["SAFETY"] = sb[0].control.checked;
    parametersButtons["AFFORDABILITY"] = ab[0].control.checked;
    parametersButtons["DISTANCE"] = db[0].control.checked;
  });

  buttonsGroup.push(sb);
  buttonsGroup.push(ab);
  buttonsGroup.push(db);

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
    buttonsGroup.push(btn);
  });

  $("#searchButton").on('click', function() {
    //$("#mainNavbar").collapse("hide");
    search(boroughsButtons, parametersButtons);
  });

});

function initMap() {
  getData();

  googleMap = new GoogleMap(INIT_POINT);
  googleMap.showMap(function() {
    googleMap.centerMap(INIT_POINT, 11)
  }, showHeatMap);
}

function switchMode() {
  googleMap.changeToNightMode();
  if (googleMap.isNightMode()) {
    lightsButton.text('Turn off!');
  } else {
    lightsButton.text('Turn on!');
  }
}

function showHeatMap() {
  if (!googleMap.isDataHeatmapLoaded()) {
    let d = [];
    console.log(data);
    for (let b in data) {
      for (let x = 0; x < Math.round(data[b]['crimes'].length / 2); x++) {
        let e = new google.maps.LatLng(data[b]['crimes'][x]['latitude'], data[b]['crimes'][x]['longitude']);
        if (e.lat() != null && isNumber(e.lat()) && e.lng() != null && isNumber(e.lng())) {
          d.push(e);
        } else {
          console.log("Error construyendo heatmap");
        }
      }
    }
    googleMap.showHeatMap(d);
  } else {
    googleMap.showHeatMap();
  }

  // let center = dataManager.getBoundsNewYork();
}

function uncheckButtons(bt) {
  for (let x = 0; x < bt.length; x++) {
    if ($(bt[x]).hasClass('active')) {
      setTimeout(function() {
        $(bt[x]).removeClass('active').find('input').prop('checked', false);
      }.bind(bt[x]), 10);

      $(bt[x]).trigger('click');
    }
  }
}

function findMinDistance(bors) {
  if (Object.keys(bors).length == 0) return;
  let bb = null;

  let min = null,
    counter = 0;

  let disTemp = [];
  for (let b in bors) {
    if (bors[b] == false) {
      counter++;
      continue;
    }
    disTemp.push(data[b]['districts']);
  }

  if (counter == Object.keys(bors).length) return;

  let distList = googleMap.getNearestDistricts(disTemp, INIT_POINT);

  for (let x = 0; x < 1; x++) {
    let dist1 = dataManager.findDistrictById(data, distList[x]['id'], distList[x]['boroughId']);
    if (x == 0) {
      bb = dist1['geometry']['boundbox'];
    } else {
      bb.union(dist1['geometry']['boundbox']);
    }

    let name = dataManager.getBoroughName(distList[x]['boroughId']);

    googleMap.drawDistrict(dist1['geometry']['coordinates'], name, dist1['geometry']['middle']);
  }

  let center = bb.getCenter();

  let rect = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });

  let dd = Object.assign(bb);

  if (dd['b']['b'] > 0) {
    let b = dd['b'];
    dd['b'] = bb['f'];
    dd['f'] = b;
  }

  //rect.setBounds(dd);
  //rect.setMap(googleMap.map);

  googleMap.drawMarker(dd.getCenter());
  googleMap.fitBounds(dd);
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

function findSaferDistrict(bors) {
  if (Object.keys(bors).length == 0) return;

  let min = null,
    counter = 0;

  let disTemp = [];
  for (let b in bors) {
    if (bors[b] == false) {
      counter++;
      continue;
    }
    disTemp.push(data[b]['districts']);
  }

  if (counter == Object.keys(disTemp).length) return;

  let distList = dataManager.getSaferDistricts(disTemp);

  for (let x = 0; x < 1; x++) {
    let dist1 = distList[x];
    let name = dataManager.getBoroughName(distList[x]['properties']['BoroCD']);

    console.log(dist1);
    console.log(name);

    googleMap.drawDistrict(dist1['geometry']['coordinates'], name, dist1['geometry']['middle']);
  }
}

function findAffordableDistrict(bors) {
  if (Object.keys(bors).length == 0) return;

  let min = null,
    counter = 0;

  let disTemp = [];
  for (let b in bors) {
    if (bors[b] == false) {
      counter++;
      continue;
    }
    disTemp.push(data[b]['districts']);
  }

  if (counter == Object.keys(bors).length) return;

  let distList = googleMap.getNearestDistricts(disTemp, INIT_POINT);

  for (let x = 0; x < 4; x++) {
    let dist1 = dataManager.findDistrictById(data, distList[x]['id'], distList[x]['boroughId']);
    let name = dataManager.getBoroughName(distList[x]['boroughId']);

    googleMap.drawDistrict(dist1['geometry']['coordinates'], name, dist1['geometry']['middle']);
  }
}

function search(boroughs, parameters) {
  googleMap.clearMarkers();
  googleMap.clearShapes();

  if (parameters["DISTANCE"]) {
    findMinDistance(boroughsButtons);
  } else if (parameters["SAFETY"]) {
    findSaferDistrict(boroughsButtons);
  } else if (parameters["AFFORDABILITY"]) {
    findAffordableDistrict(boroughsButtons);
  } else {
    alert("Select any parameter");
  }
}
