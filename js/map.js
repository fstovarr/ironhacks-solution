// Created with https://mapstyle.withgoogle.com/
var addedMarkers = [],
  addedShapes = [],
  polygons = [];
var visualBoroughs = {};

function GoogleMap(init_point) {
  this.init_point = init_point;
  this.nightMode = false;

  this.nightStyleMap = new google.maps.StyledMapType([{
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "poi.business",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#255763"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }
  ], {
    name: "Lights Off!"
  });
  this.defaultStyleMap = new google.maps.StyledMapType([{
      "elementType": "geometry",
      "stylers": [{
        "color": "#ebe3cd"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#523735"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#f5f1e6"
      }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#c9b2a6"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#dcd2be"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#ae9e90"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#93817c"
      }]
    },
    {
      "featureType": "poi.business",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#a5b076"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#447530"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#f5f1e6"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fdfcf8"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#f8c967"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#e9bc62"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e98d58"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#db8555"
      }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#806b63"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8f7d77"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#ebe3cd"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#b9d3c2"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#92998d"
      }]
    }
  ], {
    name: "Lights On!"
  });
}

function MapControl(controlDiv, map, listener, name) {
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '24px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = name;
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', listener);
}

function createCenterControl(map, listener) {
  var centerDiv = document.createElement('div');
  var centerControl = new MapControl(centerDiv, map, listener, "Center");

  centerDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerDiv);
}

function createHeatmapControl(map, listener) {
  var div = document.createElement('div');
  var control = new MapControl(div, map, listener, "Crimes in NY");

  div.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(div);
}

// https://developers.google.com/maps/documentation/javascript/maptypes
GoogleMap.prototype.showMap = function(listenerCenter, listenerHeatmap) {
  var mapOptions = {
    zoom: 18,
    center: INIT_POINT,
    mapTypeId: 'roadmap',
    heading: 90,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['night_style', 'default_style'],
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };

  this.map = new google.maps.Map(document.getElementById('mapContainer'),
    mapOptions);

  createCenterControl(this.map, listenerCenter);
  createHeatmapControl(this.map, listenerHeatmap);

  var marker = new google.maps.Marker({
    position: INIT_POINT,
    map: this.map
  });

  this.map.mapTypes.set('night_style', this.nightStyleMap);
  this.map.mapTypes.set('default_style', this.defaultStyleMap);

  this.map.setMapTypeId('night_style');

  // When the user clicks, set 'isColorful', changing the color of the letters.
  this.map.data.addListener('click', function(event) {
    for (let v of addedShapes) {
      if (v.getProperty('districtId') == event.feature.getProperty('districtId')) {
        if (!v.getProperty('isColorful')) {
          this.map.data.overrideStyle(v, {
            strokeWeight: 8
          });
        } else {
          this.map.data.revertStyle(v);
        }
        v.setProperty('isColorful', !v.getProperty('isColorful'));
      }
    }
  });
}

GoogleMap.prototype.changeToNightMode = function() {
  if (this.nightMode == true) {
    this.nightMode = false;
    this.map.setMapTypeId('night_style');
  } else {
    this.nightMode = true;
    this.map.setMapTypeId('default_style');
  }
}

GoogleMap.prototype.isNightMode = function() {
  return this.nightMode;
}

GoogleMap.prototype.drawHousings = function(data) {
  let lg = 24,
    lt = 25;
  for (let d in data) {
    if (data[d][lt] != null && data[d][lg] != null) {
      let point = {
        lat: Number(data[d][lt]),
        lng: Number(data[d][lg])
      };
      drawMarker(point, 'circle');
    } else {
      //console.log("null");
    }
  }
}

GoogleMap.prototype.drawDistrictsInBorough = function(borough, name, show) {
  if (show) {
    this.drawDistricts(borough['districts']);

    this.map.data.setStyle(function(feature) {
      let color = new Utils().getRandomColors(5, feature.getProperty('boroughId'))[BOROUGHS.indexOf(feature.getProperty('boroughId'))];
      let strokeWeight = 2;

      if (feature.getProperty('isColorful')) {
        strokeWeight = 3;
      }

      return /** @type {google.maps.Data.StyleOptions} */ ({
        fillColor: color,
        strokeColor: color,
        strokeWeight: strokeWeight
      });
    });


  } else {
    this.clear(name, 'districts');
  }
}

