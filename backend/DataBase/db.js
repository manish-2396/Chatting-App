const mongoose = require('mongoose');
require('dotenv').config()

const connect = mongoose.connect(process.env.MONGO_DB);

module.exports = {
    connect
}