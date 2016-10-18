import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'normalize.css';
import { find } from 'lodash';
import { newMessage, historySnap } from './actions/messageActions';
import { setLocation, bannedLocation } from './actions/geoActions';
import Router from './Router';
import './index.css';
import createStore from './store/store';
import { authSuccess, authFail } from './actions/authActions';
import { calcCrow } from './tools/range';
import {
  handleFacebookLogin,
  handleIncognitoLogin,
  mapUserToMessage,
  pushMessageToStore,
  lastDayMessages,
} from './tools/firebaseHelpers';

firebase.initializeApp({
  apiKey: 'AIzaSyBF3xxye-JVFK2EQ3DAxRDDaIjTbPOWTy0',
  authDomain: 'recomea.firebaseapp.com',
  databaseURL: 'https://recomea.firebaseio.com',
  storageBucket: 'recomea.appspot.com',
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

function setupUser(user) {
  const { auth: { nickname } } = store.getState();

  if (user.isAnonymous) {
    return handleIncognitoLogin(user, nickname)
      .then(() => store.dispatch(authSuccess({
        ...user,
        photoURL: require('./assets/incognito_profile_photo.png'),
      })));
  }

  return handleFacebookLogin(user)
    .then(() => store.dispatch(authSuccess(user)));
}

function listenAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return setupUser(user)
        .then(() =>
        lastDayMessages()
          .once('value')
          .then(snap => {
            const data = snap.val();
            const state = store.getState();

            if (!data) {
              return [];
            }

            const readyData = Object.keys(data).map(key => {
              const messageEnitity = data[key];

              const distance = calcCrow(
                state.geo.location.coords.latitude,
                state.geo.location.coords.longitude,
                messageEnitity.coords.latitude,
                messageEnitity.coords.longitude,
              ).toFixed(1);

              return {
                ...messageEnitity,
                distance,
                key,
              };
            });

            return Promise.all(readyData.map(mapUserToMessage));
          })
          .then(result => result.filter(message => message.distance < 10))
          .then(result => store.dispatch(historySnap(result)))
          .then(() => {
            lastDayMessages()
              .limitToLast(1)
              .on('child_added', messageValue => {
                const {
                  message: { messages },
                  geo: { location },
                } = store.getState();

                const isElementExist = find(messages, entity => entity.key === messageValue.key);

                if (isElementExist) {
                  return null;
                }

                return pushMessageToStore(messageValue, location)
                  .then(readyMessage => store.dispatch(newMessage(readyMessage)));
              });
          })
        );
    }

    store.dispatch(authFail());
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
