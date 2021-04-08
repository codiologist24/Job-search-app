const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ee2ce5e7183820b347837101a488079&query=' + latitude + ',' + longitude+'&units=m'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'Condition is ' +response.body.current.weather_descriptions[0]+'. It is currently '+ response.body.current.temperature + ' degress out but it feels like ' + response.body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast