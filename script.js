const fs = require('fs');
const mongoose = require('mongoose');
const JSONStream = require('JSONStream');
const User = require('./models/User');

const databaseURL = 'mongodb://127.0.0.1/dextra';
mongoose.connect(databaseURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to mongo server.');
  const dataStreamFromFile = fs.createReadStream(`${__dirname}/largeUsers.json`);

  dataStreamFromFile.pipe(JSONStream.parse('*')).on('data', (jsonArray) => {
    new User(jsonArray).save();
  });

  dataStreamFromFile.on('end', () => {
    console.log('Import complete, closing connection...');
    db.close();
    process.exit(0);
  });
});

db.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(-1);
});
