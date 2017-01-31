import React, { PropTypes } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createSelector } from 'reselect';
import { setNickname } from '../../actions/authActions';
import styles from './login.css';

function signInFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();

  provider.addScope('public_profile');

  return firebase.auth()
    .signInWithPopup(provider);
}

function signInIncognito() {
  return firebase.auth().signInAnonymously();
}

const Login = ({ isLoginVisible, isLoaderVisible, isLocation, nickname, handleNickChange, isCouldLogin }) => (
  <div className={styles.login}>
    <div className={styles.header}>
      <h4>RECOMEA</h4>
      <p>Local-based chat that helps you feel at home within your local community.</p>
    </div>
    <div className={styles.main}>
      {isLoginVisible &&
        <div className={styles.login_buttons_group}>
          <input
            onChange={handleNickChange}
            value={nickname}
            className={styles.nickName_input}
            placeholder="Nickname"
          />
          <button
            disabled={!isCouldLogin}
            onClick={signInIncognito}
            className={styles.login_button}
          >
            Join
          </button>
          <div>
            <hr className={styles.login_underline} />
          </div>
          <div className={styles.fb_login} onClick={signInFacebook}>
            <img src={require('./assets/FB-f-Logo__blue_72.png')} />
            Login with Facebook
          </div>
        </div>
      }

      <div className={styles.loader_field}>
        {isLoaderVisible && <i className="material-icons">loop</i>}
      </div>
    </div>
    <div className={styles.footer}>
      {!isLocation &&
        <div className={styles.geo_info}>
          <i className="material-icons">my_location</i>
          <h4>Enable geolocation</h4>
        </div>
      }
    </div>
  </div>
);

Login.propTypes = {
  isLoaderVisible: PropTypes.bool.isRequired,
  isBannedLocation: PropTypes.bool.isRequired,
  isLoginVisible: PropTypes.bool.isRequired,
  isLocation: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  handleNickChange: PropTypes.func.isRequired,
  isCouldLogin: PropTypes.bool.isRequired,
};

const selector = createSelector(
  state => state.auth,
  state => state.geo,
  (auth, geo) => ({
    isLoading: auth.isLoading || geo.isLoading,
    isLoginVisible: !(auth.isLoading || geo.isLoading) && !geo.isBanned,
    isBannedLocation: geo.isBanned,
    isLoaderVisible: !geo.isBanned && (auth.isLoading || geo.isLoading),
    isLocation: !!geo.location,
    nickname: auth.nickname,
    isCouldLogin: auth.nickname.length > 2,
  })
);

export default connect(
  selector,
  {
    handleNickChange: ({ target: { value } }) => setNickname(value),
  }
)(Login);
