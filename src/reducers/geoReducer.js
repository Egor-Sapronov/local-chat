import { SET_LOCATION } from '../actions/geoActions';

const initialState = {
  location: null,
};

export default function geo(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
}

export const geoSelector = state => state;
