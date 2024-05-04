import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducers/jobReducer';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export default store;
