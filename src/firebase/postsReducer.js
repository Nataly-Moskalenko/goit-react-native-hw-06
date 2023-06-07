import { createSlice } from '@reduxjs/toolkit';
import { writeDataToFirestore, getDataFromFirestore, updateDataInFirestore } from './operations';

const initialState = {
  error: null,
  status: 'idle',
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(writeDataToFirestore.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        // state.items = action.payload;
        state.error = null;
        state.status = 'addedPost';
      })
      .addCase(writeDataToFirestore.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(writeDataToFirestore.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(getDataFromFirestore.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
        state.status = 'fulfilled';
      })
      .addCase(getDataFromFirestore.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(getDataFromFirestore.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateDataInFirestore.fulfilled, (state) => {
        // state.items = action.payload;
        state.items = [action.payload, ...state.items];
        state.error = null;
        state.status = 'updated';
      })
      .addCase(updateDataInFirestore.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(updateDataInFirestore.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export const postsReducer = postsSlice.reducer;
