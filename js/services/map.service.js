import { api } from "./secret.js"
import{locService}from "./loc.service.js"
import{appController} from "../app.controller.js"


export const mapService = {
    initMap,
    addMarker,
    panTo,
    getGmap,
    getAddress
}



// Var that is used throughout this Module (not global)
var gMap
function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
            gMap.addListener('click', ev => {
                const name = prompt('Place name?', 'Place 1')
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                console.log('lat,lng,name', lat,lng,name)
                locService.addPlace(lat, lng, name )
                .then(appController.renderLocation)
        })
    })
}


function getGmap() {
    return gMap
}

function addMarker(loc) {
    return new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
   
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${api.API_KEY_map}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
// getAddress('הברוש גבעת זאב')
function getAddress(address){
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api.API_KEY_map}`)
    .then((res) => {
        const location = res.data
        console.log('location', location)
        const result  = location.results[0].geometry.location
        console.log('result', result)
        locService.addPlace(result.lat, result.lng, address)
        return Promise.resolve(result)
    })
}