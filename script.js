const users = [];
const roles = [];


function updateRoleDropdown() {
  const roleDropdown = document.getElementById("user-role");
  roleDropdown.innerHTML = roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
}


function renderUsers() {
  const userTable = document.getElementById("user-table");
  userTable.innerHTML = users.map((user, index) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button onclick="editUser(${index})">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </td>
    </tr>`).join('');
}

function renderRoles() {
  const roleTable = document.getElementById("role-table");
  roleTable.innerHTML = roles.map((role, index) => `
    <tr>
      <td>${role.name}</td>
      <td>${role.permissions.join(', ')}</td>
      <td>
        <button onclick="editRole(${index})">Edit</button>
        <button onclick="deleteRole(${index})">Delete</button>
      </td>
    </tr>`).join('');
  updateRoleDropdown();
}


function showModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

// Add User
document.getElementById("add-user-btn").addEventListener("click", () => {
  document.getElementById("user-name").value = '';
  document.getElementById("user-email").value = '';
  showModal("user-modal");
  document.getElementById("save-user-btn").onclick = () => {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;
    users.push({ name, email, role });
    renderUsers();
    closeModal("user-modal");
  };
});

// Edit User
function editUser(index) {
  const user = users[index];
  document.getElementById("user-name").value = user.name;
  document.getElementById("user-email").value = user.email;
  document.getElementById("user-role").value = user.role;
  showModal("user-modal");
  document.getElementById("save-user-btn").onclick = () => {
    users[index] = {
      name: document.getElementById("user-name").value,
      email: document.getElementById("user-email").value,
      role: document.getElementById("user-role").value
    };
    renderUsers();
    closeModal("user-modal");
  };
}

// Delete User
function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

// Add Role
document.getElementById("add-role-btn").addEventListener("click", () => {
  document.getElementById("role-name").value = '';
  document.getElementById("role-permissions").value = '';
  showModal("role-modal");
  document.getElementById("save-role-btn").onclick = () => {
    const name = document.getElementById("role-name").value;
    const permissions = document.getElementById("role-permissions").value.split(',').map(p => p.trim());
    roles.push({ name, permissions });
    renderRoles();
    closeModal("role-modal");
  };
});

// Edit Role
function editRole(index) {
  const role = roles[index];
  document.getElementById("role-name").value = role.name;
  document.getElementById("role-permissions").value = role.permissions.join(', ');
  showModal("role-modal");
  document.getElementById("save-role-btn").onclick = () => {
    roles[index] = {
      name: document.getElementById("role-name").value,
      permissions: document.getElementById("role-permissions").value.split(',').map(p => p.trim())
    };
    renderRoles();
    closeModal("role-modal");
  };
}

// Delete Role
function deleteRole(index) {
  roles.splice(index, 1);
  renderRoles();
}

// Close modals
document.getElementById("close-user-modal").onclick = () => closeModal("user-modal");
document.getElementById("close-role-modal").onclick = () => closeModal("role-modal");
