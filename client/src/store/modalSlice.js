import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    createCalendar: false,
    editCalendar: false,
    createEvent: false,
    invite: false,
    editEvent: false,
    infoEvent: false
  },
  reducers: {
    createCalendarOn(state) {
      state.createCalendar = true;
    },
    createCalendarOff(state) {
      state.createCalendar = false;
    },
    editCalendarOn(state) {
      state.editCalendar = true;
    },
    editCalendarOff(state) {
      state.editCalendar = false;
    },
    createEventOn(state) {
      state.createEvent = true;
    },
    createEventOff(state) {
      state.createEvent = false;
    },
    editEventOn(state) {
      state.editEvent = true;
    },
    editEventOff(state) {
      state.editEvent = false;
    },
    infoEventOn(state) {
      state.infoEvent = true;
    },
    infoEventOff(state) {
      state.infoEvent = false;
    },
    inviteOn(state) {
      state.invite = true;
    },
    inviteOff(state) {
      state.invite = false;
    },
  },
});

export const {
  createCalendarOn,
  createCalendarOff,
  createEventOn,
  createEventOff,
  inviteOn,
  inviteOff,
  editCalendarOn,
  editCalendarOff,
  editEventOn,
  editEventOff,
  infoEventOn,
  infoEventOff
} = modalSlice.actions;

export default modalSlice.reducer;
