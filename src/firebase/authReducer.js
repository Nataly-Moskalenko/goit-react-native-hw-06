import { AsyncStorage } from 'react-native';
import { createSlice } from '@reduxjs/toolkit';
import { signUpWithEmail, signInwithEmail, getUserId } from './operations';
// import { registerDB, loginDB } from './operations';
// const LOGGED_IN = 'auth/LOGGED_IN';
// const LOGGED_OUT = 'auth/LOGGED_OUT';

const initialState = {
  user: { email: null, password: null },
  token: null,
  // error: null,
  userId: null,
  isloggedIn: false,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        state.isloggedIn = true;
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpWithEmail.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(signInwithEmail.fulfilled, (state, action) => {
        state.status = 'success';
        state.isloggedIn = true;
        state.user = action.payload;
      })
      .addCase(signInwithEmail.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(signInwithEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.userId = action.payload;
        if (action.payload) {
          state.isloggedIn = true;
        }
      });
  },
});

export const authReducer = authSlice.reducer;

// const initialState = {
//   isLoggedIn: false,
//   user: { email: null, password: null },
//   token: null,
//   error: null,
// };

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

// export const login = createAsyncThunk(
//   'login',
//   ({email, password}) => firebase.auth().signInWithEmailAndPassword(email, password)
// );

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState: {
//     isLoggingIn: false,
//     isLoggingOut: false,
//     isVerifying: false,
//     loginError: false,
//     logoutError: false,
//     isAuthenticated: false,
//     user: {},
//   },
//   reducers: {
//     /* any other state updates here */
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.pending, (state, action) => {
//       // mark something as loading here
//     }

//     builder.addCase(login.fulfilled, (state, action) => {
//       // mark request as complete and save results
//     }
//   }
// });
