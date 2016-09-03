import { Effects, loop } from 'redux-loop';
import { push } from 'react-router-redux';
import { AUTH_SUCCESS } from '../actions/authActions';

export default function router(state = {}, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return loop(
        state,
        Effects.call(push, '/')
      );
    default:
      return state;
  }
}
