const mongoose = require('mongoose')
const Schema = mongoose.Schema

// init

const url = process.env.MONGO_DB_MSG;
mongoose.connect(url);

const db = mongoose.connection;

const Message = mongoose.model('Message', new Schema({}, { strict: false }))

const findByChat = (chatId) => {
    return Message.find({'chat.id': chatId}).exec();
}

const findByChatAndUser = (chatId, username) => {
        return Message.find({'chat.id': chatId, 'username': username}).exec();
}

const asText = (arr) => {
    return arr
        .map(it => it.text)
        .join('\n');
}

module.exports = {
    Message,
    findByChat,
    findByChatAndUser,
    asText
}