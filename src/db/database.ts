import { getUsers, User } from '../api/getUsers';

/**
 * Since we are using a fake API that doesn't really mutate users in the backend we set up a simple in-memory DB.
 * It gets wiped out on browser refresh.
 * */

export type NewUser = Omit<User, 'id'>;

export const USERS_PER_PAGE = 6;

let users: User[] = [];
let idSeed = 0;

const userDB = {
  async init() {
    users = users.concat((await getUsers(1)) || []);
    users = users.concat((await getUsers(2)) || []);
    idSeed = users[users.length - 1].id + 1;

    return Math.ceil(users.length / USERS_PER_PAGE);
  },

  getById(id: number) {
    return users.find((user) => user.id === id);
  },

  getAll() {
    return [...users];
  },

  getUsersPage(page: number) {
    const end = page * USERS_PER_PAGE;
    const start = end - USERS_PER_PAGE;
    return users.slice(start, end);
  },

  add(newUser: NewUser) {
    const user = { ...newUser, id: idSeed++ };
    users = [...users, user];

    return user;
  },

  delete(id: number): null | User {
    const deletedUser = users.find((user) => user.id === id);
    if (!deletedUser) {
      return null;
    }

    users = users.filter((user) => user.id !== id);
    return deletedUser;
  },

  update(user: User) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users[index] = user;
      return user;
    }

    return null;
  },
};

Object.freeze(userDB);
export { userDB };
