import classes from './BookOfTheMonth.module.css';

import { CtaSecondary } from '../../UI/Buttons';

const BookOfTheMonth = (props) => {    

    return(
        <section className={classes.bookHighlight}>
            <h3 className={classes.bookHighlightTitle}>Book Of The Month</h3>
            <div className={classes.bookHighlightContent}>
                <img referrerPolicy='no-referrer' className={classes.bookHighlightImg} src={props.img_url} alt='cover Fairy Tale' />
                <div>
                    <h4 className={classes.title}>{props.title}</h4>
                    <p className={classes.summary}>{props.summary}</p>
                    <CtaSecondary label='more about this book' dest={`/book/${props.id}`} className={classes.button}/>
                </div>                  
            </div>
        </section>
    );
}

export default BookOfTheMonth;