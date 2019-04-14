const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const router = express.Router();

const apiKey = 'e19684bcfecb85a0c2061a0460d70dec';

// Display the dashboard page
router.get("/", (req, res) => {
  // res.render("dashboard");
  res.render('dashboard.ejs', {weather: null, error: null});
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
        let min_temp = `with a minimum of ${weather.main.temp_min}`
        let max_temp = `and with a high of ${weather.main.temp_max}`
        let weatherText = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
        let pressure = `Pressure: ${weather.main.pressure}`;
        let humidity = `Humidity: ${weather.main.humidity}`;
        res.render('dashboard.ejs', {weather: weatherText, pressure: pressure, humidity: humidity, error: null});
      }
    }
  });
});


module.exports = router;
