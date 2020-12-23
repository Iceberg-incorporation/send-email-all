const dotenv = require('dotenv');
const key = require('./blackboard-app-296106-a6a06a8dba96.json');

dotenv.config();

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    secure: process.env.SECURE,
    auth: {
        type: process.env.AUTH_TYPE,
        user: process.env.AUTH_USER,
        serviceClient: key.client_id,
        privateKey: key.private_key
    }
};

module.exports = config;