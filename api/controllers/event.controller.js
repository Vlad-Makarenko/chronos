const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const eventService = require('../services/event.service');
const tokenService = require('../services/token.service');
const { Calendar, User, Event } = require('../models');с
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const calendarId = req.params.calendarId;
    const {name, type, color, startEvent, endEvent} = req.body;
    
    //TODO: проверить правильно ли приходит айди и работает ли ваще
    const event = await eventService.createEvent(calendarId, {
      author: req.user.id,
      parentCalendar: calendarId,//TODO: mb to string()?
      name, 
      type,
      description,
      color,
      startEvent,
      endEvent
    })

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
      name, type, description, color, startEvent, endEvent, isPerformed
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
      isPerformed
    );

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents(req.params.calendarId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const result = await eventService.getEventById(
      req.params.id,
      req.user.id
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    await eventService.deleteEvent(req.user.id, id);
    res.status(204).json({ message: 'Event deleted successfully' });
    // const { id } = req.params;
    // await calendarService.deleteCalendar(req.user.id, id);
    // res.status(204).json({ message: 'Calendar deleted successfully' });
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


// const { validationResult } = require('express-validator');

// const calendarService = require('../services/calendar.service');
// const ApiError = require('../utils/ApiError');

// const createCalendar = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(ApiError.BadRequestError('validation error', errors.array()));
//     }
//     const { name, description } = req.body;
//     const calendar = await calendarService.createCalendar(req.user.id, {
//       author: req.user.id,
//       name,
//       description,
//     });
//     return res.status(201).json(calendar);
//   } catch (err) {
//     next(err);
//   }
// };

// const updateCalendar = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(ApiError.BadRequestError('validation error', errors.array()));
//     }
//     const {
//       name, description, isHidden, isPublic,
//     } = req.body;
//     const calendar = await calendarService.updateCalendar(
//       req.user.id,
//       req.params.id,
//       name,
//       description,
//       isHidden,
//       isPublic,
//     );

//     return res.status(201).json({ calendar });
//   } catch (err) {
//     next(err);
//   }
// };

// const getAllCalendars = async (req, res, next) => {
//   try {
//     const result = await calendarService.getAllCalendars(req.user.id);
//     res.status(201).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// const getCalendar = async (req, res, next) => {
//   try {
//     const result = await calendarService.getCalendarById(
//       req.params.id,
//       req.user.id,
//     );
//     res.status(201).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteCalendar = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await calendarService.deleteCalendar(req.user.id, id);
//     res.status(204).json({ message: 'Calendar deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   createCalendar,
//   updateCalendar,
//   getAllCalendars,
//   getCalendar,
//   deleteCalendar,
// };
