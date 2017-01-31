import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
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
    .then(signInDone);
}

function incognitoSigninEffect() {
  return firebase
    .auth()
    .signInAnonymously()
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
