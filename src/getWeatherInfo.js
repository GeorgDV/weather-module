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

async function getWeatherInfo(woeid){
    let weatherInfo = "";

    try {
        const data = await request(woeid);
        //console.log(data);
        weatherInfo = data.consolidated_weather[0];
    } catch (error) {
        console.error(error);
    }

    //console.log(woeid);
    return weatherInfo;
}
module.exports = getWeatherInfo;