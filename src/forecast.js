const request = require('postman-request');
const forecast = (latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=20f44f2328dde87fda991d3a6afcf708&query=${latitude},${longitude}&units=f`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to weather services",undefined);
        }
        else if(body.error){
            callback("Unable to find error",undefined)
        }
        else{
            const currentTown=body.current;
            callback(undefined,`${currentTown.weather_descriptions[0]} The current temperature is ${currentTown.temperature} but it feels like ${currentTown.feelslike} `)
        }
    })
}
module.exports=forecast