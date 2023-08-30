


import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            //map addListener lat llng -> addLoc 


        })
        .catch(() => console.log('Error: cannot init map'))
        renderLocation()
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
    console.log('Panning the Map')
    mapService.panTo(lan, lag)
}

function renderLocation() {
    const locations = locService.getLocs

    const elLocation = $('.table-locations')

    const strHtml = locations.map(location => {
        const { name, lan, lag, id } = location
            `
    <tr>
    <td>${name}</td>
    <td>
    <button class="btn-go" value="${lan, lag}" onclick="onPanTo(value.lan, value.lag)">Go</button>
    <button class="btn-delete" value="${id}" onclick="onDelLocation(this)">Del</button>
    </td>
    </th>
    `
    })
    elLocation.innerHTML = strHtml.join('')
}

// function onGoTtLocation(ev) {
//     console.log('ev', ev)
//     const location = getLocationById(ev.id)
//     const { lan, lag } = location
//     goToLocation(location)
//     renderLocation()
// }

function onDelLocation(ev) {
    const location = getLocationById(ev.id)
    const { name } = location
    onDelLocation(name)
    renderLocation()
}