const { Calendar, Event } = require('../models');

const createEvent = async (calendarId, event) => await Event.create(event)
  .then((docEvent) => Calendar.findByIdAndUpdate(
    calendarId,
    { $push: { events: docEvent.id } },
    { new: true, useFindAndModify: false },
  ));

module.exports = {
  createEvent,
};
