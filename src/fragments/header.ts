import { boxIcon } from '../icons/box.ts';
import { lightIcon } from '../icons/light.ts';
import { darkIcon } from '../icons/dark.ts';

export function renderHeader() {
  return /*html*/ `
    <header>
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
    </header>
  `;
}
