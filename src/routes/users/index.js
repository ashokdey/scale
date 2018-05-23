const userRoutes = require('express').Router();
const getAllUsersRoute = require('./getAllUsers');

userRoutes.use('/users', getAllUsersRoute);

module.exports = userRoutes;
