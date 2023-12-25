import classes from './CollectionDetail.module.css';
import rootclasses from './Root.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { modifyUserModalActions } from '../store/modal-modifyuser-state-slice';
import { deleteUserModalActions } from '../store/modal-deleteuser-state-slice';
import BookListItem from '../components/books/BookListItem';
import { sortBooksActions } from '../store/sort-books';

import { CtaPrimary } from '../UI/Buttons';
import Avatar from '../UI/Avatar';

function CollectionDetailPage() {
    const loggedIn = useSelector(state => state.loginState.loggedin);
    const loggedInUser = useSelector(state => state.loginState.loggedinUser);
    const [userAdmin, setUserAdmin] = useState(0);
    const [currentUser, setCurrentUser] = useState({id:0, db_ref:0, username:'', firstname:'', lastname:'', password:'', admin:false, avatarColour:'green'});
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [booksInCollectionList, setBooksInCollectionList] = useState([]);
    const [collectionChecked, setCollectionChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInUser && loggedInUser.admin === true) {
            setUserAdmin(1);
        }
    }, [loggedInUser]);

    const users = useSelector(state => state.users.users);
    const params = useParams();
    const userId = params.collectionId;
    let db_ref = null;

    let initial1 = '';
    let initial2= '';
    let initials = '';
    let destination = currentUser ? '/collection/' + currentUser.id : '';
    let backgroundColourAvatar = currentUser ? currentUser.avatarColour : '';

    useEffect(() => {
        setCurrentUser(users.find(user => user.id == userId));
        setCollectionChecked(false); /* if current user changes, reset this check, so that the new user's collection is being generated. Needed when looking at someone else's collection and then selecting "My collection" in the navigation */
    }, [users, params]);

    if (currentUser) {
        db_ref = currentUser.db_ref;
        initial1 = currentUser.firstname ? currentUser.firstname.substring(0,1) : '';
        initial2 = currentUser.lastname ? currentUser.lastname.substring(0,1) : '';
        initials = currentUser ? initial1 + initial2 : '';
    }

    const books = useSelector(state => state.books.books);
    const booksSortOrder = useSelector(state => state.sortBooks.sortBooks);
   
    const SortOptionHandler = sortOrder => {   
       dispatch(sortBooksActions.updateSortBooks(sortOrder));
       setCollectionChecked(false);
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

    const modifyUser = () => {
        dispatch(modifyUserModalActions.openModifyUserModal());
    }

    const deleteUser = () => {
        dispatch(deleteUserModalActions.openDeleteUserModal());
    }

    useEffect(() => {
        if (typeof currentUser !== 'undefined' && currentUser.id !== 0 && collectionChecked === false ) {
            let bookCollection = [];
            for (let i=0; i < booksList.length; i++) { 
                if(booksList[i].in_collections.includes(currentUser.id)){
                    bookCollection.push(booksList[i]);
                }
            }
            setBooksInCollectionList(bookCollection);
            setCollectionChecked(true); /* avoid infinite loop for users without books */
        }        
    }, [currentUser, booksInCollectionList, booksSortOrder]);

useEffect(() => {
    setNumberOfBooks(booksInCollectionList.length);
}, [currentUser, booksInCollectionList]);    

    return (
        <>
            <main className={rootclasses.pageContentContainer} id="dbref" data-dbref={db_ref}>
                <h1 className={classes.title}>{currentUser ? currentUser.firstname : ''}'s <br/>Collection</h1>

                <section className={classes.mainDataContainer}>
                    <div  className={classes.mainData}>
                        <div className={classes.avatarContainer}>
                            <Avatar className={classes.avatar} dest={destination} label ={initials} bg={backgroundColourAvatar} />
                        </div>
                        <div>
                            <p className={classes.textLine}>{currentUser ? currentUser.firstname + ' ' + currentUser.lastname : ''}</p>
                            <br />
                            <p className={[classes.desktopOnly, classes.textLine].join(' ')}>Number of books read: {numberOfBooks}</p>
                        </div>
                    </div>                    
                    <p className={[classes.mobileOnly, classes.textLine].join(' ')}>Number of books read: {numberOfBooks}</p>
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
                    {booksInCollectionList.map(book => 
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

            { /* admin section only to be seen by admin users */ }
            { loggedIn === 1 && userAdmin === 1 && 
                <section className={classes.admin}>
                    <h3 className={classes.adminTitle}>Admin</h3>
                    <div className={classes.adminButtons}>
                        <CtaPrimary className='green' label='modify member' dest='' onClick={modifyUser} />
                        <CtaPrimary className='red' label='delete member' dest='' onClick={deleteUser} />
                    </div>
                </section>
            }
            
            </main>
            
        </>
    );
}

export default CollectionDetailPage;