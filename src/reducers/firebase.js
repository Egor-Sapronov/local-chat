import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import { IMAGE_MESSAGE_UPLOAD, imageMessageUploadComplete } from '../actions/firebase';

const initialState = {
};

function imageMessageUploadSelect(file, userId) {
  const storageRef = firebase.storage().ref();
  const metadata = {
    userId,
  };

  return storageRef
    .child(`images/${file.name}`)
    .put(file, metadata)
    .then(imageMessageUploadComplete);
}

export default function firebaseState(state = initialState, action) {
  switch (action.type) {
    case IMAGE_MESSAGE_UPLOAD:
      return loop(
        state,
        Effects.promise(
          imageMessageUploadSelect,
          action.file,
          action.userId
        )
      );
    default:
      return state;
  }
}
