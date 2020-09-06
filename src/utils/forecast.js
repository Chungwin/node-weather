const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1a189f7565ae706a48bfd3342038db24&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to Weatherstack.', undefined)
        } else if (body.error) {
            callback('Unable to detect your location. Please try other coordinates.', undefined)
        } else {
            callback(undefined, 'It is ' + body.current.weather_descriptions[0] + '. The temperature is '+ body.current.temperature + ' degrees. It feels like ' + body.current.feelslike +' degrees.')
        }
    })
}

module.exports = forecast