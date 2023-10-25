import { isAuthenticated } from '../auth';
import './dashboard/Dashboard';
import './UserLogin';

export class MainContent extends HTMLElement {
  loggedIn: boolean;

  constructor() {
    super();
    this.loggedIn = isAuthenticated();
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
  }

  render() {
    this.innerHTML = /*html*/ `
        <main>
          ${
            this.loggedIn
              ? '<user-dashboard></user-dashboard>'
              : '<user-login></user-login>'
          }
        </main>
      `;
  }

  attachListeners() {
    window.addEventListener('login', () => {
      this.loggedIn = isAuthenticated();
      this.render();
    });

    window.addEventListener('logout', () => {
      this.loggedIn = isAuthenticated();
      this.render();
    });
  }
}

customElements.define('main-content', MainContent);
