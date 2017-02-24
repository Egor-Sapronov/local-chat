import React, { PropTypes } from 'react';
import styles from './fileToUpload.css';

const FileToUpload = ({ url, handleCrossClick }) => (
  url ?
    <div className={styles.wrapper}>
      <i onClick={handleCrossClick} className="material-icons">clear</i>
      <img role="presentation" src={url} />
    </div>
    : null
);

FileToUpload.propTypes = {
  url: PropTypes.string,
  handleCrossClick: PropTypes.func.isRequired,
};

export default FileToUpload;
