const WeatherClient = require('../src/WeatherClient');
const fs = require("fs");

const rmDir = function (dir, rmSelf) {
    var files;
    rmSelf = (rmSelf === undefined) ? true : rmSelf;
    dir = dir + "/";
    try { files = fs.readdirSync(dir); } catch (e) { console.log("No directory found to remove."); return; }
    if (files.length > 0) {
        files.forEach(function (x, i) {
            if (fs.statSync(dir + x).isDirectory()) {
                rmDir(dir + x);
            } else {
                fs.unlinkSync(dir + x);
            }
        });
    }
    if (rmSelf) {
        fs.rmdirSync(dir);
    }
}

var date = new Date(Date.now());
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

jest.setTimeout(10000);
describe('WeatherClient Request Tests:', () => {
    test('getWoeID returns correct WoeID', async () => {
        expect(await WeatherClient.getWoeID('london')).toBe(44418);
    });


    test('getWeather returns correct response for current day', async () => {
        const response = await WeatherClient.getWeather('london', 0);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('weather_state');
        expect(response).toHaveProperty('air_pressure');
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('wind_direction');
        expect(response).toHaveProperty('wind_speed');
        expect(response).toHaveProperty('humidity');
        expect(response).toHaveProperty('predictability');
    });

    test('getWeather returns correct response for upcoming second day', async () => {
        const response = await WeatherClient.getWeather('london', 2);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.addDays(2).toISOString().substr(0, 10));
        expect(response).toHaveProperty('weather_state');
        expect(response).toHaveProperty('air_pressure');
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('wind_direction');
        expect(response).toHaveProperty('wind_speed');
        expect(response).toHaveProperty('humidity');
        expect(response).toHaveProperty('predictability');
    });


    test('getTemp returns correct response for current day', async () => {
        const response = await WeatherClient.getTemp('london', 0);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
    });

    test('getTemp returns correct response for upcoming third day', async () => {
        const response = await WeatherClient.getTemp('london', 3);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.addDays(3).toISOString().substr(0, 10));
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
    });


    test('getWeatherWithCache returns correct response for current day and caches data', async () => {
        rmDir(__dirname + '/test-cache', true);
        var response = await WeatherClient.getWeatherWithCache('london', 0, true);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('weather_state');
        expect(response).toHaveProperty('air_pressure');
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('wind_direction');
        expect(response).toHaveProperty('wind_speed');
        expect(response).toHaveProperty('humidity');
        expect(response).toHaveProperty('predictability');
        expect(response).toHaveProperty('is_cached_data', false);

        response = await WeatherClient.getWeatherWithCache('london', 0, true);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('weather_state');
        expect(response).toHaveProperty('air_pressure');
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('wind_direction');
        expect(response).toHaveProperty('wind_speed');
        expect(response).toHaveProperty('humidity');
        expect(response).toHaveProperty('predictability');
        expect(response).toHaveProperty('is_cached_data', true);
    });

    test('getTempWithCache returns correct response for current day and caches data', async () => {
        rmDir(__dirname + '/test-cache', true);
        var response = await WeatherClient.getTempWithCache('london', 0, true);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('is_cached_data', false);

        response = await WeatherClient.getTempWithCache('london', 0, true);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('when', date.toISOString().substr(0, 10));
        expect(response).toHaveProperty('min_temp');
        expect(response).toHaveProperty('normal_temp');
        expect(response).toHaveProperty('max_temp');
        expect(response).toHaveProperty('is_cached_data', true);
    });
});
