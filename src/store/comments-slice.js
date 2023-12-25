import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: 'currentBookComments',
    initialState: { currentBookComments: [] },
    reducers: {
        updateComments(state, action) {
            const responseData = action.payload;
            const allComments = [];
    
            for (const key in responseData) {
                allComments.push({
                    comment: responseData[key].comment,
                    timestamp: responseData[key].timestamp,
                    db_ref: key,
                    userId: responseData[key].userId
                });
            }

            state.currentBookComments = allComments;
        },
    }
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice;