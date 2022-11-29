const { HolidayAPI } = require('holidayapi');

const eventService = require('./event.service');
const ApiError = require('../utils/ApiError');
const holidayDto = require('../utils/holidayDto');

const { Calendar, User, Event } = require('../models');

const createCalendar = async (userId, calendar) => await Calendar.create(calendar)
  .then((docCalendar) => {
    User.findByIdAndUpdate(
      userId,
      { $push: { calendars: docCalendar.id } },
      { new: true, useFindAndModify: false },
    );
    return docCalendar;
  });

const addParticipant = async (calendarId, participantId) => {
  const participant = await User.findById(participantId);
  if (!participant) {
    throw ApiError.BadRequestError('wrong user');
  }
  const calendar = await Calendar.findByIdAndUpdate(
    calendarId,
    { $push: { sharedParticipants: participantId } },
    { new: true, useFindAndModify: false },
  );
  return calendar;
};

const makeDefaultCalendar = async (user, country) => {
  const mainCalendar = await createCalendar(user.id, {
    isPublic: false,
    author: user.id,
    name: 'Main calendar',
    type: 'main',
    description:
      'This is the main calendar that displays your national holidays',
  });
  const holidayApi = new HolidayAPI({ key: process.env.HOLIDAY_API_KEY });
  const holidayArr = await holidayApi
    .holidays({
      country,
      year: '2021',
    })
    .then((response) => holidayDto(response.holidays, user.id));
  console.log(holidayArr, mainCalendar.id);
  holidayArr.forEach((element) => {
    eventService.createEvent(mainCalendar.id, {
      ...element,
      parentCalendar: mainCalendar.id,
    });
  });
};

const getCalendarById = async (id, userId) => {
  const calendar = await Calendar.findById(id)
    .populate('events')
    .populate({ path: 'author', select: 'login fullName avatar id' })
    .populate({ path: 'participants', select: 'login fullName avatar id' });
  if (!calendar || (!calendar.isPublic && calendar.author.id !== userId)) {
    return null;
  }
  return calendar;
};

const getAllCalendars = async (userId) => {
  const calendar = await Calendar.find()
    .where('author').equals(userId)
    .populate({ path: 'participants', select: 'id avatar login' });
    // .select('name type description events part isHidden isPublic');
  return calendar;
};

const updateCalendar = async (
  // TODO: shared?
  userId,
  calendarId,
  name,
  description,
  isHidden,
  isPublic,
) => {
  const calendar = await Calendar.findById(calendarId);
  if (!calendar) {
    throw ApiError.BadRequestError('no such calendar found', errors.array());
  }
  if (calendar.author.toString() !== userId) {
    throw ApiError.ForbiddenError();
  }
  calendar.name = name || calendar.name;
  calendar.description = description || calendar.description;
  calendar.isHidden = isHidden || calendar.isHidden;
  calendar.isPublic = isPublic || calendar.isPublic;
  await calendar.save();
  return calendar;
};

const deleteCalendar = async (userId, calendarId) => {
  const calendar = await Calendar.findById(calendarId);
  console.log(calendar);
  if (!calendar) {
    throw ApiError.BadRequestError('Calendar does not exist');
  }
  if (calendar.author.toString() !== userId) {
    throw ApiError.ForbiddenError();
  }
  await Event.deleteMany({ parentCalendar: calendar.id }); // TODO:
  calendar.delete();
};

module.exports = {
  makeDefaultCalendar,
  getCalendarById,
  getAllCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
  addParticipant,
};
