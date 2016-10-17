import { AUTH_SUCCESS, AUTH_FAIL, SET_NICKNAME } from '../actions/authActions';

const initialState = {
  isLoading: true,
  nickname: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
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
