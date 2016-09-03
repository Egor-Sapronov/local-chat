import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSelector } from '../../../reducers/userReducer';
import styles from './navbar.css';

export const Navbar = ({ photoUrl }) => (
  <div className={styles.navbar}>
    <div className={styles.side_item}>
      R
    </div>
    <div>
      Chat
    </div>
    <div className={styles.side_item}>
      <img className={styles.avatar} src={photoUrl} role="presentation" />
    </div>
  </div>
);

Navbar.propTypes = {
  photoUrl: PropTypes.string.isRequired,
};

const selector = createSelector(
  state => state.user,
  userSelector
);

export default connect(selector)(Navbar);
