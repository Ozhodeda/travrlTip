
import { utilService } from "./util.service.js"

const STORAGE_PLACE_KEY = 'placesDB'

let locs

var id = 101

export const locService = {
    getLocs,
    getLocById,
    addPlace,
    createPlace,
    removeLoc,
    getLocation
}
function getLocs() {
    locs = utilService.load(STORAGE_PLACE_KEY)|| []
    if (locs) {

        console.log('from cache')
        return Promise.resolve(locs)
    }
    locs = [
        { id: 2, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
        { id: 1, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
    ]
    return new Promise((resolve, reject) => {
        console.log('from API')
        setTimeout(() => {
            resolve(locs)
            console.log('locs:', locs)
        }, 2000)
    })
}


function createPlace(lat, lng, name, zoom = 5) {
    return {
        id: id++,
        lat,
        lng,
        name,
        zoom
    }
}

function addPlace(lat, lng, name, zoom) {
    const loc = createPlace(lat, lng, name, zoom)
    locs.unshift(loc)
    savePlaceToStorage()
    console.log('loc', loc)
    return Promise.resolve(locs)
}

function getLocById(locId) {            // Read   
    const location = locs.find(loc => locId === loc.id)
    return Promise.resolve(location)
}

function removeLoc(locId) {  ///delate
    const idx = locs.findIndex(loc => loc.id === locId)
    console.log('locId', locId)
    locs.splice(idx, 1)
    console.log('locs', idx)
    savePlaceToStorage()
    return Promise.resolve(locs)
}

function savePlaceToStorage() {
    utilService.save(STORAGE_PLACE_KEY, locs)
}

function getLocation() {
    return locs
}