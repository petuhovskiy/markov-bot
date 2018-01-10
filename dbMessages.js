const mongoose = require('mongoose')
const Schema = mongoose.Schema

// init

const url = process.env.MONGO_DB;
mongoose.connect(url);

const db = mongoose.connection;

const Message = mongoose.model('Message', new Schema({}, { strict: false }))

module.exports = {
    Message
}