const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.connect(config.MONGODB_URI);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to mongo server.');
});

db.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(-1);
});
