import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserModalActions } from "../../store/modal-deleteuser-state-slice";
import { deleteUser } from '../../store/users-actions';
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allUsers = useSelector(state => state.users.users);
    const dbRefElement= document.querySelector('#dbref');
    const db_ref = dbRefElement.dataset.dbref;
    const currentUser = allUsers.find(user => user.db_ref == db_ref);

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(deleteUser(db_ref));
        dispatch(deleteUserModalActions.closeDeleteUserModal());
        navigate('/collections');
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(deleteUserModalActions.closeDeleteUserModal());
    }

    let content = <form onSubmit={onSubmitHandler}>  

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='delete member' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title={`Are you sure you want to delete member ${currentUser.firstname} ${currentUser.lastname}?`} content={content} />
}

export default DeleteBook;