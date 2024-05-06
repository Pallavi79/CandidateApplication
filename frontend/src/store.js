import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducers/jobReducer';

//Store for redux
const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export default store;
