function show(id){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => show(btn.dataset.target));
});
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => show(btn.dataset.target));
});

// Buy logic
document.querySelectorAll('.buy').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const item = card.dataset.item;
    const status = card.querySelector('[data-status]');
    status.textContent = `Pending verification for ${item}`;
    status.classList.add('pending');
  });
});

// Prayer log
const LS_PRAYERS = 'prayers_demo';
function renderPrayers(){
  const log = document.getElementById('prayerLog');
  const prayers = JSON.parse(localStorage.getItem(LS_PRAYERS) || '[]');
  log.innerHTML = prayers.map(p => `<div>🕊 ${p}</div>`).join('');
}
document.getElementById('submitPrayer').addEventListener('click', () => {
  const input = document.getElementById('prayerInput');
  const prayers = JSON.parse(localStorage.getItem(LS_PRAYERS) || '[]');
  prayers.push(input.value.trim());
  localStorage.setItem(LS_PRAYERS, JSON.stringify(prayers));
  input.value = '';
  renderPrayers();
});
renderPrayers();
