import { createSlice } from "@reduxjs/toolkit";

const initialAddBookModalState = { addBookModalOpen: false };

const addBookModalSlice = createSlice({
    name: 'addBookModal',
    initialState: initialAddBookModalState,
    reducers: {
        openAddBookModal(state) {
            state.addBookModalOpen = true;
        },
        closeAddBookModal(state) {
            state.addBookModalOpen = false;
        }
    }
});

export default addBookModalSlice.reducer;
export const addBookModalActions = addBookModalSlice.actions;