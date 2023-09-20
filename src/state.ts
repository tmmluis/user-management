import { User } from './api/getUsers';
import { userDB } from './db/database';

const USERS_PER_PAGE = 6;

export type State = {
  users: User[];
  totalPages: number;
  currentPage: number;
};

let state: State = {
  users: [],
  totalPages: 0,
  currentPage: 0,
};

export async function loadInitialState() {
  const totalPages = 2;
  const currentPage = 1;

  await userDB.init();
  const users = getUsersPage(currentPage);

  state = { users, currentPage, totalPages };
  return state;
}

function getUsersPage(page: number) {
  const end = page * USERS_PER_PAGE;
  const start = end - USERS_PER_PAGE;
  return userDB.getRecords(start, end);
}

export function setPage(page: number) {
  const users = getUsersPage(page);
  const currentPage = page;

  state = { ...state, users, currentPage };
  return state;
}
