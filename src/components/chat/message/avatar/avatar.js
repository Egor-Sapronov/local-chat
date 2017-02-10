import React, { PropTypes } from 'react';
import styles from './avatar.css';

const Avatar = ({ isAnonymous, avatarUrl, uid, date }) => (
  <div className={styles.avatar_field}>
    {!isAnonymous && <a target="_blank" href={`https://facebook.com/${uid}`} rel="noopener noreferrer">
      <img src={avatarUrl} className={styles.avatar} role="presentation" />
    </a>}

    {isAnonymous && <img src={avatarUrl} className={styles.avatar} role="presentation" />}
    <div className={styles.date_field}>{date}</div>
  </div>
);

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  uid: PropTypes.string,
  isAnonymous: PropTypes.bool,
  date: PropTypes.string.isRequired,
};

export default Avatar;
