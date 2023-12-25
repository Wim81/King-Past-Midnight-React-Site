import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { loggedin: 0 };

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: initialLoginState,
    reducers: {
        login(state, action) {
            state.loggedin = 1;
            state.loggedinUser = action.payload;
        },
        logout(state) {
            state.loggedin = 0;
            state.loggedinUser = null;
        }
    }
});

export default loginStateSlice.reducer;
export const loginStateActions = loginStateSlice.actions;