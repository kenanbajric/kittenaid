// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    db_uri: process.env.DB_URI,
    port: process.env.PORT
};