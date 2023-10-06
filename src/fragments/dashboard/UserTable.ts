import { State, userStore } from './userStore';
import { TableRow } from './TableRow';
import './TablePagination';
import './RowActions';

(() => {
  class UserTable extends HTMLElement {
    constructor() {
      super();
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
            <tbody></tbody>
        </table>
        <table-pagination current-page="${currentPage}" total-pages="${totalPages}"></table-pagination>
      `;

      users.forEach((user) => {
        const row = new TableRow();
        row.user = user;
        this.querySelector('tbody')?.append(row);
      });

      this.attachListeners();
    }

    attachListeners() {
      window.addEventListener('userStore:updated', () =>
        this.render(userStore.getState())
      );
    }
  }

  customElements.define('user-table', UserTable);
})();
