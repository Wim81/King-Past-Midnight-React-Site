import { createSlice } from "@reduxjs/toolkit";

const initialLoginModalState =  { loginModalOpen: false };

const loginModalSlice = createSlice({
    name: 'loginModal',
    initialState: initialLoginModalState,
    reducers: {
        openLoginModal(state) {
            state.loginModalOpen = true;
        },
        closeLoginModal(state) {
            state.loginModalOpen = false;
        }
    }
});

export default loginModalSlice.reducer;
export const loginModalActions = loginModalSlice.actions;