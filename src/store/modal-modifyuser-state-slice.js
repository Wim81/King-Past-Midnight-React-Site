import { createSlice } from "@reduxjs/toolkit";

const initialModifyUserModalState = { modifyUserModalOpen: false };

const modifyUserModalSlice = createSlice({
    name: 'modifyUserModal',
    initialState: initialModifyUserModalState,
    reducers: {
        openModifyUserModal(state) {
            state.modifyUserModalOpen = true;
        },
        closeModifyUserModal(state) {
            state.modifyUserModalOpen = false;
        }
    }
});

export default modifyUserModalSlice.reducer;
export const modifyUserModalActions = modifyUserModalSlice.actions;