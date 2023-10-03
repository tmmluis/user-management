import { User } from '../../api/getUsers';
import { NewUser, userDB } from '../../db/database';
import { trashIcon } from '../../icons/trash';
import './TablePagination';

(() => {
  type State = {
    users: User[];
    currentPage: number;
    totalPages: number;
  };

  const USERS_PER_PAGE = 6;

  class UserTable extends HTMLElement {
    state: State;

    constructor() {
      super();

      this.state = {
        totalPages: 0,
        currentPage: 0,
        users: [],
      };

      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleDeleteUser = this.handleDeleteUser.bind(this);
      this.handleAddUser = this.handleAddUser.bind(this);
    }

    async connectedCallback() {
      this.innerHTML = /*html*/ `<p>Loading...</p>`;
      try {
        await this.loadInitialState();
      } catch (e) {
        this.innerHTML = /*html*/ `<p class="error">Error: could not load users.</p>`;
      }
    }

    async loadInitialState() {
      await userDB.init();
      const initialPage = 1;
      const totalPages = 2;
      const users = this.getUsersPage(initialPage);

      this.setState({ totalPages, currentPage: initialPage, users });
    }

    setState(newState: State) {
      this.state = newState;
      this.render(newState);
    }

    getUsersPage(page: number) {
      const end = page * USERS_PER_PAGE;
      const start = end - USERS_PER_PAGE;
      return userDB.getMany(start, end);
    }

    setPage(page: number) {
      const users = this.getUsersPage(page);
      this.setState({ ...this.state, users, currentPage: page });
    }

    addUser(newUser: NewUser) {
      userDB.add(newUser);
      let { totalPages, currentPage } = this.state;
      if (userDB.getMany().length / USERS_PER_PAGE > totalPages) {
        totalPages++;
        currentPage = totalPages;
      }

      this.setState({
        users: this.getUsersPage(totalPages),
        currentPage,
        totalPages,
      });
    }

    removeUser(id: number) {
      const deletedUser = userDB.delete(id);
      if (deletedUser) {
        let { currentPage, totalPages } = this.state;
        if (userDB.getMany().length % USERS_PER_PAGE === 0) {
          currentPage =
            currentPage === totalPages ? --currentPage : currentPage;
          totalPages = --totalPages;
        }

        this.setState({
          users: this.getUsersPage(currentPage),
          currentPage,
          totalPages,
        });
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

      window.addEventListener('pagination:changed', this.handlePageChange);
      window.addEventListener('user:new', this.handleAddUser);

      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach((button) =>
        button.addEventListener('click', this.handleDeleteUser)
      );
    }

    handlePageChange(e: CustomEvent) {
      this.setPage(e.detail.currentPage);
    }

    handleDeleteUser(e: Event) {
      const button = e.currentTarget as HTMLButtonElement;
      this.removeUser(Number(button.dataset.id));
    }

    handleAddUser(e: CustomEvent) {
      this.addUser(e.detail.newUser);
    }
  }

  customElements.define('user-table', UserTable);
})();

declare global {
  interface WindowEventMap {
    'pagination:changed': CustomEvent;
    'user:new': CustomEvent;
  }
}
