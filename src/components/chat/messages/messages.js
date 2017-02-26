import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { memoize, sortBy } from 'lodash';
import styles from './messages.css';
import Message from '../message/message';

class MessagesComponent extends Component {
  constructor(props) {
    super(props);

    this.messagesContainer = null;

    this.bindMessagesContainer = this.bindMessagesContainer.bind(this);
  }

  componentDidUpdate() {
    const { scrollHeight, clientHeight } = this.messagesContainer;

    this.messagesContainer.scrollTop = scrollHeight - clientHeight;
  }

  bindMessagesContainer(elem) {
    this.messagesContainer = elem;
  }

  render() {
    const { messages, myUid } = this.props;

    return (
      <div className={styles.messages}>
        <div
          ref={this.bindMessagesContainer}
          className={styles.scroll}
        >
          {messages.map(message => (
            <Message
              key={message.key}
              messageId={message.key}
              date={message.date}
              message={message.message}
              name={message.user.name}
              avatarUrl={message.user.photoUrl}
              isReverse={message.userId === myUid}
              uid={message.user.facebookUid}
              distance={message.distance}
              isAnonymous={message.user.isAnonymous}
              imageUrl={message.imageUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}

MessagesComponent.propTypes = {
  messages: PropTypes.array.isRequired,
  myUid: PropTypes.string.isRequired,
};

const prettyTime = memoize(timestampe => new Date(timestampe).toTimeString().slice(0, 5));

const selector = createSelector(
  state => state.message,
  state => state.user,
  (messages, user) => ({
    messages: sortBy(messages.messages.map(item => ({
      ...item,
      date: `${prettyTime(item.createdAt)}`,
    })), item => item.createdAt),
    myUid: user.uid,
  })
);

export default connect(selector)(MessagesComponent);
