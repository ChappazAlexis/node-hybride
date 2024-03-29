/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log("navigator.geolocation works well");
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


// leaflet map

var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


//icon 

var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.marker([45.77093524067551, 4.874627953425062], { icon: redIcon }).addTo(map)
    .bindPopup("Cinema le Zola").openPopup().on('click', onClick);
function onClick(cine) { alert(cine.latlng); };
L.marker([45.76728676959654, 4.898015298767984], { icon: redIcon }).addTo(map)
    .bindPopup("Bar du cinema").openPopup().openPopup().on('click', onClick);
function onClick(cine) { alert(cine.latlng); };
L.marker([45.76613004273833, 4.865960008920619], { icon: redIcon }).addTo(map)
    .bindPopup("Bellecombe").openPopup().openPopup().on('click', onClick);
function onClick(cine) { alert(cine.latlng); };

// clic

function onClick(cine) {
    if (document.getElementById("films").style.display == "none") {
        document.getElementById("films").style.display = "block";
        document.getElementById("aucun").style.display = "none";
    } else {
        document.getElementById("films").style.display = "none";
        document.getElementById("aucun").style.display = "block";
    }
}

//locate 
map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {

    L.marker(e.latlng).addTo(map)
        .bindPopup("Vous etes ici").openPopup();
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

navigator.geolocation.getCurrentPosition(geolocationSuccess,
    [geolocationError],
    [geolocationOptions]);

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function (position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);


//bouton 

function handleOnFlyTo() {
    map.flyTo([45.77047037263132, 4.863116377154791], 13, {
        duration: 4
    });
}
