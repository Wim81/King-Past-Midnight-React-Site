import { createSlice } from "@reduxjs/toolkit";

const initialDeleteBookModalState = { deleteBookModalOpen: false };

const deleteBookModalSlice = createSlice({
    name: 'deleteBookModal',
    initialState: initialDeleteBookModalState,
    reducers: {
        openDeleteBookModal(state) {
            state.deleteBookModalOpen = true;
        },
        closeDeleteBookModal(state) {
            state.deleteBookModalOpen = false;
        }
    }
});

export default deleteBookModalSlice.reducer;
export const deleteBookModalActions = deleteBookModalSlice.actions;