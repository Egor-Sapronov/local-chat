import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Editor, EditorState } from 'draft-js';
import { sendMessage } from '../../../actions/messageActions';
import { fileUpload } from '../../../actions/firebase';
import WelcomeMessage from './welcome-message/welcomeMessage';
import Send from './send/send';
import Image from './image/image';
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
    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect(event) {
    const file = event.target.files[0];

    this.props.handleFileSelect(file, this.props.userId);
  }

  render() {
    return (
      <div>
        <WelcomeMessage />
        <div className={styles.footer}>
          <Image
            handleSelect={this.handleSelect}
          />
          <div className={styles.input_field}>
            <div className={styles.editor}>
              <Editor
                onChange={this.onChange}
                editorState={this.state.editorState}
              />
            </div>
          </div>
          <Send onSend={this.onSend} />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

const selector = createSelector(
  state => state.geo,
  state => state.user,
  (geo, user) => ({
    coords: {
      latitude: geo.location.coords.latitude,
      longitude: geo.location.coords.longitude,
    },
    userId: user.uid,
  })
);

export default connect(selector, {
  handleSendMessage: sendMessage,
  handleFileSelect: fileUpload,
})(Footer);
