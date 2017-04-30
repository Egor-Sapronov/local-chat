import React, { PropTypes } from 'react';
import styles from './add.css';

const Add = ({ avatarUrl, handleSelect }) => (
  <label className={styles.add_new} htmlFor="storyUploadInput">
    <img src={avatarUrl} role="presentation" />
    <i className="material-icons">add_circle_outline</i>
    <input
      id="storyUploadInput"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleSelect}
    />
  </label>

);

Add.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Add;
