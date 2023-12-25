import classes from './Buttons.module.css';

import { Link } from 'react-router-dom';

const CtaPrimary = props => {
    return (
        <Link to={props.dest} className={[classes.cta, classes.primary, props.className ? `${props.className}` : ''].join(' ')} onClick={ props.onClick} >
            {props.label}
        </Link>
    );
}

const CtaSecondary = props => {
    return (
        <Link to={props.dest} className={[classes.cta, classes.secondary, props.className ? `${props.className}` : ''].join(' ')} onClick={ props.onClick} >
           {props.label}
        </Link>
    );
}

const CtaHomepageButton = props => {
    return (
        <Link to={props.dest} className={[classes.cta, classes.homepageButton, props.className ? `${props.className}` : ''].join(' ')} >
            {props.label}
        </Link>
    );
}

const SubmitButton = props => {
    return (
        <input value={props.label} className={[classes.cta, classes.primary, props.className ? `${props.className}` : ''].join(' ')} type='submit' />
    );
}

export { CtaPrimary };
export { CtaSecondary };
export { CtaHomepageButton };
export { SubmitButton };