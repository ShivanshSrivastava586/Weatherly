const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')

const app = express()

//Specifying paths for express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Shivansh Srivastava',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Shivansh Srivastava',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        content: 'This is the help page',
        title: 'Help',
        name: 'Shivansh Srivastava'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}= {} )=>{
        if(error){
            // return console.log(error)
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                // return console.log(error)
                return res.send({
                    error:error
                })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast : 'hot',
    //     location: 'lucknow',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Shivansh Srivastava',
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Shivansh Srivastava',
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000!')
})