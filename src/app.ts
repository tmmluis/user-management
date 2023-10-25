import './style.css';
import { Header } from './fragments/header/Header';
import { renderMain } from './fragments/main';
import { Footer } from './fragments/Footer';
import { renderLogin } from './fragments/UserLogin';
import { renderDashboard } from './fragments/dashboard/Dashboard';
import { isAuthenticated } from './auth';
import { setThemePreference } from './theme';

function renderAppLayout(root: HTMLDivElement) {
  root.append(new Header());
  renderMain(root);
  root.append(new Footer());
}

function startApp() {
  setThemePreference();

  if (isAuthenticated()) {
    renderDashboard();
  } else {
    renderLogin();
  }
}

const root = document.querySelector('#app') as HTMLDivElement;
renderAppLayout(root);
startApp();
