import { AsyncStorage } from 'react-native';

const LOGGED_IN = 'auth/LOGGED_IN';
const LOGGED_OUT = 'auth/LOGGED_OUT';

const initialState = { isLoggedIn: false, user: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const user = action.user;

      // Save token and data to Asyncstorage
      AsyncStorage.multiSet([['user', JSON.stringify(user)]]);

      return { ...state, isLoggedIn: true, user };

    case LOGGED_OUT:
      let keys = ['user'];
      AsyncStorage.multiRemove(keys);

      return { ...state, isLoggedIn: false, user: null };

    default:
      return state;
  }
};
