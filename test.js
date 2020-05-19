const getWoeID = require('./src/getWoeID');
const getWeatherInfo = require('./src/getWeatherInfo');

test();

async function test(){
    let londonID = await getWoeID('london');
    console.log('London WoeID: ', londonID);

    let londonWeather = await getWeatherInfo(londonID);
    console.log('London Weather: ', londonWeather);
}
