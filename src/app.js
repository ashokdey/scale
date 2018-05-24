const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const compression = require('compression');
const expressValidator = require('express-validator');

const config = require('../config.json');
const routes = require('./routes');
require('./database');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(expressValidator({
  customValidators: {
    isDate: value => !isNaN(Date.parse(value)),
  },
}));
app.disable('x-powered-by');
app.use('/', routes);
app.listen(config.PORT, () => console.log(`Running at : http://localhost:${config.PORT}`));
