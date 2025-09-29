// Vehicle Management Variables
let vehicles = [];
let editingIndex = -1;

// Utility Functions
function showPage(pageId) {
  // Hide all containers
  document.querySelectorAll('.container, .home-container').forEach(container => {
    container.style.display = 'none';
  });
  // Show the selected container
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = pageId === 'homePage' ? 'block' : 'block';
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  
  document.getElementById('lengthCheck').classList.toggle('valid', hasLength);
  document.getElementById('upperCheck').classList.toggle('valid', hasUpper);
  document.getElementById('numberCheck').classList.toggle('valid', hasNumber);
  document.getElementById('specialCheck').classList.toggle('valid', hasSpecial);
  
  return hasLength && hasUpper && hasNumber && hasSpecial;
}

// Vehicle Management Functions
function addVehicle(registro, marca, modelo, ano) {
  vehicles.push({ registro, marca, modelo, ano });
  renderVehicles();
}

function updateVehicle(index, registro, marca, modelo, ano) {
  vehicles[index] = { registro, marca, modelo, ano };
  renderVehicles();
}

function deleteVehicle(index) {
  if (confirm('Tem certeza que deseja excluir este veículo?')) {
    vehicles.splice(index, 1);
    renderVehicles();
  }
}

function editVehicle(index) {
  editingIndex = index;
  const vehicle = vehicles[index];
  
  document.getElementById('registro').value = vehicle.registro;
  document.getElementById('marca').value = vehicle.marca;
  document.getElementById('modelo').value = vehicle.modelo;
  document.getElementById('ano').value = vehicle.ano;
  
  document.getElementById('formTitle').textContent = 'Editar Veículo';
  document.getElementById('submitBtn').textContent = 'Atualizar';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingIndex = -1;
  document.getElementById('vehicleForm').reset();
  document.getElementById('formTitle').textContent = 'Adicionar Veículo';
  document.getElementById('submitBtn').textContent = 'Adicionar';
  document.getElementById('cancelBtn').style.display = 'none';
}

function renderVehicles() {
  const tbody = document.getElementById('vehicleTableBody');
  
  if (vehicles.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum veículo cadastrado</td></tr>';
    return;
  }
  
  tbody.innerHTML = vehicles.map((vehicle, index) => `
    <tr>
      <td>${vehicle.registro}</td>
      <td>${vehicle.marca}</td>
      <td>${vehicle.modelo}</td>
      <td>${vehicle.ano}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editVehicle(${index})">Editar</button>
        <button class="action-btn delete-btn" onclick="deleteVehicle(${index})">Excluir</button>
      </td>
    </tr>
  `).join('');
}

function logout() {
  if (confirm('Tem certeza que deseja sair?')) {
    vehicles = [];
    editingIndex = -1;
    document.getElementById('vehicleForm').reset();
    cancelEdit();
    renderVehicles();
    showPage('loginPage');
  }
}

// Event Listeners
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simulate successful login
  showPage('homePage');
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('recoveryEmail').value;
  const errorElement = document.getElementById('recoveryEmailError');
  const successElement = document.getElementById('recoverySuccess');
  
  if (!validateEmail(email)) {
    errorElement.style.display = 'block';
    successElement.style.display = 'none';
    return;
  }
  
  errorElement.style.display = 'none';
  successElement.style.display = 'block';
  
  setTimeout(() => {
    showPage('loginPage');
  }, 2000);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  let hasError = false;
  
  if (name.length < 3) {
    document.getElementById('nameError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('nameError').style.display = 'none';
  }
  
  if (!validateEmail(email)) {
    document.getElementById('emailError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('emailError').style.display = 'none';
  }
  
  if (!validatePassword(password)) {
    hasError = true;
  }
  
  if (password !== confirmPassword) {
    document.getElementById('passwordError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
  
  if (!hasError) {
    document.getElementById('registerSuccess').style.display = 'block';
    setTimeout(() => {
      showPage('loginPage');
    }, 2000);
  }
});

document.getElementById('password').addEventListener('input', function(e) {
  validatePassword(e.target.value);
});

document.getElementById('vehicleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const registro = document.getElementById('registro').value.trim();
  const marca = document.getElementById('marca').value.trim();
  const modelo = document.getElementById('modelo').value.trim();
  const ano = document.getElementById('ano').value.trim();
  
  if (editingIndex >= 0) {
    updateVehicle(editingIndex, registro, marca, modelo, ano);
    cancelEdit();
  } else {
    addVehicle(registro, marca, modelo, ano);
    document.getElementById('vehicleForm').reset();
  }
});

// Initial page load
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  
  if (page === 'forgot') {
    showPage('forgotPasswordPage');
  } else if (page === 'register') {
    showPage('registerPage');
  } else {
    showPage('loginPage');
  }
});