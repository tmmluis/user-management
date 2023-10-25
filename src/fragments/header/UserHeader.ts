import { boxIcon } from '../../icons/box.js';
import './ThemeToggle.js';
import { dispatchLogout, isAuthenticated } from '../../auth.js';

export class UserHeader extends HTMLElement {
  loggedIn: boolean;

  constructor() {
    super();
    this.loggedIn = isAuthenticated();
  }

  connectedCallback() {
    this.render();

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
          <theme-toggle></theme-toggle>
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
  }
}

customElements.define('user-header', UserHeader);
