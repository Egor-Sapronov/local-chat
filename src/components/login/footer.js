import React, { PropTypes } from 'react';
import styles from './login.css';

const Footer = ({ isVisible }) => (
  <div className={styles.footer}>
    {!isVisible &&
      <div className={styles.geo_info}>
        <i className="material-icons">my_location</i>
        <h4>Enable geolocation</h4>
      </div>
      }
  </div>
);

Footer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Footer;
