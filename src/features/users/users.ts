import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const load = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(load.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(load.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(load.rejected, state => {
        state.error = 'Error';
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
