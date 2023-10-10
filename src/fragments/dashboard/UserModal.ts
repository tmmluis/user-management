import { NewUser } from '../../db/database';
import { userStore } from './userStore';

(() => {
  class CreateUserModal extends HTMLDialogElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = /*html*/ `
        <h2>Create new user</h2>
        <form method="dialog">
          <section>
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required/>
            <label for="first-name">First name</label>
            <input id="first-name" name="first_name" type="text" required/>
            <label for="last-name">Last name</label>
            <input id="last-name" name="last_name" type="text" required/>
            <label for="avatar">Avatar</label>
            <input id="avatar" name="avatar" type="text" required/>
          </section>
          <menu>
            <button type="button" id="close-button">Cancel</button>
            <button>Create user</button>
        </menu>
        </form>
      `;

      this.attachListeners();
    }

    showModal() {
      // reset form input values
      this.render();
      super.showModal();
    }

    attachListeners() {
      // close
      const closeButton = this.querySelector(
        '#close-button'
      ) as HTMLButtonElement;
      closeButton.addEventListener('click', () => {
        this.close();
      });

      // submit
      const form = document.querySelector('form') as HTMLFormElement;
      form.addEventListener('submit', () => {
        const formData = new FormData(
          this.querySelector('form') as HTMLFormElement
        );
        userStore.addUser(Object.fromEntries(formData) as NewUser);
      });
    }
  }

  customElements.define('create-user-modal', CreateUserModal, {
    extends: 'dialog',
  });
})();
