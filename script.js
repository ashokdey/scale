const fs = require('fs');
const mongoose = require('mongoose');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const User = require('./models/User');

const databaseURL = 'mongodb://127.0.0.1/dextra';
mongoose.connect(databaseURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to mongo server.');
  const dataStreamFromFile = fs.createReadStream(`${__dirname}/users.json`);

  dataStreamFromFile.pipe(JSONStream.parse('*')).pipe(es.map(async (userDocument, next) => {
    new User(userDocument).save();
    return next();
  }));

  dataStreamFromFile.on('end', () => {
    console.log('Import complete, closing connection...');
    db.close();
    process.exit(0);
  });
});

db.on('error', () => {
  console.error('MongoDB connection error:');
  process.exit(-1);
});
