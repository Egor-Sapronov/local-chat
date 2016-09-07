import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { memoize, sortBy } from 'lodash';
import styles from './messages.css';
import Message from '../message/message';

class MessagesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrollLocked: false,
    };

    this.messagesContainer = null;

    this.bindMessagesContainer = this.bindMessagesContainer.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate() {
    const { scrollHeight, clientHeight } = this.messagesContainer;
    const { messages, myUid } = this.props;

    let isMyMessageLast = false;

    if (this.props.messages.length > 0) {
      isMyMessageLast = messages[messages.length - 1].userId === myUid;
    }

    if (!this.state.isScrollLocked || isMyMessageLast) {
      this.messagesContainer.scrollTop = scrollHeight - clientHeight;
    }
  }

  bindMessagesContainer(elem) {
    this.messagesContainer = elem;
  }

  handleScroll() {
    const { scrollHeight, clientHeight, offsetTop } = this.messagesContainer;
    const { isScrollLocked } = this.state;

    if (((scrollHeight - offsetTop) >= clientHeight) && isScrollLocked) {
      this.setState({
        isScrollLocked: true,
      });
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
              date={message.date}
              message={message.message}
              name={message.user.name}
              avatarUrl={message.user.photoUrl}
              isReverse={message.userId === myUid}
              uid={message.user.facebookUid}
              distance={message.distance}
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
