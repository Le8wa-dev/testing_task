const mock = [
  {
    id: '1',
    name: 'Alex',
    phone: '+79054442211'
  },
  {
    id: '2',
    name: 'Helen',
    phone: '+79023331122'
  },
  {
    id: '3',
    name: 'Pete',
    phone: '+79105554433'
  },
  {
    id: '4',
    name: 'Jack',
    phone: '+79998887766'
  },
  {
    id: '5',
    name: 'Jane',
    phone: '+78887776655'
  },
]

document.addEventListener('DOMContentLoaded', function () {
  const usersBox = document.querySelector('.users');
  const loader = document.querySelector('.loader');
  const form = document.querySelector('.form-main');

  function phoneValidate(phone) {
    let regex = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    return regex.test(phone);
  }

  function inputValidate(el, isValid) {
    if (isValid) {
      el.classList.remove('error');
    } else {
      el.classList.add('error');
    }
  }

  function validation(el) {
    const currForm = el.closest('.form');
    const currFormBtn = currForm.querySelector('.form-btn')
    if (el.classList.contains('name-input')) {
      inputValidate(el, el.value.length > 0)
    }
    if (el.classList.contains('phone-input')) {
      inputValidate(el, phoneValidate(el.value))
    }
    if (formValidate(currForm)) {
      currFormBtn.classList.remove('disabled');
    } else {
      currFormBtn.classList.add('disabled');
    }
  }

  function formValidate(form) {
    let countOfInvalidInputs = 0;
    const formInputs = form.querySelectorAll('input');
    Array.from(formInputs).forEach(input => {
      if (!input.classList.contains('error') && input.value.length !== 0) return;
      countOfInvalidInputs++;
    });
    return !countOfInvalidInputs
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formName = form.querySelector('.name-input');
    const formPhone = form.querySelector('.phone-input');
    const res = {
      id: Math.random() + formPhone.value,
      name: formName.value,
      phone: formPhone.value
    };
    addNewUser(res);
    form.reset();
  })

  document.addEventListener('input', ({target}) => {
    if(target.classList.contains('input-box__input')) {
      validation(target);
    }
  })

  renderUsers();

  function showLoader() {
    loader.classList.add('show');
  }
  function hideLoader() {
    loader.classList.remove('show');
  }
  async function fetchUsers() {
    showLoader()
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setTimeout(() => {
          return response.json()
        }, 2000)
      })

    const result = JSON.parse(localStorage.getItem('users')) || [...mock];
    hideLoader();
    return result;
  }
  async function updateUsers(users) {
    showLoader()
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setTimeout(() => {
          return response.json()
        }, 2000)
      })

    localStorage.setItem('users', JSON.stringify(users));
    hideLoader();
  }
  async function addNewUser(user) {
    const currUsers = await fetchUsers();
    const newUsers = [...currUsers, user];
    updateUsers(newUsers).then(renderUsers)
  }
  async function removeUser(id) {
    const currUsers = await fetchUsers();
    const newUsers = currUsers.filter(user => (user.id).toString() !== id.toString());
    updateUsers(newUsers).then(renderUsers);
  }
  function editUser(id) {
    const userItem = document.getElementById(id);
    userItem.classList.remove('disabled');

  }
  async function updateUser(id) {
    const userItem = document.getElementById(id);
    const nameInput = userItem.querySelector('.name-input');
    const phoneInput = userItem.querySelector('.phone-input');
    const name = nameInput.value;
    const phone = phoneInput.value;
    const currUsers = await fetchUsers();
    updatableUser = currUsers.find(user => (user.id).toString() === id.toString()) 
    updatableUser["name"] = name;
    updatableUser["phone"] = phone;
    userItem.classList.add('disabled');
  }
  async function renderUsers() {
    const users = await fetchUsers();
    usersBox.textContent = '';
    if (!users.length) {
      const res = `<div class="empty-box">There are no users yet</div>`;
      usersBox.insertAdjacentHTML('beforeend', res);
    } else {
      users.forEach(({ id, name, phone }) => {
        const userItem = `
                          <div class="form users-item disabled" id=${id}>
                            <div class="users-item__input-box input-box">
                              <input type="text" name="name" class="input-box__input name-input" placeholder=" " autoComplete="off" value="${name}" />
                              <label class="input-box__error">
                                Field is required
                              </label>
                            </div>
                            <div class="users-item__input-box input-box">
                              <input type="tel" name="phone" class="input-box__input phone-input" placeholder=" " autoComplete="off" value="${phone}" />
                              <label class="input-box__error">
                                Phone incorrect
                              </label>
                            </div>
                            <div class="users-item__btns">
                              <button class="users-item__btn users-item__btn-save form-btn button small blue">
                                Save
                              </button>
                              <button class="users-item__btn users-item__btn-edit button small yellow">
                                Edit
                              </button>
                              <button class="users-item__btn users-item__btn-remove button small white">
                                Remove
                              </button>
                            </div>
                        </div>`;
        usersBox.insertAdjacentHTML('beforeend', userItem);
      });
    }
  }

  document.addEventListener('click', ({target}) => {
    if (target.classList.contains('users-item__btn-remove')) {
      const id = target.closest('.users-item').getAttribute('id');
      removeUser(id)
    }
    if (target.classList.contains('users-item__btn-edit')) {
      const id = target.closest('.users-item').getAttribute('id');
      editUser(id)
    }
    if (target.classList.contains('users-item__btn-save')) {
      const id = target.closest('.users-item').getAttribute('id');
      updateUser(id)
    }
  })

});
