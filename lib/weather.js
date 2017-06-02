var rp = require('request-promise');

module.exports = {
  byZip: getWeather,
  byCity: getWeatherByCity
};

function getWeather(zipCode) {
  // make request to open weather api - http://openweathermap.org/current
  return rp('http://api.openweathermap.org/data/2.5/weather?APPID=69b8aa95356072a76503cd8b833e3c14&zip=' + zipCode + ',us&units=metric')
      .then(function(body) {
        var response = JSON.parse(body);

        var message = [
          response.name + ' Weather',
          '-',response.weather[0].description,'-',
          'Now:' + Math.floor(response.main.temp),
          'High: ' + Math.floor(response.main.temp_max),
          'Low: ' + Math.floor(response.main.temp_min)
        ].join(' ');

        return message;
      });
}

function getWeatherByCity(cityName) {
  // make request to open weather api - http://openweathermap.org/current
  return rp('http://api.openweathermap.org/data/2.5/weather?APPID=69b8aa95356072a76503cd8b833e3c14&q=' + cityName + '&units=metric')
      .then(function(body) {
        var response = JSON.parse(body);

        var message = [
          response.name + ' Weather',
          '-',response.weather[0].description,'-',
          'Now:' + Math.floor(response.main.temp),
          'High: ' + Math.floor(response.main.temp_max),
          'Low: ' + Math.floor(response.main.temp_min)
        ].join(' ');

        return message;
      });
}