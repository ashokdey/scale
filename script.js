const fs = require('fs');
const JSONStream = require('JSONStream');
const mongoose = require('mongoose');
const es = require('event-stream');
const User = require('./models/User');

const databaseURL = 'mongodb://127.0.0.1/dextra';
mongoose.connect(databaseURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to mongo server.');
  const dataSource = fs.createReadStream(`${__dirname}/users.json`);

  dataSource.pipe(JSONStream.parse('*')).pipe(es.map(async (doc, next) => {
    await new User(doc).save();
    return next();
  }));
});

db.on('error', () => {
  console.error('MongoDB connection error:');
  process.exit(-1);
});
