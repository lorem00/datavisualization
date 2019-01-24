import React from 'react';
import FacebookIcon from '../../assets/images/facebook.svg';
import TwitterIcon from '../../assets/images/twitter.svg';
import Logo from '../../assets/images/Logo-Full-Black.svg';

export default () => (
    <footer id="footer">
        <div className="footer-content">
            <p className="footer-text">
            </p>
            <div className="footer-social">
                <img src={FacebookIcon} alt="Facebook" className="footer-facebook" />
                <img src={TwitterIcon} alt="Twitter" className="footer-twitter" />
            </div>
        </div>
    </footer>
);
