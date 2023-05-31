import { auth, db } from './config';

// import axios from 'axios';
// axios.defaults.baseURL = 'https://awesomeproject-39307-default-rtdb.firebaseio.com';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { useSelector } from "react-redux";

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ login, email, password }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`User ${user.uid} created`);
    await updateProfile(user, {
      displayName: login,
    });
    console.log('User profile updated');   
    // const data = { login, email };
    // data.timestamp = serverTimestamp();
    // await setDoc(doc(db, 'users', user.uid), data);
    // await setDoc(doc(db, 'user', user.uid), data);
    return user;
  }
);

export const signInwithEmail = createAsyncThunk(
  'auth/signinWithEmail',
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);    
    return user;
  }
);

// export const getUserId = createAsyncThunk('auth/getId', async () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       return uid;
//     }
//   });
// });

export const logOut = createAsyncThunk('auth/signOut', async () => {
  await signOut(auth);
});

// export const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

// export const updateUserProfile = async (update) => {
//   const user = auth.currentUser;
//   if (user) {
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
