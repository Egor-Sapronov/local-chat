import React, { PropTypes, PureComponent } from 'react';
import Avatar from './avatar/avatar';
import TextMessage from './textMessage/textMessage';
import styles from './message.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Message extends PureComponent {
  render() {
    const { message, avatarUrl, isReverse, date, name, uid, distance, isAnonymous, imageUrl } = this.props;
    const wrapperStyle = !isReverse ? styles.message : styles.message_reverse;

    return (
      <div className={wrapperStyle}>
        <Avatar
          isAnonymous={isAnonymous}
          uid={uid}
          avatarUrl={avatarUrl}
          date={date}
        />
        <TextMessage
          isReverse={isReverse}
          distance={distance}
          name={name}
          message={message}
          imageUrl={imageUrl}
        />
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
  imageUrl: PropTypes.string,
};
