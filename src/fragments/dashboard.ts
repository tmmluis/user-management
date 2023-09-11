import { getUsers } from '../api/getUsers';

export function renderDashboard() {
  const wrapper = document.querySelector<HTMLElement>('main')!;
  wrapper.innerHTML = /*html*/ `
        <p>Loading...</p>
    `;

  const initialPage = 1;
  displayUsers(initialPage);
}

async function displayUsers(page: number) {
  const userData = await getUsers(page);
  const users = userData.data;
  const wrapper = document.querySelector<HTMLElement>('main')!;
  wrapper.innerHTML = /*html*/ `
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
