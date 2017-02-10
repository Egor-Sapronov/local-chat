import React, { PropTypes } from 'react';
import styles from './textMessage.css';
import Username from '../username/username';

const TextMessage = ({ distance, isReverse, message, name }) => (
  <div className={isReverse ? styles.message_field_reverse : styles.message_field}>
    <Username
      isVisible={!isReverse}
      distance={distance}
      name={name}
    />
    <div>{message}</div>
  </div>
);

TextMessage.propTypes = {
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
  distance: PropTypes.string.isRequired,
};

export default TextMessage;
