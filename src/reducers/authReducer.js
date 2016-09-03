import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import { LOG_IN, authSuccess, authFail } from '../actions/authActions';

const initialState = {
  credential: null,
};

function signInEffect() {
  const provider = new firebase.auth.FacebookAuthProvider();

  provider.addScope('user_birthday');

  return firebase.auth()
    .signInWithPopup(provider)
    .then(({ user }) => firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      })
      .then(() => user)
    )
    .then(authSuccess)
    .catch(authFail);
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
