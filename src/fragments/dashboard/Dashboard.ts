import './UserTable';
import './UserModal';

export class UserDashboard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
        <user-table></user-table>
        <button type="button" id="add-button">Add user</button>
        <dialog is="create-user-modal"></dialog>
      `;

    this.attachListeners();
  }

  attachListeners() {
    const addUserButton = document.querySelector(
      '#add-button'
    ) as HTMLButtonElement;
    const userModal = document.querySelector('dialog') as HTMLDialogElement;
    addUserButton.addEventListener('click', () => userModal.showModal());
  }
}

customElements.define('user-dashboard', UserDashboard);
