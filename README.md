# Javascript Weather Module with Caching
Made via Metaweather Open API: [`https://www.metaweather.com/api/`](https://www.metaweather.com/api/)

## Guide/Usage

1. Fork/Clone Repo => `git clone.https://github.com/GeorgDV/weather-module.git`.
2. Install dependencies => `npm install`
3. Run unit-tests via jest => `npm run test`.
4. Test requests usage and caching with => `node test_usage.js`.

### Example of usage:

```
const  WeatherClient = require('./src/WeatherClient');

test();
async  function  test(){
console.log('Todays Date: ', new  Date(Date.now()).toISOString().substr(0, 10));
console.log('London WoeID: ', await  WeatherClient.getWoeID('london'));
console.log('London Weather: ', await  WeatherClient.getWeather('london', 2));
console.log('London Temp: ', await  WeatherClient.getTemp('london', 2));
console.log('London Weather info with cache: ', await  WeatherClient.getWeatherWithCache('london', 1));
console.log('London Temp info with cache: ', await  WeatherClient.getTempWithCache('london', 1));

}
```

Output:
```
Todays Date:  2020-05-21           
London WoeID:  44418               
London Weather:  {                 
  when: '2020-05-23',              
  weather_state: 'Heavy Cloud',    
  min_temp: 11.96,                 
  normal_temp: 18.265,             
  max_temp: 18.955,                
  wind_direction: 'WSW',           
  wind_speed: 12.89092102877595,   
  air_pressure: 1023,              
  humidity: 44,                    
  predictability: 71               
}                                  
London Temp:  {                    
  when: '2020-05-23',              
  min_temp: 11.96,                 
  normal_temp: 18.265,             
  max_temp: 18.955                 
}                                  
London Weather info with cache:  { 
  when: '2020-05-22',              
  weather_state: 'Heavy Cloud',    
  min_temp: 13.495000000000001,    
  normal_temp: 20.455,             
  max_temp: 20.63,                 
  wind_direction: 'WSW',           
  wind_speed: 10.212827544333095,  
  air_pressure: 1016.5,            
  humidity: 43,                    
  predictability: 71,              
  is_cached_data: true             
}                                  
London Temp info with cache:  {    
  when: '2020-05-22',              
  min_temp: 13.495000000000001,    
  normal_temp: 20.455,             
  max_temp: 20.63,                 
  is_cached_data: true             
}  
```
      

                          
## Functions


 -  **getWoeID(city: String)** - Returns WoeID (where-on-earth id) for **city/location** parameter   (can be full or partial **String**).


 - **getWeather(city: String, day: Integer)** - Returns a JSON object, that contains all weather info for **city/location** parameter   (can be full or partial **String**). 
   
   Parameter **day**, as **Integer** value, chooses day from current
   upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from
   0-5**.


 - **getTemp(city: String, day: Integer)** - Returns a JSON object, that contains basic temperature info for **city/location** parameter  (can be full or partial **String**). 
   
   Parameter **day**, as **Integer** value, chooses day from current
   upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from
   0-5**.


 - **getWeatherWithCache(city: String, day: String, useTestCacheDirs: Boolean)** - Returns a JSON object, that contains all weather info
   for  **city/location** parameter  (can be full or partial
   **String**) and caches the data locally (for 15 minutes). 
   
   Parameter **day**, as **Integer** value, chooses day from current
   upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from
   0-5**. 
   
   Parameter **useTestCacheDirs**, as **Boolean** value, is used in testing
   and can be left empty normally, use "true"  when using function in
   tests to keep caching directories separated.
  
  
 - **getTempWithCache(city: String, day: String, useTestCacheDirs: Boolean)** - Returns a JSON object, that contains basic temperature
   info for **city/location** parameter   (can be full or
   partial **String**) and caches the data locally (for 15 minutes). 
   
   Parameter **day**, as **Integer** value, chooses day from current
   upcoming days (0 - current day, 1 - tomorrow, etc), **ranges from
   0-5**. 
   
   Parameter  **useTestCacheDirs**, as **Boolean** value, is used in testing
   and can be left empty normally, use "true" when using function in
   tests to keep caching directories separated.
