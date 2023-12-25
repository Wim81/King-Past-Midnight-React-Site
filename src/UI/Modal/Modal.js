import classes from './Modal.module.css';

const Modal = (props) => {
    return(
        <>
            <div className={classes.backdrop}></div>
            <div className={classes.modalContainer}>
                <div className={classes.modal}>
                    <h3 className={classes.title}>{props.title}</h3>
                    <div>{props.content}</div>
                </div>
            </div>                        
        </>        
    );
}

export default Modal;