import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSelector } from '../../../reducers/userReducer';
import Add from './add';
import styles from './stories.css';

class Stories extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Add
          avatarUrl={this.props.photoUrl}
        />
      </div>
    );
  }
}

Stories.propTypes = {
  photoUrl: PropTypes.string.isRequired,
};

const selector = createSelector(
  state => state.user,
  userSelector
);

export default connect(selector)(Stories);
