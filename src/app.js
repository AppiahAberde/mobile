const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', "hbs")
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Jonathan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Aberde"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpMessage: 'This is the help message',
        name: "Appiah"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address found'
        })
    } else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                forecast(longitude, latitude, (error, forecastdata) => {
                    if (error) {
                        return res.send({
                            error
                        })
                    } else {
                        res.send({
                            location: req.query.address,
                            forecastdata
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404",
        message: "Help page not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Page Not found"
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})