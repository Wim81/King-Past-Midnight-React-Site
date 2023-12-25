import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookModalActions } from "../../store/modal-deletebook-state-slice";
import { deleteBook } from '../../store/books-actions';
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allBooks = useSelector(state => state.books.books);
    const dbRefElement= document.querySelector('#dbref');
    const db_ref = dbRefElement.dataset.dbref;
    const currentBook = allBooks.find(book => book.db_ref == db_ref);

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(deleteBook(db_ref));
        dispatch(deleteBookModalActions.closeDeleteBookModal());
        navigate('/books');
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(deleteBookModalActions.closeDeleteBookModal());
    }

    let content = <form onSubmit={onSubmitHandler}>  

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='delete book' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title={`Are you sure you want to delete book ${currentBook.title} ?`} content={content} />
}

export default DeleteBook;