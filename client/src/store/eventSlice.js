import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';
import { updateEventUtil } from '../utils/event.utils';

export const getTodayEvents = createAsyncThunk(
  'event/getTodayEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/today`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAllEvents',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_URL}/event/calendar/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (
    { calendarId, name, type, description, color, startEvent, endEvent },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`${API_URL}/event/${calendarId}`, {
        name,
        type,
        description,
        color,
        startEvent,
        endEvent,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async (
    { _id, name, type, description, color, startEvent, endEvent, isPerformed },
    { rejectWithValue }
  ) => {
    try {
      console.table({ _id, name, type, description, color, startEvent, endEvent, isPerformed });
      const response = await api.patch(`${API_URL}/event/${_id}`, {
        name,
        type,
        description,
        color,
        startEvent,
        endEvent,
        isPerformed,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/event/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    todayEvents: [],
    event: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getTodayEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [createEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [updateEvent.pending]: (state) => {
      // state.isLoading = true;
    },
    [getTodayEvents.fulfilled]: (state, action) => {
      state.todayEvents = action.payload;
      state.isLoading = false;
    },
    [getEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
      state.isLoading = false;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.events = [...state.events, action.payload];
      state.isLoading = false;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.events = updateEventUtil(state.events, action.payload);
      state.isLoading = false;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter((item) => item._id !== id);
      state.isLoading = false;
    },
    [getTodayEvents.rejected]: errorHandler,
    [getEvent.rejected]: errorHandler,
    [getAllEvents.rejected]: errorHandler,
    [updateEvent.rejected]: errorHandler,
  },
});

export default eventSlice.reducer;
