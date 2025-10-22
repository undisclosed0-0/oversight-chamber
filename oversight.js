// 🔐 Role Access Codes
const accessCodes = {
  admin: 'admin123',
  employee: 'emp456',
  masteradmin: 'triumph789'
};

// 🧭 Validate Role + Access Code
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

    // 📝 Log the event
    logAction(`--- Session Start: ${role.toUpperCase()} ---`);

    // 🟢 PANEL REVEAL (insert here)
    revealPanels();

    // 🔄 Reload to fully initialize
    location.reload();
  } else {
    const loginError = document.getElementById('loginError');
    if (loginError) loginError.textContent = 'Invalid role or access code.';
    logAction(`⚠️ Access denied for role: ${role}`);
  }
}
}

// 🧼 Logout Ritual
function logout() {
  localStorage.removeItem('userRole');
  localStorage.removeItem('sessionActive');
  logAction('User logged out. Session ended.');
  location.reload();
}

// 🧪 Registry Integrity Check
function validateRegistry() {
  const registry = JSON.parse(localStorage.getItem('userRegistry') || '{}');
  if (!registry || typeof registry !== 'object') {
    logAction('⚠️ Registry invalid or missing. Resetting.');
    localStorage.setItem('userRegistry', JSON.stringify({}));
  }
}

// 📜 Log Action
function logAction(text) {
  const log = document.getElementById('logEntries');
  const time = new Date().toLocaleString();
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `[${time}] ${text}`;
  log.prepend(entry);
}

// 🧬 Load Cards
function loadCards() {
  const list = document.getElementById('cardList');
  list.innerHTML = '';
  let found = false;

  for (let key in localStorage) {
    if (key.startsWith('CARD-')) {
      found = true;
      const status = localStorage.getItem(key);
      const entry = document.createElement('div');
      entry.className = 'card-entry';
      entry.innerHTML = `
        <div class="card-id">${key}</div>
        <div class="status ${status}">Status: ${status}</div>
        <button onclick="resetCard('${key}')">Reset</button>
        <button onclick="deleteCard('${key}')">Delete</button>
        <button onclick="previewQRCode('${key}')">QR Preview</button>
      `;
      list.appendChild(entry);
    }
  }

  if (!found) list.innerHTML = '<p>No cards found.</p>';
}

// 🔄 Reset Card
function resetCard(id) {
  if (localStorage.getItem('lockoutActive') === 'true') {
    alert('Card actions are currently locked.');
    return;
  }
  localStorage.setItem(id, 'unused');
  logAction(`Reset ${id} to unused`);
  loadCards();
}

// 🗑️ Delete Card
function deleteCard(id) {
  if (localStorage.getItem('lockoutActive') === 'true') {
    alert('Card actions are currently locked.');
    return;
  }
  if (confirm(`Delete ${id}?`)) {
    localStorage.removeItem(id);
    logAction(`Deleted ${id}`);
    loadCards();
  }
}

// 🪄 Issue Card
function issueCard() {
  if (localStorage.getItem('lockoutActive') === 'true') {
    alert('Card actions are currently locked.');
    return;
  }
  const id = document.getElementById('newCardId').value.trim();
  if (id && id.startsWith('CARD-')) {
    localStorage.setItem(id, 'unused');
    logAction(`Issued ${id}`);
    document.getElementById('newCardId').value = '';
    loadCards();
  } else {
    alert('Use a valid ID starting with "CARD-"');
  }
}

// 🧿 QR Preview
function previewQRCode(id) {
  const qr = document.getElementById('qrPreview');
  qr.innerHTML = `<h4>Sigil Preview for ${id}</h4><div id="qrCode"></div>`;
  new QRCode(document.getElementById("qrCode"), {
    text: `redeem.html?card=${id}`,
    width: 120,
    height: 120
  });
  logAction(`Previewed sigil for ${id}`);
}

// 🌀 Sigil Rotation
function rotateSigilImage() {
  const sigilContainer = document.getElementById('sigilContainer');
  const sigil = document.createElement('div');
  sigil.className = 'masteradmin-sigil';

  const sigilImages = [
    'https://copilot.microsoft.com/th/id/BCO.185f3faa-1f2f-4180-bc3a-e898ae0b5bef.png'
  ];

  const index = Math.floor(Date.now() / (1000 * 60 * 60 * 3)) % sigilImages.length;
  sigil.style.backgroundImage = `url('${sigilImages[index]}')`;

  sigilContainer.innerHTML = '';
  sigilContainer.appendChild(sigil);
}

// 🌀 Manual Sigil Rotation
function rotateSigilManually() {
  const sigilContainer = document.getElementById('sigilContainer');
  const sigil = document.createElement('div');
  sigil.className = 'masteradmin-sigil';

  const sigilImages = [
    'https://copilot.microsoft.com/th/id/BCO.185f3faa-1f2f-4180-bc3a-e898ae0b5bef.png'
  ];

  let currentIndex = parseInt(localStorage.getItem('sigilIndex') || '0');
  currentIndex = (currentIndex + 1) % sigilImages.length;
  localStorage.setItem('sigilIndex', currentIndex);

  sigil.style.backgroundImage = `url('${sigilImages[currentIndex]}')`;
  sigilContainer.innerHTML = '';
  sigilContainer.appendChild(sigil);
  logAction('Sigil manually rotated');
}

