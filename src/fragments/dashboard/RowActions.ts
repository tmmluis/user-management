import { cancelIcon } from '../../icons/cancel';
import { checkIcon } from '../../icons/check';
import { editIcon } from '../../icons/edit';
import { trashIcon } from '../../icons/trash';

(() => {
  class RowActions extends HTMLElement {
    editing: boolean;

    constructor() {
      super();

      this.editing = this.getAttribute('editing') === 'true';
      this.handleEdit = this.handleEdit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
    }

    connectedCallback() {
      this.render();
    }

    render() {
      if (!this.editing) {
        this.innerHTML = /*html*/ `
            <button type="button" id="edit-button">${editIcon}</button>
            <button type="button" id="delete-button">${trashIcon}</button>
          `;

        const editButtton = this.querySelector(
          '#edit-button'
        ) as HTMLButtonElement;
        editButtton.addEventListener('click', this.handleEdit);

        const deleteButtton = this.querySelector(
          '#delete-button'
        ) as HTMLButtonElement;
        deleteButtton.addEventListener('click', this.handleDelete);
      } else {
        this.innerHTML = /*html*/ `
            <button type="button" id="save-button">${checkIcon}</button>
            <button type="button" id="cancel-button">${cancelIcon}</button>
          `;

        const saveButtton = this.querySelector(
          '#save-button'
        ) as HTMLButtonElement;
        saveButtton.addEventListener('click', this.handleSave);

        const cancelButtton = this.querySelector(
          '#cancel-button'
        ) as HTMLButtonElement;
        cancelButtton.addEventListener('click', this.handleCancel);
      }
    }

    handleEdit() {
      this.dispatchEvent(new CustomEvent('userRow:edit', { bubbles: true }));
    }

    handleDelete() {
      this.dispatchEvent(new CustomEvent('userRow:delete', { bubbles: true }));
    }

    handleSave() {
      this.dispatchEvent(new CustomEvent('userRow:save', { bubbles: true }));
    }

    handleCancel() {
      this.dispatchEvent(new CustomEvent('userRow:cancel', { bubbles: true }));
    }
  }

  customElements.define('row-actions', RowActions);
})();
