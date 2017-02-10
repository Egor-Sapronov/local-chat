import React, { PropTypes } from 'react';
import styles from './username.css';

const Username = ({ isVisible, distance, name }) => (
  isVisible &&
    <div className={styles.name_field}>
      {name}
      <span>{distance}km</span>
    </div>
);

Username.propTypes = {
  isVisible: PropTypes.bool,
  distance: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Username;
