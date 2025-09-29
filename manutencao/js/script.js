let currentUser = null;
let users = [];
let vehicles = [];
let editingVehicleId = null;

// Carrega dados do localStorage
function loadData() {
  const savedUsers = localStorage.getItem('users');
  const savedVehicles = localStorage.getItem('vehicles');
      
    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedVehicles) vehicles = JSON.parse(savedVehicles);
}

// Salva dados no localStorage
function saveData() {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

// Mostra mensagem
function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<div class="message ${type}">${message}</div>`;
  setTimeout(() => {
    element.innerHTML = '';
  }, 3000);
}

// Navega entre páginas
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
    document.getElementById(pageId).classList.add('active');
      
    if (pageId === 'homePage') {
      loadVehicles();
    }
    if (pageId === 'addVehiclePage') {
      document.getElementById('vehicleForm').reset();
      document.getElementById('formTitle').textContent = 'Adicionar Veículo';
    editingVehicleId = null;
     }
}

// Funções utilitárias
function showPage(pageId) {
  // Esconde todos os containers
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  // Mostra o container selecionado
  document.getElementById(pageId).style.display = 'block';
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

// Event Listener 
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

// Carregamento inicial da página
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

  // Adicionar/Editar veículo
    document.getElementById('vehicleForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const brand = document.getElementById('vehicleBrand').value;
      const model = document.getElementById('vehicleModel').value;
      const year = document.getElementById('vehicleYear').value;
      
      if (editingVehicleId !== null) {
        const index = vehicles.findIndex(v => v.id === editingVehicleId);
        vehicles[index] = { id: editingVehicleId, brand, model, year, userId: currentUser.email };
        showMessage('vehicleMessage', 'Veículo atualizado com sucesso!', 'success');
      } else {
        const vehicle = {
          id: Date.now(),
          brand,
          model,
          year,
          userId: currentUser.email
        };
        vehicles.push(vehicle);
        showMessage('vehicleMessage', 'Veículo cadastrado com sucesso!', 'success');
      }
      
      saveData();
      setTimeout(() => {
        showPage('homePage');
      }, 1000);
    });

    // Carregar veículos
    function loadVehicles() {
      const userVehicles = vehicles.filter(v => v.userId === currentUser.email);
      const listElement = document.getElementById('vehicleList');
      
      if (userVehicles.length === 0) {
        listElement.innerHTML = '<div class="empty-state"><p>📋 Nenhum veículo cadastrado</p></div>';
        return;
      }
      
      listElement.innerHTML = userVehicles.map(vehicle => `
        <div class="vehicle-item">
          <div class="vehicle-info">
            <h3>🚗 ${vehicle.brand} ${vehicle.model}</h3>
            <p>Ano: ${vehicle.year}</p>
          </div>
          <div class="vehicle-actions">
            <button class="btn-edit" onclick="editVehicle(${vehicle.id})">✏️ Editar</button>
            <button class="btn-danger" onclick="deleteVehicle(${vehicle.id})">🗑️ Excluir</button>
          </div>
        </div>
      `).join('');
    }

    // Editar veículo
    function editVehicle(id) {
      const vehicle = vehicles.find(v => v.id === id);
      if (vehicle) {
        editingVehicleId = id;
        document.getElementById('vehicleBrand').value = vehicle.brand;
        document.getElementById('vehicleModel').value = vehicle.model;
        document.getElementById('vehicleYear').value = vehicle.year;
        document.getElementById('formTitle').textContent = 'Editar Veículo';
        showPage('addVehiclePage');
      }
    }

    // Deletar veículo
    function deleteVehicle(id) {
      if (confirm('Tem certeza que deseja excluir este veículo?')) {
        vehicles = vehicles.filter(v => v.id !== id);
        saveData();
        loadVehicles();
      }
    }

    // Logout
    function logout() {
      if (confirm('Deseja sair do sistema?')) {
        currentUser = null;
        showPage('loginPage');
      }
    }

// Inicializa mostrando a página de login
showLoginPage();