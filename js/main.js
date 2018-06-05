// Principal palette #646E74, #262D31, #D4D5D8, #A3A7AD, #448F9C

// Variable declarations
var lightsButton, parametersButtons = {},
  boroughsButtons = {},
  buttonsGroup = [],
  heatMapButton;
var googleMap, dataManager, idsDataBases, data, table;
var numberDistrictsToShow = 1;

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
  table = $('#tableActualRank');

  $('#sidebarCollapse').on('click', function() {
    //$('#sidebar').toggleClass('active');
  });

  $('#closePanelRight').on('click', function() {
    $('#panel-right').hide(200);
  });

  $('#findSubmenu').on('click', function() {
    $('#floatingNavbar').show(500);
  });

  $('#statsSubmenu').on('click', function() {
    $('#floatingNavbar').hide(500);
    $('#panel-right').show(200);
  });

  $('#downloadSubmenu').on('click', function() {
    let u = new Utils();
    u.downloadCSV("analyzed-data.csv", finalList);
  });

  $('.components').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  lightsButton = $('#switchModeButton').on('click', switchMode);
  let sb = $('#safetyButton');
  let ab = $('#affordabilityButton');
  let db = $('#distanceButton');

  $('#parametersButtons').on('change', function(event) {
    parametersButtons["SAFETY"] = sb[0].control.checked;
    parametersButtons["AFFORDABILITY"] = ab[0].control.checked;
    parametersButtons["DISTANCE"] = db[0].control.checked;

    search(boroughsButtons, parametersButtons);
    $(".target").effect("highlight", {
      color: "#669966"
    }, 3000);
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
    // search(boroughsButtons, parametersButtons);
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

var finalList = [];

function filterByWeightedParameters(d, s, a, bors) {
  if (Object.keys(bors).length == 0) return;
  finalList = [];

  let disTemp = [];
  let bb = null;

  for (let b in bors) {
    if (bors[b] == true) {
      disTemp.push(data[b]['districts']);
    }
  }

  if (disTemp.length == 0) return;

  let safeList = dataManager.getSaferDistricts(disTemp);
  let distList = googleMap.getNearestDistricts(disTemp, INIT_POINT);
  let afforList = googleMap.getAffordableDistricts(disTemp);

  for (let b = 0; b < safeList['result'].length; b++) {
    let dist = ((distList['result'][b]['distance'] - distList['min']) /
      (distList['max'] - distList['min'])) * d;
    let safe = ((safeList['result'][b]['crimes'] - safeList['min']) /
      (safeList['max'] - safeList['min'])) * s;
    let affo = ((afforList['result'][b]['low_income_units'] - afforList['min']) /
      (afforList['max'] - afforList['min'])) * a;

    if (afforList['result'][b]['id'] % 100 > 25) {
      continue;
    }

    finalList.push({
      value: (dist + safe + (1 - affo)),
      distance: Math.round(distList['result'][b]['distance'] / 10) / 100 + " kms",
      crimes: safeList['result'][b]['crimes'],
      affordability: afforList['result'][b]['low_income_units'],
      id: afforList['result'][b]['id'],
      borough: dataManager.getBoroughName(afforList['result'][b]['id'])
    });
  }

  finalList.sort(function(a, b) {
    return a['value'] - b['value'];
  });

  let districtsToShow = [];

  let lastIndex = 0;

  for (let x = 0; x < numberDistrictsToShow; x++) {
    let br = false;

    if (lastIndex + 1 >= finalList.length) {
      break;
    }

    while (finalList[lastIndex]['id'] % 100 > 25) {
      if (lastIndex + 1 >= finalList.length) {
        br = true;
        break;
      }
      lastIndex++;
    }

    if (br) break;

    let dist1 = dataManager.findDistrictById(data, finalList[lastIndex]['id']);

    if (x == 0) {
      bb = dist1['geometry']['boundbox'];
    } else {
      bb.union(dist1['geometry']['boundbox']);
    }

    for (let hou of dist1['housing']) {
      googleMap.drawMarker(hou['lat_lng'], 'circle');
    }

    districtsToShow.push(dist1);
    lastIndex++;
  }

  table.bootstrapTable({
    onClickRow: function(row, element, field) {
      let dis = dataManager.findDistrictById(data, row['id']);
      googleMap.drawDistricts([dis]);
      $("#closePanelRight").click();
      googleMap.fitBounds(dis['geometry']['boundbox']);
    }
  });
  table.bootstrapTable('load', finalList);

  googleMap.drawDistricts(districtsToShow, name, 'district');

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

  //googleMap.drawMarker(dd.getCenter());
  googleMap.fitBounds(dd);
}

function search(boroughs, parameters) {
  googleMap.clearMarkers();
  googleMap.clearShapes();

  let d = 0,
    s = 0,
    a = 0;

  if (parameters["DISTANCE"]) {
    d = 1;
  }
  if (parameters["SAFETY"]) {
    s = 1;
  }
  if (parameters["AFFORDABILITY"]) {
    a = 1;
  }

  if (d != 0 || s != 0 || a != 00)
    filterByWeightedParameters(d, s, a, boroughs);
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
