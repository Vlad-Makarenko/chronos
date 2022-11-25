const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    // const {
    //   name, login, password, repeatedPassword, fullName,
    // } = req.body;
    // const userData = await authService.registration(
    //   email,
    //   login,
    //   password,
    //   repeatedPassword,
    //   fullName,
    // );
    // return res.status(201).json({ ...userData });
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
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

const getAllEvents = async (req, res, next) => {
  try {
    // const { refreshToken } = req.cookies;
    // await tokenService.removeToken(refreshToken);

    // res.clearCookie('refreshToken');
    // return res.status(204).json('OK');
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    // const { email } = req.body;
    // await authService.passwordReset(email);
    // res.status(204).json({ message: 'The link has been sent to your email' });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return next(ApiError.BadRequestError('validation error', errors.array()));
    // }
    // const token = req.params.confirm_token;
    // const { password, repeatedPassword } = req.body;
    // await authService.passwordConfirm(token, password, repeatedPassword);
    // res.status(204).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEvent,
  deleteEvent,
};
