import rootClasses from '../../pages/Root';
import classes from './Comment.module.css';

import Avatar from '../../UI/Avatar';

const Comment = props => {

    let destination = '../../collection/' + props.userId;

    return <div className={classes.comment}>
        <Avatar dest={destination} className={classes.commentAvatar} bg={props.bg} label={props.label} />
        <div>
            <div className={classes.datetime}>{props.datetime}</div>
            <div className={classes.commentText}>{props.commentText}</div>
        </div>
    </div>
}

export default Comment;