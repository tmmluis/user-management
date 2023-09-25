import { userDB, NewUser } from '../../db/database';
import { renderUserDashboard } from './dashboard';

const USERS_PER_PAGE = 6;
let totalPages = 2;
let currentPage = 1;

export async function loadInitialState() {
  await userDB.init();
  const users = getUsersPage(currentPage);

  return { users, currentPage, totalPages };
}

function getUsersPage(page: number) {
  const end = page * USERS_PER_PAGE;
  const start = end - USERS_PER_PAGE;
  return userDB.getMany(start, end);
}

export function setPage(page: number) {
  const users = getUsersPage(page);
  currentPage = page;

  renderUserDashboard({ users, totalPages, currentPage });
}

export function addUser(newUser: NewUser) {
  userDB.add(newUser);
  if (userDB.getMany().length / USERS_PER_PAGE > totalPages) {
    totalPages++;
  }

  renderUserDashboard({
    users: getUsersPage(totalPages),
    currentPage: totalPages,
    totalPages,
  });
}
