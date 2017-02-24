import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { memoize, sortBy, last } from 'lodash';
import styles from './messages.css';
import Message from '../message/message';

class MessagesComponent extends Component {
  constructor(props) {
    super(props);

    this.messagesContainer = null;
    this.isScrollLocked = false;

    this.bindMessagesContainer = this.bindMessagesContainer.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate() {
    const { scrollHeight, clientHeight } = this.messagesContainer;
    const { messages, myUid } = this.props;

    let isMyMessageLast = false;

    if (this.props.messages.length > 0) {
      isMyMessageLast = last(messages).userId === myUid;
    }

    if (!this.isScrollLocked || isMyMessageLast) {
      this.messagesContainer.scrollTop = scrollHeight - clientHeight;
    }
  }

  bindMessagesContainer(elem) {
    this.messagesContainer = elem;
  }

  handleScroll() {
    const { scrollHeight, clientHeight, scrollTop } = this.messagesContainer;

    if ((clientHeight + scrollTop) < (scrollHeight - clientHeight)) {
      this.isScrollLocked = true;
    } else {
      this.isScrollLocked = false;
    }
  }

  render() {
    const { messages, myUid } = this.props;

    return (
      <div className={styles.messages}>
        <div
          onScroll={this.handleScroll}
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
        {false &&
          <div className={styles.scroll_down}>
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        }
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
