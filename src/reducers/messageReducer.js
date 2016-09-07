import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import {
  SEND_MESSAGE,
  NEW_MESSAGE,
  HISTORY_SNAP,
  messageSent,
} from '../actions/messageActions';

function pushMessageEffect(messageToSend, coords) {
  return firebase
    .database()
    .ref('messages')
    .push({
      message: messageToSend,
      userId: firebase.auth().currentUser.uid,
      createdAt: Date.now(),
      coords,
    })
    .then(messageSent);
}

const initialState = {
  messages: [],
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case HISTORY_SNAP:
      return {
        ...state,
        messages: [...action.snap],
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case SEND_MESSAGE:
      return loop(
        state,
        Effects.promise(pushMessageEffect, action.message, action.coords)
      );
    default:
      return state;
  }
}

export const messageSelector = state => state;
