import React, { PropTypes } from 'react';
import styles from './image.css';

const Image = ({ handleSelect }) => (
  <div
    className={styles.wrapper}
  >
    <label htmlFor="imageUploadInput">
      <i className="material-icons">add_a_photo</i>
      <input
        id="imageUploadInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleSelect}
      />
    </label>
  </div>
);

Image.propTypes = {
  handleSelect: PropTypes.func.isRequired,
};

export default Image;
