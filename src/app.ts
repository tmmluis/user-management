import './style.css';
import { renderHeader } from './fragments/header/header';
import { renderMain } from './fragments/main';
import { renderFooter } from './fragments/footer';
import { renderLogin } from './fragments/login';
import { renderDashboard } from './fragments/dashboard/dashboard';

function renderAppLayout(root: HTMLDivElement) {
  renderHeader(root);
  renderMain(root);
  renderFooter(root);
}

function startApp() {
  const storageKey = 'auth-token';
  if (localStorage.getItem(storageKey)) {
    renderDashboard();
  } else {
    renderLogin();
  }
}

const root = document.querySelector('#app') as HTMLDivElement;
renderAppLayout(root);
startApp();
