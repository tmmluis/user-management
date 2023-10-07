import { User } from '../../api/getUsers';
import { NewUser, USERS_PER_PAGE, userDB } from '../../db/database';

export type State = {
  users: User[];
  currentPage: number;
  totalPages: number;
};

let state: State = {
  users: [],
  currentPage: 0,
  totalPages: 0,
};

export const userStore = {
  async init() {
    const totalPages = await userDB.init();
    const initialPage = 1;
    const users = userDB.getUsersPage(initialPage);
    return this.setState({ users, currentPage: initialPage, totalPages });
  },

  getState() {
    return { ...state };
  },

  setState(newState: State) {
    state = { ...newState };
    window.dispatchEvent(new CustomEvent('userStore:updated'));
    return { ...state };
  },

  setPage(page: number) {
    const users = userDB.getUsersPage(page);
    this.setState({ ...this.getState(), users, currentPage: page });
  },

  addUser(newUser: NewUser) {
    userDB.add(newUser);
    let { totalPages, currentPage } = this.getState();
    if (userDB.getAll().length / USERS_PER_PAGE > totalPages) {
      totalPages++;
      currentPage = totalPages;
    }

    this.setState({
      users: userDB.getUsersPage(totalPages),
      currentPage,
      totalPages,
    });
  },

  removeUser(id: number) {
    const deletedUser = userDB.delete(id);
    if (deletedUser) {
      let { currentPage, totalPages } = this.getState();
      if (userDB.getAll().length % USERS_PER_PAGE === 0) {
        currentPage = currentPage === totalPages ? --currentPage : currentPage;
        totalPages = --totalPages;
      }

      this.setState({
        users: userDB.getUsersPage(currentPage),
        currentPage,
        totalPages,
      });
    }
  },

  updateUser(user: User) {
    userDB.update(user);
    const { currentPage, totalPages } = this.getState();
    this.setState({
      users: userDB.getUsersPage(currentPage),
      currentPage,
      totalPages,
    });
  },
};
