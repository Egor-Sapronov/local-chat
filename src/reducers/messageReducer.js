import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import {
  SEND_MESSAGE,
  NEW_MESSAGE,
  RECEIVE_MESSAGE,
  messageSent,
  newMessage,
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

function mapUserToMessage(currentMessage) {
  return firebase
    .database()
    .ref(`users/${currentMessage.userId}`)
    .once('value')
    .then(snapshot => {
      const userSnap = snapshot.val();

      return {
        ...currentMessage,
        user: {
          name: userSnap.name,
          email: userSnap.email,
          photoUrl: userSnap.photoUrl,
          uid: userSnap.uid,
          facebookUid: userSnap.facebookUid,
        },
      };
    })
    .then(newMessage);
}

const initialState = {
  messages: [],
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return loop(
        state,
        Effects.promise(mapUserToMessage, action.message)
      );
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case SEND_MESSAGE:
      return loop(
        {
          ...state,
        },
        Effects.promise(pushMessageEffect, action.message, action.coords)
      );
    default:
      return state;
  }
}

export const messageSelector = state => state;
