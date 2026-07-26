import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

const initialState = {
  loading: false,
  comments: [] as Comment[],
  error: '',
};

export const load = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const add = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const remove = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear(state) {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder
      // load
      .addCase(load.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(load.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(load.rejected, state => {
        state.error = 'Error';
        state.loading = false;
      })
      // add
      .addCase(add.pending, state => {
        state.error = '';
      })
      .addCase(add.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      })
      .addCase(add.rejected, state => {
        state.error = 'Error';
      })
      // remove
      .addCase(remove.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(remove.rejected, state => {
        state.error = 'Error';
      });
  },
});

export default commentsSlice.reducer;
export const { clear } = commentsSlice.actions;
