export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const HISTORY_SNAP = 'HISTORY_SNAP';

export function historySnap(snap) {
  return {
    type: HISTORY_SNAP,
    snap,
  };
}

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

export function sendMessage(message, coords) {
  return {
    type: SEND_MESSAGE,
    message,
    coords,
  };
}

export function messageSent() {
  return {
    type: MESSAGE_SENT,
  };
}
