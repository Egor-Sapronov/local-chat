import React, { PropTypes, PureComponent } from 'react';
import styles from './message.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Message extends PureComponent {
  render() {
    const { message, avatarUrl, isReverse, date, name, uid, distance, isAnonymous, messageId } = this.props;

    return (
      <div className={!isReverse ? styles.message : styles.message_reverse}>
        <div className={styles.avatar_field}>
          {!isAnonymous && <a target="_blank" href={`https://facebook.com/${uid}`} rel="noopener noreferrer">
            <img src={avatarUrl} className={styles.avatar} role="presentation" />
          </a>}

          {isAnonymous && <img src={avatarUrl} className={styles.avatar} role="presentation" />}
          <div className={styles.date_field}>{date}</div>
        </div>
        <div className={styles.message_field}>
          { !isReverse &&
            <div className={styles.name_field}>
              {name}
              <span>{distance}km</span>
            </div>
          }
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
  uid: PropTypes.string,
  distance: PropTypes.string.isRequired,
  isAnonymous: PropTypes.bool,
};
