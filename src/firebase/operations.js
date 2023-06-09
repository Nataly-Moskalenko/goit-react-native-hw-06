import { auth, db } from './config';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async (email, password, login) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`User ${user.uid} created`);
    await updateProfile(user, {
      displayName: login,
      // userId: user.uid,
    });
    console.log('User profile updated');    
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

export const getUserId = createAsyncThunk('auth/getId', async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      return uid;
    }
  });
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await signOut(auth);
});

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};
