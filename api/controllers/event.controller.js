const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const eventService = require('../services/event.service');
const tokenService = require('../services/token.service');
const { Calendar, User, Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const calendarId = req.params.calendarId;
    const {name, type, description, color, startEvent, endEvent} = req.body;

    const event = await eventService.createEvent(calendarId, {
      author: req.user.id,
      parentCalendar: calendarId,
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
    const id  = req.params.id;
    await eventService.deleteEvent(req.user.id, id);
    res.status(204).json({ message: 'Event deleted successfully' });//TODO: ничего не выводится при удалении в постмане, но оно удаляется
  } catch (err) {
    next(err);
  }
};

const sendInvite = async (req, res, next) => {//TODO: Бля тут дохуя переделывать(смотри строку с отправкой письма 100, юзер емейл это наш а не тот, кому отправлять, поэтому переделать нада)
  try {
    const token = jwt.sign({from: req.user.id, event: req.params.id, to: req.body.participant}, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '7d',
    });
    const user = await User.findById(req.body.participant);
    await mailService.sendInviteEvent(req.body.participant.email, token, user.fullName, req.params.id);//TODO: добавить от кого письмо, что б оформить красивее
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
    await eventService.addParticipant(participant.event, participant.to.id);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEvent,
  deleteEvent,
  sendInvite,
  acceptInvite
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
