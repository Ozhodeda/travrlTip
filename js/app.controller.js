


import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
// window.onDelLoc = onDelLoc


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            //map addListener lat llng -> addLoc 


        })
        .catch(() => console.log('Error: cannot init map'))
    renderLocation()

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
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
<<<<<<< HEAD

function onPanTo(lan = 35.6895, lag = 139.6917) {
=======
function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('lat, lng', lat, lng)
>>>>>>> 45cb15fe72b74ce85f8a9872f9b4d8cc4d71f01c
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function renderLocation(locations) {
    console.log('locations', locations)

    const elLocation = document.querySelector('.table-body')
    console.log('elLocation', elLocation)

    const strHtml = locations.map((location) => {
        const { id, name, lat, lng } = location
        return `
        <tr>
        <td>${name}</td>
        <td>
        <button class="btn-go" onclick="onPanTo(${lat},${ lng})">Go</button>
        <button class="btn-delete" value="${id}" onclick="onDelLoc(this)">Del</button>
        </td>
        </tr>
        `

    })
    elLocation.innerHTML = strHtml.join('')
}

function onDelLoc(ev) {
    const locId = ev.id
    locService.removeLoc(locId)
    renderLocation()
}
