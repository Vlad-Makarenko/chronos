import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { getActiveCalendars, getHiddenCalendars, getMainCalendar } from '../utils/calendar.utils';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getAllCalendars = createAsyncThunk(
  'calendar/getAllCalendars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/calendar/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCalendar = createAsyncThunk(
  'post/getCalendar',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/calendar/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createCalendar = createAsyncThunk(
  'calendar/createCalendar',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/calendar`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateCalendar = createAsyncThunk(
  'calendar/updateCalendar',
  async ({
    id, name, description, isHidden, isPublic,
  }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/posts/${id}`, {
        name, description, isHidden, isPublic,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteCalendar = createAsyncThunk(
  'calendar/deleteCalendar',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/calendar/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    allCalendars: [],
    activeCalendars: [],
    hiddenCalendars: [],
    mainCalendar: {},
    currentCalendar: {},
    error: null,
    isLoading: false,
    success: false,
  },
  reducers: {
  },
  extraReducers: {
    [getAllCalendars.pending]: (state) => {
      state.isLoading = true;
    },
    [getCalendar.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createCalendar.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    [getAllCalendars.fulfilled]: (state, action) => {
      state.allCalendars = action.payload;
      state.activeCalendars = getActiveCalendars(action.payload);
      state.hiddenCalendars = getHiddenCalendars(action.payload);
      state.mainCalendar = getMainCalendar(action.payload);
      state.isLoading = false;
    },
    [getCalendar.fulfilled]: (state, action) => {
      state.currentCalendar = action.payload;
      state.isLoading = false;
    },
    [createCalendar.fulfilled]: (state, action) => {
      state.activeCalendars = [...state.activeCalendars, action.payload];
      state.isLoading = false;
      state.success = true;
    },
    [deleteCalendar.fulfilled]: (state, action) => {
      const id = action.payload;
      state.allCalendars = state.allCalendars.filter((item) => item._id !== id);
      state.activeCalendars = getActiveCalendars(state.allCalendars);
      state.hiddenCalendars = getHiddenCalendars(state.allCalendars);
      state.isLoading = false;
    },
    [updateCalendar.fulfilled]: (state, action) => {
      state.currentCalendar = action.payload;
      state.isLoading = false;
    },
    [getAllCalendars.rejected]: errorHandler,
    [getCalendar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      console.log('req error: ', action.payload);
    },
    [createCalendar.rejected]: errorHandler,
    [updateCalendar.rejected]: errorHandler,
  },
});

// export const {
//   clearError, updateFilters, clearFilters, filterPosts, resetFilters, changePage,
// } = calendarSlice.actions;

export default calendarSlice.reducer;
