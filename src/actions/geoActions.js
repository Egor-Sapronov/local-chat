export const SET_LOCATION = 'SET_LOCATION';
export const BANNED_LOCATION = 'BANNED_LOCATION';

export function setLocation(currentLocation) {
  return {
    type: SET_LOCATION,
    location: currentLocation,
  };
}

export function bannedLocation(error) {
  return {
    type: BANNED_LOCATION,
    error,
  };
}
