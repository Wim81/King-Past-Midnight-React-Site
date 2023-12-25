import { createSlice } from "@reduxjs/toolkit";

const initialNavMobileState =  { navMobileOpen: false };

const navMobileSlice = createSlice({
    name: 'navMobile',
    initialState: initialNavMobileState,
    reducers: {
        toggleNavMobile(state) {
            state.navMobileOpen = !state.navMobileOpen;
        },
        closeNavMobile(state) {
            state.navMobileOpen = false;
        }
    }
});

export default navMobileSlice.reducer;
export const navMobileActions = navMobileSlice.actions;