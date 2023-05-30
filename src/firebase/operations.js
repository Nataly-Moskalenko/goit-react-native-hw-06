import { auth, db } from './config';

import axios from 'axios';
axios.defaults.baseURL = 'https://awesomeproject-39307-default-rtdb.firebaseio.com';

// import { async } from "@firebase/util";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  // getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { useSelector } from "react-redux";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ login, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    token.set(userCredential.token);
    // console.log(userCredential);
    updateProfile(auth.currentUser, { displayName: login });
    const data = { login, email };
    data.timestamp = serverTimestamp();
    await setDoc(doc(db, 'users', user.uid), data);
    // await setDoc(doc(db, 'user', user.uid), data);
    // return user;
  }
);

export const signInwithEmail = createAsyncThunk(
  'auth/signinWithEmail',
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    token.set(userCredential.token);
    // console.log(userCredential);
    return user;
  }
);

export const getUserId = createAsyncThunk('auth/getId', async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return uid;
    }
  });
});

export const registerDB = async ({ email, password }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

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
