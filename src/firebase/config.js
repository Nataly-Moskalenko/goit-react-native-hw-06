import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAaCA6sSOFff9bdeMxiREmbLHDAVkh9Ru4',
  authDomain: 'awesomeproject-39307.firebaseapp.com',
  databaseURL: 'https://awesomeproject-39307-default-rtdb.firebaseio.com',
  projectId: 'awesomeproject-39307',
  storageBucket: 'awesomeproject-39307.appspot.com',
  messagingSenderId: '428388713399',
  appId: '1:428388713399:web:1a8449d9f52d75942b1e32',
  measurementId: 'G-KWGTQP3EH7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
