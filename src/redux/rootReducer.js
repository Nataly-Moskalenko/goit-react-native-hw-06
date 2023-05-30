import { combineReducers } from 'redux';

import { authReducer } from '../firebase/authReducer';

export const rootReducer = combineReducers({ auth: authReducer });
