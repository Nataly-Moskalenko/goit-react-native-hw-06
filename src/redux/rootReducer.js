// import { combineReducers } from 'redux';

// import { reducer as authReducer } from "../modules/auth";
// import { reducer as homeReducer } from "../modules/home";

// export const rootReducer = combineReducers({ authReducer, homeReducer });

import { authReducer } from '../firebase/authReducer';

export const rootReducer = authReducer;
