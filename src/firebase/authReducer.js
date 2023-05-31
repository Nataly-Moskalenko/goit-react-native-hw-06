import { AsyncStorage } from 'react-native';
import { createSlice } from '@reduxjs/toolkit';
import { signUpWithEmail, signInwithEmail, signOut, getUserId } from './operations';

const initialState = {
  // user: { email: null, password: null },
  user: null,
  // token: null,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        // state.token = action.payload.token;
        state.error = null;
        // state.status = 'isLoggedIn';
        state.status = 'isRegistered';
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
        // state.token = action.payload.token;
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
      .addCase(signOut.fulfilled, (state) => {
        // state.user = null;
        state.user = { email: null, password: null };
        // state.token = null;
        state.error = null;
        state.status = 'idle';
      })
      .addCase(signOut.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.status = 'pending';
        // })
        // .addCase(getUserId.fulfilled, (state, action) => {
        //   state.userId = action.payload;
        //   if (action.payload) {
        //     state.status = 'isLoggedIn';
        //   }
      });
  },
});

export const authReducer = authSlice.reducer;

// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'auth/LOGGED_IN':
//       const user = action.payload;

//       // Save token and data to Asyncstorage
//       AsyncStorage.multiSet([['user', JSON.stringify(user)]]);

//       return { ...state, isLoggedIn: true, user };

//     case 'auth/LOGGED_OUT':
//       // let keys = ['user'];
//       AsyncStorage.multiRemove(['user']);

//       return { ...state, isLoggedIn: false, user: null };

//     default:
//       return state;
//   }
// };
