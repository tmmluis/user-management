import { User } from '../../api/getUsers';
import './RowActions';

export class TableRow extends HTMLTableRowElement {
  user: User;

  constructor() {
    super();
    this.user = {
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    };
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
        <tr user-id="${this.user.id}">
          <td>${this.user.id}</td>
          <td>${this.user.email}</td>
          <td>${this.user.first_name}</td>
          <td>${this.user.last_name}</td>
          <td>${this.user.avatar}</td>
          <td id="row-actions"></td>
        </tr>
      `;

    this.attachListeners();
  }

  attachListeners() {
    const userId = this.user.id;
    const actionsContainer = this.querySelector('#row-actions') as HTMLElement;

    this.addEventListener('mouseover', () => {
      actionsContainer.innerHTML = /*html*/ `
          <row-actions user-id="${userId}"></row-actions>
        `;
    });

    this.addEventListener('mouseleave', () => {
      actionsContainer.innerHTML = '';
    });

    this.addEventListener('userRow:edit', () => {
      console.log(userId);
    });
  }
}

customElements.define('table-row', TableRow, { extends: 'tr' });
