import classes from './BookListItem.module.css';

import { Link } from 'react-router-dom';

const BookListItem = props => {
    return (
        <li className={classes.bookItem} key={props.id}>
            <div className={classes.bookItemInner}>
                <div className={classes.bookInfo1}>
                    <Link to={`/book/${props.id}`}>
                        <img referrerPolicy='no-referrer' className={classes.img} src={props.img_url} alt={props.title} />
                    </Link>                    
                    <div>
                        <h5 className={classes.title}>{props.title}</h5>
                        <p className={classes.year}>{props.year}</p>
                        <p className={classes.pages}>{props.pages} pages</p>
                    </div>
                    
                </div>
                <div className={classes.bookInfo2}>
                    <h5 className={classes.title}>{props.title}</h5>
                    <p className={classes.year}>{props.year}  |  </p>
                    <p className={classes.pages}>{props.pages} pages</p>
                    <p className={classes.summaryWrapper}>
                        <span className={classes.summary}>{props.summary} </span>
                        <Link className={classes.summaryLink} to={`/book/${props.id}`}>read more</Link>
                    </p>
                </div>
            </div>            
        </li>
    )
      
}

export default BookListItem;