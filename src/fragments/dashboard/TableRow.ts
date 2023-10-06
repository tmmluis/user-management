import { User } from '../../api/getUsers';
import './RowActions';

export class TableRow extends HTMLTableRowElement {
  user: User;
  editable: boolean;
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
    this.editable = false;
    this.mouseOver = false;

    this.handleEdit = this.handleEdit.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
  }

  render() {
    console.log(`rendering row ${this.user.id} - ${this.mouseOver}`);
    const { id, email, first_name, last_name, avatar } = this.user;
    this.innerHTML = /*html*/ `
        <tr user-id="${id}">
          <td>${id}</td>
          <td>${
            this.editable ? `<input type="email" value=${email} />` : `${email}`
          }</td>
          <td>${
            this.editable
              ? `<input type="text" value=${first_name} />`
              : `${first_name}`
          }</td>
          <td>${
            this.editable
              ? `<input type="text" value=${last_name} />`
              : `${last_name}`
          }</td>
          <td>${
            this.editable
              ? `<input type="text" value=${avatar} />`
              : `${avatar}`
          }</td>
          <td>${
            this.mouseOver
              ? `<row-actions user-id="${this.user.id}"></row-actions>`
              : ''
          }</td>
        </tr>
      `;
  }

  attachListeners() {
    this.addEventListener('mouseover', this.handleMouseOver);
    this.addEventListener('mouseleave', this.handleLeave);
    this.addEventListener('userRow:edit', this.handleEdit);
  }

  handleMouseOver() {
    if (!this.mouseOver) {
      this.mouseOver = true;
      this.render();
    }
  }

  handleLeave() {
    if (!this.editable) {
      this.mouseOver = false;
      this.render();
    }
  }

  handleEdit() {
    this.mouseOver = true;
    this.editable = true;
    this.render();
  }
}

customElements.define('table-row', TableRow, { extends: 'tr' });
