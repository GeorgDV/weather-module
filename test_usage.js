const WeatherClient = require('./src/WeatherClient');

test();
async function test(){
    console.log('Todays Date: ', new Date(Date.now()).toISOString().substr(0, 10));

    console.log('London WoeID: ', await WeatherClient.getWoeID('london'));

    console.log('London Weather: ', await WeatherClient.getWeather('london', 2));
    console.log('London Temp: ', await WeatherClient.getTemp('london', 2));

    console.log('London Weather info with cache: ', await WeatherClient.getWeatherWithCache('london', 1));
    console.log('London Temp info with cache: ', await WeatherClient.getTempWithCache('london', 1));
}
