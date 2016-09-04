import { AUTH_SUCCESS, AUTH_FAIL } from '../actions/authActions';

const initialState = {
  isLoading: true,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
