import loadGoogleMapsApi from 'load-google-maps-api';
import {API_options } from './Maps/maps_utils';
var geocoder;
var map;

let locations = {};
let matrix_seleccionados = []


$(function() {
  loadGoogleMapsApi(API_options).then(function (googleMaps) {
    var positionlat_list = [-12.1030555555556,-12.0466667, -12.0411358, -12.04000000, -12.050278, -12.044182, -12.006479,];
    var positionlon_list = [-76.9891666666667,-77.0802777, -77.0435054, -77.01583333, -77.026111, -77.050756, -77.058347];
    var distance = 300

    var the_most_left_lon = lookfor_left_point(positionlon_list);
    var the_most_right_lon = lookfor_right_point(positionlon_list);
    var the_most_upper_lat = lookfor_upper_point(positionlat_list);
    var the_most_lower_lat = lookfor_lower_point(positionlat_list);

    var mean_lat = (the_most_upper_lat + the_most_lower_lat)/2;
    var distance_y = 1000*(getDistanceFromLatLonInKm(mean_lat, the_most_left_lon-0.037303, mean_lat,the_most_right_lon+0.037303));
    var distance_y_between = 250
    var points_y = Math.ceil(distance_y / distance_y_between);

    var distance_x = 1000*(getDistanceFromLatLonInKm(the_most_lower_lat, the_most_left_lon-0.037303, the_most_upper_lat,the_most_left_lon-0.037303));
    var distance_x_between = 200
    var points_x = Math.ceil(distance_x / distance_x_between);

    map = new google.maps.Map(document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(-12.0728433,-77.0817491),
      zoom: 8,
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    createMarkers(map, positionlat_list,positionlon_list)
    var destinations = new google.maps.MVCArray();
    
    var matrix_points=initialize(map, distance,points_y, points_x, mean_lat,the_most_left_lon-0.037303) 
    var polyline = null
    var polygon_points = null
    var times =0
    google.maps.event.addListener(map, 'click',function(e){
      //console.log(times)
      if(times>0 && times<4){
        //console.log("Entre a times =0")
        //console.log("Click to create point");
        var currentPath = polyline.getPath();
        currentPath.push(e.latLng);
        times=times+1;
      }
      if(times==0){
        //console.log("Entre a times =0")
        destinations.push(e.latLng);
        var polygonOptions = {path: destinations, strokeColor:"#ff0000", fillColor:"#00ff00"};
        polygon_points = new google.maps.Polygon(polygonOptions);
        polygon_points.setMap(map);
        polyline = new google.maps.Polyline(polygonOptions);
        times=times+1;
      }
      var index_seleccionados=0
      if(times==4){
        for (var i = 0; i < matrix_points.length; i++) {
          var lat = matrix_points[i][0]
          var lon = matrix_points[i][1]
          var position = new google.maps.LatLng(lat, lon);

          var result =
              google.maps.geometry.poly.containsLocation(position, polygon_points) ?
              'Seleccionado' :
              'No seleccionado';

          if(result=='Seleccionado'){
            console.log("Seleccionadoooooo");
            console.log(matrix_points[i]);
            matrix_seleccionados[index_seleccionados] = new Array(2);
            matrix_seleccionados[index_seleccionados][0]=matrix_points[i][0]
            matrix_seleccionados[index_seleccionados][1]=matrix_points[i][1]
            index_seleccionados+=1
          }
        } 
      }

    });

  });

});

$('input[name="submit_points"]').click(function(){
    console.log("hice click en getBDPoints");
    getPredictLocation();
});

$('input[name="submit_saved"]').click(function(){
    console.log("hice click Save Points");
    console.log(matrix_seleccionados.length)
    if(matrix_seleccionados.length>0){
      for (var i = 0; i < matrix_seleccionados.length; i++) {
          var lat = matrix_seleccionados[i][0]
          var lon = matrix_seleccionados[i][1]
          savePredictLocation(lat,lon)
      } 
    }else{
      console.log("No hay puntos seleccionados")
    }
});

function createMarkers(map, positionlat_list,positionlon_list){
  for (var i = 0; i < positionlon_list.length; i++) {
    var myLatLng = {lat:positionlat_list[i], lng: positionlon_list[i]};
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Qhawax '+ i,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png'
    });
  }
}

function putMarker(map, coordinates){
  var myLatLng = {lat:coordinates['lat'], lng: coordinates['lon']};
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Qhawax '
  });

}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getMarker(map,position1, position2,distance,i){
  //position 1 es la direccion o rumbo que tomaremos, position 2 es la posicion inicial
  var marker1meter = new google.maps.Marker({
      position: google.maps.geometry.spherical.computeOffset(position2,distance*i, google.maps.geometry.spherical.computeHeading(position2, position1)),
      map: map,
      title:  "# meter",
      icon: {
        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
        size: new google.maps.Size(7, 7),
        anchor: new google.maps.Point(3.5, 3.5)
      }
    })
  return marker1meter;
}

//faltaria agregar esta funcion cada vez que capturo una posicion, todo donde dice aqui
function savePredictLocation(lat,lon) {
  $.ajax({
    url: '/api/save_tiles/',
    data: JSON.stringify({lat: lat, lon: lon}),
    contentType: 'application/json; charset=UTF-8',
    type: 'POST'
  }).done(function(response) {
    console.log("Los valores fueron agregados!");
    //createAlert('Los valores fueron agregados!', 'alert-success', $('#modal_location .modal-body>form'));
  }).fail(function(response) {
    console.log("Hubo un error al guardar los valores");
    //createAlert('Hubo un error al guardar los valores', 'alert-danger', $('#modal_location .modal-body>form'));
  });
}

//faltaria agregar esta funcion cada vez que capturo una posicion, todo donde dice aqui
function getPredictLocation() {
  $.ajax({
    url: '/api/get_tiles/',
    contentType: 'application/json; charset=UTF-8',
    type: 'GET'
  }).done(function(response) {
    console.log("Los puntos son los siguientes!");
    console.log(response)
    for (let ind=0; ind < response.length; ind++) {
      let coordinates = {'lat': response[ind]['lat'], 'lon': response[ind]['lon']};
      putMarker(map, coordinates)
      console.log(coordinates)
    }
    //createAlert('Los valores fueron agregados!', 'alert-success', $('#modal_location .modal-body>form'));
  }).fail(function(response) {
    console.log("Hubo un error al guardar los valores");
    //createAlert('Hubo un error al guardar los valores', 'alert-danger', $('#modal_location .modal-body>form'));
  });
}


function lookfor_left_point(positionlon_list){
  var the_most_left=180
  for (var i = 0; i < positionlon_list.length; i++) {
    if(positionlon_list[i]<the_most_left){
      the_most_left = positionlon_list[i]
    }
  }
  console.log("The most left: ",the_most_left);
  return the_most_left;
}

function lookfor_right_point(positionlon_list){
  var the_most_right=-180
  for (var i = 0; i < positionlon_list.length; i++) {
    if(positionlon_list[i]>the_most_right){
      the_most_right = positionlon_list[i]
    }
  }
  console.log("The most right: ",the_most_right);
  return the_most_right;
}

function lookfor_upper_point(positionlat_list){
  var the_most_upper=-90
  for (var i = 0; i < positionlat_list.length; i++) {
    if(positionlat_list[i]>the_most_upper){
      the_most_upper = positionlat_list[i]
    }
  }
  console.log("The most upper: ",the_most_upper);
  return the_most_upper;
}

function lookfor_lower_point(positionlat_list){
  var the_most_lower=90
  for (var i = 0; i < positionlat_list.length; i++) {
    if(positionlat_list[i]<the_most_lower){
      the_most_lower = positionlat_list[i]
    }
  }
  console.log("The most lower: ",the_most_lower);
  return the_most_lower;
}


function initialize(map, distance, nropuntos_y,nropuntos_x, puntoinicial_lat,puntoinicial_lng ) {
  var matrix = [];

  var initPosition = new google.maps.LatLng(puntoinicial_lat, puntoinicial_lng);

  var rigthSide    = new google.maps.LatLng(puntoinicial_lat, puntoinicial_lng+0.0037303);

  var bottomSide   = new google.maps.LatLng(puntoinicial_lat-0.000600, puntoinicial_lng);
  
  var boundsRightSide = new google.maps.LatLngBounds();
  boundsRightSide.extend(rigthSide);
  boundsRightSide.extend(initPosition);
  map.fitBounds(boundsRightSide);

  var boundsBottomSide = new google.maps.LatLngBounds();
  boundsBottomSide.extend(bottomSide);
  boundsBottomSide.extend(initPosition);
  map.fitBounds(boundsBottomSide);

  var initMarker = new google.maps.Marker({
    position: initPosition,
    map: map,
    title: "" + 1,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    }
  });

  var rightMarker = new google.maps.Marker({
    position: rigthSide,
    map: map,
    title: "" + 2,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    }
  });

  var bottomMarker = new google.maps.Marker({
    position: bottomSide,
    map: map,
    title: "" + 3,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    }
  });

  var j = 1;

  var pivotPosition = initPosition;
  var firstPivot = getMarker(map, rigthSide, pivotPosition, 1,1);
  var lat = firstPivot.getPosition().lat();
  var lng = firstPivot.getPosition().lng();
  //console.log("Punto inicial (LAT): ", lat);
  //console.log("Punto inicial (LNG): ", lng);
  //savePredictLocation(lat,lng);
  var p=0

  while(j<nropuntos_x+1){
    var i = 1;
    while (i<nropuntos_y){
      var newMarket = getMarker(map, rigthSide, pivotPosition, distance,i);
      var lat = newMarket.getPosition().lat();
      var lng = newMarket.getPosition().lng();
      matrix[p] = new Array(2);
      matrix[p][0]=lat
      matrix[p][1]=lng
      //savePredictLocation(lat,lng);
      // aqui positions.push(newMarket.getPosition().lat() +","+ newMarket.getPosition().lng());
      i++;
      p++;
    }
    if(j < nropuntos_x){
      var pivotMarket = getMarker(map, bottomSide, pivotPosition, distance,j);
      var lat = pivotMarket.getPosition().lat();
      var lng = pivotMarket.getPosition().lng();
      //savePredictLocation(lat,lng);
      //aqui positions.push(pivotMarket.getPosition().lat() +","+ pivotMarket.getPosition().lng());
      pivotPosition = new google.maps.LatLng(lat, lng);
      rigthSide    = new google.maps.LatLng(lat, lng + 0.037303);
      matrix[p] = new Array(2);
      matrix[p][0]=lat
      matrix[p][1]=lng
      p++
    }
    j++;
  }
  console.log("La matrix: ")
  console.log(matrix)
  return matrix

}





