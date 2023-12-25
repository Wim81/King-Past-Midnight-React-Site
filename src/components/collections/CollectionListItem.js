import classes from './CollectionListItem.module.css';

import { Link } from 'react-router-dom';
import Avatar from '../../UI/Avatar';

const CollectionListItem = props => {
    const initials = props.firstname.substring(0,1) + props.lastname.substring(0,1);
    const numberOfBooksRead = props.numberOfBooksRead;
    const userId = props.id;
    const destination = '/collection/'+userId;
    const avatarColour = props.avatarColour;

    return (
        <li className={classes.collectionItem} key={props.id}>
            <div className={classes.collectionItemInner}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar} dest={destination} label={initials} bg={avatarColour} />
                </div>
                <div>
                    <Link to={destination} className={classes.titleLink}>
                        <h3 className={classes.title}>{props.firstname}'s Collection</h3>
                    </Link>
                    <p className={classes.booksRead}>Number of books read: {numberOfBooksRead}</p>
                </div> 
            </div>                       
        </li>      
    )
      
}

export default CollectionListItem;