export const updateEventUtil = (events, event) => {
    return events.filter((item) => item._id != event._id).push(event);
}