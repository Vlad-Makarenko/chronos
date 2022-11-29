export const updateEventUtil = (events, event) => events
  .filter((item) => item._id !== event._id).push(event);
