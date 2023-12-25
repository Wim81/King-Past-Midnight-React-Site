import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from "../UI/Modal/Login";
import Logout from "../UI/Modal/Logout";
import CreateBook from "../UI/Modal/CreateBook";
import ModifyBook from "../UI/Modal/ModifyBook";
import DeleteBook from "../UI/Modal/DeleteBook";
import AddComment from "../UI/Modal/AddComment";
import CreateUser from "../UI/Modal/CreateUser";
import ModifyUser from "../UI/Modal/ModifyUser";
import DeleteUser from "../UI/Modal/DeleteUser";
import  { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchBooksData, fetchBookOfTheMonth } from '../store/books-actions';
import { fetchUsersData } from "../store/users-actions";
import { loginStateActions } from "../store/login-state";

import '../fonts/BOOKOSB.TTF';
import '../fonts/GOTHIC.TTF';

import classes from './Root.module.css';

function RootLayout() {
    const loginModalOpen = useSelector(state => state.loginModal.loginModalOpen);
    const logoutModalOpen = useSelector(state => state.logoutModal.logoutModalOpen);
    const addBookModalOpen = useSelector(state => state.addBookModal.addBookModalOpen);
    const modifyBookModalOpen = useSelector(state => state.modifyBookModal.modifyBookModalOpen);
    const deleteBookModalOpen = useSelector(state => state.deleteBookModal.deleteBookModalOpen);
    const addCommentModalOpen = useSelector(state => state.addCommentModal.addCommentModalOpen);
    const addUserModalOpen = useSelector(state => state.addUserModal.addUserModalOpen);
    const modifyUserModalOpen = useSelector(state => state.modifyUserModal.modifyUserModalOpen);
    const deleteUserModalOpen = useSelector(state => state.deleteUserModal.deleteUserModalOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        let loggedin = Number(localStorage.getItem('isLoggedIn'));
        let loggedinUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (loggedin === 1) {
            dispatch(loginStateActions.login(loggedinUser));
        }
        dispatch(fetchBooksData());
        dispatch(fetchBookOfTheMonth());
        dispatch(fetchUsersData());
    }, [dispatch]);

    return (
        <div className={classes.all}>

            {/* MODALS */}

            { loginModalOpen && <Login /> }
            { logoutModalOpen && <Logout /> }
            { addBookModalOpen && <CreateBook /> }
            { modifyBookModalOpen && <ModifyBook /> }
            { deleteBookModalOpen && <DeleteBook /> }
            { addCommentModalOpen && <AddComment /> }
            { addUserModalOpen && <CreateUser /> }
            { modifyUserModalOpen && <ModifyUser /> }
            { deleteUserModalOpen && <DeleteUser /> }

             {/* end of MODALS */}

            <Header />
            <main>
                <Outlet />
            </main>            
            <Footer />
        </div>
    );
}

export default RootLayout;