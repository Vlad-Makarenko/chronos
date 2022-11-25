const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const ApiError = require('../utils/ApiError');

const updateUser = async (req, res, next) => {
  try {
    // const { login, password } = req.body;
    // const userData = await authService.authorization(login, password);
    // res.cookie('refreshToken', userData.refreshToken, {
    //   maxAge: 30 * 24 * 3600 * 1000,
    //   httpOnly: true,
    // });
    // return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // const { refreshToken } = req.cookies;
    // await tokenService.removeToken(refreshToken);

    // res.clearCookie('refreshToken');
    // return res.status(204).json('OK');
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    // const { email } = req.body;
    // await authService.passwordReset(email);
    // res.status(204).json({ message: 'The link has been sent to your email' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  getAllUsers,
  getUser,
};
