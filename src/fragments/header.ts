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
          ${lightIcon}
          ${darkIcon}
        </div>
        <button type="button">Action</button>
      </div>
    </header>
  `;
}
