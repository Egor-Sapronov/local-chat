import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import { LOG_IN, tryAuth } from '../actions/authActions';

const initialState = {};

function signInEffect() {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase.auth()
    .signInWithPopup(provider)
    .then(tryAuth);
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return loop(
        state,
        Effects.promise(signInEffect)
      );
    default:
      return state;
  }
}
