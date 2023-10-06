import { editIcon } from '../../icons/edit';
import { trashIcon } from '../../icons/trash';
import { userStore } from './userStore';

(() => {
  class RowActions extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = /*html*/ `
          <button type="button" id="edit-button">${editIcon}</button>
          <button type="button" id="delete-button">${trashIcon}</button>
        `;

      const editButtton = this.querySelector(
        '#edit-button'
      ) as HTMLButtonElement;
      const deleteButtton = this.querySelector(
        '#delete-button'
      ) as HTMLButtonElement;

      const userId = Number(this.getAttribute('user-id'));

      editButtton.addEventListener('click', () =>
        console.log(`editing: ${userId}`)
      );
      deleteButtton.addEventListener('click', () =>
        userStore.removeUser(userId)
      );
    }
  }

  customElements.define('row-actions', RowActions);
})();
