export const LOG_IN = 'LOG_IN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const TRY_AUTH = 'TRY_AUTH';

export function tryAuth() {
  return {
    type: TRY_AUTH,
  };
}

export function logIn() {
  return {
    type: LOG_IN,
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
