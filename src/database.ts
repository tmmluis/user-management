import { getUsers } from './api/getUsers';
import { User } from './api/getUsers';

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
  },

  getRecords(start: number, end: number) {
    return users.slice(start, end);
  },

  addUser(newUser: NewUser) {
    const user = { ...newUser, id: idSeed++ };
    users.push(user);
  },

  deleteUser(id: number) {
    users = users.filter((user) => user.id !== id);
  },

  updateUser(user: User) {
    const index = users.findIndex((u) => (u.id = user.id));
    users[index] = user;
  },
};

export default Object.freeze(userDB);
