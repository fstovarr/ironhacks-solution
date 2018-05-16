// Created with https://mapstyle.withgoogle.com/
var addedMarkers = [],
  addedShapes = [];

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
  ]);
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
  ]);
}

// https://developers.google.com/maps/documentation/javascript/maptypes
GoogleMap.prototype.showMap = function() {
  var mapOptions = {
    zoom: 18,
    center: INIT_POINT,
    mapTypeId: 'roadmap',
    heading: 90,
    mapTypeControlOptions: {
      mapTypeIds: ['night_style', 'default_style']
    }
  };

  this.map = new google.maps.Map(document.getElementById('mapContainer'),
    mapOptions);

  var marker = new google.maps.Marker({
    position: INIT_POINT,
    map: this.map
  });

  this.map.mapTypes.set('night_style', this.nightStyleMap);
  this.map.mapTypes.set('default_style', this.defaultStyleMap);

  this.map.setMapTypeId('night_style');
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
      drawMarker(point);
    } else {
      //console.log("null");
    }
  }
}

var visualBoroughs = {};
GoogleMap.prototype.drawDistrictsInBorough = function(borough, name, show) {
  if (show) {
    this.drawDistricts(borough['districts'], name, 'districts');
  } else {
    this.clear(name, 'districts');
  }
}

GoogleMap.prototype.clear = function(borough, label) {
  if (visualBoroughs[borough] != null && visualBoroughs[borough][label] != null) {
    clearElementsInMap(visualBoroughs[borough][label]);
  }
}

GoogleMap.prototype.drawDistricts = function(data, borough, label) {
  let colors = new Utils().getRandomColors(data.length, borough);

  for (let i = 0; i < data.length; i++) {
    let coordinates = data[i]['geometry']['coordinates'];

    for (let j = 0; j < coordinates.length; j++) {
      let fCoordinates;
      if (coordinates.length > 1) {
        fCoordinates = formatCoordinates(coordinates[j][0]);
      } else {
        fCoordinates = formatCoordinates(coordinates[j]);
      }
      drawPolygon(fCoordinates, borough, label, colors[i], this.map);
    }
  }
}

GoogleMap.prototype.drawDistrict = function(coordinates, borough) {
  let colors = new Utils().getRandomColors(data.length, borough);

  for (let j = 0; j < coordinates.length; j++) {
    let fCoordinates;
    if (coordinates.length > 1) {
      fCoordinates = formatCoordinates(coordinates[j][0]);
    } else {
      fCoordinates = formatCoordinates(coordinates[j]);
    }
    drawPolygon(fCoordinates, borough, 'district', colors[0], this.map);
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
    drawMarker(coordinates[i]);
  }
  return coordinates;
}

GoogleMap.prototype.drawMarker = function(coordinate) {
  let marker = new google.maps.Marker({
    position: coordinate,
    map: this.map
  });

  addedMarkers.push(marker);
  return marker;
}

function drawPolygon(coordinate, borough, label, color, map) {
  let polygon = new google.maps.Polygon({
    paths: coordinate,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    map: map
  });

  addedShapes.push(polygon);
  if (visualBoroughs[borough] == null) {
    visualBoroughs[borough] = {};
  }
  if (visualBoroughs[borough][label] == null) {
    visualBoroughs[borough][label] = [];
  }

  visualBoroughs[borough][label].push(polygon);
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

function clearElementsInMap(elements) {
  for (let v of elements) {
    v.setMap(null);
  }
}

GoogleMap.prototype.clearMarkers = function() {
  clearElementsInMap(addedMarkers);
}

GoogleMap.prototype.clearShapes = function() {
  clearElementsInMap(addedShapes);
}

GoogleMap.prototype.getNearestDistricts = function(districts, point) {
  let r = [];

  for (let x = 0; x < districts.length; x++) {
    for (let y = 0; y < districts[x].length; y++) {
      let a = {
        distance: this.distancePointToDistrict(districts[x][y], point),
        id: districts[x][y]['id'],
        boroughId: districts[x][y]['properties']['BoroCD']
      }
      r.push(a);
    }
  }

  r.sort(function(a, b) {
    return a['distance'] - b['distance'];
  });

  return r;
}

GoogleMap.prototype.isDataHeatmapLoaded = function() {
  return typeof this.heatMapLayer !== 'undefined';
}

GoogleMap.prototype.showHeatMap = function(d) {
  if (typeof d === 'undefined') {
    if (this.heatMapLayer.getMap() == null) {
      this.heatMapLayer.setMap(this.map);
    } else {
      this.heatMapLayer.setMap(null);
    }
  } else {
    if (!this.isDataHeatmapLoaded()) {
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: d,
        map: this.map
      });

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
