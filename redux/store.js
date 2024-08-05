// Importing the combineReducers function from Redux
import {combineReducers} from 'redux';
import {logger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import User from './reducers/User';
import Categories from './reducers/Categories';
import Donations from './reducers/Donations';
// Creating a rootReducer that combines all reducers in the app

const rootReducer = combineReducers({
  // Here, we're combining the User reducer and calling it "user"
  user: User,
  categories: Categories,
  donations: Donations,
});

const configuration = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
  };

// Creating a new persisted reducer with the configuration and root reducer
const persistedReducer = persistReducer(configuration, rootReducer);

// Creating a new Redux store using the configureStore function
// We're passing in the persisted reducer as the main reducer for the store
const store = configureStore({
  reducer: persistedReducer,

  // Using the getDefaultMiddleware function from the Redux Toolkit to add default middleware to the store
  // We're passing in an object with the serializableCheck key set to false to avoid serialization errors with non-serializable data
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger);
  },
});

// Exporting the store to be used in the app
// Also exporting the persistor object created with the persistStore function from redux-persist
export default store;
export const persistor = persistStore(store);