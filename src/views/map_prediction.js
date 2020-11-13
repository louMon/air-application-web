import loadGoogleMapsApi from 'load-google-maps-api';
import moment from 'moment';

import {API_options, createMap, drawRectangle} from './Maps/maps_utils';
import {retrieveMeasurements} from './Graphs/graphsHandling';
import {processSensorMeasurements} from './Graphs/dataProcessing';


/*let offsets = {};
let controlled_offsets = {};
let non_controlled_offsets = {};
let map = undefined;
const QHAWAX_NAME = 'qH001';*/

$(function() {
  //googleMaps();
  console.log("lourdes");
  //loadGoogleMapsApi(API_options);
  //map = createMap('map');
  //requestProcessed(map);
  //console.log("Lourdes test");
    //requestProcessed(map, QHAWAX_NAME, '', moment().subtract(1, 'days'), moment());
});

function requestProcessed(map) {
  $.ajax({
    url: '/api/predicted_measurements/',
    //data: {},
    type: 'GET'
  }).done(function(response) {
    var valid_measurements = filterValidMeasurements(response); // si
    //valid_measurements = valid_measurements.map(measurement => retrieveMeasurements(measurement));
    //valid_measurements = valid_measurements.map(measurement => processValidMeasurements(measurement))
    
    console.log(valid_measurements);
    for (let ind=0; ind < valid_measurements.length; ind++) {
      let coordinates = {'lat': valid_measurements[ind]['lat'], 'lon': valid_measurements[ind]['lon']};
      drawRectangle(map, '', coordinates, valid_measurements[ind]);
    }
  }); 
}

/*function processValidMeasurements(measurements) {
  for (var sensor_name in measurements) {
    if (typeof(measurements[sensor_name]) === 'object') {
      let sensor_value_processed = processSensorMeasurements(sensor_name, measurements[sensor_name],
        measurements['temperature'], offsets, controlled_offsets, non_controlled_offsets, 'default');
      measurements[sensor_name] = sensor_value_processed;
    }
  }
  
  return measurements;
}*/

function filterValidMeasurements(measurements) {
  var valid_measurements = [];

  var valid_sensors = undefined;
  for (var ind=0; ind < measurements.length; ind++) {
    valid_sensors = filterValidSensors(measurements[ind]); //este si
    valid_sensors = formatRawData(valid_sensors); // este si
    valid_measurements.push(valid_sensors);
  }

  return valid_measurements;
}

function filterValidSensors(measurement) {
  var valid_sensors = {};

  for (var sensor_name in measurement) {
    if (measurement[sensor_name] !== null) {
      valid_sensors[sensor_name] = measurement[sensor_name];   
    }
  }

  return valid_sensors;
}

function formatRawData(raw_data)
{
    const PA_TO_KPA = 1/1000;
    raw_data['pressure'] *= PA_TO_KPA;
    delete raw_data['ID']; // ID is already defined in page url

    return raw_data;
}

/*
function requestOffsets(product_name) {
  return $.ajax({
    url: '/api/request_offsets/',
    data: {ID: product_name},
    type: 'GET'
  }).done(function(response) {
    offsets = response;
  });
}

function requestControlledOffsets(product_name) {
  return $.ajax({
    url: '/api/request_controlled_offsets/',
    data: {ID: product_name},
    type: 'GET'
  }).done(function(response) {
    controlled_offsets = response;
  });
}

function requestNonControlledOffsets(product_name) {
  return $.ajax({
    url: '/api/request_non_controlled_offsets/',
    data: {ID: product_name},
    type: 'GET'
  }).done(function(response) {
    non_controlled_offsets = response;
  });
}*/
