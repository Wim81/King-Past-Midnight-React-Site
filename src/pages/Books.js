import classes from './Books.module.css';
import rootclasses from './Root.module.css';

import { useDispatch, useSelector } from 'react-redux';
import BookListItem from '../components/books/BookListItem';
import { sortBooksActions } from '../store/sort-books';

const BooksPage = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books);
    const booksSortOrder = useSelector(state => state.sortBooks.sortBooks);
   
    const SortOptionHandler = sortOrder => {   
       dispatch(sortBooksActions.updateSortBooks(sortOrder));
    };   

    /*  order logic */
    let booksList = [...books];
    if (booksSortOrder === 'alpha') {
        booksList.sort((a,b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }); 

    } else if (booksSortOrder === 'rev-alpha') {
        booksList.sort((a,b) => {
            if (a.title > b.title) {
                return -1;
            }
            if (a.title < b.title) {
                return 1;
            }
            return 0;
        });
    } else if (booksSortOrder === 'year') {
        booksList.sort((a,b) => {
            if (a.year < b.year) {
                return -1;
            }
            if (a.year > b.year) {
                return 1;
            }
            return 0;
        });
    }
    /* end of order logic */

    return (
        <main className={rootclasses.pageContentContainer}>
            <h1 className={classes.title}>Books</h1>
            <section className={classes.intro}>
                <div className={classes.introText}>
                <p>Please find an overview of all Stephen King books in our collection on this page. In fact, all books written by Stephen King will be in this overview, obviously. Both his full stories as his collections of short stories.</p>

                <p>If you are a logged in member, you can open a book's details by selecting it in the list. When on the book's detail page, you can add the book to your collection, like the book or leave a comment. You will also be able to see other people's collections, likes and comments.</p>

                <p>We kindly ask you to keep your comments civilized. We are a small and personal book club and want to have a nice and open atmosphere. Members who violate this condition will get a warning once, with the comment in question being deleted. Afterwards, non compliance of this condition will lead to a ban.</p>
                </div>
            </section>
            <section className={classes.bookList}>
                <div className={classes.bookListSortOptions}>
                    <h5 className={classes.optionsTitle}>Sort by</h5>

                    <div className={classes.options}>
                        <span className={[classes.option, booksSortOrder === 'alpha' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('alpha')} >A &gt; Z</span>

                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>

                        <span className={[classes.option, booksSortOrder === 'rev-alpha' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('rev-alpha')} >Z &lt; A</span>

                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>

                        <span className={[classes.option, booksSortOrder === 'year' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('year')} >Year</span>
                    </div>  

                </div>
                <div className={classes.bookListContent}>
                    <ul className={classes.bookListContentInner}>
                    {booksList.map(book => 
                        <BookListItem
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            summary={book.summary}
                            year={book.year}
                            pages={book.pages}
                            img_url={book.img_url}
                        />
                    )}
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default BooksPage;