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
    req
      .checkQuery('status', 'status should be an integer')
      .isIn(['unregistered', 'complete'])
      .optional();
    req
      .checkQuery('phoneVerified', 'phoneVerified should be an boolean')
      .isBoolean()
      .optional();
    req
      .checkQuery('emailVerified', 'emailVerified should be an boolean')
      .isBoolean()
      .optional();
    req
      .checkQuery('createdOn', 'createdOn should be an integer')
      .isDate()
      .optional();
    req
      .checkQuery('updatedOn', 'updatedOn should be an integer')
      .isDate()
      .optional();

    const errors = req.validationErrors();
    if (errors) {
      return sendResponse(res, 422, {}, errors[0].msg);
    }

    const currentPage = parseInt(req.query.currentPage, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 0;
    const {
      status, phoneVerified, emailVerified, createdOn, updatedOn,
    } = req.query;

    const findQuery = {};

    if (status) findQuery.status = status;
    if (phoneVerified) findQuery.phoneVerified = phoneVerified;
    if (emailVerified) findQuery.emailVerified = emailVerified;
    if (createdOn) findQuery.createdOn = createdOn;
    if (updatedOn) findQuery.updatedOn = updatedOn;

    const skip = limit * (currentPage - 1);

    const userData = await UserModel.find(findQuery)
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
