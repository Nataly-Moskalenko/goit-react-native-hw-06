import { createSlice } from '@reduxjs/toolkit';
import { signUpWithEmail, signInwithEmail, logOut, getUserId } from './operations';

const initialState = {
  // user: { email: null, id: null, login: null, uid: null},
  user: null,  
  error: null,
  status: 'idle',  
  stateChange: false,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.fulfilled, (state, action) => {        
        state.user = action.payload;
        state.error = null;
        state.status = 'isRegistred';       
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signUpWithEmail.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signInwithEmail.fulfilled, (state, action) => {
        state.user = action.payload;        
        state.error = null;
        state.status = 'isLoggedIn';
      })
      .addCase(signInwithEmail.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signInwithEmail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;        
        state.error = null;
        state.status = 'logOuted';       
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'pending';        
      });
  },
});

export const authReducer = authSlice.reducer;
