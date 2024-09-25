import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '@/app/Redux/paginationSlice'; 

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

export default store;
