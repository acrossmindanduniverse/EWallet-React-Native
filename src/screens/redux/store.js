import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers/index';

export default () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return {store, persistor};
};
