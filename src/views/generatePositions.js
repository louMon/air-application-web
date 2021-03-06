import { drawQhawaxMap  } from '../lib/mapAssets.js';
import {getGrids, getFondecytQhawax} from '../requests/get.js';
import { sourceSocket } from '../index.js';

import {goToForecasting, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
dropdownLegend,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewPointsManagement} from '../lib/HtmlComponents.js'
import { createMarkers, 
putMarker,
getDistanceFromLatLonInKm,
deg2rad,
getMarker,
lookfor_left_point,
lookfor_right_point,
lookfor_upper_point,
lookfor_lower_point,
createSpecificMarker,
setBounds } from '../lib/mapUtils.js';

import { 
    saveNewGrid,
    deleteAllGrids
}from '../requests/post.js';


let positionlat_list = [-12.045286,-12.050278, -12.041025, -12.044226, -12.0466667, -12.0450749, -12.047538,-12.054722,-12.044236,-12.051526,-12.042525,-12.046736,-12.045394,-12.057582];
let positionlon_list = [-77.030902,-77.026111, -77.043454, -77.050832, -77.080277778, -77.0278449, -77.035366,-77.029722,-77.012467,-77.077941,-77.033486,-77.047594,-77.036852,-77.071778];
var distance = 300
let matrix_seleccionados = []
var distance_y_between = 250
var distance_x_between = 100
var polyline = null;
var polygon_points = null;
var times =0;
let monitoringStations;

function initialize(map, distance, nropuntos_y,nropuntos_x, puntoinicial_lat,puntoinicial_lng ) {
  var matrix = [];

  var initPosition = new google.maps.LatLng(puntoinicial_lat, puntoinicial_lng);
  var rigthSide    = new google.maps.LatLng(puntoinicial_lat, puntoinicial_lng+0.0037303);
  var bottomSide   = new google.maps.LatLng(puntoinicial_lat-0.000600, puntoinicial_lng);
  
  //setBounds(rigthSide,initPosition,map);
  //setBounds(bottomSide,initPosition,map);

  var initMarker = createSpecificMarker(initPosition,map,1);
  var rightMarker = createSpecificMarker(rigthSide,map,2);
  var bottomMarker = createSpecificMarker(bottomSide,map,3);

  var j = 1;
  var pivotPosition = initPosition;
  var firstPivot = getMarker(map, rigthSide, pivotPosition, 1,1);
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
      i++;
      p++;
    }
    if(j < nropuntos_x){
      var pivotMarket = getMarker(map, bottomSide, pivotPosition, distance,j);
      var lat = pivotMarket.getPosition().lat();
      var lng = pivotMarket.getPosition().lng();
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

const savePointsEvent = async (matrix_seleccionados) => {
  if(matrix_seleccionados.length>0){
    for (var i = 0; i < matrix_seleccionados.length; i++) {
        var lat = matrix_seleccionados[i][0]
        var lon = matrix_seleccionados[i][1]
        saveNewGrid(lat,lon)
    } 
  }
};

function deleteFigure(polyline) {
  polyline.setMap(null);
}

const getPoints = async (map) => {
  const json_points = await getGrids();
  console.log(json_points);
  for (let ind=0; ind < json_points.length; ind++) {
    let coordinates = {'lat': json_points[ind]['lat'], 'lon': json_points[ind]['lon']};
    console.log(coordinates);
    putMarker(map, coordinates);
  }
};

const deleteAllPoints = async (map) => {
  deleteAllGrids();
  console.log("Puntos borrados");
};

const setMarkers = async (map) => {
  monitoringStations = await getFondecytQhawax();
  createMarkers(map, monitoringStations);
};

const generatePositions = () => {
	
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = forecasting + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+forecastingMobile + spatialHistoricalMobile;
	mapElem.innerHTML = viewPointsManagement;

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

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

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: new google.maps.LatLng(-12.048156, -77.076242),
		zoom: 13,
    fullscreenControl: true,
    mapTypeControl: true,
    mapTypeId: "hybrid"
	});

  const savePointsBtn =mapElem.querySelector('#save');
  const getPointsBtn = mapElem.querySelector('#get-all-grids');
  const deleteAllPointsBtn = mapElem.querySelector('#delete-all-grids');

  savePointsBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      savePointsEvent(matrix_seleccionados);
  });

  getPointsBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      getPoints(map);
  });

  deleteAllPointsBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      deleteAllPoints(map);
  });

  setMarkers(map);

  var the_most_left_lon = lookfor_left_point(positionlon_list);
  var the_most_right_lon = lookfor_right_point(positionlon_list);
  var the_most_upper_lat = lookfor_upper_point(positionlat_list);
  var the_most_lower_lat = lookfor_lower_point(positionlat_list);

  var mean_lat = (the_most_upper_lat + the_most_lower_lat)/2;
  var distance_y = 4000*(getDistanceFromLatLonInKm(mean_lat, the_most_left_lon-0.038303, mean_lat,the_most_right_lon+0.038303));
  var points_y = Math.ceil(distance_y / distance_y_between);
  var distance_x = 4000*(getDistanceFromLatLonInKm(the_most_lower_lat, the_most_left_lon-0.038303, the_most_upper_lat,the_most_left_lon-0.038303));
  var points_x = Math.ceil(distance_x / distance_x_between);

  var destinations = new google.maps.MVCArray();
  var matrix_points=initialize(map, distance,points_y, points_x, mean_lat,the_most_left_lon-0.037303);
  
  google.maps.event.addListener(map, 'click',function(e){
    if(times>0 && times<4){
      var currentPath = polyline.getPath();
      currentPath.push(e.latLng);
      times=times+1;
    }
    if(times==0){
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
