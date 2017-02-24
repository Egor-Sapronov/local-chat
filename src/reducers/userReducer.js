import { AUTH_SUCCESS } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAnonymous: action.user.isAnonymous,
        name: action.user.displayName,
        email: action.user.email,
        photoUrl: action.user.photoUrl,
        uid: action.user.uid,
        facebookUid: action.user.facebookUid,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export const userSelector = state => state;
