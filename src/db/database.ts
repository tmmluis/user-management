import { getUsers, User } from '../api/getUsers';

/**
 * Since we are using a fake API that doesn't really mutate users in the backend we set up a simple in-memory DB.
 * It gets wiped out on browser refresh.
 * */

type NewUser = Omit<User, 'id'>;

let users: User[] = [];
let idSeed = 0;

const userDB = {
  async init() {
    users = (await getUsers(1)).data;
    users = users.concat((await getUsers(2)).data);
    idSeed = users[users.length - 1].id + 1;

    return users;
  },

  getById(id: number) {
    return users.find((user) => user.id === id);
  },

  getRecords(start: number, end: number) {
    return users.slice(start, end);
  },

  addUser(newUser: NewUser) {
    const user = { ...newUser, id: idSeed++ };
    users = [...users, user];

    return users;
  },

  deleteUser(id: number): null | User {
    const deletedUser = users.find((user) => user.id === id);
    if (!deletedUser) {
      return null;
    }

    users = users.filter((user) => user.id !== id);
    return deletedUser;
  },

  updateUser(user: User) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users[index] = user;
    }
  },
};

Object.freeze(userDB);
export { userDB };