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
  async (email, password, login) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`User ${user.uid} created`);
    await updateProfile(user, {
      displayName: login,
      // id: user.uid,
    });
    console.log('User profile updated');
    // const data = { login, email };
    // data.timestamp = serverTimestamp();
    // await setDoc(doc(db, 'users', user.uid), { login, email });
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

export const writeDataToFirestore = createAsyncThunk('posts/addPost', async (post) => {
  try {
    // const data = { login, email };
    // const post =
    //   {
    //     imageUri,
    //     location,
    //     imageName,
    //     locationName,
    //   }
    // post.timestamp = serverTimestamp();
    // await setDoc(doc(db, 'users', user.uid), { login, email, post });
    const docRef = await setDoc(
      doc(db, 'posts'),
      // { uid, location }
      post
    );
    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
});

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
  async (uid, post) => {
    // try {
    // const uid = await getUserId();
    // console.log(uid);
    // const ref = doc(db, 'posts');
    const ref = doc(db, 'users', uid);
    console.log(ref);
    await updateDoc(ref, { post });
    console.log('document updated');
    // } catch (error) {
    //   console.log(error);
    // }
  }
);

// для запису в базу використовував addDoc
// для читання onSnapshot
// для оновлення updateDoc

// export const authUser = (email, password, navigation) => {
//   return (dispatch) => {
//     dispatch({type: LOGIN_USER});
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(user => loginUserSuccess(navigation))
//         .catch((err) => {
//           //If there is an error during sign in we'll assume this means
//           //the account doesn't exist and attempt to create one. If the error is different,
//           //then this auth action will fail again and we'll show the error to the user.
//           firebase.auth().createUserWithEmailAndPassword(email, password)
//               .then(user => loginUserSuccess(navigation))
//               .catch((err) => loginUserFail(dispatch, err));
//         });
//   };
// };

// //This checks to see if the user is currently signed in.
// export const checkUserAuth = () => {
//   return (dispatch) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         dispatch({
//           type: LOGGED_IN
//         });
//       } else {
//         dispatch({
//           type: LOGGED_OUT
//         });
//       }
//     });
//   };
// };

// const loginUserFail = (dispatch, error) => {
//   dispatch({
//     type: LOGIN_USER_FAIL,
//     payload: {
//       error: error
//     }
//   });
// };

// const loginUserSuccess = async (navigation) => {
//     const resetAction = NavigationActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({routeName: 'SignedIn'})],
//     });
//     navigation.dispatch(resetAction);
// };
