import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  loading: false,
  loaded: false,
  items: [] as User[],
  hasError: false,
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
        state.hasError = false;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(load.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
