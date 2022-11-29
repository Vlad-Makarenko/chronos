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

// export const getPost = createAsyncThunk(
//   'post/getPost',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const postResponse = await api.get(`${API_URL}/posts/${id}`);
//       const likesResponse = await api.get(`${API_URL}/posts/${id}/like`);
//       // console.log({ post: postResponse.data, like: likesResponse.data });
//       return { post: postResponse.data, like: likesResponse.data };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

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
      console.log(id);
      const response = await api.delete(`${API_URL}/calendar/${id}`);
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
    // updateFilters(state, action) {
    //   state.filters = action.payload.filters;
    // },
    // clearFilters(state) {
    //   state.filters = DEFAUL_FILTERS;
    // },
    // filterPosts(state, action) {
    //   const filteredPosts = filterPostsUtils(
    //     action.payload.posts,
    //     action.payload.filters,
    //   );
    //   state.filteredPosts = filteredPosts;
    //   state.totalPages = countTotalPages(filteredPosts);
    //   state.currentPagePosts = getCurentPosts(filteredPosts, 1);
    //   state.currentPage = 1;
    // },
    // changePage(state, action) {
    //   state.currentPage = action.payload.page;
    //   state.currentPagePosts = getCurentPosts(action.payload.posts, action.payload.page);
    // },
    // resetFilters(state, action) {
    //   const filteredPosts = filterPostsUtils(action.payload.posts, DEFAUL_FILTERS);
    //   state.filteredPosts = filteredPosts;
    //   state.totalPages = countTotalPages(filteredPosts);
    // },
  },
  extraReducers: {
    [getAllCalendars.pending]: (state) => {
      state.isLoading = true;
    },
    // [getAllUserPosts.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getFavoritePosts.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getPost.pending]: (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
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
    // [getFavoritePosts.fulfilled]: (state, action) => {
    //   state.allPosts = action.payload.posts;
    //   const filteredPosts = filterPostsUtils(action.payload.posts, DEFAUL_FILTERS);
    //   state.filteredPosts = filteredPosts;
    //   state.totalPages = countTotalPages(action.payload.posts);
    //   state.currentPagePosts = getCurentPosts(filteredPosts, 1);
    //   state.isLoading = false;
    // },
    // [getPost.fulfilled]: (state, action) => {
    //   state.post = action.payload.post;
    //   state.postVote = action.payload.like;
    //   state.isLoading = false;
    // },
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
    // [getAllUserPosts.rejected]: errorHandler,
    // [getFavoritePosts.rejected]: errorHandler,
    // [getPost.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload.message;
    //   console.log('req error: ', action.payload);
    // },
    [createCalendar.rejected]: errorHandler,
    // [ceateLike.rejected]: errorHandler,
    // [deleteLike.rejected]: errorHandler,
    // [addToFavorite.rejected]: errorHandler,
    // [removeFromFavorite.rejected]: errorHandler,
    [updateCalendar.rejected]: errorHandler,
  },
});

// export const {
//   clearError, updateFilters, clearFilters, filterPosts, resetFilters, changePage,
// } = calendarSlice.actions;

export default calendarSlice.reducer;