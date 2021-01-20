
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
setBounds
};


