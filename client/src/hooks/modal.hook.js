/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarCreateForm } from '../components/calendar/CalendarCreateForm';
import { ModalWin } from '../components/ModalWin';
import {
  inviteOff,
  createEventOff,
  createCalendarOff,
} from '../store/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const { createCalendar, createEvent, invite } = useSelector(
    (state) => state.modal
  );

  return (
    <div>
      <ModalWin show={invite} onHide={() => dispatch(inviteOff())}>
        <div>
          <h1>INVITE</h1>
        </div>
      </ModalWin>
      <ModalWin show={createEvent} onHide={() => dispatch(createEventOff())}>
        <div>
          <h1>EVENT</h1>
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
