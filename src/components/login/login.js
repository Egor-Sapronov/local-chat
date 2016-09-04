import React, { PropTypes } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styles from './login.css';

function signInFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase.auth()
    .signInWithPopup(provider);
}

const Login = ({ isLoading }) => (
  <div className={styles.login}>
    <div className={styles.header}>
      <h4>RECOMEA</h4>
    </div>
    <div className={styles.login_item}>
      {!isLoading && <button onClick={signInFacebook}>
        <div className={styles.fb_logo} />
        <div className={styles.logo_text}>Log In</div>
      </button>}

      {isLoading && <i className="material-icons">loop</i>}
    </div>
    <div className={styles.login_item}>
      <p>Local chat</p>
    </div>
  </div>
);

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const selector = createSelector(
  state => state.auth,
  auth => ({
    isLoading: auth.isLoading,
  })
);

export default connect(selector)(Login);
