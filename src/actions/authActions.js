export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const SET_NICKNAME = 'SET_NICKNAME';

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
