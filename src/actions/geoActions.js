export const SET_LOCATION = 'SET_LOCATION';

export function setLocation(currentLocation) {
  return {
    type: SET_LOCATION,
    location: currentLocation,
  };
}
