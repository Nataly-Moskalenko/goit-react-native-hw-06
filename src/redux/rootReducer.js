import { combineReducers } from 'redux';

import { authReducer } from '../firebase/authReducer';
import { postsReducer } from '../firebase/postsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});
