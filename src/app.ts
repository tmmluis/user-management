import './style.css';
import { Header } from './fragments/header/Header';
import { renderMain } from './fragments/main';
import { Footer } from './fragments/Footer';
import { renderLogin } from './fragments/login';
import { renderDashboard } from './fragments/dashboard/dashboard';
import { isAuthenticated } from './auth';

function renderAppLayout(root: HTMLDivElement) {
  root.append(new Header());
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
