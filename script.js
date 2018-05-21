const fs = require('fs');

const src = fs.createReadStream(`${__dirname}/users.json`);
src.on('data', (chunk) => console.log('chunk : ', chunk.toString()));