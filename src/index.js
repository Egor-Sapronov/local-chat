import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'normalize.css';
import { receiveMessage } from './actions/messageActions';
import { setLocation, bannedLocation } from './actions/geoActions';
import Router from './Router';
import './index.css';
import createStore from './store/store';
import { authSuccess, authFail } from './actions/authActions';
import { calcCrow } from './tools/range';

firebase.initializeApp({
  apiKey: 'AIzaSyBF3xxye-JVFK2EQ3DAxRDDaIjTbPOWTy0',
  authDomain: 'recomea.firebaseapp.com',
  databaseURL: 'https://recomea.firebaseio.com',
  storageBucket: 'recomea.appspot.com',
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

function pushMessageToStore(message) {
  const state = store.getState();
  const messageEnitity = message.val();

  if (!state.geo.location) {
    return null;
  }

  const distance = calcCrow(
    state.geo.location.coords.latitude,
    state.geo.location.coords.longitude,
    messageEnitity.coords.latitude,
    messageEnitity.coords.longitude,
  ).toFixed(1);

  // if (distance > 5) {
  //   return null;
  // }

  return store.dispatch(receiveMessage({
    ...messageEnitity,
    distance,
    key: message.key,
  }));
}

function listenAuth() {
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
        .on('child_added', pushMessageToStore);
    } else {
      store.dispatch(authFail());
    }
  });
}

function geoSuccess(position) {
  if (position) {
    store.dispatch(setLocation(position));

    listenAuth();
  } else {
    store.dispatch(bannedLocation());
  }
}

function geoError() {
  store.dispatch(bannedLocation());
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  navigator.geolocation.watchPosition(position => {
    store.dispatch(setLocation(position));
  });
} else {
  store.dispatch(bannedLocation());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root'));
