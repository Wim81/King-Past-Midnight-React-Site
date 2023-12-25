import { createSlice } from "@reduxjs/toolkit";

const initialSortBooksState = { sortBooks: 'alpha' };

const sortBooksSlice = createSlice({
    name: 'sortBooks',
    initialState: initialSortBooksState,
    reducers: {
        updateSortBooks(state, action) {
            state.sortBooks = action.payload;
        }
    }
});

export default sortBooksSlice.reducer;
export const sortBooksActions = sortBooksSlice.actions;