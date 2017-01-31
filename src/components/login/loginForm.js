import React, { PropTypes } from 'react';
import styles from './login.css';

const LoginForm = (
  {
    nickname,
    handleNickChange,
    isCouldLogin,
    handleSignInIncognito,
    handleSignInFacebook,
  }) => (
  <div className={styles.login_buttons_group}>
    <input
      onChange={handleNickChange}
      value={nickname}
      className={styles.nickName_input}
      placeholder="Nickname"
    />
    <button
      disabled={!isCouldLogin}
      onClick={handleSignInIncognito}
      className={styles.login_button}
    >
      Join
    </button>
    <div>
      <hr className={styles.login_underline} />
    </div>
    <div
      className={styles.fb_login}
      onClick={handleSignInFacebook}
    >
      <img src={require('./assets/FB-f-Logo__blue_72.png')} />
      Login with Facebook
    </div>
  </div>
);

LoginForm.propTypes = {
  nickname: PropTypes.string.isRequired,
  handleNickChange: PropTypes.func.isRequired,
  isCouldLogin: PropTypes.bool.isRequired,
  handleSignInIncognito: PropTypes.func.isRequired,
  handleSignInFacebook: PropTypes.func.isRequired,
};

export default LoginForm;
