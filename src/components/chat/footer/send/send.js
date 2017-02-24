import React, { PropTypes } from 'react';
import styles from './send.css';

const Send = ({ onSend }) => (
  <div className={styles.send_field}>
    <div
      onClick={onSend}
      className={styles.send_button}
    >
      <i className="material-icons">send</i>
    </div>
  </div>
);

Send.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default Send;
