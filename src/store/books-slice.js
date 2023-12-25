import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: 'books',
    initialState: { books: [] },
    reducers: {
        updateBooks(state, action) {
            const responseData = action.payload;
            const allBooks = [];
    
            for (const key in responseData) {
                allBooks.push({
                    id: responseData[key].id,
                    db_ref: key,
                    title: responseData[key].title,
                    summary: responseData[key].summary,
                    year: responseData[key].year,
                    pages: responseData[key].pages,
                    img_url: responseData[key].img_url,
                    likes: responseData[key].likes,
                    in_collections: responseData[key].in_collections
                });
            }
            state.books = allBooks;
        },
        updateBookOfTheMonth(state, action) {
            const newBotmValue = action.payload;
            state.book_of_the_month = newBotmValue;
        }
    }
});

export const booksActions = booksSlice.actions;
export default booksSlice;