import { createSlice } from "@reduxjs/toolkit";

const initialAddCommentModalState = { addCommentModalOpen: false };

const addCommentModalSlice = createSlice({
    name: 'addCommentModal',
    initialState: initialAddCommentModalState,
    reducers: {
        openAddCommentModal(state) {
            state.addCommentModalOpen = true;
        },
        closeAddCommentModal(state) {
            state.addCommentModalOpen = false;
        }
    }
});

export default addCommentModalSlice.reducer;
export const addCommentModalActions = addCommentModalSlice.actions;