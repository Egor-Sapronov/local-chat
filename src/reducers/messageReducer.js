import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import {
  SEND_MESSAGE,
  NEW_MESSAGE,
  CLEAR_IMAGE,
  MESSAGE_SENT,
  messageSent,
} from '../actions/messageActions';
import { FILE_UPLOAD_COMPLETE } from '../actions/firebase';

function pushMessageEffect(messageToSend, coords, imageUrl) {
  return firebase
    .database()
    .ref('messages')
    .push({
      message: messageToSend,
      userId: firebase.auth().currentUser.uid,
      createdAt: Date.now(),
      coords,
      imageUrl,
    })
    .then(messageSent);
}

const initialState = {
  messages: [],
  imageUrl: null,
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SENT:
    case CLEAR_IMAGE:
      return {
        ...state,
        imageUrl: null,
      };
    case FILE_UPLOAD_COMPLETE:
      return {
        ...state,
        imageUrl: action.file.downloadURL,
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case SEND_MESSAGE:
      return loop(
        state,
        Effects.promise(
          pushMessageEffect,
          action.message,
          action.coords,
          state.imageUrl,
        )
      );
    default:
      return state;
  }
}

export const messageSelector = state => state;
