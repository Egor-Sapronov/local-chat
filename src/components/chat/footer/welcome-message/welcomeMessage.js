import React, { PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { find } from 'lodash';
import styles from './welcomeMessage.css';

export const Welcome = ({ noMessages }) => {
  if (noMessages) {
    return (
      <div className={styles.welcome_message}>
        Write a message, it will be send for all peoples around you in 5km
      </div>
    );
  }

  return null;
};

Welcome.propTypes = {
  noMessages: PropTypes.bool.isRequired,
};

function findUserMessages(messages, user) {
  return find(messages, messageEntity => messageEntity.userId === user.uid);
}

const selector = createSelector(
  state => state.user,
  state => state.message,
  (user, message) => ({
    noMessages: !findUserMessages(message.messages, user),
  })
);

export default connect(selector)(Welcome);
