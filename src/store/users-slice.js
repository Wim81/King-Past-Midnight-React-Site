import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [] },
    reducers: {
        updateUsers(state, action) {
            const responseData = action.payload;
            const allUsers = [];
    
            for (const key in responseData) {
                allUsers.push({
                id: responseData[key].id,
                db_ref: key,
                username: responseData[key].username,
                firstname: responseData[key].firstname,
                lastname: responseData[key].lastname,
                password: responseData[key].password,
                admin: responseData[key].admin,
                avatarColour: responseData[key].avatarColour
                });
            }

            state.users = allUsers;
        }
    }
});

export const usersActions = usersSlice.actions;
export default usersSlice;