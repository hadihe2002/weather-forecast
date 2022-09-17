const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=971d829660c54865f21daf3a199dfae7&query=${latitude},${longitude}&units=m`

    request({url, json: true}, (error, response, {current} = {}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (response.body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const temperature = current.temperature
            const feelsLike = current.feelslike
            const weatherDescriptions = current.weather_descriptions[0]
            callback(undefined ,`${weatherDescriptions}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out!`)
        }
    })
}

module.exports = forecast