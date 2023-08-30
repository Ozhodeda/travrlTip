import { api } from "./secret.js"
import{locService}from "./loc.service.js"
import{appController} from "../app.controller.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getGmap
}



// Var that is used throughout this Module (not global)
var gMap

function initMap() {
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            const myLatlng = { lat: 32.0749831, lng: 34.9120554 }
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: myLatlng,
                zoom: 15
            })
            console.log('Map!', gMap)
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng,
            })
            infoWindow.open(gMap)
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                infoWindow.close()
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                })
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
                )
                infoWindow.open(gMap);
            })
            gMap.addListener('click', ev => {
                const name = prompt('Place name?', 'Place 1')
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                console.log('lat,lng,name', lat,lng,name)
                locService.addPlace(name,lat, lng )
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