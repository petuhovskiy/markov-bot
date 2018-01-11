const { execFile } = require('child_process')
const stream   = require('stream')
const db = require('./dbMessages')

const getText = (chatId, username) => {
    if (username == 'all') {
        return db.findByChat(chatId).then(db.asText);
    } else {
        return db.findByChatAndUser(chatId, username).then(db.asText);
    }
}

const execCommand = (exe, args, input) => {
    return new Promise((resolve, reject) => {
        const child = execFile(exe, args, (error, stdout, stderr) => {
            console.log('error = ', error);
            console.log('stderr = ', stderr);
            resolve(stdout);
        });

        const stdinStream = new stream.Readable();
        stdinStream.push(input);  // Add data to the internal queue for users of the stream to consume
        stdinStream.push(null);   // Signals the end of the stream (EOF)
        stdinStream.pipe(child.stdin);
    });
}

const runMarkov = (text, c, len) => {
    return execCommand('./markov', [c + '', len + ''], text);
}

const main = (chatId, username, c, len) => {
    if (!(c >= 1 && c <= 10) || !(len >= 1 && len <= 1000)) {
        return Promise.resolve('No!');
    }
    return getText(chatId, username)
        .then(it => runMarkov(it, c, len));
}

module.exports = { main }