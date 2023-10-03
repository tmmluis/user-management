import { NewUser } from '../../db/database';

export function renderUserModal() {
  return /*html*/ `
    <dialog>
      <h2>Create new user</h2>
      <form method="dialog" id="new-user-form">
        <section>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required/>
          <label for="first-name">First name</label>
          <input id="first-name" name="first_name" type="text" required/>
          <label for="last-name">Last name</label>
          <input id="last-name" name="last_name" type="text" required/>
          <label for="avatar">Avatar</label>
          <input id="avatar" name="avatar" type="text" required/>
        </section>
        <menu>
          <button type="button" id="cancel-modal-buton">Cancel</button>
          <button>Create user</button>
      </menu>
      </form>
    </dialog>
  `;
}

export function registerModalListeners() {
  const modal = document.querySelector('dialog');
  const newUserForm = document.getElementById(
    'new-user-form'
  ) as HTMLFormElement;
  const cancelButton = document.getElementById('cancel-modal-buton');

  // open
  const addButton = document.getElementById('add-button');
  addButton?.addEventListener('click', () => {
    modal?.showModal();
  });

  // close
  cancelButton?.addEventListener('click', () => {
    modal?.close();
  });

  // submit
  modal?.addEventListener('submit', () => {
    const formData = new FormData(newUserForm);
    window.dispatchEvent(
      new CustomEvent('user:new', {
        bubbles: true,
        detail: { newUser: Object.fromEntries(formData) as NewUser },
      })
    );
  });
}
