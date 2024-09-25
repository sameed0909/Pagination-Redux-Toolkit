import { createSlice}  from '@reduxjs/toolkit';

const initialState  = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    items:[],
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers:{
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalItems: (state, action) => {
            state.totalItems =action.payload;
        },
        setItems: (state, action) => {
            state.items =action.payload;
        },
    },
});

export const { setCurrentPage, setTotalItems, setItems} = paginationSlice.actions;
export default paginationSlice.reducer;