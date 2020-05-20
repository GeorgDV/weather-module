const https = require('https');

const getCityRequest = async (city, postData) => {
    const url = `https://www.metaweather.com/api/location/search/?query=${city}`;

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



const getWeatherRequest = async (woeid, postData) => {
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


exports.getWeatherRequest = getWeatherRequest;
exports.getCityRequest = getCityRequest;
