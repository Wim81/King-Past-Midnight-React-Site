import { createSlice } from "@reduxjs/toolkit";

const initialDeleteUserModalState = { deleteUserModalOpen: false };

const deleteUserModalSlice = createSlice({
    name: 'deleteUserModal',
    initialState: initialDeleteUserModalState,
    reducers: {
        openDeleteUserModal(state) {
            state.deleteUserModalOpen = true;
        },
        closeDeleteUserModal(state) {
            state.deleteUserModalOpen = false;
        }
    }
});

export default deleteUserModalSlice.reducer;
export const deleteUserModalActions = deleteUserModalSlice.actions;