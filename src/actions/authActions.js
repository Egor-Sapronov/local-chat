export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const SET_NICKNAME = 'SET_NICKNAME';
export const SIGN_IN_DONE = 'SIGN_DONE';
export const SIGN_IN_FACEBOOK = 'SIGN_IN_FACEBOOK';
export const SIGN_IN_INCOGNITO = 'SIGN_IN_INCOGNITO';

export function signInFacebook() {
  return {
    type: SIGN_IN_FACEBOOK,
  };
}

export function signInIncognito() {
  return {
    type: SIGN_IN_INCOGNITO,
  };
}

export function signInDone() {
  return {
    type: SIGN_IN_DONE,
  };
}

export function authSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    user,
  };
}

export function authFail(error) {
  return {
    type: AUTH_FAIL,
    error,
  };
}

export function setNickname(nickname) {
  return {
    type: SET_NICKNAME,
    nickname,
  };
}
