/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const process = require('process');
const markov = require('./markov');


// Make new Markov and generate text
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// Read file and generate text
function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR with: ${path}`, err);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeURL(url) {
    let res;

    try {
        res = await axios.get(url);
    } catch (err) {
        console.error(`ERROR with: ${url}`, err);
        process.exit(1);
    }
    generateText(res.data);
}

// Solution shows the below code:
// What does putting 'method' and 'path' in square brackets do? Is it just putting it into an array?
let [method, path] = process.argv.slice(2);
// let myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

if (method === 'file') {
    makeText(path);
} else if (method === 'url') {
    makeURL(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
