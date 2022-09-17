const request = require("request");
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGFkaWhlMjAwMiIsImEiOiJjbDd3cWIyNWwwbnc5M29vNnNxOXZrY21pIn0.qW7Wc_dWKCOpv2Ffu3GrrQ&limit=1`

    request({url, json: true}, (error, response, {features} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find a location. Try another search.', undefined)
        } else {
            features = features[0]
            const latitude = features.center[1]
            const longitude = features.center[0]
            const location = features.place_name
            callback(undefined, {
                latitude,
                longitude,
                location,
            })
        }
    })
}

module.exports = geocode