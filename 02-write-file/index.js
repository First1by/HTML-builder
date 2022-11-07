const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { rawListeners } = require('process');

const rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const pathToFile = path.join('02-write-file', 'text.txt');

const fileText = fs.createWriteStream(pathToFile);

readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'c') {
        console.log('\nПока! Вы остановиили процесс.');
    }
});

function write() {
    rd.question('Привет. Напиши что-нибудь...', text => {
        console.log(text);
        if (text.toLocaleLowerCase() === 'exit') {
            console.log('\nПока! Вы остановиили процесс.');
            rd.close();
            return;
        }
        fileText.write(text + '\n', err => {
            if (err) {
                console.log(err.message);
            } else {
                write();
            }
        })
    })
}

write();