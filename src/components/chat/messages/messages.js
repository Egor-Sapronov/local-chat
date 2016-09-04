import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';
import styles from './messages.css';
import Message from '../message/message';

function scrollBottom(element) {
  // eslint-disable-next-line no-param-reassign
  element.scrollTop = element.clientHeight - element.offsetTop;
}

export const MessagesComponent = ({ messages, myUid }) => (
  <div className={styles.messages}>
    <div ref={scrollBottom} className={styles.scroll}>
      {messages.map(message => (
        <Message
          key={message.key}
          date={message.date}
          message={message.message}
          name={message.user.name}
          avatarUrl={message.user.photoUrl}
          isReverse={message.userId === myUid}
        />
      ))}
    </div>
  </div>
);

MessagesComponent.propTypes = {
  messages: PropTypes.array.isRequired,
  myUid: PropTypes.string.isRequired,
};

const prettyTime = memoize(timestampe => new Date(timestampe).toTimeString().slice(0, 5));

const selector = createSelector(
  state => state.message,
  state => state.user,
  (messages, user) => ({
    messages: messages.messages.map(item => ({
      ...item,
      date: `${prettyTime(item.createdAt)}`,
    })).sort((itemOne, itemTwo) => itemOne.createdAt > itemTwo.createdAt),
    myUid: user.uid,
  })
);

export default connect(selector)(MessagesComponent);
