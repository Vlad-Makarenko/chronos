const { HolidayAPI } = require('holidayapi');

const mailService = require('./mail.service');
const eventService = require('./event.service');
const ApiError = require('../utils/ApiError');
const holydayDto = require('../utils/holidayDto');

const { Calendar, Event } = require('../models');

const createCalendar = async (userId, calendar) => await Calendar.create(calendar)
  .then((docCalendar) => User.findByIdAndUpdate(
    userId,
    { $push: { events: docCalendar.id } },
    { new: true, useFindAndModify: false },
  ));

const makeDefaultCalendar = async (user, country) => {
  const mainCalendar = await createCalendar(user.id, {
    author: user.id,
    name: 'main calendar',
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
    .then((response) => holydayDto(response.holidays));
  holidayArr.forEach((element) => {
    eventService.createEvent(mainCalendar.id, element);
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
    .where('author')
    .equals(userId)
    .select('name type description isHidden isPublic');
  return calendar;
};

const updateCalendar = async (
  userId,
  calendarId,
  name,
  description,
  isHidden,
  isPublic,
) => {
  const calendar = await Calendar.findById(calendarId);
  if (calendar.author !== userId) {
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
  if (!calendar) {
    throw ApiError.BadRequestError('Calendar is not exists');
  }
  if (calendar.author !== userId) {
    throw ApiError.ForbiddenError();
  }
  calendar.delete();
};

module.exports = {
  makeDefaultCalendar,
  getCalendarById,
  getAllCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
};
