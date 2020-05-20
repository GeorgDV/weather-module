//const getWoeID = require('./src/getWoeID');
const WeatherClient = require('./src/WeatherClient');

test();

async function test(){
    
    let londonID = await WeatherClient.getWoeID('london');
    console.log('London WoeID: ', londonID);

    let londonWeather = await WeatherClient.getWeather('london', 2);
    console.log('London Weather: ', londonWeather);

    let londonTemp = await WeatherClient.getTemp('london', 1);
    console.log('London Temp: ', londonTemp);
    

    let cachedWeatherInfo = await WeatherClient.getWeatherWithCache('london', 3);
    console.log('London weather info with cache: ', cachedWeatherInfo);

    let cachedTempInfo = await WeatherClient.getTempWithCache('london', 2);
    console.log('London temp info with cache: ', cachedTempInfo);
}
