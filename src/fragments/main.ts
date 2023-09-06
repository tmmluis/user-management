export function renderMain() {
  return /*html*/ `
    <main>
      <div id="form-wrapper">
        <h1>Sign in</h1>
        <form name="sign-in-form" id="sign-in-form">
          <label for="email">Email</label>
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
    </main>`;
}

export function addFormListeners() {
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
  signInForm.addEventListener('submit', (e) => e.preventDefault());
}
