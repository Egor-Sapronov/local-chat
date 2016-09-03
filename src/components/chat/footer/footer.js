import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { changeMessage, sendMessage } from '../../../actions/messageActions';
import styles from './footer.css';

export const Footer = ({ handleMessageChange, handleSendMessage, message, coords }) => (
  <div className={styles.footer}>
    <div className={styles.input_field}>
      <input
        value={message}
        onChange={handleMessageChange}
        placeholder="Message"
      />
    </div>
    <div className={styles.send_field}>
      <div
        onClick={() => handleSendMessage(coords)}
        className={styles.send_button}
      >
        <i className="material-icons">send</i>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

const selector = createSelector(
  state => state.message,
  state => state.geo,
  (message, geo) => ({
    message: message.message,
    coords: {
      latitude: geo.location.coords.latitude,
      longitude: geo.location.coords.longitude,
    },
  })
);

export default connect(selector, {
  handleMessageChange: event => changeMessage(event.target.value),
  handleSendMessage: sendMessage,
})(Footer);
