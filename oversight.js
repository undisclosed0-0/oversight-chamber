// 🔐 Role Access Codes
const accessCodes = {
  admin: 'admin123',
  employee: 'emp456',
  masteradmin: 'triumph789'
};

// 🧭 Validate Role + Access Code
function setRole() {
  const role = document.getElementById('roleInput').value.trim().toLowerCase();
  const code = document.getElementById('adminPassword').value;

  if (accessCodes[role] && code === accessCodes[role]) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('sessionActive', 'true');
    logAction(`--- Session Start: ${role.toUpperCase()} ---`);
    location.reload();
  } else {
    alert('Invalid role or access code.');
    logAction(`⚠️ Access denied for role: ${role}`);
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

// 🧭 Role Reveal Logic
function showSigilIfMasteradmin() {
  const role = localStorage.getItem('userRole');
  if (role === 'masteradmin') {
    rotateSigilImage();
    document.querySelector('.admin-panel').classList.add('masteradmin-aura');
    document.getElementById('masteradminPanel').style.display = 'block';
    showFloatingCrest();
    logAction('Masteradmin sigil activated');
  } else if (role === 'admin') {
    document.querySelector('.admin-panel').classList.add('admin-aura');
  }
}

// 🪄 Crest Reveal
function showFloatingCrest() {
  const crest = document.getElementById('floatingCrest');
  if (crest) {
    crest.style.opacity = '1';
    crest.style.transition = 'opacity 0.5s ease-in-out';
    logAction('Unifiedfront crest revealed');
  }
}

// 🧼 Hide Crest
function hideFloatingCrest() {
  const crest = document.getElementById('floatingCrest');
  if (crest) {
    crest.style.opacity = '0';
    logAction('Floating crest hidden');
  }
}

// 🧭 DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  validateRegistry();
  loadCards();
  showSigilIfMasteradmin();
});
