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
      isAnonymous: user.isAnonymous,
    });
}

export function handleIncognitoLogin(user, nickname) {
  return firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      name: nickname,
      uid: user.uid,
      isAnonymous: user.isAnonymous,
      photoUrl: require('../assets/incognito_profile_photo.png'),
    });
}

export function pushMessageToStore(message, location) {
  const messageEnitity = message.val();

  if (!location) {
    return null;
  }

  const distance = calcCrow(
    location.coords.latitude,
    location.coords.longitude,
    messageEnitity.coords.latitude,
    messageEnitity.coords.longitude,
  ).toFixed(1);

  if (distance > process.env.MAX_DISTANCE) {
    return null;
  }

  return mapUserToMessage({
    ...messageEnitity,
    distance,
    key: message.key,
  });
}

export function lastDayMessages() {
  const yesterday = new Date();
  const yesterdayTimeStamp = yesterday.setDate(yesterday.getDate() - 1);

  return firebase
    .database()
    .ref('messages')
    .orderByChild('createdAt')
    .startAt(yesterdayTimeStamp);
}
