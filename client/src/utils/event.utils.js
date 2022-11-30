import moment from 'moment';

export const updateEventUtil = (events, event) => events
  .filter((item) => item._id !== event._id).push(event);

export const eventsToCalendar = (events) => events.map((item) => ({
  ...item,
  start: moment(item.startEvent).toDate(),
  end: moment(item.endEvent).toDate(),
  title: item.name,
}));

export const eventDateUpdate = (events, data) => events.map((item) => {
  if (data.event._id === item._id) {
    return {
      ...item,
      startEvent: data.start.toString(),
      start: data.start,
      endEvent: data.end.toString(),
      end: data.end,
    };
  }
  return item;
});
