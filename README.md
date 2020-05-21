# Javascript Weather Module with Caching
Made via Metaweather Open API: [`https://www.metaweather.com/api/`](https://www.metaweather.com/api/)

## Guide/Usage

1. Fork/Clone Repo => `git clone.https://github.com/GeorgDV/weather-module.git`.
2. Install dependencies => `npm install`
3. Run unit-tests via jest => `npm run test`.
4. Test requests usage and caching with => `node test_usage.js`.

## Functions

-  **getWoeID(city: String)** - Returns WoeID for **city/location** inputted as parameter (can be full or partial **String**).

-  **getWeather(city: String, day: Integer)** - Returns a JSON object, that contains all weather info for **city/location** inputted as parameter (can be full or partial **String**). The parameter **day**, as **Integer** value, chooses day from current upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from 0-5**.

-  **getTemp(city: String, day: Integer)** - Returns a JSON object, that contains basic temperature info for **city/location** inputted as parameter (can be full or partial **String**). The parameter **day**, as **Integer** value, chooses day from current upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from 0-5**.

-  **getWeatherWithCache(city: String, day: String, useTestCacheDirs: Boolean)** - Returns a JSON object, that contains all weather info for **city/location** inputted as parameter (can be full or partial **String**) and **caches** the data locally. The parameter **day**, as **Integer** value, chooses day from current upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from 0-5**. The **useTestCacheDirs**, as **Boolean** value, is used in testing and can be left empty normally, use "true"  when using function in tests to keep caching directories separated.
  
-  **getTempWithCache(city: String, day: String, useTestCacheDirs: Boolean)** - Returns a JSON object, that contains basic temperature info for **city/location** inputted as parameter (can be full or partial **String**) and **caches** the data locally. The parameter **day**, as **Integer** value, chooses day from current upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from 0-5**. The **useTestCacheDirs**, as **Boolean** value, is used in testing and can be left empty normally, use "true" when using function in tests to keep caching directories separated.