GoogleMap.prototype.fitBounds = function(bounds) {
  this.map.fitBounds(bounds);
}

GoogleMap.prototype.clear = function(borough, label) {
  if (visualBoroughs[borough] != null && visualBoroughs[borough][label] != null) {
    //clearElementsInMap(visualBoroughs[borough][label]);
    let ind = 0;
    for (ind = 0; ind < BOROUGHS.length; ind++) {
      if (BOROUGHS[ind] == borough) {
        ind++;
        break;
      }
    }

    let tempMap = this.map;

    this.map.data.forEach(function(feature) {
      if (Math.floor(feature.getProperty('districtId') / 100) == ind) {
        tempMap.data.remove(feature);
      }
    });
  }
}

GoogleMap.prototype.drawNeighborhood = function(data) {
  let coordinates = [];
  for (let i = 0; i < data.length; i++) {
    let cor = data[i][9];
    cor = cor.substring(7, cor.length - 1);
    let index = cor.indexOf(' ');

    coordinates[i] = {
      lng: Number(cor.substring(0, index)),
      lat: Number(cor.substring(index + 1, cor.length))
    };

    drawMarker(coordinates[i], 'circle');
  }
  return coordinates;
}

GoogleMap.prototype.drawMarker = function(coordinate, style) {
  let marker = new google.maps.Marker({
    position: coordinate
  });

  // if (style == 'circle') {
  var circle = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .8,
    scale: 6,
    strokeColor: 'white',
    strokeWeight: 1
  };

  marker.setIcon(circle);
  // }  console.log(coordinate);

  marker.setMap(this.map);

  addedMarkers.push(marker);
  return marker;
}

GoogleMap.prototype.drawDistricts = function(data) {
  for (let i = 0; i < data.length; i++) {
    let borough = dataManager.getBoroughName(data[i]['properties']['BoroCD']);
    let id = data[i]['properties']['BoroCD'];
    let colors = new Utils().getRandomColors(data.length, borough);
    let coordinates = data[i]['geometry']['coordinates'];

    if (typeof data[i]['geometry']['shapes'] === 'undefined') {
      data[i]['geometry']['shapes'] = [];
    }

    for (let j = 0; j < coordinates.length; j++) {
      let fCoordinates;

      if (coordinates.length > 1) {
        if (isNumber(coordinates[j][0][0])) {
          fCoordinates = formatCoordinates(coordinates[j]);
        } else {
          fCoordinates = formatCoordinates(coordinates[j][0]);
        }
      } else {
        fCoordinates = formatCoordinates(coordinates[j]);
      }

      data[i]['geometry']['shapes'].push(drawPolygon(fCoordinates, borough, id, 'districts', colors[i], this.map));
    }
  }
}

function drawPolygon(coordinate, borough, id, label, color, map) {
  let feature = new google.maps.Data.Feature();
  feature.setGeometry(new google.maps.Data.Polygon([coordinate]));
  feature.setProperty('boroughId', borough);
  feature.setProperty('districtId', id);
  map.data.add(feature);

  addedShapes.push(feature);

  if (visualBoroughs[borough] == null) {
    visualBoroughs[borough] = {};
  }
  if (visualBoroughs[borough][label] == null) {
    visualBoroughs[borough][label] = [];
  }

  visualBoroughs[borough][label].push(feature);

  return new google.maps.Polygon({
    path: coordinate
  });
}

function formatCoordinates(coordinate) {
  let r = [];
  for (let i = 0; i < coordinate.length; i++) {
    r[i] = {
      lng: Number(coordinate[i][0]),
      lat: Number(coordinate[i][1])
    };
  }

  return r;
}

GoogleMap.prototype.centerMap = function(coordinates, zoom) {
  this.map.panTo(coordinates);
  var mmap = this.map;
  google.maps.event.addListenerOnce(this.map, 'idle', function() {
    mmap.setZoom(zoom);
    mmap = null;
  })
}

function clearElementsInMap(map, elements) {
  for (let v of elements) {
    map.data.remove(v);
  }
  elements = [];
}

