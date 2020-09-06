const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Wather App',
        name: 'Chung Huynh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chung Huynh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'We definitely need your help!',
        title: 'Help Page',
        name: 'Chung Huynh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })

        })
    })

})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term.'
        })
    }

    res.send({
        products: []
    })
})


// ==================

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chung Huynh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chung Huynh',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
