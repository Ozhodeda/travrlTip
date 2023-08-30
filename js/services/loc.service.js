
import { utilService } from "./util.service.js"

const STORAGE_PLACE_KEY = 'placesDB'

const locsCache = utilService.load(STORAGE_PLACE_KEY) || []

var id=101

export const locService = {
    getLocs,
    getLocById,
    addPlace,
    createPlace,
    removeLoc,
    getLocation
}

const locs = [
    { id: 2, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id: 1, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
    if (locsCache) {
        console.log('from cache')
        console.log('locs:', locs)
        return Promise.resolve(locsCache)
    } else {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(locs)
                console.log('locs:', locs)
            }, 2000)
        })
    }
}

function createPlace(lat, lng, name, zoom = 15) {
    return {
        id:id++,
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
    locId = locs.find(loc => locId === loc.id)
    console.log('locId', locId)
    locs.splice(locId, 1)
    console.log('locs', locs)
    savePlaceToStorage()
    return Promise.resolve(locs)
}

function savePlaceToStorage() {
    utilService.save(STORAGE_PLACE_KEY, locs)
}

function getLocation(){
    return locs
}