import { configureStore } from '@reduxjs/toolkit';
import loginStateReducer from './login-state';
import navMobileReducer from './nav-mobile-slice';
import loginModalReducer from './modal-login-state-slice';
import logoutModalReducer from './modal-logout-state-slice';
import addBookModalReducer from './modal-addbook-state-slice';
import modifyBookModalReducer from './modal-modifybook-state-slice';
import deleteBookModalReducer from './modal-deletebook-state-slice';
import addCommentModalReducer from './modal-addcomment-state-slice';
import addUserModalReducer from './modal-adduser-state-slice';
import modifyUserModalReducer from './modal-modifyuser-state-slice';
import deleteUserModalReducer from './modal-deleteuser-state-slice';
import sortBooksReducer from './sort-books';
import sortUsersReducer from './sort-users';
import booksSlice from './books-slice';
import usersSlice from './users-slice';
import commentsSlice from './comments-slice';

const store = configureStore({
    reducer: {
        loginState: loginStateReducer,
        navMobile: navMobileReducer,
        loginModal: loginModalReducer,
        logoutModal: logoutModalReducer,
        addBookModal: addBookModalReducer,
        modifyBookModal: modifyBookModalReducer,
        deleteBookModal: deleteBookModalReducer,
        addCommentModal: addCommentModalReducer,
        addUserModal: addUserModalReducer,
        modifyUserModal: modifyUserModalReducer,
        deleteUserModal: deleteUserModalReducer,
        books: booksSlice.reducer,
        sortBooks: sortBooksReducer,
        currentBookComments: commentsSlice.reducer,
        users: usersSlice.reducer,
        sortUsers: sortUsersReducer,
    } 
});

export default store;