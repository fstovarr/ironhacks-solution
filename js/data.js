const URLS = {
  "neighborhood": 'https://data.cityofnewyork.us/resource/xyye-rtrs.json',
  "districts": "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson",
  "crimes": "https://data.cityofnewyork.us/resource/9s4h-37hy.json",
  "housing": "https://data.cityofnewyork.us/resource/q3m4-ttp3.json"
};

function getURLSByBorough(bb) {
  var urlF = new URLFormer(URLS['neighborhood']);
  let finurl = {};

  let condition = "upper(borough) = '" + bb + "'";
  urlF.where(condition)
    .limit(10000);

  finurl['neighborhood'] = urlF.finalurl;
  urlF.clear();

  urlF.setEndPoint(URLS['crimes']);
  condition = "boro_nm = '" + bb + "' and cmplnt_fr_dt > '2010-01-01T00:00:00.000'" +
    "and latitude IS NOT NULL and longitude IS NOT NULL";
  urlF.select("ky_cd,ofns_desc,boro_nm,latitude,longitude,law_cat_cd")
    .where(condition)
    .limit(1000);

  finurl['crimes'] = urlF.finalurl;
  urlF.clear();

  urlF.setEndPoint(URLS['housing']);
  condition = "upper(borough) = '" + bb + "' and ((latitude IS NOT NULL and longitude IS NOT NULL)" +
    " or (latitude_internal IS NOT NULL AND longitude_internal IS NOT NULL))";
  urlF.select("project_name,house_number,street_name,borough,latitude,longitude,latitude_internal," +
      "longitude_internal,building_completion_date,extended_affordability_status,prevailing_wage_status," +
      "extremely_low_income_units,very_low_income_units,low_income_units,moderate_income_units,middle_income_units," +
      "other_income_units,total_units")
    .where(condition)
    .limit(10000);

  finurl['housing'] = urlF.finalurl;
  urlF.clear();

  return finurl;
}

function makeHTTPRequest(keys, urls, bor) {
  for (let i in keys) {
    $.get(urls[keys[i]], function() {}).done(function(data) {
      bor[keys[i]] = data;
    }).fail();
  }
}

function DataManager() {
  // Construct boroughs map to manage data
  let bor = {};
  var finalURLS = URLS;

  for (let b in BOROUGHS) {
    bor[BOROUGHS[b]] = {};

    finalURLS = getURLSByBorough(BOROUGHS[b]);
    makeHTTPRequest(Object.keys(finalURLS), finalURLS, bor[BOROUGHS[b]]);
  }
  // var boundsNY = new google.maps.LatLngBounds();
  const dataM = this;

  $.get(URLS['districts'], function() {}).done(function(data) {
    let f = JSON.parse(data).features;
    // Organize JSON into boroughs
    for (let x in f) {
      let bId = dataM.getBoroughName(f[x]['properties']['BoroCD']);
      let acy = 0,
        acx = 0,
        asx = 0,
        asy = 0;

      if (bId != null) {
        let cor = f[x]['geometry']['coordinates'];
        let bb = new google.maps.LatLngBounds();

        for (let y = 0; y < cor.length; y++) {
          let sumx = 0,
            sumy = 0,
            totx = 0,
            toty = 0;
          for (let z = 0; z < cor[y].length; z++) {
            if (cor[y][z][0] != null && cor[y][z][1] != null) {
              let yz0 = 0,
                yz1 = 0;

              if (f[x]['geometry']['type'] != "Polygon") {
                yz0 = parseFloat(cor[y][z][0][0]);
                yz1 = parseFloat(cor[y][z][0][1]);
                sumx += yz0;
                sumy += yz1;
                totx++;
                toty++;
              } else {
                yz0 = parseFloat(cor[y][z][0]);
                yz1 = parseFloat(cor[y][z][1]);
                sumx += yz0;
                sumy += yz1;
                totx++;
                toty++;
              }
              let latlng = new google.maps.LatLng(parseFloat(yz0), parseFloat(yz1));
              bb.extend(latlng);

              // boundsNY.extend(new google.maps.LatLng(parseFloat(yz1), parseFloat(yz0)));
            }
          }

          acx += parseFloat(sumx / totx);
          acy += parseFloat(sumy / toty);
          asx++;
          asy++;
        }

        f[x]['geometry']['average'] = {
          lng: parseFloat(acx / asx),
          lat: parseFloat(acy / asy)
        };

        f[x]['geometry']['middle'] = {
          lat: (bb['b']['b'] + bb['b']['f']) / 2,
          lng: (bb['f']['b'] + bb['f']['f']) / 2
        };

        if (typeof bor[bId]['districts'] === 'undefined') {
          bor[bId]['districts'] = [];
        }

        bor[bId]['districts'].push(f[x]);
      } else {
        console.log("ERROR" + f[x]['properties']['BoroCD']);
      }
    }
  }).fail();

  console.log(bor);

  // this.boundsNewYork = boundsNY;
  this.result = bor;
  this.keys = Object.keys(URLS);
}

DataManager.prototype.findDistrictById = function(data, internalId, boroughId) {
  let name = this.getBoroughName(boroughId);

  if (name == null) {
    console.log("Error");
    return;
  }

  for (let x = 0; x < data[name]['districts'].length; x++) {
    if (data[name]['districts'][x]['id'] == internalId) {
      return data[name]['districts'][x];
    }
  }
}

DataManager.prototype.getBoroughName = function(ids) {
  let id = Math.floor(ids / 100);

  if (id <= BOROUGHS.length && id > 0) {
    return BOROUGHS[id - 1];
  } else {
    return null;
  }
}

function addLatLng(a, b, map) {
  map['latlng'] = {
    lat: a,
    lng: b
  };
}

DataManager.prototype.getDataFromURLS = function() {
  return this.result;
}

DataManager.prototype.getKeysURLS = function() {
  return this.keys;
}
