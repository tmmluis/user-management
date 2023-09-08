import { renderDashboard } from './dashboard';
import { renderLogin } from './login';

export function renderMain(container: HTMLDivElement) {
  const main = document.createElement('main');
  main.innerHTML = /*html*/ `<main></main>`;
  container.append(main);

  attachListeners();
}

function attachListeners() {
  window.addEventListener('login', () => {
    history.pushState({ action: 'logged in' }, '');
    renderDashboard();
  });

  window.addEventListener('logout', () => {
    history.pushState({ action: 'logged out' }, '');
    renderLogin();
  });
}

export function createErrorMessage(message: string) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.setAttribute('class', 'error');
  return errorMessage;
}
