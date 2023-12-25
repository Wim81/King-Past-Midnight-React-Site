import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRef } from "react";
import { addCommentModalActions } from "../../store/modal-addcomment-state-slice";
import { addComment } from '../../store/books-actions';

const AddComment = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const commentRef = useRef();
    const loggedInUser = useSelector(state => state.loginState.loggedinUser);

    let timestamp = null;
    let newCommentData = {};
    let userId = loggedInUser.id;
    let bookId = params.bookId;

    const onSubmitHandler = e => {
        e.preventDefault();
        timestamp = Math.floor(Date.now() / 1000);
        newCommentData = {
            comment: commentRef.current.value,
            timestamp: timestamp,
            userId: userId
        }
        dispatch(addComment(newCommentData, bookId));
        dispatch(addCommentModalActions.closeAddCommentModal());
    }    

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(addCommentModalActions.closeAddCommentModal());
    }

    let content = <form onSubmit={onSubmitHandler}>
            
        <div className={modalClasses.inputLine}>
            <label htmlFor="title">Comment:</label>
            <input type="textarea" id="comment" name="comment" ref={commentRef} />
        </div>       

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='add comment' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Add Comment' content={content} />
}

export default AddComment;