import { createSlice } from "@reduxjs/toolkit";

const initialSortUsersState = { sortUsers: 'alpha' };

const sortUsersSlice = createSlice({
    name: 'sortUsers',
    initialState: initialSortUsersState,
    reducers: {
        updateSortUsers(state, action) {
            state.sortUsers = action.payload;
        }
    }
});

export default sortUsersSlice.reducer;
export const sortUsersActions = sortUsersSlice.actions;