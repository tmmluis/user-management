import { User } from '../api/getUsers';
import { setPage, loadInitialState } from '../state';

export async function renderDashboard() {
  const wrapper = document.querySelector<HTMLElement>('main')!;
  wrapper.innerHTML = /*html*/ `
        <p>Loading...</p>
    `;

  const initState = await loadInitialState();
  renderUserTable(initState);
}

type UserTableProps = {
  users: User[];
  totalPages: number;
  currentPage: number;
};

async function renderUserTable({
  users,
  totalPages,
  currentPage,
}: UserTableProps) {
  renderTable(users);
  renderPagination(currentPage, totalPages);
  attachListeners();
}

function renderTable(users: User[]) {
  const main = document.querySelector<HTMLElement>('main')!;
  main.innerHTML = /*html*/ `
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
  const wrapper = document.createElement('div');
  wrapper.innerHTML = /*html*/ `
    <nav>
      <ul>
        ${[...Array(totalPages).keys()]
          .map(
            (page) =>
              `<li ${
                page + 1 === currentPage ? 'class="active"' : ''
              }><a data-page=${page + 1} href="#">${page + 1}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
  `;
  const main = document.querySelector<HTMLElement>('main')!;
  main.append(wrapper);
}

function attachListeners() {
  const pageLinks = document.querySelectorAll('li a');
  pageLinks.forEach((link) => link.addEventListener('click', handlePageClick));
}

function handlePageClick(e: Event) {
  e.preventDefault();
  const link = e.target as HTMLAnchorElement;
  const page = link.getAttribute('data-page') as string;
  renderUserTable(setPage(Number(page)));
}
