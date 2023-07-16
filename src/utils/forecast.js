const request= require('request')

const forecast = (latitude,longitude, callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=c4752d9c4b6584b239c37ddaea5998cf&query='
    + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback('Cannot access the weather services! Check your network and try again.', undefined)
        }else if(body.error){
            callback('Unable to find the location.', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature 
            + " degrees. It feels like " + body.current.feelslike + " degrees out.")
        }
    })    
}

module.exports= forecast