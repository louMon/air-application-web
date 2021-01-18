import { drawQhawaxMap  } from '../lib/mapAssets.js';
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

import {goToForecasting, goToSpatialRealTime, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
dropdownLegend,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile,
spatialRealTime,
spatialRealTimeMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewMap} from '../lib/HtmlComponents.js'
import { createMarkers, 
putMarker,
getDistanceFromLatLonInKm,
deg2rad,
getMarker,
lookfor_left_point,
lookfor_right_point,
lookfor_upper_point,
lookfor_lower_point } from '../lib/mapUtils.js';

var positionlat_list = [-12.1030555555556,-12.0466667, -12.0411358, -12.04000000, -12.050278, -12.044182, -12.006479,];
var positionlon_list = [-76.9891666666667,-77.0802777, -77.0435054, -77.01583333, -77.026111, -77.050756, -77.058347];
var distance = 300
let matrix_seleccionados = []

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
  return matrix

}

const generatePositions = () => {
	
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = forecasting + spatialRealTime + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+forecastingMobile +spatialRealTimeMobile+ spatialHistoricalMobile;
	mapElem.innerHTML = viewMap;

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

	const spatialRealTimeBtn = document.querySelector('#spatial-real-time-menu');
	const spatialRealTimeMobBtn = document.querySelector('#spatial-real-time-menu-mobile');

	const spatialHistoricalBtn = document.querySelector('#spatial-historical-menu');
	const spatialHistoricalMobBtn = document.querySelector('#spatial-historical-menu-mobile');

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);
	const modals2 = document.querySelectorAll('.modal');
	M.Modal.init(modals2);
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	forecastingBtn.addEventListener('click',()=> goToForecasting());
	forecastingMobBtn.addEventListener('click',()=> goToForecasting());

	spatialRealTimeBtn.addEventListener('click',()=> goToSpatialRealTime());
	spatialRealTimeMobBtn.addEventListener('click',()=> goToSpatialRealTime());

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());
	// hazta aqui todo el menu

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: new google.maps.LatLng(-12.0728433,-77.0817491),
		zoom: 8,
    fullscreenControl: true,
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
	});

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

	createMarkers(map, positionlat_list,positionlon_list)
  var destinations = new google.maps.MVCArray();
  var matrix_points=initialize(map, distance,points_y, points_x, mean_lat,the_most_left_lon-0.037303);
  var polyline = null;
  var polygon_points = null;
  var times =0;
  google.maps.event.addListener(map, 'click',function(e){
    console.log(times)
    if(times>0 && times<4){
      console.log("Entre a times =0")
      console.log("Click to create point");
      var currentPath = polyline.getPath();
      currentPath.push(e.latLng);
      times=times+1;
    }
    if(times==0){
      console.log("Entre a times =0")
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

	return mapElem;
};

export { generatePositions };
