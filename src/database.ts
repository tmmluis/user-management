import { getUsers } from './api/getUsers';
import { User } from './api/getUsers';

/**
 * Since we are using a fake API that doesn't really mutate users in the backend we set up a simple in-memory DB.
 * It gets wiped out on browser refresh.
 */

let singleton = false;
let users: User[] = [];

class UserDB {
  constructor() {
    if (singleton) {
      throw new Error('You can only create one instance!');
    }
    singleton = true;
  }

  async init() {
    users = (await getUsers(1)).data;
    users = users.concat((await getUsers(2)).data);
  }

  getRecords(start: number, end: number) {
    return users.slice(start, end);
  }
}

const userDB = Object.freeze(new UserDB());
export default userDB;
