const { validationResult } = require('express-validator');

const eventService = require('../services/event.service');
const mailService = require('../services/mail.service');
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const { calendarId } = req.params;
    const {
      name, type, description, color, startEvent, endEvent,
    } = req.body;

    const event = await eventService.createEvent(calendarId, {
      author: req.user.id,
      parentCalendar: calendarId,
      name,
      type,
      description,
      color,
      startEvent,
      endEvent,
    });

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const {
      name,
      type,
      description,
      color,
      startEvent,
      endEvent,
      isPerformed,
    } = req.body;
    const event = await eventService.updateEvent(
      req.user.id,
      req.params.id,
      name,
      type,
      description,
      color,
      startEvent,
      endEvent,
      isPerformed,
    );

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents(req.params.calendarId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getTodayEvents = async (req, res, next) => {
  try {
    const result = await eventService.getTodayEvents();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
const getEvent = async (req, res, next) => {
  try {
    const result = await eventService.getEventById(req.params.id, req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(req.user.id, id);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const sendInvite = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { from: req.user.id, event: req.params.id, to: req.body.participant },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '7d',
      },
    );
    await mailService.sendInviteEvent(
      req.body.participant.email,
      token,
      req.user.fullName,
      req.params.id,
    );
    res.status(200).json({ message: 'Invite sent successfully' });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  try {
    const { key } = req.params;
    const participant = jwt.verify(key, process.env.JWT_ACCESS_SECRET);
    if (!participant) {
      return next(
        ApiError.BadRequestError('link expired or participant invalid'),
      );
    }
    await eventService.addParticipant(participant.event, participant.to.id);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getTodayEvents,
  getEvent,
  deleteEvent,
  sendInvite,
  acceptInvite,
};
