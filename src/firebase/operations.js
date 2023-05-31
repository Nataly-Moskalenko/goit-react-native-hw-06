import { auth, db } from './config';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';

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

export const logOut = createAsyncThunk('auth/logOut', async () => {
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

export const writeDataToFirestore = createAsyncThunk(
  'posts/addPost',
  async ({ imageUri, location, imageName, locationName }) => {
    try {
      // const data = { login, email };
      // data.timestamp = serverTimestamp();
      // await setDoc(doc(db, 'users', user.uid), data);
      const docRef = await addDoc(collection(db, 'users'), {
        imageUri,
        location,
        imageName,
        locationName,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  }
);

export const getDataFromFirestore = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    // Перевіряємо у консолі отримані дані
    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    // Повертаємо масив обʼєктів у довільній формі
    return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateDataInFirestore = createAsyncThunk(
  'posts/updatePost',
  async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        age: 25,
      });
      console.log('document updated');
    } catch (error) {
      console.log(error);
    }
  }
);
