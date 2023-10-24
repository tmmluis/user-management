import { boxIcon } from '../../icons/box.js';
import { lightIcon } from '../../icons/light.js';
import { darkIcon } from '../../icons/dark.js';
import { handleThemeChange, setThemePreference } from './theme.js';
import { dispatchLogout, isAuthenticated } from '../../auth.js';

export class Header extends HTMLElement {
  loggedIn: boolean;

  constructor() {
    super();
    this.loggedIn = isAuthenticated() ? true : false;
  }

  connectedCallback() {
    this.render();
    setThemePreference();

    window.addEventListener('login', () => {
      this.loggedIn = true;
      this.render();
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <header>
        <div id="brand">
          ${boxIcon}
          <h1>User Management</h1>
        </div>
        <div id="actions">
          <div id="theme-selection">
            <button class="theme-button" title="Light theme" data-color="light">
              ${lightIcon}
            </button>
            <button class="theme-button" title="Dark theme" data-color="dark">
              ${darkIcon}
            </button>
          </div>
          ${
            this.loggedIn
              ? '<button type="button" id="logout-button">Logout</button>'
              : ''
          }
        </div>
      </header>
    `;

    this.attachListeners();
  }

  attachListeners() {
    const actionButton = document.querySelector('#logout-button');
    if (actionButton) {
      actionButton.addEventListener('click', () => {
        dispatchLogout();
        this.loggedIn = false;
        this.render();
      });
    }

    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach((button) =>
      button.addEventListener('click', () => handleThemeChange(button))
    );
  }
}

customElements.define('portfolio-header', Header);
