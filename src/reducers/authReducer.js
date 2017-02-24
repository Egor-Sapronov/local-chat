import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import { handleIncognitoLogin, handleFacebookLogin } from '../tools/firebaseHelpers';
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_NICKNAME,
  SIGN_IN_FACEBOOK,
  SIGN_IN_INCOGNITO,
  signInDone,
} from '../actions/authActions';

const initialState = {
  isLoading: true,
  nickname: '',
};

function facebookSigninEffect() {
  const provider = new firebase.auth.FacebookAuthProvider();

  provider.addScope('public_profile');

  return firebase.auth()
    .signInWithPopup(provider)
    .then(() => firebase.auth().currentUser)
    .then(handleFacebookLogin)
    .then(signInDone);
}

function incognitoSigninEffect(nickname) {
  return firebase
    .auth()
    .signInAnonymously()
    .then((user) => handleIncognitoLogin(user, nickname))
    .then(signInDone);
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_FACEBOOK:
      return loop(
        state,
        Effects.promise(
          facebookSigninEffect,
        )
      );
    case SIGN_IN_INCOGNITO:
      return loop(
        state,
        Effects.promise(
          incognitoSigninEffect,
          state.nickname
        )
      );
    case AUTH_SUCCESS:
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };
    default:
      return state;
  }
}
