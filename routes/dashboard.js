const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const router = express.Router();

const apiKey = 'e19684bcfecb85a0c2061a0460d70dec';

// Display the dashboard page
router.get("/", (req, res) => {
  // res.render("dashboard");
  res.render('dashboard.ejs', {des:null, speed:null, coord:null, weather: null, pressure: null, humidity: null, minTemp:null, maxTemp:null, city:null, longitude: null, latitude: null, error: null});
});

router.post("/", (req, res) => {
  // res.render("dashboard");
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('dashboard.ejs', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('dashboard.ejs', {weather: null, error: 'Error, please try again'});
      } else {
        let longitude = weather.coord.lon;
        let latitude = weather.coord.lat;
        let minTempText=`${weather.main.temp_min} C`;
        let maxTempText=`${weather.main.temp_max} C`;
        let weatherText = `${weather.main.temp} C`;
        let pressureText =`${weather.main.pressure} hPa `;
        let humidityText= `${weather.main.humidity}%`;
        let country = (weather.sys.country) ? weather.sys.country : '' ;
        let cityCountry = city+','+country;
        let coord=`${weather.coord.lon}/${weather.coord.lat}`;
        let speed=`${weather.wind.speed}`;
        let des=`${weather.weather.main}`;
        res.render('dashboard.ejs', {des:des, speed:speed, coord:coord, weather: weatherText, pressure: pressureText, humidity: humidityText, minTemp:minTempText, maxTemp:maxTempText, city:cityCountry, longitude: longitude, latitude: latitude, error: null});
      }
    }
  });
});


module.exports = router;
