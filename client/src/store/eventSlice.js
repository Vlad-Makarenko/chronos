import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getTodayEvents = createAsyncThunk(
  'tag/getTodayEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/today`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getAllTags = createAsyncThunk(
//   'tag/getAllTags',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`${API_URL}/categories/`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getTag = createAsyncThunk(
//   'tag/getTag',
//   async ({ id }, { rejectWithValue, dispatch }) => {
//     try {
//       // eslint-disable-next-line no-use-before-define
//       dispatch(setDefaulTag());
//       const response = await api.get(`${API_URL}/categories/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialTag = {
//   id: 0,
//   title: 'Tags',
//   description:
//     'A tag is a keyword or label that categorizes your question with other, similar questions.
// Using the right tags makes it easier for others to find and answer your question.',
//   questionsCount: 0,
// };

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
    // [getAllTags.pending]: (state) => {
    //   state.isLoading = true;
    // },
    [getTodayEvents.fulfilled]: (state, action) => {
      state.todayEvents = action.payload;
      state.isLoading = false;
    },
    // [getAllTags.fulfilled]: (state, action) => {
    //   state.tags = action.payload;
    //   state.isLoading = false;
    // },
    // [getTag.fulfilled]: (state, action) => {
    //   state.tag = action.payload;
    // },
    // [getTag.rejected]: errorHandler,
    // [getAllTags.rejected]: errorHandler,
    [getTodayEvents.rejected]: errorHandler,
  },
});

// export const { setDefaulTag } = tagSlice.actions;

export default eventSlice.reducer;
