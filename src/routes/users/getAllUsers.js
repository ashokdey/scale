const express = require('express');
const UserModel = require('../../models/User');
const sendResponse = require('../../utils/sendResponse');

const allUsers = express.Router();

allUsers.get('/all', async (req, res) => {
  try {
    req
      .checkQuery('limit', 'limit should be an integer')
      .isInt()
      .optional();
    req
      .checkQuery('offset', 'offset should be an integer')
      .isInt()
      .optional();

    const errors = req.validationErrors();
    if (errors) {
      return sendResponse(res, 422, {}, errors[0].msg);
    }

    const userData = await UserModel.find({});

    return sendResponse(
      res,
      200,
      {
        users: userData,
      },
      'Fetched users successfully',
    );
  } catch (err) {
    return sendResponse(res, 500, {}, 'Something went wrong');
  }
});

module.exports = allUsers;
