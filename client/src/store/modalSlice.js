import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    createCalendar: false,
    createEvent: false,
    invite: false,
  },
  reducers: {
    createCalendarOn(state) {
      state.signIn = true;
    },
    createCalendarOff(state) {
      state.signIn = false;
    },
    createEventOn(state) {
      state.signUp = true;
    },
    createEventOff(state) {
      state.signUp = false;
    },
    inviteOn(state) {
      state.editPost = true;
    },
    inviteOff(state) {
      state.editPost = false;
    },
  },
});

export const {
  createCalendarOn,
  createCalendarOff,
  createEventOn,
  createEventOff,
  inviteOn,
  inviteOff
} = modalSlice.actions;

export default modalSlice.reducer;
