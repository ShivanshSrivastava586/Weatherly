const request = require('request')

const geocode = (address,callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=88f9a42f602d336a21829becd9eac1dd&query=' + encodeURIComponent(address) + '&limit=1'

    request({url:url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to access the geocoding services! Check your network and try again.', undefined)
        }else if(!body.data || !body.data[0] ){
            callback('Unable to find the co-ordinates. Try another search.', undefined)
        }else{
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode



