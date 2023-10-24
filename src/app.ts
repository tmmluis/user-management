import './style.css';
import { renderHeader } from './fragments/header/header';
import { renderMain } from './fragments/main';
import { Footer } from './fragments/Footer';
import { renderLogin } from './fragments/login';
import { renderDashboard } from './fragments/dashboard/dashboard';
import { isAuthenticated } from './auth';

function renderAppLayout(root: HTMLDivElement) {
  renderHeader(root);
  renderMain(root);
  root.append(new Footer());
}

function startApp() {
  if (isAuthenticated()) {
    renderDashboard();
  } else {
    renderLogin();
  }
}

const root = document.querySelector('#app') as HTMLDivElement;
renderAppLayout(root);
startApp();
