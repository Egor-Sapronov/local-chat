export const CURRENT_MESSAGE_CHANGE = 'CURRENT_MESSAGE_CHANGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message,
  };
}

export function changeMessage(message) {
  return {
    type: CURRENT_MESSAGE_CHANGE,
    message,
  };
}

export function sendMessage(coords) {
  return {
    type: SEND_MESSAGE,
    coords,
  };
}

export function messageSent() {
  return {
    type: MESSAGE_SENT,
  };
}
