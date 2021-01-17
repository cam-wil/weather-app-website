const request = require('request')
const api_key = ''
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query='+ encodeURIComponent(lat) +',' + encodeURIComponent(long) + '&units=f'
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location (weather)', undefined)
        }
         else {
             let conditions = ""
             body.current.weather_descriptions.forEach((con) => {conditions += con})
            
            callback(undefined, `Conditions - ${conditions}. It is currently ${body.current.temperature}${body.request.unit} out. There is a ${body.current.precip}% chance of precip.`)
        }
    })
}

module.exports = forecast
