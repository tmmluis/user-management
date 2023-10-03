import './UserTable';
import { registerModalListeners, renderUserModal } from './userModal';

export async function renderDashboard() {
  const mainWrapper = document.querySelector<HTMLElement>('main')!;
  mainWrapper.innerHTML =
    /*html*/ `
      <user-table></user-table>
      <button type="button" id="add-button">Add user</button>
    ` + renderUserModal();

  registerModalListeners();
}
