function setRole() {
  const role = document.getElementById('roleInput').value.trim().toLowerCase();
  const password = document.getElementById('adminPassword').value;
  const storedPassword = localStorage.getItem('adminPassword') || 'Triumph123';

  if (role === 'admin' && password === storedPassword) {
    localStorage.setItem('userRole', role);
    location.reload();
  } else {
    alert('Invalid role or password.');
  }
}

function showSigilIfMasteradmin() {
  const role = localStorage.getItem('userRole');
  if (role === 'masteradmin') {
    document.querySelector('.admin-panel').classList.add('masteradmin-aura');
    document.getElementById('masteradminPanel').style.display = 'block';
    rotateSigilImage();
  } else if (role === 'admin') {
    document.querySelector('.admin-panel').classList.add('admin-aura');
    document.getElementById('adminPanel').style.display = 'block';
  }
}

function rotateSigilImage() {
  const sigilContainer = document.getElementById('sigilContainer');
  const sigil = document.createElement('div');
  sigil.className = 'masteradmin-sigil';
  sigil.style.backgroundImage = `url('https://copilot.microsoft.com/th/id/BCO.185f3faa-1f2f-4180-bc3a-e898ae0b5bef.png')`;
  sigilContainer.innerHTML = '';
  sigilContainer.appendChild(sigil);
}

document.addEventListener('DOMContentLoaded', () => {
  showSigilIfMasteradmin();
});
