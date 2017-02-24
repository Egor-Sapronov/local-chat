import React, { PropTypes } from 'react';
import styles from './imageContent.css';

const ImageContent = ({ imageUrl }) => (
  imageUrl ?
    <div className={styles.wrapper}>
      <img role="presentation" src={imageUrl} />
    </div>
  : null
);

ImageContent.propTypes = {
  imageUrl: PropTypes.string,
};

export default ImageContent;
