const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const forcast=require('./forecast.js')
const geocode = require('./geocode.js')


const app=express()

//Define paths for express configs
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPaths)
hbs.registerPartials(partialsPath)

//setup static directory to server  
app.use(express.static(publicDirectoryPath))

//req-request  res-responce
//index page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'S A HARIPRASAD'
    })

})
//about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"S A HARIPRASAD"
    })
})

//help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help page",
        content:"How can i help you",
        name:"S A HARIPRASAD"
    })
})


//WEATHER PAGE
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location:location,
                forcastData:forcastData,
                address:req.query.address
            })
            // console.log(location);
            // console.log(forcastData);
        
        
        })
    })
})

//404 for after help page
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404 error',
        name:'S A HARIPRASAD',
        errorMessage:'Help page not found'
    })
}) 

//practise product route
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide an input"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

//404-error page
app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404 error',
        name:'S A HARIPRASAD',
        errorMessage:'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})