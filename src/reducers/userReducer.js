import { AUTH_SUCCESS } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        name: action.user.displayName,
        email: action.user.email,
        photoUrl: action.user.photoURL,
        uid: action.user.uid,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export const userSelector = state => state;
