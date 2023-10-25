const storageKey = 'auth-token';

export function dispatchLogin(token: string) {
  localStorage.setItem(storageKey, token);
  window.dispatchEvent(new Event('login'));
}

export function dispatchLogout() {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event('logout'));
}

export function isAuthenticated() {
  return !!localStorage.getItem(storageKey);
}
