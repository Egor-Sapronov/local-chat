import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'normalize.css';
import { receiveMessage } from './actions/messageActions';
import { setLocation } from './actions/geoActions';
import Router from './Router';
import './index.css';
import createStore from './store/store';
import { authSuccess, authFail } from './actions/authActions';

firebase.initializeApp({
  apiKey: 'AIzaSyBF3xxye-JVFK2EQ3DAxRDDaIjTbPOWTy0',
  authDomain: 'recomea.firebaseapp.com',
  databaseURL: 'https://recomea.firebaseio.com',
  storageBucket: 'recomea.appspot.com',
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

function pushMessageToStore(message) {
  return store.dispatch(receiveMessage({
    ...message.val(),
    key: message.key,
  }));
}

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(position => {
    store.dispatch(setLocation(position));
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
        facebookUid: user.providerData[0].uid,
      })
      .then(() => user)
      .then(() => store.dispatch(authSuccess(user)));

    firebase
      .database()
      .ref('messages')
      .limitToFirst(100)
      .on('child_added', pushMessageToStore);
  } else {
    store.dispatch(authFail());
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root'));
