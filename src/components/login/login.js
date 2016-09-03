import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './login.css';
import { logIn } from '../../actions/authActions';

const Login = ({ onLoginClick }) => (
  <div className={styles.login}>
    <div className={styles.header}>
      <h4>RECOMEA</h4>
    </div>
    <div className={styles.login_item}>
      <button onClick={onLoginClick}>
        SIGN IN
      </button>
    </div>
    <div className={styles.login_item}>
      <p>Footer</p>
    </div>
  </div>
);

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default connect(() => ({}), { onLoginClick: logIn })(Login);