GoogleMap.prototype.clearMarkers = function() {
  for (let v of addedMarkers) {
    v.setMap(null);
  }
}

GoogleMap.prototype.clearShapes = function() {
  clearElementsInMap(this.map, addedShapes);
}

GoogleMap.prototype.getAffordableDistricts = function(districts) {
  let r = [];
  let max = null,
    min = null;

  for (let x = 0; x < districts.length; x++) {
    for (let y = 0; y < districts[x].length; y++) {
      if (typeof districts[x][y]['low_income_units'] === 'undefined') {
        districts[x][y]['low_income_units'] = 0;
      }

      let new_housing = [];

      if (typeof districts[x][y]['calc_housing'] === 'undefined') {
        for (let z = 0; z < districts[x][y]['housing'].length; z++) {
          for (let shape of districts[x][y]['geometry']['shapes']) {
            if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(districts[x][y]['housing'][z]['lat_lng']),
                shape)) {

              new_housing.push(districts[x][y]['housing'][z]);

              let n1 = parseFloat(districts[x][y]['housing'][z]['extremely_low_income_units']),
                n2 = parseFloat(districts[x][y]['housing'][z]['very_low_income_units']),
                n3 = parseFloat(districts[x][y]['housing'][z]['low_income_units']);

              let total = 0;

              if (isNumber(n1)) {
                total += n1;
              }

              if (isNumber(n3)) {
                total += n3;
              }

              if (isNumber(n3)) {
                total += n2;
              }

              // console.log(districts[x][y]);
              districts[x][y]['low_income_units'] += total;
              // console.log(districts[x][y]);
            }
          }
        }
      }

      districts[x][y]['housing'] = new_housing;
      districts[x][y]['calc_housing'] = true;

      let c = districts[x][y]['low_income_units'];

      if (max == null) {
        max = c;
      } else {
        max = c > max ? c : max;
      }
      if (min == null) {
        min = c;
      } else {
        min = c < min ? c : min;
      }

      let a = {
        low_income_units: c,
        id: districts[x][y]['properties']['BoroCD']
      }
      r.push(a);
    }
  }

  return {
    result: r,
    min: min,
    max: max
  };
}

GoogleMap.prototype.getNearestDistricts = function(districts, point) {
  let r = [];
  let max = null,
    min = null;

  for (let x = 0; x < districts.length; x++) {
    for (let y = 0; y < districts[x].length; y++) {
      let c = this.distancePointToDistrict(districts[x][y], point);
      districts[x][y]['distance'] = c;

      if (max == null) {
        max = c;
      } else {
        max = c > max ? c : max;
      }
      if (min == null) {
        min = c;
      } else {
        min = c < min ? c : min;
      }

      let a = {
        distance: c,
        id: districts[x][y]['properties']['BoroCD']
      }
      r.push(a);
    }
  }

  return {
    result: r,
    min: min,
    max: max
  };
}

GoogleMap.prototype.isDataHeatmapLoaded = function() {
  return typeof this.heatMapLayer !== 'undefined';
}

GoogleMap.prototype.showHeatMap = function(d) {
  if (typeof d === 'undefined') {
    if (this.heatMapLayer.getMap() == null) {
      this.heatMapLayer.setMap(this.map);
      googleMap.centerMap(CENTER_NY, 11);
    } else {
      this.heatMapLayer.setMap(null);
    }
  } else {
    if (!this.isDataHeatmapLoaded()) {
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: d
      });

      heatmap.setMap(this.map);

      var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ];
      // heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

      this.heatMapLayer = heatmap;
    }
  }
}

function isNumber(n) {
  return isFinite(n) && !isNaN(parseFloat(n));
}

GoogleMap.prototype.distancePointToDistrict = function(district, point) {
  return this.distanceBeetwen(district['geometry']['middle'], point);
  // return this.distanceBeetwen(district['geometry']['average'], point);
}

GoogleMap.prototype.distanceBeetwen = function(origin, destination) {
  let or = new google.maps.LatLng(origin);
  // console.log(or);
  return google.maps.geometry.spherical.computeDistanceBetween(or, new google.maps.LatLng(destination));
}

GoogleMap.prototype.zoom = function(z) {
  this.map.setZoom(z);
}
