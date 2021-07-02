import { configuration } from '../lib/graphAssets.js';
import {sourceAPI} from '../index.js';
import {addZero,formatDateDB,qhawaxLeaf} from '../lib/mapAssets.js';


function createSpecificMarker(position,map,index){
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: "" + index,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    }
  });
  return marker;
}

const drawChart = async (station_id,pollutant) => {
  console.log(station_id)
  console.log(pollutant)
  const chart = document.querySelector('#over_map_infowindow');
  chart.classList.remove('none')
  const layout = {

    autosize: false,
    width:
      window.innerWidth >= 800
        ? window.innerWidth * 0.5
        : window.innerWidth * 0.85,
    height: window.innerHeight * 0.6,
    title: `Estacion ${station_id}: Concentración de ${pollutant}<br> de las últimas 24 horas <sub>(µg/m3)</sub>`,
    showlegend: true,
    colorway: ['#0000FF', '#FF0000'],
    legend:{
      orientation:'h',
      y:window.innerWidth >= 800? -0.1:2,
        },
    xaxis: {
      title: {
        text: 'Hora del día',
        font: {
          family: 'Courier New, monospace',
          size: 12,
          color: '#7f7f7f',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Concentración <sub>(µg/m3)</sub>',
        font: {
          family: 'Courier New, monospace',
          size: 12,
          color: '#7f7f7f',
        },
      },
    },
  };
  let data = [];
  const response = await fetch(
    `${sourceAPI}get_forecasting_by_pollutant_of_one_station/?environmental_station_id=${station_id}&pollutant=${pollutant}`
  );
  const json = await response.json();
  let yValues = [];
  let xValues = [];
  //let yECA = [];
  Object.entries(json).forEach(d => {
    console.log(d[1].ug_m3_value)
    console.log(d[1].timestamp)
    yValues.push(d[1].ug_m3_value);
    xValues.push(formatDateDB(d[1].timestamp));
    //yECA.push(ECAlimits(sensor));
    let trace1 = {};
    //let trace2 = {};
    data = [
      (trace1 = {
        y: yValues,
        x: xValues,
        name: `${pollutant} (µg/m3)`,
        type: 'scatter',
      })
      //(trace2 = {
      //  y: yECA,
      //  x: xValues,
      //  name: 'Límite ECA',
      //  type: 'scatter',
      //}),
    ];
  });

  Plotly.newPlot(chart, data, layout,configuration);
};


function createMarkers(map, monitoringStations){
  for (var i = 0; i < monitoringStations.length; i++) {
    var myLatLng = {lat:monitoringStations[i].lat, lng: monitoringStations[i].lon};
    const qhawax_marker = new google.maps.Marker({
      position: {
        lat: myLatLng.lat,
        lng: myLatLng.lng,
      },
      map: map,
      icon: {
        url: qhawaxLeaf(50),
        scaledSize: new google.maps.Size(35, 35),
      },
      id:'qHAWAX'+ i,
    });
  }
}

function createMarkersForecasting(map, monitoringStations,pollutant){
  var station_id = 0
  for (var i = 0; i < monitoringStations.length; i++) {
    var myLatLng = {lat:monitoringStations[i].lat, lng: monitoringStations[i].lon};
    const qhawax_marker = new google.maps.Marker({
      position: {
        lat: myLatLng.lat,
        lng: myLatLng.lng,
      },
      map: map,
      icon: {
        url: qhawaxLeaf(50),
        scaledSize: new google.maps.Size(35, 35),
      },
      id: 'qHAWAX'+ i,
    });
    station_id = monitoringStations[i].id
    qhawax_marker.addListener('click', () => {
      drawChart(station_id,pollutant)
    });
  }
}


const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function putMarker(map, coordinates){
  var myLatLng = {lat:coordinates['lat'], lng: coordinates['lon']};
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Qhawax ',
    icon: image
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

function lookfor_left_point(positionlon_list){
  var the_most_left=180
  for (var i = 0; i < positionlon_list.length; i++) {
    if(positionlon_list[i]<the_most_left){
      the_most_left = positionlon_list[i]
    }
  }
  return the_most_left;
}

function lookfor_right_point(positionlon_list){
  var the_most_right=-180
  for (var i = 0; i < positionlon_list.length; i++) {
    if(positionlon_list[i]>the_most_right){
      the_most_right = positionlon_list[i]
    }
  }
  return the_most_right;
}

function lookfor_upper_point(positionlat_list){
  var the_most_upper=-90
  for (var i = 0; i < positionlat_list.length; i++) {
    if(positionlat_list[i]>the_most_upper){
      the_most_upper = positionlat_list[i]
    }
  }
  return the_most_upper;
}

function lookfor_lower_point(positionlat_list){
  var the_most_lower=90
  for (var i = 0; i < positionlat_list.length; i++) {
    if(positionlat_list[i]<the_most_lower){
      the_most_lower = positionlat_list[i]
    }
  }
  return the_most_lower;
}

function setBounds(first,second,map){
  var boundsSide = new google.maps.LatLngBounds();
  boundsSide.extend(first);
  boundsSide.extend(second);
  map.fitBounds(boundsSide);
}

function selectColor(value,polutant){
  if(polutant=='NO2'){
    if(value>=0 & value<=100){
      return '#98c600'
    }else if(value>100 & value<=200){
      return '#edeb74'
    }else if(value>200 & value<=300){
      return '#d47602'
    }else if(value>300){
      return '#9b0f0f'
    }
  }

  if(polutant=='PM25'){
    if(value>=0 & value<=12.5){
      return '#98c600'
    }else if(value>12.5 & value<=25){
      return '#edeb74'
    }else if(value>25 & value<=125){
      return '#d47602'
    }else if(value>125){
      return '#9b0f0f'
    }
  }

  if(polutant=='CO'){
    if(value>=0 & value<=5049){
      return '#98c600'
    }else if(value>5049 & value<=10049){
      return '#edeb74'
    }else if(value>10049 & value<=15049){
      return '#d47602'
    }else if(value>15049){
      return '#9b0f0f'
    }
  }

}

function perc2color(max,min,value) {
  var base = (max - min);
  var perc = (value - min) / base * 100;
  var r, g, b = 0;
  if(perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc*1.005);
  }
  else{
    g = 255;
    r = Math.round(510 - 5.10 * perc*1.005);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
  //}
  //return '#FFFFFF'
}

export { 
createMarkers, 
putMarker,
getDistanceFromLatLonInKm,
deg2rad,
getMarker,
lookfor_left_point,
lookfor_right_point,
lookfor_upper_point,
lookfor_lower_point,
createSpecificMarker,
setBounds,
selectColor,
perc2color,
createMarkersForecasting
};


