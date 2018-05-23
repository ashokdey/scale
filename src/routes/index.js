const appRoutes = require('express').Router();
const userRoutes = require('./users');

appRoutes.use('/', userRoutes);

module.exports = appRoutes;
