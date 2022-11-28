export const getHiddenCalendars = (calendars) => calendars.filter((item) => item.isHidden);
export const getActiveCalendars = (calendars) => calendars.filter((item) => !item.isHidden);
export const getMainCalendar = (calendars) => calendars.find((item) => !item.type === 'main');
