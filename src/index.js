import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { receiveMessage } from './actions/messageActions';
import { setLocation } from './actions/geoActions';
import Router from './Router';
import './index.css';
import createStore from './store/store';

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

firebase
  .database()
  .ref('messages')
  .limitToFirst(100)
  .on('child_added', pushMessageToStore);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root'));
