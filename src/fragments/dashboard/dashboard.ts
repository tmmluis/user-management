import './UserTable';
import './UserModal';

export async function renderDashboard() {
  const mainWrapper = document.querySelector<HTMLElement>('main')!;
  mainWrapper.innerHTML = /*html*/ `
      <user-table></user-table>
      <button type="button" id="add-button">Add user</button>
      <dialog is="create-user-modal"></dialog>
    `;

  const addUserButton = document.querySelector(
    '#add-button'
  ) as HTMLButtonElement;
  const userModal = document.querySelector('dialog') as HTMLDialogElement;
  addUserButton.addEventListener('click', () => userModal.showModal());
}
