import React, { PropTypes } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styles from './login.css';

function signInFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();

  provider.addScope('public_profile');

  return firebase.auth()
    .signInWithPopup(provider);
}

const Login = ({ isLoginVisible, isLoaderVisible }) => (
  <div className={styles.login}>
    <div className={styles.header}>
      <h4>RECOMEA</h4>
      <p>Local chat</p>
    </div>
    <div className={styles.login_item}>
      {isLoginVisible && <button onClick={signInFacebook}>
        <div className={styles.fb_logo} />
        <div className={styles.logo_text}>Log In</div>
      </button>}

      <div className={styles.loader_field}>
        {isLoaderVisible && <i className="material-icons">loop</i>}
      </div>
    </div>
    <div className={styles.login_item}>
      <div className={styles.geo_info}>
        <i className="material-icons">my_location</i>
        <h4>Enable geolocation</h4>
      </div>
    </div>
  </div>
);

Login.propTypes = {
  isLoaderVisible: PropTypes.bool.isRequired,
  isBannedLocation: PropTypes.bool.isRequired,
  isLoginVisible: PropTypes.bool.isRequired,
};

const selector = createSelector(
  state => state.auth,
  state => state.geo,
  (auth, geo) => ({
    isLoading: auth.isLoading || geo.isLoading,
    isLoginVisible: !(auth.isLoading || geo.isLoading) && !geo.isBanned,
    isBannedLocation: geo.isBanned,
    isLoaderVisible: !geo.isBanned && (auth.isLoading || geo.isLoading),
  })
);

export default connect(selector)(Login);
