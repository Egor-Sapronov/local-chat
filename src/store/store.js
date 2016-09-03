import { createStore, applyMiddleware, compose } from 'redux';
import { install, combineReducers } from 'redux-loop';
import createLogger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import appReducer from '../reducers/index';

const middleWares = [applyMiddleware(routerMiddleware(browserHistory))];

if (process.env.NODE_ENV !== 'production') {
  middleWares.push(applyMiddleware(createLogger()));
}

export default () => install()(createStore)(
  combineReducers({
    ...appReducer,
    routing: routerReducer,
  }, {}),
  {},
  compose(...middleWares)
);
