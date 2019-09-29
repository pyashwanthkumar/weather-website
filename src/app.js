const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Yash P'
    }) 
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name:'Yash P'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpText:'here is some helpful text',
        title: 'Help',
        name:'Yash P'
    })
})

app.get('/weather', (req, res)=>{
    const location = req.query.address
    geocode(location, (error, { latitude,longitude,location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, foreCastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:foreCastdata,
                location:location
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('You must provide a search term')
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Yash P',
        message:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'Yash P',
        message: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})