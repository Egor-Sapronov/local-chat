import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import styles from './loginNickName.css';
import { setNickname } from '../../actions/authActions';

function signInIncognito() {
  return firebase.auth().signInAnonymously();
}

export const component = ({ nickname, handleNickChange }) => (
  <div className={styles.login}>
    <div className={styles.login_item}>
      <input
        onChange={handleNickChange}
        value={nickname}
        className={styles.nickName_input}
        placeholder="Nickname"
      />
      {nickname && <button
        onClick={signInIncognito}
        className={styles.login_button}
      >
        Sign in
      </button>}
    </div>
  </div>
);

export default connect((state) => ({
  nickname: state.auth.nickname,
}), {
  handleNickChange: ({ target: { value } }) => setNickname(value),
})(component);
