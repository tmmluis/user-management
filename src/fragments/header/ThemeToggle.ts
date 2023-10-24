import { lightIcon } from '../../icons/light.js';
import { darkIcon } from '../../icons/dark.js';
import { getTheme, setTheme, Theme } from '../../theme.js';

export class ThemeToggle extends HTMLElement {
  theme: string;

  constructor() {
    super();
    this.theme = getTheme();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div id="theme-selection">
        <button class="theme-button ${
          this.theme === Theme.LIGHT && 'active'
        }" title="Light theme" data-color=${Theme.LIGHT}>
          ${lightIcon}
        </button>
        <button class="theme-button ${
          this.theme === Theme.DARK && 'active'
        }" title="Dark theme" data-color=${Theme.DARK}>
          ${darkIcon}
        </button>
      </div>
    `;

    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach((button) =>
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-color')!;
        this.theme = theme;
        setTheme(theme);
        this.render();
      })
    );
  }
}

customElements.define('theme-toggle', ThemeToggle);
