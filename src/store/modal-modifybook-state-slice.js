import { createSlice } from "@reduxjs/toolkit";

const initialModifyBookModalState = { modifyBookModalOpen: false };

const modifyBookModalSlice = createSlice({
    name: 'modifyBookModal',
    initialState: initialModifyBookModalState,
    reducers: {
        openModifyBookModal(state) {
            state.modifyBookModalOpen = true;
        },
        closeModifyBookModal(state) {
            state.modifyBookModalOpen = false;
        }
    }
});

export default modifyBookModalSlice.reducer;
export const modifyBookModalActions = modifyBookModalSlice.actions;