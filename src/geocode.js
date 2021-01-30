const request = require('postman-request');
const geocoding=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiY3NrZmFuaHAiLCJhIjoiY2trZTV1ejJoMDVlZTJ1bzd1d252bjVpbSJ9.GRkHvRL3ulm_monVL3_-rw&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }
        else if(body.features.length===0){
            callback('unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined,{
                lattitude:body.features[0].center[1],//latitude
                longitude:body.features[0].center[0],//longitude
                location: body.features[0].place_name
            })
        }
    })
}



module.exports=geocoding