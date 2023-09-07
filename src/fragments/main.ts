import { renderDashboard } from './dashboard';

export function renderMain(container: HTMLDivElement) {
  const main = document.createElement('main');
  main.innerHTML = /*html*/ `<main></main>`;
  container.append(main);
}

export function showDashboard() {
  history.pushState({ action: 'logged in' }, '');
  renderDashboard();
}

export function createErrorMessage(message: string) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.setAttribute('class', 'error');
  return errorMessage;
}
