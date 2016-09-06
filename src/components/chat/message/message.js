import React, { PropTypes, PureComponent } from 'react';
import styles from './message.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Message extends PureComponent {
  render() {
    const { message, avatarUrl, isReverse, date, name, uid } = this.props;

    return (
      <div className={!isReverse ? styles.message : styles.message_reverse}>
        <div className={styles.avatar_field}>
          <a target="_blank" href={`https://facebook.com/${uid}`} rel="noopener noreferrer">
            <img src={avatarUrl} className={styles.avatar} role="presentation" />
          </a>
          <div className={styles.date_field}>{date}</div>
        </div>
        <div className={styles.message_field}>
          { !isReverse && <div className={styles.name_field}>{name}</div>}
          <div>{message}</div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
  uid: PropTypes.string.isRequired,
};
