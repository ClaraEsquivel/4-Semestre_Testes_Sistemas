// Variáveis globais
let users = [];
let vehicles = [];
let currentUser = null;
let editingIndex = null;

// Funções de navegação
function showLoginPage() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('mainSystem').style.display = 'none';
}

function showRegisterPage() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'flex';
  document.getElementById('mainSystem').style.display = 'none';
}

function showMainSystem() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('mainSystem').style.display = 'block';
  document.getElementById('currentUserName').textContent = currentUser.name;
  loadVehicles();
}

// Event Listener - Formulário de Cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  const errorMsg = document.getElementById('registerError');
  const successMsg = document.getElementById('registerSuccess');
  
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';
  
  // Validações
  if (password !== confirmPassword) {
    errorMsg.textContent = 'As senhas não coincidem';
    errorMsg.style.display = 'block';
    return;
  }
  
  if (password.length < 6) {
    errorMsg.textContent = 'A senha deve ter no mínimo 6 caracteres';
    errorMsg.style.display = 'block';
    return;
  }
  
  if (users.find(u => u.email === email)) {
    errorMsg.textContent = 'Este email já está cadastrado';
    errorMsg.style.display = 'block';
    return;
  }
  
  // Cadastra o usuário
  users.push({ name, email, password });
  successMsg.style.display = 'block';
  
  setTimeout(() => {
    showLoginPage();
    document.getElementById('registerForm').reset();
    successMsg.style.display = 'none';
  }, 1500);
});

// Event Listener - Formulário de Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    showMainSystem();
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').style.display = 'none';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

// Event Listener - Formulário de Veículos
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const brand = document.getElementById('vehicleBrand').value;
  const model = document.getElementById('vehicleModel').value;
  const year = document.getElementById('vehicleYear').value;
  
  if (editingIndex !== null) {
    // Atualiza veículo existente
    vehicles[editingIndex] = { brand, model, year, owner: currentUser.email };
    editingIndex = null;
    document.getElementById('submitBtn').textContent = 'Adicionar Veículo';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('formTitle').textContent = 'Cadastrar Novo Veículo';
  } else {
    // Adiciona novo veículo
    vehicles.push({ brand, model, year, owner: currentUser.email });
  }
  
  document.getElementById('vehicleForm').reset();
  loadVehicles();
});

// Função para carregar veículos na tabela
function loadVehicles() {
  const tbody = document.getElementById('vehicleTableBody');
  const emptyState = document.getElementById('emptyState');
  
  const userVehicles = vehicles.filter(v => v.owner === currentUser.email);
  
  if (userVehicles.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  tbody.innerHTML = '';
  
  userVehicles.forEach((vehicle) => {
    const globalIndex = vehicles.findIndex(v => v === vehicle);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${vehicle.brand}</td>
      <td>${vehicle.model}</td>
      <td>${vehicle.year}</td>
      <td class="action-buttons">
        <button class="btn-edit" onclick="editVehicle(${globalIndex})">Editar</button>
        <button class="btn-delete" onclick="deleteVehicle(${globalIndex})">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Função para editar veículo
function editVehicle(index) {
  const vehicle = vehicles[index];
  editingIndex = index;
  
  document.getElementById('vehicleBrand').value = vehicle.brand;
  document.getElementById('vehicleModel').value = vehicle.model;
  document.getElementById('vehicleYear').value = vehicle.year;
  
  document.getElementById('submitBtn').textContent = 'Atualizar Veículo';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  document.getElementById('formTitle').textContent = 'Editar Veículo';
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para cancelar edição
function cancelEdit() {
  editingIndex = null;
  document.getElementById('vehicleForm').reset();
  document.getElementById('submitBtn').textContent = 'Adicionar Veículo';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('formTitle').textContent = 'Cadastrar Novo Veículo';
}

// Função para excluir veículo
function deleteVehicle(index) {
  if (confirm('Tem certeza que deseja excluir este veículo?')) {
    vehicles.splice(index, 1);
    loadVehicles();
  }
}

// Função de logout
function logout() {
  if (confirm('Deseja realmente sair?')) {
    currentUser = null;
    editingIndex = null;
    showLoginPage();
  }
}

// Inicializa mostrando a página de login
showLoginPage();