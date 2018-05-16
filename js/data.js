const URLS = {
  "neighborhood": 'https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json',
  "districts": "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson",
  "crimes": "https://data.cityofnewyork.us/resource/9s4h-37hy.json",
  "housing": "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json"
};

function DataManager() {
  // Construct boroughs map to manage data
  let bor = {};

  // Obtain crimes
  let urlF = new URLFormer(URLS['crimes']);
  let crime = {};

  for (let b of BOROUGHS) {
    bor[b] = {};
    bor[b]['districts'] = [];
    bor[b]['housings'] = [];
    bor[b]['neighborhood'] = [];

    urlF.clear();
    let condition = "boro_nm = '" + b + "' and cmplnt_fr_dt > '2010-01-01T00:00:00.000'" +
      "and latitude IS NOT NULL and longitude IS NOT NULL";
    urlF.select("ky_cd,ofns_desc,boro_nm,latitude,longitude,law_cat_cd")
      .where(condition)
      .limit(100);

    $.get(urlF.finalurl, function() {}).done(function(data) {
      for (let x in data) {
        addLatLng(Number(data[x]['latitude']), Number(data[x]['longitude']), data[x]);
      }
      bor[b]['crimes'] = data;
    }).fail(function(error) {
      console.log(error);
    });
  }

  for (let key in URLS) {
    // Skip crimes
    if (key == Object.keys(URLS)[2]) {
      continue;
    }

    const dataM = this;
    $.get(URLS[key], function(data) {})
      .done(function(data) {
        switch (key) {
          case Object.keys(URLS)[0]:
            var dd = data.data;

            for (let i in dd) {
              bor[dd[i][16].toUpperCase()]['neighborhood'].push(dd[i]);

              let cor = dd[i][9];
              cor = cor.substring(7, cor.length - 1);
              let index = cor.indexOf(' ');

              addLatLng(Number(cor.substring(index + 1, cor.length)), Number(cor.substring(0, index)), dd[i]);
            }
            break;
          case Object.keys(URLS)[1]:
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
                let bounds = [];
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

                      bb.extend(new google.maps.LatLng(parseFloat(yz0), parseFloat(yz1)));
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

                // TODO arreglar bounding box
                f[x]['geometry']['middle'] = {
                  lat: (bb['b']['b'] + bb['b']['f']) / 2,
                  lng: (bb['f']['b'] + bb['f']['f']) / 2
                };

                bor[bId]['districts'].push(f[x]);
              } else {
                console.log("ERROR" + f[x]['properties']['BoroCD']);
              }
            }
            break;
          case Object.keys(URLS)[3]:
            let d = data.data;
            for (let x = 0; x < d.length; x++) {
              let s = d[x][15];
              bor[s.toUpperCase()]['housings'].push(d[x]);

              if (d[x][23] != null && d[x][24] != null) {
                addLatLng(Number(d[x][23]), Number(d[x][24]), d[x]);
              }
            }
            break;
          default:
            break;
        }
      })
      .fail(function(error) {
        console.log(error);
      });
  }

  //console.log(bor);

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
