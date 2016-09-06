import { SET_LOCATION, BANNED_LOCATION } from '../actions/geoActions';

const initialState = {
  location: null,
  isLoading: true,
  isBanned: false,
};

export default function geo(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
        isLoading: false,
      };
    case BANNED_LOCATION:
      return {
        ...state,
        isLoading: false,
        isBanned: true,
      };
    default:
      return state;
  }
}

export const geoSelector = state => state;
