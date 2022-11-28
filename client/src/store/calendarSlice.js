import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { getActiveCalendars, getHiddenCalendars, getMainCalendar } from '../utils/calendar.utils';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getAllCalendars = createAsyncThunk(
  'post/getAllCalendars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/calendar/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const getAllUserPosts = createAsyncThunk(
//   'post/getAllUserPosts',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`${API_URL}/posts/?page=-1&user=${id}`);
//       // console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const getFavoritePosts = createAsyncThunk(
//   'post/getFavoritePosts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`${API_URL}/posts/favorites/?page=-1`);
//       // console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

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

// export const createPost = createAsyncThunk(
//   'post/createPost',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_URL}/posts`, payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const updatePost = createAsyncThunk(
//   'post/updatePost',
//   async ({
//     id, content, title, categories, status,
//   }, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(`${API_URL}/posts/${id}`, {
//         content, title, categories, status,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const deletePost = createAsyncThunk(
//   'post/deletePost',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`${API_URL}/posts/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const ceateLike = createAsyncThunk(
//   'post/ceateLike',
//   async ({ id, type }, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_URL}/posts/${id}/like`, { type });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const deleteLike = createAsyncThunk(
//   'post/deleteLike',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`${API_URL}/posts/${id}/like`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const addToFavorite = createAsyncThunk(
//   'post/addToFavorite',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_URL}/posts/favorites/`, { postId: id });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const removeFromFavorite = createAsyncThunk(
//   'post/removeFromFavorite',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`${API_URL}/posts/favorites/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

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
    // [createPost.pending]: (state) => {
    //   state.isLoading = true;
    // },
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
    // [getAllUserPosts.fulfilled]: (state, action) => {
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
    // [createPost.fulfilled]: (state, action) => {
    //   state.post = action.payload;
    //   state.isLoading = false;
    // },
    // [updatePost.fulfilled]: (state, action) => {
    //   state.post.status = action.payload.status;
    //   state.post.content = action.payload.content;
    //   state.post.title = action.payload.title;
    //   state.isLoading = false;
    // },
    // [ceateLike.fulfilled]: (state, action) => {
    //   state.post.likeCount = action.payload.type === 'like' ?
    //   state.post.likeCount + 1 : state.post.likeCount;
    //   if (state.postVote && action.payload.type === 'dislike') {
    //     state.post.likeCount -= 1;
    //   }
    //   state.postVote = action.payload;
    // },
    // [deleteLike.fulfilled]: (state) => {
    //   state.post.likeCount = state.postVote.type === 'like' ?
    //   state.post.likeCount - 1 : state.post.likeCount;
    //   state.postVote = null;
    // },
    // [addToFavorite.fulfilled]: (state) => {
    //   state.post.favoriteCount += 1;
    // },
    // [removeFromFavorite.fulfilled]: (state) => {
    //   state.post.favoriteCount -= 1;
    // },
    [getAllCalendars.rejected]: errorHandler,
    // [getAllUserPosts.rejected]: errorHandler,
    // [getFavoritePosts.rejected]: errorHandler,
    // [getPost.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload.message;
    //   console.log('req error: ', action.payload);
    // },
    // [createPost.rejected]: errorHandler,
    // [ceateLike.rejected]: errorHandler,
    // [deleteLike.rejected]: errorHandler,
    // [addToFavorite.rejected]: errorHandler,
    // [removeFromFavorite.rejected]: errorHandler,
    // [updatePost.rejected]: errorHandler,
  },
});

// export const {
//   clearError, updateFilters, clearFilters, filterPosts, resetFilters, changePage,
// } = calendarSlice.actions;

export default calendarSlice.reducer;
