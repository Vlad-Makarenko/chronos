const { Calendar, Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (calendarId, event) =>
  await Event.create(event).then((docEvent) =>
    Calendar.findByIdAndUpdate(
      calendarId,
      { $push: { events: docEvent.id } },
      { new: true, useFindAndModify: false }
    )
  );

const updateEvent = async (
  //TODO: shared? идобавлять ли возможность изменять дату, и вообще что тут можно изменять? чи ток название и выполнено чи не
  authorId, //TODO:а если нет автора?
  eventId,
  name,
  type,
  description,
  color,
  startEvent,
  endEvent,
  isPerformed
) => {
  const event = await Event.findById(eventId);
  if (event.author.toString() !== authorId) {
    throw ApiError.ForbiddenError();
  }
  event.name = name || event.name;
  event.description = description || event.description;
  event.type = type || event.type;
  event.color = color || event.color;
  event.startEvent = startEvent || event.startEvent;
  event.endEvent = endEvent || eventId.endEvent;
  event.isPerformed = isPerformed || event.isPerformed;
  await event.save();
  return event;
};

const getAllEvents = async(calendarId) => {

}
// const getAllCalendars = async (userId) => {
//   const calendar = await Calendar.find()
//     .where('author')
//     .equals(userId)
//     .select('name type description isHidden isPublic');
//   return calendar;
// };

const getEventById = async (id, userId) => {//TODO: добавлять ли юзерайди
  const event = await Event.findById(id)
  .populate({ path: 'sharedParticipants', select: 'login fullName avatar id' });
  if(!event) {//TODO: сделать нормальное условие
    return null;
  }
  return event;
}
// const getCalendarById = async (id, userId) => {
//   const calendar = await Calendar.findById(id)
//     .populate('events')
//     .populate({ path: 'author', select: 'login fullName avatar id' })
//     .populate({ path: 'participants', select: 'login fullName avatar id' });
//   if (!calendar || (!calendar.isPublic && calendar.author.id !== userId)) {
//     return null;
//   }
//   return calendar;
// };


const deleteEvent = async (userId, eventId) => {
  const event  = await Event.findById(eventId);
  if (!event) {
    throw ApiError.BadRequestError('Event does not exist');
  }
  if (eventId.author.toString() !== userId) {
    throw ApiError.ForbiddenError();
  }
  eventId.delete();
}
// const deleteCalendar = async (userId, calendarId) => {
//   const calendar = await Calendar.findById(calendarId);
//   console.log(calendar);
//   if (!calendar) {
//     throw ApiError.BadRequestError('Calendar is not exists');
//   }
//   if (calendar.author.toString() !== userId) {
//     throw ApiError.ForbiddenError();
//   }
//   calendar.delete();
// };

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent
};
