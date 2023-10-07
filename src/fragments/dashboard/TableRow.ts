import { User } from '../../api/getUsers';
import './RowActions';
import { userStore } from './userStore';

export class TableRow extends HTMLTableRowElement {
  user: User;
  editing: boolean;
  mouseOver: boolean;

  constructor() {
    super();
    this.user = {
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    };
    this.editing = false;
    this.mouseOver = false;

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleLeave = this.handleLeave.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
  }

  render() {
    const { id, email, first_name, last_name, avatar } = this.user;
    this.innerHTML = /*html*/ `
        <tr>
          <td>${id}</td>
          <td>${
            this.editing
              ? `<input type="email" value="${email}" id="email"/>`
              : `${email}`
          }</td>
          <td>${
            this.editing
              ? `<input type="text" value="${first_name}" id="first-name"/>`
              : `${first_name}`
          }</td>
          <td>${
            this.editing
              ? `<input type="text" value="${last_name}" id="last-name"/>`
              : `${last_name}`
          }</td>
          <td>${
            this.editing
              ? `<input type="text" value="${avatar}" id="avatar"/>`
              : `${avatar}`
          }</td>
          <td>${
            this.mouseOver
              ? `<row-actions editing="${this.editing}"></row-actions>`
              : ''
          }</td>
        </tr>
      `;
  }

  attachListeners() {
    this.addEventListener('mouseover', this.handleMouseOver);
    this.addEventListener('mouseleave', this.handleLeave);
    this.addEventListener('userRow:edit', this.handleEdit);
    this.addEventListener('userRow:delete', this.handleDelete);
    this.addEventListener('userRow:save', this.handleSave);
    this.addEventListener('userRow:cancel', this.handleCancel);
  }

  handleMouseOver() {
    if (!this.mouseOver) {
      this.mouseOver = true;
      this.render();
    }
  }

  handleLeave() {
    if (!this.editing) {
      this.mouseOver = false;
      this.render();
    }
  }

  handleEdit() {
    this.mouseOver = true;
    this.editing = true;
    this.render();
  }

  handleDelete() {
    userStore.removeUser(this.user.id);
  }

  handleSave() {
    userStore.updateUser({
      id: this.user.id,
      email: (this.querySelector('#email') as HTMLInputElement).value,
      first_name: (this.querySelector('#first-name') as HTMLInputElement).value,
      last_name: (this.querySelector('#last-name') as HTMLInputElement).value,
      avatar: (this.querySelector('#avatar') as HTMLInputElement).value,
    });
  }

  handleCancel() {
    this.mouseOver = true;
    this.editing = false;
    this.render();
  }
}

customElements.define('table-row', TableRow, { extends: 'tr' });
