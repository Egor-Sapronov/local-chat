import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Editor, EditorState } from 'draft-js';
import { sendMessage } from '../../../actions/messageActions';
import WelcomeMessage from '../welcome-message/welcomeMessage';
import styles from './footer.css';

export class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.buttonElem = null;
    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onSend() {
    if (!this.state.editorState.getCurrentContent().hasText()) {
      return null;
    }

    const message = this.state.editorState.getCurrentContent().getPlainText();

    this.props.handleSendMessage(message, this.props.coords);

    return this.setState({
      editorState: EditorState.createEmpty(),
    });
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.onSend();
    }
  }

  render() {
    return (
      <div>
        <WelcomeMessage />
        <div className={styles.footer}>
          <div className={styles.input_field}>
            <div className={styles.editor}>
              <Editor
                onChange={this.onChange}
                editorState={this.state.editorState}
              />
            </div>
          </div>
          <div className={styles.send_field}>
            <div
              onClick={this.onSend}
              className={styles.send_button}
            >
              <i className="material-icons">send</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

const selector = createSelector(
  state => state.geo,
  geo => ({
    coords: {
      latitude: geo.location.coords.latitude,
      longitude: geo.location.coords.longitude,
    },
  })
);

export default connect(selector, {
  handleSendMessage: sendMessage,
})(Footer);
