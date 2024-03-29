import firebase from 'firebase';
import { calcCrow } from './range';

export function mapUserToMessage(currentMessage) {
  return firebase
    .database()
    .ref(`users/${currentMessage.userId}`)
    .once('value')
    .then(snapshot => {
      const userSnap = snapshot.val();

      return {
        ...currentMessage,
        user: {
          ...userSnap,
        },
      };
    });
}

export function handleFacebookLogin(user) {
  return firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
      facebookUid: user.providerData[0].uid,
      isAnonymous: false,
    });
}

export function handleIncognitoLogin(user, nickname) {
  return firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      name: nickname,
      uid: user.uid,
      isAnonymous: true,
      photoUrl: process.env.INCOGNITO_AVATAR_URL,
    });
}

export function pushMessageToStore(message, location) {
  const messageEnitity = message.val();

  const distance = calcCrow(
    location.coords.latitude,
    location.coords.longitude,
    messageEnitity.coords.latitude,
    messageEnitity.coords.longitude,
  ).toFixed(1);

  if (distance > process.env.MAX_DISTANCE) {
    return Promise.reject();
  }

  return mapUserToMessage({
    ...messageEnitity,
    distance,
    key: message.key,
  });
}

export function lastDayMessages() {
  const todateDate = new Date();
  const yesterdayTimeStamp = todateDate.setDate(todateDate.getDate() - 1);

  return firebase
    .database()
    .ref('messages')
    .orderByChild('createdAt')
    .startAt(yesterdayTimeStamp);
}
