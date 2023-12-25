import classes from './Avatar.module.css';

import { Link } from 'react-router-dom';

const Avatar = props => {
    return (
        <Link to={props.dest} className={[classes.avatar, props.bg === 'green' ? classes.green : classes.red, props.className ? `${props.className}` : ''].join(' ')} onClick={ props.onClick} >
            {props.label}
        </Link>
    );
}

export default Avatar;