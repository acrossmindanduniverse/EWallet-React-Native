import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

import auth from './auth';
import user from './user';
import product from './product';
import privateStore from './private';

const persistAuth = {
  storage: AsyncStorage,
  key: 'auth',
};

const reducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  privateStore,
  user,
  product,
});

export default reducer;
