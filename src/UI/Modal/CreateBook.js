import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import { addBookModalActions } from "../../store/modal-addbook-state-slice";
import { fetchBooksData, addBook } from '../../store/books-actions';

const CreateBook = () => {
    const dispatch = useDispatch();

    const titleRef = useRef();
    const yearRef = useRef();
    const pagesRef = useRef();
    const imgRef = useRef();
    const summaryRef = useRef();

    let timestamp = null;
    let newBookData = {};

    const onSubmitHandler = e => {
        e.preventDefault();
        timestamp = Math.floor(Date.now() / 1000);
        newBookData = {
            id: timestamp,
            title: titleRef.current.value,
            year: yearRef.current.value,
            pages: pagesRef.current.value,
            img_url: imgRef.current.value,
            summary: summaryRef.current.value,
            likes: '',
            in_collections: ''
        };
        dispatch(addBook(newBookData));
        dispatch(addBookModalActions.closeAddBookModal());
        dispatch(fetchBooksData());
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(addBookModalActions.closeAddBookModal());
    }

    let content = <form onSubmit={onSubmitHandler}>
        
        <div className={modalClasses.inputLine}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" ref={titleRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="year">Year:</label>
            <input type="text" id="year" name="year" ref={yearRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="pages"># pages:</label>
            <input type="integer" id="pages" name="pages" ref={pagesRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="image_url">Image URL:</label>
            <input type="text" id="image_url" name="image_url" ref={imgRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="summary">Summary:</label>
            <input type="textarea" id="summary" name="summary" ref={summaryRef} />
        </div>        

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='add book' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Add Book' content={content} />
}

export default CreateBook;