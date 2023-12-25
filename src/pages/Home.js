import classes from './Home.module.css';
import rootclasses from './Root.module.css';

import { CtaPrimary, CtaHomepageButton } from '../UI/Buttons';
import BookOfTheMonth from '../components/books/BookOfTheMonth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookModalActions } from "../store/modal-addbook-state-slice";
import { addUserModalActions } from "../store/modal-adduser-state-slice";

function HomePage() {
    const loggedIn = useSelector(state => state.loginState.loggedin);
    const loggedInUser = useSelector(state => state.loginState.loggedinUser);
    const [userAdmin, setUserAdmin] = useState(0);
    const allBooks = useSelector(state => state.books.books);
    const bookOfTheMonthId = useSelector(state => state.books.book_of_the_month);
    const bookOfTheMonth = allBooks.filter(book => { return book.id === bookOfTheMonthId })[0];
    const dispatch = useDispatch();

    const openAddBook = () => {
        dispatch(addBookModalActions.openAddBookModal());
    }

    const openAddUser = () => {
        dispatch(addUserModalActions.openAddUserModal());
    }

    useEffect(() => {
        if (loggedInUser && loggedInUser.admin === true) {
            setUserAdmin(1);
        }
    }, [loggedInUser]);
   

    return (
        <>
            <section className={classes.banner}>
                <h1 className={classes.mainTitle}>King Past Midnight</h1>
            </section>
            <main className={rootclasses.pageContentContainer}>
                <section className={classes.intro}>
                    <div className={classes.introText}>
                        <p>Welcome to King Past Midnight!</p>
                        
                        <p>We are a book club focussing solely on the works of Stephen King. Our club was initiated by our love and admiration of King’s virtuosity. You can visit our physical book club in New Antwerp, where we offer you copies of all of Stephen King’s books. But you are also welcome to join us here if you read his works without using our King library, of course.</p>

                        <p>Upon becoming a member, an administrator will make a user account for you and share the login details with you. Once you log in, you can add the books you have read to your personal collection. You will also be able to view the other members’ collections.</p>

                        <p>If you have any questions, please reach out to us. Let the wheel of Ka be on your side!</p>
                    </div>
                    <div className={classes.introButtons}>
                        <CtaHomepageButton label='view all books' dest='/books' />
                        { /* collections can only be seen by logged in users */ }
                        { loggedIn === 1 && <CtaHomepageButton label="view all collections" dest='/collections' /> }                        
                    </div>
                </section>

                { bookOfTheMonth && <BookOfTheMonth id={bookOfTheMonth.id} title={bookOfTheMonth.title} summary={bookOfTheMonth.summary} img_url={bookOfTheMonth.img_url} /> }
                
                { !bookOfTheMonth && <h3 className={classes.noBookOfTheMonth}>There is currently no Book Of The Month</h3> }
                
                { /* admin section only to be seen by admin users */ }
                { loggedIn === 1 && userAdmin === 1 &&
                    <section className={classes.admin}>
                        <h3 className={classes.adminTitle}>Admin</h3>
                        <div className={classes.adminButtons}>
                            <CtaPrimary label='add member' dest='' onClick={openAddUser} />
                            <CtaPrimary label='add book' dest='' onClick={openAddBook} />
                        </div>
                    </section>
                }

               
            </main>
        </>
    );
}

export default HomePage;