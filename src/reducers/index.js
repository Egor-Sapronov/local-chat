import auth from './authReducer';
import user from './userReducer';
import router from './routerReducer';
import message from './messageReducer';
import geo from './geoReducer';

const appReducer = {
  geo,
  auth,
  user,
  router,
  message,
};

export default appReducer;
