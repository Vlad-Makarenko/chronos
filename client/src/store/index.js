import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './commentSlice';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import calendarReducer from './calendarSlice';
import tagReducer from './tagSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
    calendar: calendarReducer,
    tag: tagReducer,
    comment: commentReducer,
  },
});
