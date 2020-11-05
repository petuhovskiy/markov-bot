const main = require('./main').main
const saveMessage = require('./dbMessages').saveMessage

const parseUsername = u => {
    let username = (u.indexOf('@') == 0) ? u.substring(1) : u;
    return {
        username: username.toLowerCase(),
        query: username,
        display: '@' + username
    }
}

module.exports = bot => {
    bot.onText(/\/kek (@\w+) ([0-9]+) ([0-9]+)/, (msg, match) => {
        main(msg.chat.id, parseUsername(match[1]).query, parseInt(match[2]), parseInt(match[3]))
            .then(markov => {
                bot.sendMessage(msg.chat.id, markov);
            })
    })

    bot.on('message', msg => {
        if (msg.text.startsWith('/')) {
            return;
        }
        saveMessage(msg);
    });
}
