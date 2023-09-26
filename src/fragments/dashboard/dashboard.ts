import { User } from '../../api/getUsers';
import { setPage, loadInitialState } from './dashBoardState';
import { createErrorMessage } from '../main';
import { registerModalListeners, renderUserModal } from './userModal';

export async function renderDashboard() {
  const mainWrapper = document.querySelector<HTMLElement>('main')!;
  mainWrapper.innerHTML = renderLoadingMessage();

  try {
    const initState = await loadInitialState();
    renderUserDashboard(initState);
  } catch (error) {
    mainWrapper.innerHTML = createErrorMessage(
      'There was an error loading users!'
    );
    console.error('Error loading initial state:', error);
  }
}

function renderLoadingMessage() {
  return /*html*/ `
    <p>Loading...</p>
  `;
}

type UserDashboardProps = {
  users: User[];
  totalPages: number;
  currentPage: number;
};

export async function renderUserDashboard({
  users,
  totalPages,
  currentPage,
}: UserDashboardProps) {
  const mainWrapper = document.querySelector<HTMLElement>('main')!;
  mainWrapper.innerHTML =
    renderTable(users) +
    renderPagination(currentPage, totalPages) +
    renderAddButton() +
    renderUserModal();
  attachListeners();
}

function renderTable(users: User[]) {
  return /*html*/ `
    <table>
      <caption>Users</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Avatar</th>
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
          </tr>`
            )
            .join('')}
        </tbody>
    </table>  
  `;
}

function renderPagination(currentPage: number, totalPages: number) {
  return /*html*/ `
    <nav>
      <ul>
        ${renderPaginationLinks(currentPage, totalPages)}
      </ul>
    </nav>
  `;
}

function renderAddButton() {
  return /*html*/ `
    <button type="button" id="add-button">Add user</button>
  `;
}

function renderPaginationLinks(currentPage: number, totalPages: number) {
  return [...Array(totalPages).keys()]
    .map((page) => {
      const isActive = page + 1 === currentPage;
      return /*html*/ `
        <li ${isActive ? 'class="active"' : ''}>
          <a data-page="${page + 1}" href="#">${page + 1}</a>
        </li>
      `;
    })
    .join('');
}

function attachListeners() {
  // pagination
  const pageLinks = document.querySelectorAll('li a');
  pageLinks.forEach((link) => link.addEventListener('click', handlePageClick));

  // user modal
  registerModalListeners();
}

function handlePageClick(e: Event) {
  e.preventDefault();
  const link = e.target as HTMLAnchorElement;
  const page = link.getAttribute('data-page') as string;
  setPage(Number(page));
}
