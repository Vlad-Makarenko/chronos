import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
      color: 'red',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
  ]);

  const onEventResize = (data) => {
    const { start, end } = data;
    setEvents([...events, events[0].start = start, events[0].end = end]);
  };

  const onEventDrop = (data) => {
    const { start, end } = data;
    setEvents([...events, events[0].start = start, events[0].end = end]);
  };

  return (
      <div className='App'>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView='month'
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: '100vh' }}
        />
      </div>
  );
};
