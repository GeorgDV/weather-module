const https = require('https');
const WeatherRequests = require('./WeatherRequests');


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

//woeID - Where On Earth ID - get via getWoeID
//day - array id, days start from current day (0), range 0-5
const getWeatherInfo = async (city, day) => {
    let weatherInfo = {};

    if (day > 5 || day < 0) {
        console.error("DayID must range between 0-5.");
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

/*
//woeID - Where On Earth ID - get via getWoeID
//dayID - array id, dayIDs start from current day (0), range 0-5
const getWeatherInfo = async (woeID, dayID) => {
    let weatherInfo = "";
    if (dayID > 5 || dayID < 0){
        console.error("DayID must range between 0-5.");
        return;
    }

    try {
        const data = await WeatherRequests.getWeatherRequest(woeID);
        //console.log(data);
        weatherInfo = data.consolidated_weather[dayID];
    } catch (error) {
        console.error(error);
    }

    //console.log(weatherInfo);
    return weatherInfo;
}
*/

exports.getWoeID = getWoeID;
exports.getWeatherInfo = getWeatherInfo;
exports.getTemp = getTemp;



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