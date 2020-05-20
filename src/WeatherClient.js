const https = require('https');
const fs = require('fs');
const util = require('util');
const WeatherRequests = require('./WeatherRequests');

//TIME SET TO UPDATE CACHE IN EVERY 15 MINUTES
const time = 900000;

let weatherInfoCacheTimer = 0;
let tempCacheTimer = 0;
getCacheTimers();

//city - city name as full or partial string
const getWoeID = async (city) => {
    let woeid = "";

    try {
        const data = await WeatherRequests.getCityRequest(city);
        //console.log(data);
        woeid = data[0].woeid;
    } catch (error) {
        console.error(error);
    }

    //console.log(woeid);
    return woeid;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getWeatherWithCache = async (city, day) => {
    const now = new Date().getTime();
    let weatherInfo = {};
    if (await fs.existsSync(__dirname + '/cache/weatherInfoCache.txt')) {
        weatherInfo = await fs.readFileSync( __dirname + '/cache/weatherInfoCache.txt');
        weatherInfo = weatherInfo.toString('utf-8');
    }
    
    if (weatherInfoCacheTimer < now) {
        weatherInfo = await getWeather(city, day);
        await fs.writeFileSync(__dirname + '/cache/weatherInfoCache.txt', util.inspect(weatherInfo), 'utf-8');
        console.log('Updated Weather Info Cache!');

        weatherInfoCacheTimer = getNewCacheTimer(time, weatherInfoCacheTimer);
        await fs.writeFileSync(__dirname + '/cache/cacheTimers/weatherInfoCacheTimer.txt', weatherInfoCacheTimer, 'utf-8');
    }

    return weatherInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getTempWithCache = async (city, day) => {
    const now = new Date().getTime();
    let tempInfo = {};
    if (await fs.existsSync(__dirname + '/cache/tempCache.txt')) {
        tempInfo = await fs.readFileSync( __dirname + '/cache/tempCache.txt');
        tempInfo = tempInfo.toString('utf-8');
    }
    
    if (tempCacheTimer < now) {
        tempInfo = await getTemp(city, day);
        await fs.writeFileSync(__dirname + '/cache/tempCache.txt', util.inspect(tempInfo), 'utf-8');
        console.log('Updated Temperature Info Cache!');

        tempCacheTimer = getNewCacheTimer(time, tempCacheTimer);
        await fs.writeFileSync(__dirname + '/cache/cacheTimers/tempCacheTimer.txt', tempCacheTimer, 'utf-8');
    }

    return tempInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getWeather = async (city, day) => {
    let weatherInfo = {};

    if (day > 5 || day < 0) {
        console.error("Given DayID must range between 0-5.");
        return;
    }

    try {
        let woeID = await getWoeID(city);
        const data = await WeatherRequests.getWeatherRequest(woeID);
        //console.log(data);
        weatherInfo = {
            when: data.consolidated_weather[day].applicable_date,
            weather_state: data.consolidated_weather[day].weather_state_name,
            min_temp: data.consolidated_weather[day].min_temp,
            normal_temp: data.consolidated_weather[day].the_temp,
            max_temp: data.consolidated_weather[day].max_temp,  
            wind_direction: data.consolidated_weather[day].wind_direction_compass,
            wind_speed: data.consolidated_weather[day].wind_speed,
            air_pressure: data.consolidated_weather[day].air_pressure,
            humidity: data.consolidated_weather[day].humidity,
            predictability: data.consolidated_weather[day].predictability

        }
    } catch (error) {
        console.error(error);
    }

    //console.log(weatherInfo);
    return weatherInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getTemp = async (city, day) => {
    let tempInfo = {};

    if (day > 5 || day < 0) {
        console.error("DayID must range between 0-5.");
        return;
    }

    try {
        let woeID = await getWoeID(city);
        const data = await WeatherRequests.getWeatherRequest(woeID);
        //console.log(data);
        tempInfo = {
            when: data.consolidated_weather[day].applicable_date,
            min_temp: data.consolidated_weather[day].min_temp,
            normal_temp: data.consolidated_weather[day].the_temp,
            max_temp: data.consolidated_weather[day].max_temp  
        } 
    } catch (error) {
        console.error(error);
    }

    //console.log(weatherInfo);
    return tempInfo;
}

exports.getWoeID = getWoeID;
exports.getWeatherWithCache = getWeatherWithCache;
exports.getWeather = getWeather;
exports.getTemp = getTemp;
exports.getTempWithCache = getTempWithCache;


function getNewCacheTimer(time, timer) {
    const now = new Date().getTime()
    if (timer < now + time) {
        timer = now + time
    }
    return timer
}

async function getCacheTimers(){
    if (await fs.existsSync(__dirname + '/cache/cacheTimers/weatherInfoCacheTimer.txt')) {
        weatherInfoCacheTimer = await fs.readFileSync(__dirname + '/cache/cacheTimers/weatherInfoCacheTimer.txt');
    }
    if (await fs.existsSync(__dirname + '/cache/cacheTimers/weatherInfoCacheTimer.txt')) {
        tempCacheTimer = await fs.readFileSync(__dirname + '/cache/cacheTimers/tempCacheTimer.txt');
    }

} 

//FOR TESTING DIRECTLY
/*
(async () => {
    let woeid = "";
    try {
        const data = await getCityRequest('london');
        console.log(data);
        woeid = data[0].woeid;
    } catch (error) {
        console.error(error);
    }
    console.log(woeid);
})();
*/

//FOR TESTING DIRECTLY
/*
(async () => {
    let weatherInfo = "";
    try {
        const data = await getWeatherRequest('44418');
        //console.log(data);
        weatherInfo = data.consolidated_weather[0];
    } catch (error) {
        console.error(error);
    }
    console.log(weatherInfo);
})();
*/