// 📤 Export Log
function exportLog() {
  const entries = document.getElementById('logEntries').innerText;
  const blob = new Blob([entries], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'prestigetriumph_log.txt';
  link.click();
  logAction('Oversight log exported');
}

// 🔐 Lockout Controls
function triggerLockout() {
  localStorage.setItem('lockoutActive', 'true');
  alert('Lockout triggered. Card actions are now disabled.');
  logAction('Masteradmin triggered lockout');
}

function liftLockout() {
  localStorage.removeItem('lockoutActive');
  alert('Lockout lifted. Card actions are now enabled.');
  logAction('Masteradmin lifted lockout');
}

// ⏱️ Clock In / Out
function clockIn() {
  const cardID = localStorage.getItem('activeCard');
  const log = JSON.parse(localStorage.getItem('loginLog') || '[]');
  log.push({ cardID, action: 'Clock In', time: Date.now() });
  localStorage.setItem('loginLog', JSON.stringify(log));
  logAction(`Clock In by ${cardID}`);
  alert('Clocked in.');
}

function clockOut() {
  const cardID = localStorage.getItem('activeCard');
  const log = JSON.parse(localStorage.getItem('loginLog') || '[]');
  log.push({ cardID, action: 'Clock Out', time: Date.now() });
  localStorage.setItem('loginLog', JSON.stringify(log));
  logAction(`Clock Out by ${cardID}`);
  alert('Clocked out.');
}

// 🧾 Login Log Viewer
function renderLoginLog() {
  const role = localStorage.getItem('userRole');
  if (role === 'admin' || role === 'masteradmin') {
    const panel = document.getElementById('loginLogPanel');
    if (panel) panel.style.display = 'block';

    const log = JSON.parse(localStorage.getItem('loginLog') || '[]');
    const container = document.getElementById('loginLogEntries');
    if (container) {
      container.innerHTML = '';
      log.forEach(entry => {
        const time = new Date(entry.time).toLocaleString();
        container.innerHTML += `<p>${entry.cardID} — ${entry.action} at ${time}</p>`;
      });
    }
  }
}

// 🔐 Masteradmin Card Controls
function renameCard() {
  const cardID = localStorage.getItem('activeCard');
  const newName = document.getElementById('renameCardInput').value;
  const registry = JSON.parse(localStorage.getItem('userRegistry') || '{}');

  if (registry[cardID]) {
    registry[cardID].name = newName;
    localStorage.setItem('userRegistry', JSON.stringify(registry));
    logAction(`Card ${cardID} renamed to ${newName}`);
    alert(`Card renamed to ${newName}`);
    location.reload();
  } else {
    alert('No active card found.');
  }
}

function deleteCard() {
  const cardID = localStorage.getItem('activeCard');
  const registry = JSON.parse(localStorage.getItem('userRegistry') || '{}');

  if (registry[cardID]) {
    delete registry[cardID];
    localStorage.setItem('userRegistry', JSON.stringify(registry));
    logAction(`Card ${cardID} deleted`);
    alert(`Card ${cardID} deleted`);
    location.reload();
  } else {
    alert('No active card found.');
  }
}




function revealPanels() {
  const role = localStorage.getItem('userRole');

  // Must have a role to reveal anything
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

  // Registry display is optional but safe to run here
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
    if (typeof logAction === 'function') logAction(`Registry acknowledged for ${entry.name} (${entry.tier})`);
  } else {
    if (roleStatus) roleStatus.textContent = 'No registry entry found';
    if (approvalStatus) approvalStatus.textContent = 'Unknown';
    if (userName) userName.textContent = 'Unknown';
    if (typeof logAction === 'function') logAction('No registry entry matched for activeCard');
  }
}






// 🧭 DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  validateRegistry();
  loadCards();
  showSigilIfMasteradmin();

  // Critical: reveal based on localStorage userRole
  revealPanels();

  const role = localStorage.getItem('userRole');
  if (role) {
    document.getElementById('logoutBar').style.display = 'block';
    document.getElementById('sessionStatus').textContent = `Logged in as: ${role.toUpperCase()}`;

    // 🔍 Registry Acknowledgment Block
    const cardID = localStorage.getItem('activeCard');
    const registry = JSON.parse(localStorage.getItem('userRegistry') || '{}');
    const entry = registry[cardID];

    if (entry) {
      document.getElementById('roleStatus').textContent = `Tier: ${entry.tier}`;
      document.getElementById('approvalStatus').textContent = entry.activated ? '✅ Approved' : '⏳ Pending';
      document.getElementById('userName').textContent = `Name: ${entry.name}`;
      logAction(`Registry acknowledged for ${entry.name} (${entry.tier})`);
    } else {
      document.getElementById('roleStatus').textContent = 'No registry entry found';
      document.getElementById('approvalStatus').textContent = 'Unknown';
      document.getElementById('userName').textContent = 'Unknown';
      logAction('No registry entry matched for activeCard');
    }

    if (role === 'admin' || role === 'masteradmin') {
      document.getElementById('cardIssuance').style.display = 'block';
      renderLoginLog();
      const controls = document.getElementById('masteradminControls');
      if (role === 'masteradmin' && controls) controls.style.display = 'block';
    }
  }

  if (role === 'admin') {
    document.getElementById('adminPanel').style.display = 'block';
  }

  if (role === 'employee') {
    document.getElementById('employeePanel').style.display = 'block';
  }
 // <-- only one closing brace/paren here
