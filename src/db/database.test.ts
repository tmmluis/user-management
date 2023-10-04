import { User, UserData } from '../api/getUsers.ts';
import { userDB } from './database.ts';
import { getUsers } from '../api/getUsers.ts';

const user1 = {
  id: 1,
  email: 'michael.lawson@reqres.in',
  first_name: 'Michael',
  last_name: 'Lawson',
  avatar: 'https://reqres.in/img/faces/7-image.jpg',
};

const user2 = {
  id: 2,
  email: 'lindsay.ferguson@reqres.in',
  first_name: 'Lindsay',
  last_name: 'Ferguson',
  avatar: 'https://reqres.in/img/faces/8-image.jpg',
};

vi.mock('../api/getUsers.ts', () => {
  return {
    getUsers: vi.fn<[number], UserData>((page: number) => {
      if (page === 1) {
        return {
          data: [user1],
          page: 1,
          per_page: 1,
          total: 2,
          total_pages: 2,
        };
      }

      return {
        data: [user2],
        page: 2,
        per_page: 1,
        total: 2,
        total_pages: 2,
      };
    }),
  };
});

test('should init DB', async () => {
  const pages = await userDB.init();

  expect(getUsers).toHaveBeenCalledTimes(2);
  expect(pages).toBe(1);
});

test('should find user by ID', () => {
  const user = userDB.getById(user1.id);

  expect(user).toEqual(user1);
});

const user3 = {
  email: 'tobias.funke@reqres.in',
  first_name: 'Tobias',
  last_name: 'Funke',
  avatar: 'https://reqres.in/img/faces/9-image.jpg',
};

test('should add user', () => {
  userDB.add(user3);
  const newUserId = 3;
  const addedUser = userDB.getById(newUserId) as User;

  expect(userDB.getAll().length).toBe(3);
  expect(addedUser).toBeDefined();
  expect(addedUser.email).toBe('tobias.funke@reqres.in');
});

test('should return all users', () => {
  const users = userDB.getAll();

  expect(users.length).toBe(3);
});

test('should return a page of users', () => {
  const page = 1;
  const users = userDB.getUsersPage(page);

  expect(users.length).toBe(3);
});

test('should delete existing user', () => {
  const userId = 3;
  const deletedUser = userDB.delete(userId) as User;

  expect(deletedUser).not.toBeNull();
  expect(deletedUser.email).toBe('tobias.funke@reqres.in');
});

test('should handle delete unexisting user', () => {
  const userId = 4;
  const deletedUser = userDB.delete(userId);

  expect(deletedUser).toBeNull();
});

test('should update user', () => {
  const updatedUser = {
    ...user2,
    first_name: 'Tiago',
  };
  userDB.update(updatedUser);

  expect(userDB.getById(user2.id)).toEqual(updatedUser);
  expect(userDB.getById(user1.id)).toEqual(user1);
});
