const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const public_direc_path=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../src/templates/views')
const partialpath=path.join(__dirname,'../src/templates/partials')

const port=process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views',viewpath)
app.use(express.static(public_direc_path))
hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Know about Weather',
        name: 'K S Harshith'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Know about Weather',
        name: 'K S Harshith'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Know about Weather',
        name: 'K S Harshith'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Harshith',
        error_message:'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Harshith',
        error_message:'Error, page not found'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})