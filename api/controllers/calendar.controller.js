const { validationResult } = require('express-validator');

const calendarService = require('../services/calendar.service');
const { Calendar, User, Event } = require('../models');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const mailService = require('../services/mail.service');

const createCalendar = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const { name, description } = req.body;
    const calendar = await calendarService.createCalendar(req.user.id, {
      author: req.user.id,
      name,
      description,
    });
    return res.status(201).json(calendar);
  } catch (err) {
    next(err);
  }
};

const updateCalendar = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const {
      name, description, isHidden, isPublic,
    } = req.body;
    const calendar = await calendarService.updateCalendar(
      req.user.id,
      req.params.id,
      name,
      description,
      isHidden,
      isPublic,
    );

    return res.status(201).json(calendar);
  } catch (err) {
    next(err);
  }
};

const getAllCalendars = async (req, res, next) => {
  try {
    const result = await calendarService.getAllCalendars(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getCalendar = async (req, res, next) => {
  try {
    const result = await calendarService.getCalendarById(
      req.params.id,
      req.user.id,
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await calendarService.deleteCalendar(req.user.id, id);
    res.status(204).json({ message: 'Calendar deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const sendInvite = async (req, res, next) => {
  try {
    const token = jwt.sign({from: req.user.id, calendar: req.params.id, to: req.body.participant}, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '7d',
    });
    const user = await User.findById(req.body.participant);
    await mailService.sendInviteCalendar(user.email, token);//TODO: добавить от кого письмо, что б оформить красивее
    res.status(200).json({ message: 'Invite sent successfully' });
  } catch (err) {
    next(err);
  }
}

const acceptInvite = async (req, res, next) => {
  try {
    const key = req.params.key;
    const participant = jwt.verify(key, process.env.JWT_ACCESS_SECRET);
    if(!participant){
      return next(ApiError.BadRequestError('link expired or participant invalid'));
    }
    //TODO: add func of updating participant
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCalendar,
  updateCalendar,
  getAllCalendars,
  getCalendar,
  deleteCalendar,
  sendInvite,
  acceptInvite
};
