import classes from './Footer.module.css';

function Footer() {
    return (
        <footer>
            <div className={[classes.footerInner].join(' ')}>
                <div className={[classes.footerText, classes.footerTextLeft].join(' ')}>
                    <p>King Past Midnight</p>
                    <p>Carrie Street 123</p>
                    <p>4567 DERRY</p>
                </div>
                <div className={[classes.footerText, classes.footerTextRight].join(' ')}>
                    <p>+32 456 78 90</p>
                    <p><a href="mailto:info@kingpastmidnight.com" className={classes.footerLink}>info@kingpastmidnight.com</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;