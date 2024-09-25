import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk(
  'pagination/fetchItems',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.slice(0, 40);
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

// Export the action and reducer
export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
