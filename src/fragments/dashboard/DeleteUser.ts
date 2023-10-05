import { userStore } from './userStore';

(() => {
  class DeleteUser extends HTMLButtonElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.addEventListener('click', () =>
        userStore.removeUser(Number(this.getAttribute('user-id')))
      );
    }
  }

  customElements.define('delete-user', DeleteUser, { extends: 'button' });
})();
