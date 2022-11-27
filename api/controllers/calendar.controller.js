const { validationResult } = require('express-validator');

const calendarService = require('../services/calendar.service');
const { Calendar, User, Event } = require('../models');с
const ApiError = require('../utils/ApiError');

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

module.exports = {
  createCalendar,
  updateCalendar,
  getAllCalendars,
  getCalendar,
  deleteCalendar,
};
