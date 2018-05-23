const express = require('express');
const UserModel = require('../../models/User');
const sendResponse = require('../../utils/sendResponse');

const allUsers = express.Router();

allUsers.get('/all', async (req, res) => {
  try {
    req
      .checkQuery('limit', 'limit should be an integer')
      .isInt()
      .exists();
    req
      .checkQuery('currentPage', 'currentPage should be an integer')
      .isInt()
      .exists();

    const errors = req.validationErrors();
    if (errors) {
      return sendResponse(res, 422, {}, errors[0].msg);
    }

    const currentPage = parseInt(req.query.currentPage, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 0;

    const skip = limit * (currentPage - 1);

    const userData = await UserModel.find({})
      .limit(limit)
      .skip(skip);

    const totalRecords = await UserModel.find({}).count();

    return sendResponse(
      res,
      200,
      {
        users: userData,
        totalRecords,
      },
      'Fetched users successfully',
    );
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, {}, 'Something went wrong');
  }
});

module.exports = allUsers;
