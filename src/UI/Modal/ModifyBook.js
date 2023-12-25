import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import { modifyBookModalActions } from "../../store/modal-modifybook-state-slice";
import { modifyBook, fetchBookOfTheMonth, updateBookOfTheMonth } from '../../store/books-actions';

const ModifyBook = () => {
    const allBooks = useSelector(state => state.books.books);
    const currentBookOfTheMonth = useSelector(state => state.books.book_of_the_month);
    const dispatch = useDispatch();

    const dbRefElement= document.querySelector('#dbref');
    const db_ref = dbRefElement.dataset.dbref; 

    const currentBook = allBooks.find(book => book.db_ref == db_ref);
    let currentBotmState = false;

    if (currentBookOfTheMonth === currentBook.id) {
        currentBotmState = true;
    }

    const [bookOfTheMonthValue, setBookOfTheMonthValue] = useState(currentBotmState);

    useEffect(() => {
        setBookOfTheMonthValue(bookOfTheMonthValue);
    }, []);

    useEffect(() => {
        dispatch(fetchBookOfTheMonth());
    }, [dispatch]);

    const titleRef = useRef();
    const yearRef = useRef();
    const pagesRef = useRef();
    const imgRef = useRef();
    const summaryRef = useRef();
    const bookOfTheMonthRef = useRef();

    let modifyBookData = {};

    const onSubmitHandler = e => {
        e.preventDefault();

        /* this condition makes sure the book of the month is not removed when another book gets modified with book_of_the_month field value false */
        if (bookOfTheMonthValue || (!bookOfTheMonthValue && currentBook.id == currentBookOfTheMonth)) {
            dispatch(updateBookOfTheMonth(currentBook.id, bookOfTheMonthValue));
        }        

        modifyBookData = {
            id: currentBook.id,
            db_ref: db_ref,
            title: titleRef.current.value,
            year: yearRef.current.value,
            pages: pagesRef.current.value,
            img_url: imgRef.current.value,
            summary: summaryRef.current.value,
            likes: currentBook.likes,
            in_collections: currentBook.in_collections
        };
        dispatch(modifyBook(modifyBookData));
        setBookOfTheMonthValue(bookOfTheMonthValue);
        dispatch(modifyBookModalActions.closeModifyBookModal());
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(modifyBookModalActions.closeModifyBookModal());
    }

    const bookOfTheMonthClickHandler = e => {
        setBookOfTheMonthValue(e.target.checked);
    }

    let content = <form onSubmit={onSubmitHandler}>
        
        <div className={modalClasses.inputLine}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" ref={titleRef} defaultValue={currentBook.title} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="year">Year:</label>
            <input type="text" id="year" name="year" ref={yearRef} defaultValue={currentBook.year} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="pages"># pages:</label>
            <input type="integer" id="pages" name="pages" ref={pagesRef} defaultValue={currentBook.pages} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="image_url">Image URL:</label>
            <input type="text" id="image_url" name="image_url" ref={imgRef} defaultValue={currentBook.img_url} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="summary">Summary:</label>
            <input type="textarea" id="summary" name="summary" ref={summaryRef} defaultValue={currentBook.summary} />
        </div> 

        <div className={[modalClasses.inputLine, modalClasses.checkboxLine].join(' ')}>
            <label htmlFor="book_of_the_month">Book Of The Month:</label>
            <input type="checkbox" id="book_of_the_month" name="book_of_the_month" ref={bookOfTheMonthRef} defaultChecked={ bookOfTheMonthValue ? 'checked' : '' } onClick={bookOfTheMonthClickHandler} />
        </div>       
    
        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='modify book' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Modify Book' content={content} />
}

export default ModifyBook;