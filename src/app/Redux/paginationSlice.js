import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
  'pagination/fetchItems',
  async () => {
    const response = await axios.get('https://bt-swagger.360xpertsolutions.com/v1/store-orders', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODVjZjBlMDAtYzk4Ni00YjlkLTk3YzItZTQwZjI5ZWVhZmViIiwidXNlcl9uYW1lIjoibXVoYW1tYWQgc2hhaGFiIiwicm9sZSI6InN0b3JlIG1hbmFnZXIiLCJ3b3JrcGxhY2VfaWQiOiJkZTJlYzA1NS01MDUzLTRjOTQtYWZmMC1kOWJjMDQxZTYzMjciLCJ3b3JrcGxhY2VfdHlwZSI6InN0b3JlIiwid29ya3BsYWNlX25hbWUiOiJzdG9yZSBvbmUiLCJpYXQiOjE3Mjc3NjE3NTAsImV4cCI6MTcyNzg0ODE1MH0.GDLp60fypiR1DW2HRq5Wrroatg8SOgKUXMnsJNIeGwk',
      },
    });

    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
  items: [],
  status: 'idle',
  error: null,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalItems = action.payload.length;
        state.status = 'succeeded';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
