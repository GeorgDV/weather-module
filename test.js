const getWoeID = require('./src/getWoeID');

let id = getWoeID('london');
setTimeout(() => {
    id = process.binding('util').getPromiseDetails(id)[1];
    console.log(id);
}, 500);
