const https = require('https');

const request = async (woeid, postData) => {
  const url = `https://www.metaweather.com/api/location/${woeid}/`;

  return new Promise((resolve, reject) => {
        const req = https.request(url, res => {
        
        if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`Status Code: ${res.statusCode}`));
        }

        let data = "";

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            resolve(JSON.parse(data))
            });
        });

        req.on('error', reject);

        if (postData) {
        req.write(postData);
        }

        req.end();
    });
};

//FOR TESTING DIRECTLY
/*
(async () => {
    let weatherInfo = "";
    try {
        const data = await request('44418');
        //console.log(data);
        weatherInfo = data.consolidated_weather[0];
    } catch (error) {
        console.error(error);
    }
    console.log(weatherInfo);
})();
*/

//woeID - Where On Earth ID - get via getWoeID
//dayID - array id, dayIDs start from current day (0), range 0-5
async function getWeatherInfo(woeID, dayID){
    let weatherInfo = "";
    if (dayID > 5 || dayID < 0){
        console.error("DayID must range between 0-5.");
        return;
    }

    try {
        const data = await request(woeID);
        //console.log(data);
        weatherInfo = data.consolidated_weather[dayID];
    } catch (error) {
        console.error(error);
    }

    //console.log(weatherInfo);
    return weatherInfo;
}
module.exports = getWeatherInfo;