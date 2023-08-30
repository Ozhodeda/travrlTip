


import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoToLocation =onGoToLocation


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            //map addListener lat llng -> addLoc 


        })
        .catch(() => console.log('Error: cannot init map'))

    locService.getLocs()
        .then(renderLocation)

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lan = 35.6895, lag = 139.6917) {
    console.log('lan, lag', lan, lag)
    console.log('Panning the Map')
    mapService.panTo(lan, lag)
}

function renderLocation(locations) {
    console.log('locations', locations)

    const elLocation = document.querySelector('.table-body')

    const strHtml = locations.map((location) => {
        const { id, name, lan, lag } = location
        return `
        <tr>
        <td>${name}</td>
        <td>
        <button class="btn-go" id="${id}" onclick="onGoToLocation(this)">Go</button>
        <button class="btn-delete" value="${id}" onclick="onDelLocation(this)">Del</button>
        </td>
        </tr>
        `

    })
    elLocation.innerHTML = strHtml.join('')
}

function onGoToLocation(ev) {
    console.log('ev', ev)
    const location = getLocationById(ev.id)
    const { lan, lag } = location
    onPanTo(lan, lag)
    renderLocation()
}

function onDelLocation(ev) {
    const location = getLocationById(ev.id)
    const { name } = location
    onDelLocation(name)
    renderLocation()
}

function setPlaceOnMap(place) {
    console.log('place:', place)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}