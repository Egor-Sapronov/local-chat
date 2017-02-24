import auth from './authReducer';
import user from './userReducer';
import router from './routerReducer';
import message from './messageReducer';
import geo from './geoReducer';
import firebase from './firebase';

const appReducer = {
  geo,
  auth,
  user,
  router,
  message,
  firebase,
};

export default appReducer;
