const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cameron'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cameron'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Cameron'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: errors
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
   
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Cameron',
        error: '404 - help not found'

    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Cameron',
        error: '404 - page not found'
    })
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})