



import { utilService } from "./util.service.js"

const STORAGE_PLACE_KEY = 'placesDB'

const locsCache = utilService.load(STORAGE_PLACE_KEY)||[]



export const locService = {
    getLocs,
    getLocById,
    addPlace,
    createPlace,
    removeLoc
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
function createPlace(id = utilService.id(), name, lat, lng, zoom = 15) {
    return {
        id,
        lat,
        lng,
        name,
        zoom
    }
}
function addPlace(id, lat, lng, name, zoom) {
    const loc = createPlace(id, lat, lng, name, zoom)
    locs.unshift(loc)
    savePlaceToStorage()
    return Promise.resolve(loc)
}
function getLocById(locId) {            // Read   
    const loc = locs.find(loc => locId === locId.id)
    return Promise.resolve(loc)
}
function removeLoc(locId) {  ///delate
    const loc = locs.find(loc => locId === locId.id)
    locs.splice(locId, 1)
    savePlaceToStorage()
    return Promise.resolve(locs)
}

function savePlaceToStorage() {
    utilService.save(STORAGE_PLACE_KEY, locs)
}



