const { Calendar, Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (calendarId, event) =>{
  const calendar = await Calendar.findById(calendarId);
  if(!calendar){
    throw ApiError.BadRequestError('no such calendar found', errors.array());
  }
  await Event.create(event).then((docEvent) =>
    Calendar.findByIdAndUpdate(
      calendarId,
      { $push: { events: docEvent.id } },
      { new: true, useFindAndModify: false }
    )
  );
}
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
  const event = await Event.findById(eventId); //TODO: если тайп ивента холидей то не апдейтить
  if (!event) {
    throw ApiError.BadRequestError('no such event found', errors.array());
  }
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

const getAllEvents = async (calendarId) => {
  const events = await Event.find().where('parentCalendar').equals(calendarId);
  if(!events){
    throw ApiError.NothingFoundError('no events found', errors.array());
  }
  return events;
};


const getEventById = async (id, userId) => {
  const event = await Event.findById(id).populate({
    path: 'sharedParticipants',
    select: 'login fullName avatar id',
  });
  if (!event || (event.author.id !== userId || event.sharedParticipants.includes(userId))) {
    return null;
  }
  return event;
};

const deleteEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw ApiError.BadRequestError('Event does not exist');
  }
  if (eventId.author.toString() !== userId) {//TODO: если выдаём возможность удалять то и другие юзеры тоже могут(чисто удалять себя из котрибьюторов)
    throw ApiError.ForbiddenError();
  }
  eventId.delete();
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
};
