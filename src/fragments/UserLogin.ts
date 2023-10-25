import { UserCredentials, loginUser } from '../api/loginUser';
import { dispatchLogin } from '../auth';
import { createErrorMessage } from './main';

export class UserLogin extends HTMLElement {
  constructor() {
    super();
    this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
  }

  render() {
    this.innerHTML = /*html*/ `
        <div id="form-wrapper">
          <h1>Sign in*</h1>
          <form name="sign-in-form" id="sign-in-form">
            <label for="email">Email (username)</label>
            <input id="email" name="email" type="email" required autocomplete="username"/>
            <label for="current-password">Password</label>
            <input id="current-password" name="password" type="password" required autocomplete="current-password"/>
            <button 
            id="toggle-password" 
            type="button" 
            aria-label="Show password as plain text. Warning: this will display your password on the screen."
            >
                Show password
            </button>
            <button type="submit" class="block">Sign in</button>
          </form>
        </div>
        <p>*This App uses fake API data from <a href="https://reqres.in/">Reqres</a>. 
        Use one of their users to login (e.g. janet.weaver@reqres.in). The password can be anything.</p>
      `;
  }

  attachListeners() {
    // password toggle
    const togglePasswordButton = this.querySelector(
      '#toggle-password'
    ) as HTMLButtonElement;
    togglePasswordButton.addEventListener('click', this.togglePassword);

    // submition
    const signInForm = this.querySelector('#sign-in-form') as HTMLFormElement;
    signInForm.addEventListener('submit', this.handleLoginSubmission);
  }

  togglePassword() {
    const passwordInput = document.getElementById(
      'current-password'
    ) as HTMLInputElement;
    const toggleButton = document.getElementById(
      'toggle-password'
    ) as HTMLButtonElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.textContent = 'Hide password';
      toggleButton.setAttribute('aria-label', 'Hide password.');
    } else {
      passwordInput.type = 'password';
      toggleButton.textContent = 'Show password';
      toggleButton.setAttribute(
        'aria-label',
        'Show password as plain text. ' +
          'Warning: this will display your password on the screen.'
      );
    }
  }

  async handleLoginSubmission(e: SubmitEvent) {
    console.log('handlelogin ', this);

    e.preventDefault();
    const submitButton = this.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    submitButton.disabled = true;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const loginToken = await loginUser(
      Object.fromEntries(formData) as UserCredentials
    );

    if (loginToken) {
      dispatchLogin(loginToken);
    } else {
      this.handleLoginError('Error: could not login!');
    }

    submitButton.disabled = false;
  }

  handleLoginError(error: string) {
    console.error('login failed');
    if (this.querySelector('form > .error') == null) {
      const signInForm = this.querySelector('#sign-in-form') as HTMLFormElement;
      signInForm.append(createErrorMessage(error));
    }
  }
}

customElements.define('user-login', UserLogin);

export function renderLogin() {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = '<user-login></user-login>';
}
