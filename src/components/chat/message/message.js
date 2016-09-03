import React, { PropTypes } from 'react';
import styles from './message.css';

const Message = ({ message, avatarUrl, isReverse, date, name }) => (
  <div className={!isReverse ? styles.message : styles.message_reverse}>
    <div className={styles.avatar_field}>
      <img src={avatarUrl} className={styles.avatar} role="presentation" />
      <div className={styles.date_field}>{date}</div>
    </div>
    <div className={styles.message_field}>
      { !isReverse && <div className={styles.name_field}>{name}</div>}
      <div>{message}</div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
};

export default Message;
