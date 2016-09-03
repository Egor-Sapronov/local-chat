export const ROUTER_GO = 'ROUTER_GO';

export function go(path) {
  return {
    type: ROUTER_GO,
    path,
  };
}

export const goTo = path => () => go(path);
