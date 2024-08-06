import {fileURLToPath} from 'url';
import path from 'path';
import express, { application } from 'express';
import hbs from 'hbs';

import {geocode} from './utils/geocode.js'
import {forecast} from './utils/forecast.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defined Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

// Setup Handlebars Engine and Views and Partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

// Web Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tyler'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tyler'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page.',
        name: 'Tyler'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (err, geoData) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        forecast(geoData, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            return res.send({
                forecast: forecastData,
                location: geoData.location,
                address: req.query.address
            });
        });
    });
});

// 404 under /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help Article Not Found',
        errMessage: 'The article you were looking for cannot be found',
        name: 'Tyler'
    });
});

// 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page not Found',
        errMessage: 'The page you were looking for cannot be found.',
        name: 'Tyler'
    });
});

// Start the web server
app.listen(port, () => {
    console.log('Server is up on port '+ port);
});