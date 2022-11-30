import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { eventDateUpdate, eventsToCalendar } from '../../utils/event.utils';
import { useMessage } from '../../hooks/message.hook';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const BigCalendar = ({ events }) => {
  const message = useMessage();

  const { views } = useMemo(() => ({
    views: { month: true, day: true, week: true },
  }));
  const [displayEvents, setDisplayEvents] = useState(eventsToCalendar(events));
  useEffect(() => {}, []);

  const eventPropGetter = useCallback((event) => ({
    ...(event.color && { style: { backgroundColor: event.color } }),
  }));

  const onEventResize = (data) => {
    if (data.event.type === 'holiday') {
      return message('You can\'t change holiday', 'warning');
    }
    setDisplayEvents(eventDateUpdate(displayEvents, data));
  };

  const onEventDrop = (data) => {
    if (data.event.type === 'holiday') {
      return message('You can\'t interact with holiday', 'warning');
    }
    setDisplayEvents(eventDateUpdate(displayEvents, data));
  };

  return (
    <DnDCalendar
      eventPropGetter={eventPropGetter}
      views={views}
      defaultDate={moment().toDate()}
      defaultView='month'
      events={displayEvents}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      onSelectSlot={(slotInfo) => {
        console.log(slotInfo);
      }}
      onSelectEvent={(slotInfo) => {
        console.log(slotInfo);
      }}
      onSelecting={(slotInfo) => {
        console.log(slotInfo);
      }}
      resizable
      selectable
      className='w-full h-full'
    />
  );
};
