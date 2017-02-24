import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setNickname, signInFacebook, signInIncognito } from '../../actions/authActions';
import Footer from './footer';
import Header from './header';
import LoginForm from './loginForm';
import Loader from './loader';
import styles from './login.css';

const Login = (
  {
    isLoginVisible,
    isLoaderVisible,
    isLocation,
    nickname,
    handleNickChange,
    isCouldLogin,
    handleSignInIncognito,
    handleSignInFacebook,
  }) => (
    <div className={styles.login}>
      <Header />
      <div className={styles.main}>
        {isLoginVisible &&
          <LoginForm
            nickname={nickname}
            handleNickChange={handleNickChange}
            isCouldLogin={isCouldLogin}
            handleSignInIncognito={handleSignInIncognito}
            handleSignInFacebook={handleSignInFacebook}
          />
        }

        {isLoaderVisible &&
          <Loader />
        }
      </div>
      <Footer isVisible={isLocation} />
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
  handleSignInIncognito: PropTypes.func.isRequired,
  handleSignInFacebook: PropTypes.func.isRequired,
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
    handleSignInFacebook: signInFacebook,
    handleSignInIncognito: signInIncognito,
    handleNickChange: ({ target: { value } }) => setNickname(value),
  }
)(Login);
