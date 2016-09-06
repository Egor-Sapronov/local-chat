import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSelector } from '../../../reducers/userReducer';
import styles from './navbar.css';

export const Navbar = ({ photoUrl, facebookUid }) => (
  <div className={styles.navbar}>
    <div className={styles.side_item}>
      R
    </div>
    <div>
      Chat
    </div>
    <div className={styles.side_item}>
      <a target="_blank" href={`https://facebook.com/${facebookUid}`} rel="noopener noreferrer">
        <img className={styles.avatar} src={photoUrl} role="presentation" />
      </a>
    </div>
  </div>
);

Navbar.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  facebookUid: PropTypes.string.isRequired,
};

const selector = createSelector(
  state => state.user,
  userSelector
);

export default connect(selector)(Navbar);
