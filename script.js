const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');

const databaseURL = 'mongodb://127.0.0.1/dextra';
mongoose.connect(databaseURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to mongo server.');
  const dataSource = fs.createReadStream(`${__dirname}/users.json`);

  dataSource.on('data', async (chunk) => {
    try {
      const stringData = chunk.toString();
      const dataArray = JSON.parse(stringData);
      await User.insertMany(dataArray);
    } catch (err) {
      console.error('----error---', err);
    }
  });
});

db.on('error', () => {
  console.error('MongoDB connection error:');
  process.exit(-1);
});
