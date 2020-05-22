const fs = require('fs');
const WeatherRequests = require('./WeatherRequests');

//TIME SET TO UPDATE CACHE IN EVERY 15 MINUTES
const time = 900000;

let cacheDir = __dirname + '/cache';
let cacheTimersDir = __dirname + '/cache/cacheTimers';

//city - city name as full or partial string
const getWoeID = async (city) => {
    let woeid = "";

    try {
        const data = await WeatherRequests.getCityRequest(city);
        woeid = data[0].woeid;
    } catch (error) {
        console.error(error);
    }

    return woeid;
}

//city -string, city name as full or partial string
//day - integer, array id, days start from current day (0), range 0-5
//useTestCacheDirs - boolean, use when using tests cache directiories (used for testing)
const getWeatherWithCache = async (city, day, useTestCacheDirs) => {
    const now = new Date().getTime();
    let weatherInfo = {is_cached_data: false};

    if (day > 5 || day < 0 || day === null) {
        console.error("Given DayID must range between 0-5.");
        return;
    }

    if (useTestCacheDirs === true){
        cacheDir = __dirname + '/../tests/test-cache';
        cacheTimersDir = __dirname + '/../tests/test-cache/test-cacheTimers';
    }

    await ensureDirExists(cacheDir);
    await ensureDirExists(cacheTimersDir);
    if (await fs.existsSync(cacheDir + '/' + city + '-' + day + '_WeatherInfoCache.txt')) {
        //GET DATA FROM CACHE
        weatherInfo = await fs.readFileSync(cacheDir + '/' + city + '-' + day +'_WeatherInfoCache.txt');
        weatherInfo = JSON.parse(weatherInfo);
        weatherInfo.is_cached_data = true;
    }

    let weatherInfoCacheTimer = await getCurrentCacheTimer(cacheTimersDir + '/' + city + '-' + day + '_WeatherInfoCacheTimer.txt');;
    if (weatherInfoCacheTimer < now && weatherInfo.is_cached_data === false) {
        //GET NEW DATA FROM API
        weatherInfo = await getWeather(city, day);
        weatherInfo.is_cached_data = false;
        
        //UPDATE CACHE
        weatherInfo = JSON.stringify(weatherInfo);
        await fs.writeFileSync(cacheDir + '/' + city + '-' + day + '_WeatherInfoCache.txt', weatherInfo);
        weatherInfo = JSON.parse(weatherInfo);
        console.log('Updated ' + city + '-' + day + ' Weather Info Cache!');

        //UPDATE CACHE TIMER
        weatherInfoCacheTimer = getNewCacheTimer(time, weatherInfoCacheTimer);
        await fs.writeFileSync(cacheTimersDir + '/' + city + '-' + day + '_WeatherInfoCacheTimer.txt', weatherInfoCacheTimer, 'utf-8');
    }

    return weatherInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//useTestCacheDirs - boolean, use when using tests cache directiories (used for testing)
const getTempWithCache = async (city, day, useTestCacheDirs) => {
    const now = new Date().getTime();
    let tempInfo = {is_cached_data: false};

    if (day > 5 || day < 0 || day === null) {
        console.error("Given DayID must range between 0-5.");
        return;
    }

    if (useTestCacheDirs === true){
        cacheDir = __dirname + '/../tests/test-cache';
        cacheTimersDir = __dirname + '/../tests/test-cache/test-cacheTimers';
    }

    await ensureDirExists(cacheDir);
    await ensureDirExists(cacheTimersDir);
    if (await fs.existsSync(cacheDir + '/' + city + '-' + day + '_TempCache.txt')) {
        //GET DATA FROM CACHE
        tempInfo = await fs.readFileSync(cacheDir + '/' + city + '-' + day + '_TempCache.txt');
        tempInfo = JSON.parse(tempInfo);
        tempInfo.is_cached_data = true;
    }

    let tempCacheTimer = await getCurrentCacheTimer(cacheTimersDir + '/' + city + '-' + day + '_TempCacheTimer.txt');
    if (tempCacheTimer < now && tempInfo.is_cached_data === false) {
        //GET NEW DATA FROM API
        tempInfo = await getTemp(city, day);
        tempInfo.is_cached_data = false;
        
        //UPDATE CACHE
        tempInfo = JSON.stringify(tempInfo);
        await fs.writeFileSync(cacheDir + '/' + city + '-' + day + '_TempCache.txt', tempInfo);
        tempInfo = JSON.parse(tempInfo);
        console.log('Updated ' + city + '-' + day + ' Temperature Info Cache!');

        //UPDATE CACHE TIMER
        tempCacheTimer = getNewCacheTimer(time, tempCacheTimer);
        await fs.writeFileSync(cacheTimersDir + '/' + city + '-' + day + '_TempCacheTimer.txt', tempCacheTimer, 'utf-8');
    }

    return tempInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getWeather = async (city, day) => {
    let weatherInfo = {};

    if (day > 5 || day < 0 || day === null) {
        console.error("Given DayID must range between 0-5.");
        return;
    }

    try {
        let woeID = await getWoeID(city);
        const data = await WeatherRequests.getWeatherRequest(woeID);
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

    return weatherInfo;
}

//city - city name as full or partial string
//day - array id, days start from current day (0), range 0-5
//woeID - Where On Earth ID - get via getWoeID
const getTemp = async (city, day) => {
    let tempInfo = {};

    if (day > 5 || day < 0 || day === null) {
        console.error("Given DayID must range between 0-5.");
        return;
    }

    try {
        let woeID = await getWoeID(city);
        const data = await WeatherRequests.getWeatherRequest(woeID);
        tempInfo = {
            when: data.consolidated_weather[day].applicable_date,
            min_temp: data.consolidated_weather[day].min_temp,
            normal_temp: data.consolidated_weather[day].the_temp,
            max_temp: data.consolidated_weather[day].max_temp
        }
    } catch (error) {
        console.error(error);
    }

    return tempInfo;
}

exports.getWoeID = getWoeID;
exports.getWeather = getWeather;
exports.getTemp = getTemp;
exports.getWeatherWithCache = getWeatherWithCache;
exports.getTempWithCache = getTempWithCache;


function getNewCacheTimer(time, timer) {
    const now = new Date().getTime();
    if (timer < now + time) {
        timer = now + time;
    }
    return timer;
}

async function getCurrentCacheTimer(cacheTimerPath) {
    let cacheTimer = 0;
    if (await fs.existsSync(cacheTimerPath)) {
        cacheTimer = await fs.readFileSync(cacheTimerPath);
    }
    return cacheTimer;
} 

async function ensureDirExists(dir) {
    if (await !fs.existsSync(dir)){
        await fs.mkdirSync(dir);
    }
}