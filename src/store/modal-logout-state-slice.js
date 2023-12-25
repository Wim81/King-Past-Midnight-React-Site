import { createSlice } from "@reduxjs/toolkit";

const initialLogoutModalState =  { logoutModalOpen: false };

const logoutModalSlice = createSlice({
    name: 'logoutModal',
    initialState: initialLogoutModalState,
    reducers: {
        openLogoutModal(state) {
            state.logoutModalOpen = true;
        },
        closeLogoutModal(state) {
            state.logoutModalOpen = false;
        }
    }
});

export default logoutModalSlice.reducer;
export const logoutModalActions = logoutModalSlice.actions;