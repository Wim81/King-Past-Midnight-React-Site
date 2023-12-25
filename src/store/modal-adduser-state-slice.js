import { createSlice } from "@reduxjs/toolkit";

const initialAddUserModalState = { addUserModalOpen: false };

const addUserModalSlice = createSlice({
    name: 'addUserModal',
    initialState: initialAddUserModalState,
    reducers: {
        openAddUserModal(state) {
            state.addUserModalOpen = true;
        },
        closeAddUserModal(state) {
            state.addUserModalOpen = false;
        }
    }
});

export default addUserModalSlice.reducer;
export const addUserModalActions = addUserModalSlice.actions;