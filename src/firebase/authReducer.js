import { createSlice } from '@reduxjs/toolkit';
import { signUpWithEmail, signInwithEmail, logOut, getUserId } from './operations';

const initialState = {
  // user: { email: null, password: null, id: null, login: null, },
  user: null,
  // userId: null,
  // token: null,
  error: null,
  status: 'idle',
  // id: null,
  // login: null,
  // email: null,
  // avatar: null,
  // stateChange: false,
  // email: '',
  // password: '',
  // error: '',
  // loading: false,
  // isLoggedIn: false,
  // hasCheckedAuthState: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        // state.email = action.payload.email;
        // state.password = action.payload.password;
        // state.login = action.payload.login;
        // state.id = action.payload.id;
        // state.token = action.payload.token;
        state.user = action.payload;
        state.error = null;
        state.status = 'isRegistred';

        // AsyncStorage.multiSet([['user', JSON.stringify(user)]]);
        // state.status = 'isRegistered';
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
        // state.email = action.payload.email;
        // state.password = action.payload.password;
        // state.login = action.payload.login;
        // state.id = action.payload.id;
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
        // state.user = { email: null, password: null };
        // state.token = null;
        // state.email = null;
        // state.password = null;
        // state.login = null;
        // state.id = null;
        state.error = null;
        state.status = 'logOuted';

        // AsyncStorage.multiRemove(['user']);
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state) => {
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
