import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const appController = { 
    renderLocation
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDelLoc = onDelLoc
window.onSearch = onSearch

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
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

function onAddMarker(lat, lng ) {
    console.log('Adding a marker')
    mapService.addMarker({ lat, lng })
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

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('lat, lng', lat, lng)
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
    onAddMarker(lat, lng )
}

function renderLocation(locations) {
    console.log('locations', locations)
    // if (locations.length)

    const elLocation = document.querySelector('.table-body')
    console.log('elLocation', elLocation)

    const strHtml = locations.map((location) => {
        const { id, name, lat, lng } = location
        return `
        <tr>
        <td>${name}</td>
        <td>
        <button class="btn-go" onclick="onPanTo(${lat},${lng})">Go</button>
        <button class="btn-delete" onclick="onDelLoc(${id})">Del</button>
        </td>
        </tr>
        `

    })
    elLocation.innerHTML = strHtml.join('')
}

function onDelLoc(locId) {
    console.log('locId', locId)
    locService.removeLoc(locId)
        .then(renderLocation)
}

function onSearch(){
    const elInput = document.getElementById('search-input')
    const input = elInput.value
    console.log('input', input)

    mapService.getAddress(input)
    .then(onPanTo)
    


  

}