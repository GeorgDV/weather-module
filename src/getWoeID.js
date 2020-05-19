const https = require('https');

const request = async (city, postData) => {
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

/*
(async () => {
    let woeid = "yes";
    try {
        const data = await request('london');
        console.log(data);
        woeid = data[0].woeid;
    } catch (error) {
        console.error(error);
    }
    console.log(woeid);
})();
*/

async function getWoeID(city){
    let woeid = "yes";

    try {
        const data = await request(city);
        //console.log(data);
        woeid = data[0].woeid;
    } catch (error) {
        console.error(error);
    }

    //console.log(woeid);
    return woeid;
}
module.exports = getWoeID;