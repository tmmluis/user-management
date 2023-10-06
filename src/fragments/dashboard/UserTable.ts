import { State, userStore } from './userStore';
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
            <tbody>
              ${users
                .map(
                  (user) =>
                    `<tr user-id="${user.id}">
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.avatar}</td>
                <td id="row-actions"></td>
              </tr>`
                )
                .join('')}
            </tbody>
        </table>
        <table-pagination current-page="${currentPage}" total-pages="${totalPages}"></table-pagination>
      `;

      this.attachListeners();
    }

    attachListeners() {
      window.addEventListener('userStore:updated', () =>
        this.render(userStore.getState())
      );

      const userRows = document.querySelectorAll('tbody tr');
      userRows.forEach(attachRowListeners);
    }
  }

  function attachRowListeners(row: Element) {
    const userId = row.getAttribute('user-id');
    const actionsContainer = row.querySelector('#row-actions') as HTMLElement;

    row.addEventListener('mouseover', () => {
      actionsContainer.innerHTML = /*html*/ `
          <row-actions user-id="${userId}"></row-actions>
        `;
    });

    row.addEventListener('mouseleave', () => {
      actionsContainer.innerHTML = '';
    });
  }

  customElements.define('user-table', UserTable);
})();
