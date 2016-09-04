export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

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
