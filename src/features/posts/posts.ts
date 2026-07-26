import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  loading: false,
  posts: [] as Post[],
  error: '',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // add(state, { payload }: PayloadAction<Post>) {
    //   state.posts.push(payload);
    // },
    // set(state, { payload }: PayloadAction<Post[]>) {
    //   state.posts = payload;
    // },
    // remove(state, { payload }: PayloadAction<Post>) {
    //   state.posts = state.posts.filter(post => post !== payload);
    // },
    clear(state) {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
export const { /* add, remove, set, */ clear } = postsSlice.actions;
