import { trashIcon } from '../../icons/trash';
import './TablePagination';
import { State, userStore } from './userStore';

(() => {
  class UserTable extends HTMLElement {
    constructor() {
      super();

      this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
      this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    async connectedCallback() {
      this.innerHTML = /*html*/ `<p>Loading...</p>`;
      try {
        this.render(await userStore.init());
      } catch (e) {
        this.innerHTML = /*html*/ `<p class="error">Error: could not load users.</p>`;
      }
    }

    render({ users, currentPage, totalPages }: State) {
      this.innerHTML = /*html*/ `
        <table>
          <caption>Users</caption>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Avatar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${users
                .map(
                  (user) =>
                    `<tr>
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.avatar}</td>
                <td>
                  <button type="button" class="delete-button" data-id="${user.id}">
                    ${trashIcon}
                  </button>
                </td>
              </tr>`
                )
                .join('')}
            </tbody>
        </table>
        <table-pagination current-page="${currentPage}" total-pages="${totalPages}"></table-pagination>
      `;

      window.addEventListener('userStore:updated', this.handleStoreUpdate);

      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach((button) =>
        button.addEventListener('click', this.handleDeleteUser)
      );
    }

    async handleStoreUpdate() {
      this.render(userStore.getState());
    }

    async handleDeleteUser(e: Event) {
      const button = e.currentTarget as HTMLButtonElement;
      userStore.removeUser(Number(button.dataset.id));
    }
  }

  customElements.define('user-table', UserTable);
})();
