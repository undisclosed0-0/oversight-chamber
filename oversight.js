// ===== Logging =====
function logAction(text) {
  const log = document.getElementById('logEntries');
  if (!log) return;
  const time = new Date().toLocaleString();
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `[${time}] ${text}`;
  log.prepend(entry);
}

// ===== Card mechanics =====
function generateCeremonialName(tier) {
  const titles = {
    Initiate: ['of the First Flame','of Quiet Resolve','of the Outer Ring'],
    Steward: ['of the Third Tier','of the Bound Sigil','of the Vigilant Fold'],
    Admin: ['of the Silent Crest','of the Inner Vault','of the Iron Seal'],
    Masteradmin: ['of the Final Chamber','of the Oversight Flame','of the Eternal Archive']
  };
  const prefix = ['Solenne','Thalos','Velan','Nyra','Kael','Orin','Seren','Dren'];
  const titleSet = titles[tier] || ['of the Unknown Tier'];
  return `${prefix[Math.floor(Math.random()*prefix.length)]} ${titleSet[Math.floor(Math.random()*titleSet.length)]}`;
}

function loadCards() {
  const registry = JSON.parse(localStorage.getItem('userRegistry')) || {};
  const list = document.getElementById('cardList');
  if (!list) return;
  list.innerHTML = '';
  let found = false;
  for (let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('CARD-')) continue;
    found = true;
    const status = localStorage.getItem(key);
    const tier = registry[key]?.tier || 'Unknown';
    const entry = document.createElement('div');
    entry.className = `card-entry aura-${tier}`;
    entry.innerHTML = `
      <div class="card-id">${key}</div>
      <div class="status ${status}">Status: ${status}</div>
      <div>Tier: ${tier}</div>
      <button onclick="activateCard('${key}')">Activate</button>
      <button onclick="resetCard('${key}')">Reset</button>
      <button onclick="deleteCard('${key}')">Delete</button>
      <button onclick="previewQRCode('${key}')">QR Preview</button>
    `;
    list.appendChild(entry);
  }
  if (!found) list.innerHTML = '<p>No cards found.</p>';
}

function renderRegistryViewer() {
  const registry = JSON.parse(localStorage.getItem('userRegistry')) || {};
  const container = document.getElementById('registryEntries');
  if (!container) return;
  container.innerHTML = '';
  for (let name in registry) {
    const entry = registry[name];
    const auraClass = `aura-${entry.tier}`;
    const status = entry.activated ? 'Active' : 'Pending';
    const statusColor = entry.activated ? '#28a745' : '#f0ad4e';
    const div = document.createElement('div');
    div.className = `card-entry ${auraClass}`;
    div.innerHTML = `
      <strong>${name}</strong><br>
      Card ID: <span class="card-id">${entry.card}</span><br>
      Tier: ${entry.tier}<br>
      Status: <span style="color:${statusColor}; font-weight:bold;">${status}</span><br>
      Created: ${new Date(entry.created).toLocaleString()}<br>
      <button onclick="renameEntry('${name}')">Rename</button>
    `;
    container.appendChild(div);
  }
}

// ===== Placeholder stubs =====
window.issueCard = function() { alert("Issue card logic here"); };
window.activateCard = function(id) { alert("Activate " + id); };
window.resetCard = function(id) { alert("Reset " + id); };
window.deleteCard = function(id) { alert("Delete " + id); };
window.renameEntry = function(oldName) { alert("Rename " + oldName); };
window.previewQRCode = function(id) { alert("Preview QR for " + id); };
window.exportRegistry = function() { alert("Export registry"); };

// ===== Access control =====
let currentRole = null;
let sessionTimer = null;

function setRole() {
  const role = document.getElementById('roleInput').value.toLowerCase();
  const password = document.getElementById('adminPassword').value;

  if (password !== 'Triumph123') {
    alert('Invalid role or password');
    return;
  }

  currentRole = role;
  localStorage.setItem('userRole', role);
  localStorage.setItem('sessionActive', 'true');

  document.getElementById('roleContent')?.style.display = 'block';
  document.getElementById('logoutBar')?.style.display = 'block';
  document.getElementById('sessionStatus').textContent = `Logged in as: ${role.toUpperCase()}`;

  if (role === 'admin' || role === 'masteradmin') {
    document.getElementById('cardIssuance')?.style.display = 'block';
  }

  revealPanelForRole(role);
  loadCards();
  logAction(`--- Session Start: ${role.toUpperCase()} ---`);

  if (sessionTimer) clearTimeout(sessionTimer);
  sessionTimer = setTimeout(() => {
    alert('Session expired. Please log in again.');
    window.logout();
  }, 15 * 60 * 1000);
}
function revealPanelForRole(role) {
  ['masteradminPanel','adminPanel','employeePanel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
    }
  });

  const crest = document.getElementById('floatingCrest');
  if (crest) crest.style.opacity = "0";

  if (role === 'masteradmin') {
    const p = document.getElementById('masteradminPanel');
    p.style.display = 'block';
    p.style.visibility = 'visible';
    p.style.opacity = '1';
    if (crest) crest.style.opacity = "1";
  }
  if (role === 'admin') {
    const p = document.getElementById('adminPanel');
    p.style.display = 'block';
    p.style.visibility = 'visible';
    p.style.opacity = '1';
  }
  if (role === 'employee') {
    const p = document.getElementById('employeePanel');
    p.style.display = 'block';
    p.style.visibility = 'visible';
    p.style.opacity = '1';
  }
}

window.logout = function() {
  ['masteradminPanel','adminPanel','employeePanel','floatingCrest'].forEach(id => {
    document.getElementById(id)?.classList.add('logout-fade');
  });

  setTimeout(() => {
    currentRole = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('sessionActive');
    if (sessionTimer) clearTimeout(sessionTimer);
    sessionTimer = null;

    ['masteradminPanel','adminPanel','employeePanel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('logout-fade');
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      }
    });

    document.getElementById('roleContent').style.display = 'none';
    document.getElementById('logoutBar').style.display = 'none';
    document.getElementById('sessionStatus').textContent = '';
    logAction('User logged out. Session ended.');
  }, 1000);
};

