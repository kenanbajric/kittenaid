// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    db_uri: process.env.DB_URI,
    port: process.env.PORT,
    jwt_string: process.env.JWT_STRING,
    sendgrid_key: process.env.SENDGRID_KEY
};