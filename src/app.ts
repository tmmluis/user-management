import './style.css';
import { renderHeader } from './fragments/header';
import { renderMain } from './fragments/main';
import { renderFooter } from './fragments/footer';
import { setThemePreference, handleThemeChange } from './theme';

function renderApp() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML =
    renderHeader() + renderMain() + renderFooter();
}

function attachListeners() {
  const themeButtons = document.querySelectorAll('.theme-button');
  themeButtons.forEach((button) =>
    button.addEventListener('click', () => handleThemeChange(button))
  );
}

renderApp();
setThemePreference();
attachListeners();
