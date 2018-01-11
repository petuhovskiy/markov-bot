const db = require('./dbMessages')

const getText = (chatId, username) => {
    if (username == 'all') {
        return db.findByChat(chatId).then(db.asText);
    } else {
        return db.findByChatAndUser(chatId, username).then(db.asText);
    }
}

const main = (chatId, username, c, len) => {
    if (c < 1 || c > 10 || len < 1 || len > 300) {
        return Promise.resolve('No!');
    }
    return getText(chatId, username)
        .then(it => it);
}

module.exports = { main }