import { boxIcon } from '../../icons/box.js';
import { lightIcon } from '../../icons/light.js';
import { darkIcon } from '../../icons/dark.js';
import { handleThemeChange, setThemePreference } from './theme.js';

export function renderHeader(container: HTMLDivElement) {
  const header = document.createElement('header');
  header.innerHTML = /*html*/ `
    <div id="brand">
      ${boxIcon}
      <h1>User Management</h1>
    </div>
    <div id="actions">
      <div id="theme-selection">
        <button class="theme-button" title="Select light theme" data-color="light">
          ${lightIcon}
        </button>
        <button class="theme-button" title="Select dark theme" data-color="dark">
          ${darkIcon}
        </button>
      </div>
      <button type="button">Action</button>
    </div>
  `;
  container.append(header);

  setThemePreference();
  attachListeners();
}

function attachListeners() {
  const themeButtons = document.querySelectorAll('.theme-button');
  themeButtons.forEach((button) =>
    button.addEventListener('click', () => handleThemeChange(button))
  );
}
