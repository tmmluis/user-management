import './style.css';
import './fragments/header/UserHeader';
import './fragments/MainContent';
import './fragments/UserFooter';
import { setThemePreference } from './theme';

setThemePreference();

const root = document.querySelector('#app') as HTMLDivElement;
root.innerHTML = /*html*/ `
    <user-header></user-header>
    <main-content></main-content>
    <user-footer></user-footer>
  `;
