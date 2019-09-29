
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/5b361f6f813e8b4575199bdaf6994445/' + lat + ',' + long +''
    request({
        url:url,
        json:true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather Service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast