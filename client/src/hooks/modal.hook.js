/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarCreateForm } from '../components/calendar/CalendarCreateForm';
import { CreateEventForm } from '../components/event/CreateEventForm';
import { ModalWin } from '../components/ModalWin';
import {
  inviteOff,
  createEventOff,
  createCalendarOff,
  editCalendarOff,
  editEventOff,
} from '../store/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const { createCalendar, editCalendar, createEvent, editEvent, invite } = useSelector(
    (state) => state.modal
  );

  return (
    <div>
      <ModalWin show={invite} onHide={() => dispatch(inviteOff())}>
        <div>
          <h1>INVITE</h1>
        </div>
      </ModalWin>
      <ModalWin show={createEvent} header={'Event creation'} onHide={() => dispatch(createEventOff())}>
        <CreateEventForm />
      </ModalWin>
      <ModalWin show={editCalendar} onHide={() => dispatch(editCalendarOff())}>
        <div>
          <h1>EDIT</h1>
        </div>
      </ModalWin>
      <ModalWin show={editEvent} onHide={() => dispatch(editEventOff())}>
        <div>
          <h1>EDIT</h1>
        </div>
      </ModalWin>
      <ModalWin
        show={createCalendar}
        onHide={() => dispatch(createCalendarOff())}>
        <CalendarCreateForm />
      </ModalWin>
    </div>
  );
};
