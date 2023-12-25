import classes from './Collections.module.css';
import rootclasses from './Root.module.css';

import { useDispatch, useSelector } from 'react-redux';
import CollectionListItem from '../components/collections/CollectionListItem';
import { sortUsersActions } from '../store/sort-users';

function CollectionsPage() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const books = useSelector(state => state.books.books);
    const collectionsSortOrder = useSelector(state => state.sortUsers.sortUsers);
   
    const SortOptionHandler = sortOrder => {   
       dispatch(sortUsersActions.updateSortUsers(sortOrder));
    };

    const usersClone = structuredClone(users); /* making a deep clone so we can add the number of books read per user */

    /* loop through the deep clone of user objects, and for each loop over books and calculate and add the total amount of books read by that user */
    for (let i=0; i < usersClone.length; i++) {
        let numberOfBooksRead = 0;
        for (let j=0; j < books.length; j++) {
            if (books[j].in_collections.includes(usersClone[i].id)) {
                numberOfBooksRead++;
            }
        }
        usersClone[i].numberOfBooksRead = numberOfBooksRead;
    }

    /*  order logic */
    let collectionsList = [...usersClone];
    if (collectionsSortOrder === 'alpha') {
        collectionsList.sort((a,b) => {
            if (a.firstname < b.firstname) {
                return -1;
            }
            if (a.firstname > b.firstname) {
                return 1;
            }
            return 0;
        }); 

    } else if (collectionsSortOrder === 'rev-alpha') {
        collectionsList.sort((a,b) => {
            if (a.firstname > b.firstname) {
                return -1;
            }
            if (a.firstname < b.firstname) {
                return 1;
            }
            return 0;
        });
    } else if (collectionsSortOrder === 'number-of-books') {
        collectionsList.sort((a,b) => {
            if (a.numberOfBooksRead > b.numberOfBooksRead) {
                return -1;
            }
            if (a.numberOfBooksRead < b.numberOfBooksRead) {
                return 1;
            }
            return 0;
        });   
    }
    /* end of order logic */

    return (
        <>
            <main className={rootclasses.pageContentContainer}>
            <h1 className={classes.title}>Collections</h1>
            <section className={classes.intro}>
                <div className={classes.introText}>
                    <p>For each of our members, you can see their collection in this overview. If you want to see what books a member has read, just click to see the detail.</p>

                    <p>You can see your own collection by clicking on your profile logo in the navigation and select “My collection”.</p>
                </div>
            </section>
            <section className={classes.collectionList}>
                <div className={classes.collectionListSortOptions}>
                    <h5 className={classes.optionsTitle}>Sort by</h5>

                    <div className={classes.options}>
                        <span className={[classes.option, collectionsSortOrder === 'alpha' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('alpha')} >A &gt; Z</span>

                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>

                        <span className={[classes.option, collectionsSortOrder === 'rev-alpha' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('rev-alpha')} >Z &lt; A</span>

                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>

                        <span className={[classes.option, collectionsSortOrder === 'number-of-books' ? classes.active : undefined].join(' ')} onClick={() => SortOptionHandler('number-of-books')} ># of books read</span>
                    </div>  

                </div>
                <div className={classes.collectionListContent}>
                    <ul className={classes.collectionListContentInner}>
                        {collectionsList.map(user => 
                            <CollectionListItem
                                key={user.id}
                                id={user.id}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                avatarColour={user.avatarColour}
                                numberOfBooksRead={user.numberOfBooksRead}
                            />
                        )}
                    </ul>
                </div> 
            </section>
        </main>
        </>
    );
}

export default CollectionsPage;