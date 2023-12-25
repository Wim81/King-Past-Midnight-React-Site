import classes from './BookDetail.module.css';
import rootclasses from './Root.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { modifyBookModalActions } from '../store/modal-modifybook-state-slice';
import { deleteBookModalActions } from '../store/modal-deletebook-state-slice';
import { addCommentModalActions } from '../store/modal-addcomment-state-slice';
import { fetchBooksData, updateLikesBook, updateInCollectionsBook } from '../store/books-actions';
import { fetchCommentsData } from '../store/books-actions';

import HeartRegular from '../assets/icons/heart-regular.png';
import HeartSolid from '../assets/icons/heart-solid.png';

import { CtaPrimary } from '../UI/Buttons';
import Avatar from '../UI/Avatar';
import Comment from '../components/books/Comment';

function BookDetailPage() {
    const loggedIn = useSelector(state => state.loginState.loggedin);
    const loggedInUser = useSelector(state => state.loginState.loggedinUser);
    const comments = useSelector(state => state.currentBookComments.currentBookComments);
    const [currentBookComments, setCurrentBookComments] = useState(comments);
    const [extendedCurrentBookComments, setExtendedCurrentBookComments] = useState([]);
    const allUsers = Object.entries(useSelector(state => state.users.users));
    const [userAdmin, setUserAdmin] = useState(0);
    const [currentBook, setCurrentBook] = useState({});
    const [currentBookLikes, setCurrentBookLikes] = useState('');
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [currentUserLikesThisBook, setCurrentUserLikesThisBook] = useState(false);
    const [currentBookInCollections, setCurrentBookInCollections] = useState('');
    const [currentUserHasThisBookInCollection, setCurrentUserHasThisBookInCollection] = useState(false);
    const [allUsersWithThisBookInCollection, setAllUsersWithThisBookInCollection] = useState([]);
    const dispatch = useDispatch();

    const books = useSelector(state => state.books.books);
    const params = useParams();
    const bookId = params.bookId;
    let db_ref = null;

    const convertComments = () => {
        let extendedComments = [];
      
        for (let i = 0; i < allUsers.length; i++) {
            let userId = allUsers[i][1].id;
            let userAvatarColour = allUsers[i][1].avatarColour;
            let userInitials = allUsers[i][1].firstname.substring(0,1) + allUsers[i][1].lastname.substring(0,1);

            let thisUserComments = currentBookComments.filter(comment => comment.userId === userId);
            
            for (let j = 0; j < thisUserComments.length; j++) {
                let extendedthisUserComment = {...thisUserComments[j], avatarColour: userAvatarColour, initials: userInitials};
                extendedComments = [...extendedComments, extendedthisUserComment];
            }
        }
        /* let's sort the comments so the newest will appear on top */
        const sortedExtendedComments = extendedComments.sort((a,b) => {
            if (a.timestamp > b.timestamp) {
                return -1;
            }
            if (a.timestamp < b.timestamp) {
                return 1;
            }
            return 0;
        }); 
        /* end of sorting logic */
        setExtendedCurrentBookComments(sortedExtendedComments);
    }

    useEffect(() => {
        if (typeof allUsers[0] !== 'undefined' 
                && typeof currentBookComments[0] !== 'undefined'
                && extendedCurrentBookComments.length === 0   ) {
            convertComments();
        }   
    }, [allUsers]);
        
    useEffect(() => {
        convertComments();    
    }, [currentBookComments]);

    useEffect(() => {
        if(currentBook) {
            dispatch(fetchCommentsData(currentBook));
        }        
    }, [currentBook]);

    useEffect(() => {
        setCurrentBookComments(comments);
    }, [comments, allUsers]);
    
    useEffect(() => {
        let collectUsersWithThisBookInCollection = [];
        for (let i=0; i < allUsers.length; i++) {         
            if(currentBookInCollections) {
                if (currentBookInCollections.indexOf(String(allUsers[i][1].id)) > -1) {
                    collectUsersWithThisBookInCollection.push(allUsers[i][1]);  
                }
            }            
        }
        setAllUsersWithThisBookInCollection(collectUsersWithThisBookInCollection);
    }, [currentBookInCollections, allUsers.length]);

    useEffect(() => {
        if (loggedInUser && loggedInUser.admin === true) {
            setUserAdmin(1);
        }
    }, [loggedInUser]);    
    
    useEffect(() => {
        setCurrentBook(books.find(book => book.id == bookId));
    }, [books]);

    if (currentBook) {
        db_ref = currentBook.db_ref;
    }

    useEffect(() => {
        if(currentBook) {
            setCurrentBookLikes(currentBook.likes);
            if(currentBook.likes) {
                setNumberOfLikes(currentBook.likes.split(',').length);
                if (loggedInUser && currentBook.likes.indexOf(String(loggedInUser.id)) > -1) {setCurrentUserLikesThisBook(true)}
            }
            setCurrentBookInCollections(currentBook.in_collections);
            if(currentBook.in_collections) {
                if (loggedInUser && currentBook.in_collections.indexOf(String(loggedInUser.id)) > -1) {setCurrentUserHasThisBookInCollection(true)}
            }
        }        
    }, [currentBook]);

    const toggleLike = () => {
        const userId = loggedInUser.id;
        const bookLikesArray = currentBookLikes.split(',');

        if (bookLikesArray.indexOf(String(userId)) > -1) {
            const index = bookLikesArray.indexOf(String(userId));
            bookLikesArray.splice(index, 1);
            const bookLikesString = bookLikesArray.toString();
            setCurrentBookLikes(bookLikesString);
            setNumberOfLikes(numberOfLikes - 1);
            setCurrentUserLikesThisBook(false);

            const modifyBookData = {
                id: currentBook.id,
                db_ref: db_ref,
                title: currentBook.title,
                year: currentBook.year,
                pages: currentBook.pages,
                img_url: currentBook.img_url,
                summary: currentBook.summary,
                likes: bookLikesString,
                in_collections: currentBook.in_collections
            };
            dispatch(updateLikesBook(modifyBookData));
        } else {
            bookLikesArray.push(userId.toString());
            const bookLikesArrayUpdated = bookLikesArray.filter(item => item !== '');
            const bookLikesString = bookLikesArrayUpdated.toString();
            setCurrentBookLikes(bookLikesString);
            setNumberOfLikes(numberOfLikes + 1);
            setCurrentUserLikesThisBook(true);

            const modifyBookData = {
                id: currentBook.id,
                db_ref: db_ref,
                title: currentBook.title,
                year: currentBook.year,
                pages: currentBook.pages,
                img_url: currentBook.img_url,
                summary: currentBook.summary,
                likes: bookLikesString,
                in_collections: currentBook.in_collections
            };
            dispatch(updateLikesBook(modifyBookData));
        }
    }

    const toggleInCollection = () => {
        const userId = loggedInUser.id;
        const bookInCollectionsArray = currentBookInCollections.split(',');

        if (bookInCollectionsArray.indexOf(String(userId)) > -1) {
            const index = bookInCollectionsArray.indexOf(String(userId));
            bookInCollectionsArray.splice(index, 1);
            const bookInCollectionsString = bookInCollectionsArray.toString();
            setCurrentBookInCollections(bookInCollectionsString);
            setCurrentUserHasThisBookInCollection(false);

            const modifyBookData = {
                id: currentBook.id,
                db_ref: db_ref,
                title: currentBook.title,
                year: currentBook.year,
                pages: currentBook.pages,
                img_url: currentBook.img_url,
                summary: currentBook.summary,
                likes: currentBook.likes,
                in_collections: bookInCollectionsString
            };
            dispatch(updateInCollectionsBook(modifyBookData));
        } else {
            bookInCollectionsArray.push(userId.toString());
            const bookInCollectionsArrayUpdated = bookInCollectionsArray.filter(item => item !== '');
            const bookInCollectionsString = bookInCollectionsArrayUpdated.toString();
            setCurrentBookInCollections(bookInCollectionsString);
            setCurrentUserHasThisBookInCollection(true);

            const modifyBookData = {
                id: currentBook.id,
                db_ref: db_ref,
                title: currentBook.title,
                year: currentBook.year,
                pages: currentBook.pages,
                img_url: currentBook.img_url,
                summary: currentBook.summary,
                likes: currentBook.likes,
                in_collections: bookInCollectionsString
            };
            dispatch(updateInCollectionsBook(modifyBookData));
        }
    }

    const modifyBook = () => {
        dispatch(modifyBookModalActions.openModifyBookModal());
    }

    const deleteBook = () => {
        dispatch(deleteBookModalActions.openDeleteBookModal());
    }

    const addComment = () => {
        dispatch(addCommentModalActions.openAddCommentModal());
    }

    function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mmm = d.toLocaleString('default', {month: 'long'}),
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            time;
    
        time = dd + ' ' + mmm + ' ' + yyyy + ', ' + h + ':' + min + 'h';
        return time;
    }
    console.log(allUsersWithThisBookInCollection);
    return (
        <>
            <main className={rootclasses.pageContentContainer} id="dbref" data-dbref={db_ref}>
                <h1 className={classes.title}>{currentBook ? currentBook.title : ''}</h1>
                <section className={classes.mainData}>
                    <div className={classes.bookImgContainer}>
                        <img referrerPolicy='no-referrer' alt='book cover' className={classes.bookImg} src={currentBook ? currentBook.img_url : ''} />
                    </div>
                    <div>
                        <div className={classes.bookYearPages}>
                            <p>{currentBook ? currentBook.year : ''}</p>
                            <p>{currentBook ? currentBook.pages : ''} pages</p>
                        </div>                        
                        <p>{currentBook ? currentBook.summary : ''}</p>
                    </div>
                </section>

                { loggedIn === 1 &&
                    <section className={classes.additionalData}>
                        <div className={classes.additionalDataCollection}>
                            <div className={classes.likeSection}>
                                <img alt='like' className={classes.likeIcon} src={ !currentUserLikesThisBook ? HeartRegular : HeartSolid } onClick={toggleLike} />
                                <span className={classes.likeCount}>{numberOfLikes}</span>
                            </div>
                            <CtaPrimary label={ !currentUserHasThisBookInCollection ? 'add to my collection' : 'remove from my collection' } onClick={toggleInCollection} />
                            <div className={classes.inCollections}>
                                <p className={classes.inCollectionsTitle}>In the following collections:</p>
                                <div className={classes.inCollectionsAvatars}>
                                    { allUsersWithThisBookInCollection.length === 0 && <p>Currently, this book is not included in any member's collection.</p> }
                                    { allUsersWithThisBookInCollection.sort((a,b) => {
                                            if ([a.firstname.substring(0, 1),a.lastname.substring(0, 1)].join('') < [b.firstname.substring(0, 1),b.lastname.substring(0, 1)].join('')) {
                                                return -1;
                                            }
                                            if ([a.firstname.substring(0, 1),a.lastname.substring(0, 1)].join('') > [b.firstname.substring(0, 1),b.lastname.substring(0, 1)].join('')) {
                                                return 1;
                                            }
                                            return 0;
                                        }).map((user, index) =>
                                        <Avatar
                                            key={index}
                                            dest={['/collection/', user.id].join('')}
                                            className={classes.inCollectionsAvatar}
                                            bg ={user.avatarColour}
                                            label={[user.firstname.substring(0, 1),user.lastname.substring(0, 1)].join('')} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={classes.AdditionalDataComments}>
                            <div className={classes.commentsSection}>
                                <p className={classes.commentsTitle}>Comments</p>
                                <div className={classes.comments}>
                                    { extendedCurrentBookComments.length === 0 && <p>Currently, no one has commented on this book. Be the first to do so!</p> }                            
                                    { extendedCurrentBookComments.map((comment, index) => 
                                        <Comment 
                                            key={index}
                                            datetime={convertTimestamp(comment.timestamp)}
                                            id={comment.timestamp}
                                            commentText={comment.comment} 
                                            userId={comment.userId} 
                                            label={comment.initials}
                                            bg={comment.avatarColour} 
                                        />
                                    ) }
                                </div>                          
                            </div>
                            <CtaPrimary label='add comment' dest='' onClick={addComment} className={classes.addCommentBtn} />
                        </div>
                    </section>
                }

                { /* admin section only to be seen by admin users */ }
                { loggedIn === 1 && userAdmin === 1 &&
                    <section className={classes.admin}>
                        <h3 className={classes.adminTitle}>Admin</h3>
                        <div className={classes.adminButtons}>
                            <CtaPrimary className='green' label='modify book' dest='' onClick={modifyBook} />
                            <CtaPrimary className='red' label='delete book' dest='' onClick={deleteBook} />
                        </div>
                    </section>
                }
            </main>
        </>
    );
}

export default BookDetailPage;