



import { utilService } from "./util.service.js"

const STORAGE_PLACE_KEY = 'placesDB'


export const locService = {
    getLocs
}
const locs = [
    { id :2, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id :1, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]


createPlace()


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}
function createPlace(lat, lng, name, zoom = 15) {
    const place = {
        id: utilService.id(),
        lat,
        lng,
        name,
        zoom
    }
    locs.unshift(place)
    savePlaceToStorage()
    console.log('locs:', locs)
    return Promise.resolve(place)
}
function savePlaceToStorage() {
    utilService.save(STORAGE_PLACE_KEY,locs)
}



