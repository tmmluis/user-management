import {
  UserCredentials,
  isLoginSuccessResponse,
  loginUser,
} from '../api/loginUser';
import { createErrorMessage, showDashboard } from './main';

export function renderLogin() {
  const wrapper = document.querySelector('main') as HTMLDivElement;
  wrapper.innerHTML = /*html*/ `
    <div class="form-wrapper">
        <h1>Sign in</h1>
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
    </div>`;

  addFormListeners();
}

function addFormListeners() {
  const passwordInput = document.getElementById(
    'current-password'
  ) as HTMLInputElement;
  const togglePasswordButton = document.getElementById(
    'toggle-password'
  ) as HTMLButtonElement;
  const signInForm = document.getElementById('sign-in-form') as HTMLFormElement;

  function togglePassword() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordButton.textContent = 'Hide password';
      togglePasswordButton.setAttribute('aria-label', 'Hide password.');
    } else {
      passwordInput.type = 'password';
      togglePasswordButton.textContent = 'Show password';
      togglePasswordButton.setAttribute(
        'aria-label',
        'Show password as plain text. ' +
          'Warning: this will display your password on the screen.'
      );
    }
  }

  togglePasswordButton.addEventListener('click', togglePassword);
  signInForm.addEventListener('submit', handleLoginSubmission);
}

async function handleLoginSubmission(e: SubmitEvent) {
  e.preventDefault();
  const submitButton = document.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement;
  submitButton.disabled = true;
  const formData = new FormData(e.currentTarget as HTMLFormElement);

  try {
    const response = await loginUser(
      Object.fromEntries(formData) as UserCredentials
    );

    if (isLoginSuccessResponse(response)) {
      const storageKey = 'auth-token';
      localStorage.setItem(storageKey, response.token);
      showDashboard();
    } else {
      handleLoginError('Unable to login. Username or password are incorrect.');
    }
  } catch {
    handleLoginError('Something went wrong. Please try again later.');
  } finally {
    submitButton.disabled = false;
  }
}

function handleLoginError(error: string) {
  console.error('login failed');
  if (document.querySelector('form > .error') == null) {
    const signInForm = document.getElementById(
      'sign-in-form'
    ) as HTMLFormElement;
    signInForm.append(createErrorMessage(error));
  }
}
