// ===============================
// Oversight Chamber JS
// ===============================

// 📝 Utility: Log action
function logAction(msg) {
  const log = document.getElementById('logEntries');
  if (log) {
    const entry = document.createElement('div');
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    log.prepend(entry);
  }
}

// 🧾 Registry validation placeholder
function validateRegistry() {
  // implement as needed
}

// 🃏 Load cards placeholder
function loadCards() {
  // implement as needed
}

// 🔄 Sigil rotation placeholder
function showSigilIfMasteradmin() {
  // implement as needed
}

// ===============================
// 🟢 PANEL REVEAL
// ===============================
function revealPanels() {
  const role = localStorage.getItem('userRole');
  if (!role) return;

  // Reveal logout bar and status
  const logoutBar = document.getElementById('logoutBar');
  const sessionStatus = document.getElementById('sessionStatus');
  if (logoutBar) logoutBar.style.display = 'block';
  if (sessionStatus) sessionStatus.textContent = `Logged in as: ${role.toUpperCase()}`;

  // Role-based panels
  if (role === 'admin') {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.style.display = 'block';

    const issuance = document.getElementById('cardIssuance');
    if (issuance) issuance.style.display = 'block';

    if (typeof renderLoginLog === 'function') renderLoginLog();
  }

  if (role === 'masteradmin') {
    const masterPanel = document.getElementById('masteradminPanel');
    if (masterPanel) masterPanel.style.display = 'block';

    const issuance = document.getElementById('cardIssuance');
    if (issuance) issuance.style.display = 'block';

    const controls = document.getElementById('masteradminControls');
    if (controls) controls.style.display = 'block';

    if (typeof renderLoginLog === 'function') renderLoginLog();
  }

  if (role === 'employee') {
    const employeePanel = document.getElementById('employeePanel');
    if (employeePanel) employeePanel.style.display = 'block';
  }

  // 🔍 Registry Acknowledgment Block
  const cardID = localStorage.getItem('activeCard');
  const registry = JSON.parse(localStorage.getItem('userRegistry') || '{}');
  const entry = registry[cardID];

  const roleStatus = document.getElementById('roleStatus');
  const approvalStatus = document.getElementById('approvalStatus');
  const userName = document.getElementById('userName');

  if (entry) {
    if (roleStatus) roleStatus.textContent = `Tier: ${entry.tier}`;
    if (approvalStatus) approvalStatus.textContent = entry.activated ? '✅ Approved' : '⏳ Pending';
    if (userName) userName.textContent = `Name: ${entry.name}`;
    logAction(`Registry acknowledged for ${entry.name} (${entry.tier})`);
  } else {
    if (roleStatus) roleStatus.textContent = 'No registry entry found';
    if (approvalStatus) approvalStatus.textContent = 'Unknown';
    if (userName) userName.textContent = 'Unknown';
    logAction('No registry entry matched for activeCard');
  }
}

// ===============================
// 🧪 Login
// ===============================
function setRole() {
  const role = (document.getElementById('roleInput')?.value || '').trim().toLowerCase();
  const code = document.getElementById('adminPassword')?.value || '';

  const accessCodes = {
    admin: 'admin123',
    employee: 'emp456',
    masteradmin: 'triumph789'
  };

  if (accessCodes[role] && code === accessCodes[role]) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('sessionActive', 'true');

    const loginError = document.getElementById('loginError');
    if (loginError) loginError.textContent = '';

    logAction(`--- Session Start: ${role.toUpperCase()} ---`);

    // Reveal immediately
    revealPanels();

    // Reload to fully initialize
    location.reload();
  } else {
    const loginError = document.getElementById('loginError');
    if (loginError) loginError.textContent = 'Invalid role or access code.';
    logAction(`⚠️ Access denied for role: ${role}`);
  }
}

// ===============================
// 🚪 Logout
// ===============================
function logout() {
  localStorage.removeItem('userRole');
  localStorage.removeItem('sessionActive');
  location.reload();
}

// ===============================
// 🧭 DOM Ready
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  validateRegistry();
  loadCards();
  showSigilIfMasteradmin();

  // Critical: reveal based on localStorage userRole
  revealPanels();
});
