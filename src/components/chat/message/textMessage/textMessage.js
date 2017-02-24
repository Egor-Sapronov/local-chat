import React, { PropTypes } from 'react';
import styles from './textMessage.css';
import Username from '../username/username';
import ImageContent from '../imageContent/imageContent';

const TextMessage = ({ distance, isReverse, message, name, imageUrl }) => (
  <div className={isReverse ? styles.message_field_reverse : styles.message_field}>
    <Username
      isVisible={!isReverse}
      distance={distance}
      name={name}
    />
    <div>{message}</div>
    <ImageContent imageUrl={imageUrl} />
  </div>
);

TextMessage.propTypes = {
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
  distance: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default TextMessage;
