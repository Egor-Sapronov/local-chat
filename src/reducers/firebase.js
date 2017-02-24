import firebase from 'firebase';
import { Effects, loop } from 'redux-loop';
import { FILE_UPLOAD, fileUploadComplete } from '../actions/firebase';

const initialState = {
};

function fileUploadEffect(file, userId) {
  const storageRef = firebase.storage().ref();
  const metadata = {
    userId,
  };

  return storageRef
    .child(`images/${file.name}`)
    .put(file, metadata)
    .then(fileUploadComplete);
}

export default function firebaseState(state = initialState, action) {
  switch (action.type) {
    case FILE_UPLOAD:
      return loop(
        state,
        Effects.promise(
          fileUploadEffect,
          action.file,
          action.userId
        )
      );
    default:
      return state;
  }
}
