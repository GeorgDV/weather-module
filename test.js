//const getWoeID = require('./src/getWoeID');
const WeatherClient = require('./src/WeatherClient');

test();

async function test(){
    let londonID = await WeatherClient.getWoeID('london');
    console.log('London WoeID: ', londonID);

    let londonWeather = await WeatherClient.getWeatherInfo('london', 0);
    console.log('London Weather: ', londonWeather);

    let londonTemp = await WeatherClient.getTemp('london', 1);
    console.log('London Temp: ', londonTemp);
}
