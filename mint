<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Prestige Vault</title>
  <link href="https://fonts.googleapis.com/css2?family=Georgia&display=swap" rel="stylesheet" />
  <style>
    /* CSS goes here — see section 2 below */
    body { background: radial-gradient(circle at top center, #f8f5f0 0%, #3b2f2f 100%); font-family: 'Georgia', serif; padding: 40px; color: #2f2520; } h1 { text-align: center; margin-bottom: 30px; } #dashboard { position: sticky; top: 0; background: linear-gradient(to right, #d8b86a, #c2a76d, #a88947); padding: 12px 24px; border-bottom: 3px solid #a88947; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000; margin-bottom: 40px; } .hud { display: flex; justify-content: space-between; align-items: center; color: #2f2520; font-weight: bold; font-size: 16px; } .hud-section { display: flex; align-items: center; gap: 8px; } .hud-button { background: #2f2520; color: #f8f5f0; padding: 6px 12px; border-radius: 8px; text-decoration: none; box-shadow: 0 0 8px rgba(0,0,0,0.3); transition: background 0.3s; } .hud-button:hover { background: #4a3a2f; } .preview-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-bottom: 40px; } {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px; /* lock in a height */
}

main, .content-wrapper {
  margin-top: 70px; /* push content below dashboard */
}
 .token-preview { background: radial-gradient(circle at center, #fefcea, #d4af37); border: 3px solid #a88947; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; color: #2f2520; text-shadow: 0 0 3px rgba(194,167,109,0.6); box-shadow: 0 0 12px rgba(194,167,109,0.3); cursor: pointer; transition: transform 0.2s, box-shadow 0.3s; } .token-preview:hover { transform: scale(1.1); box-shadow: 0 0 18px rgba(255,215,0,0.4); } .token-display { display: flex; justify-content: center; margin-bottom: 0px; } .card { perspective: 1000px; } .card-inner { position: relative; width: 320px; height: 360px; transition: transform 0.8s; transform-style: preserve-3d; } .card:hover .card-inner { transform: rotateY(180deg); } .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; } .card-front { background: transparent; display: flex; align-items: center; justify-content: center; flex-direction: column; } .card-back { background: radial-gradient(circle at center, #fefcea, #e0e0e0); transform: rotateY(180deg); display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 24px; box-shadow: 0 0 20px rgba(194,167,109,0.3); } .token-coin { margin-top: -160px; /* Raise it upward */width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle at center, #fefcea, #d4af37); border: 6px solid #c2a76d; box-shadow: inset 0 0 12px #fff3b0, 0 0 20px rgba(194,167,109,0.6), 0 0 40px rgba(60,42,93,0.2); display: flex; align-items: center; justify-content: center; flex-direction: column; animation: floatCoin 4s ease-in-out infinite; } @keyframes floatCoin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } @keyframes glowPulse { 0% { box-shadow: 0 0 0px rgba(255,215,0,0); } 50% { box-shadow: 0 0 20px rgba(255,215,0,0.6); } 100% { box-shadow: 0 0 0px rgba(255,215,0,0); } } .crest-core { width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle at center, #3b2f2f, #2f2520); border: 4px solid #a88947; box-shadow: inset 0 0 10px rgba(255,255,255,0.2), 0 0 12px rgba(194,167,109,0.3); display: flex; align-items: center; justify-content: center; } .crest-text { font-size: 14px; color: #c2a76d; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 0 6px rgba(194,167,109,0.6); } .denomination { margin-top: 10px; font-size: 18px; font-weight: bold; color: #2f2520; text-shadow: 0 0 4px rgba(194,167,109,0.6); } .qr-info { font-size: 15px; color: #2f2520; font-weight: bold; text-align: center; text-shadow: 0 0 2px rgba(255,255,255,0.3); margin-bottom: 12px; } .select-btn { padding: 10px 20px; background: linear-gradient(to right, #d8b86a, #c2a76d, #a88947); color: #2f2520; font-weight: bold; font-size: 14px; border: 2px solid #a88947; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2), inset 0 0 6px rgba(255,255,255,0.3); cursor: pointer; transition: transform 0.2s, box-shadow 0.3s; } .select-btn:hover { transform: scale(1.05); box-shadow: 0 0 12px rgba(194,167,109,0.6), inset 0 0 8px rgba(255,255,255,0.4); } .select-btn:disabled { background: linear-gradient(to right, #bbb, #999); color: #f8f5f0; cursor: default; box-shadow: none; text-decoration: line-through; } .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 32px; color: rgba(0,0,0,0.03); font-weight: bold; font-family: 'Georgia', serif; letter-spacing: 2px; pointer-events: none; } .rarity-bronze { box-shadow: 0 0 12px #CD7F32; } .rarity-silver { box-shadow: 0 0 12px #C0C0C0; } .rarity-gold { box-shadow: 0 0 16px #FFD700; } .token-coin.rarity-bronze { box-shadow: 0 0 20px #CD7F32, inset 0 0 12px #CD7F32; } .token-coin.rarity-silver { box-shadow: 0 0 20px #C0C0C0, inset 0 0 12px #C0C0C0; } .token-coin.rarity-gold { box-shadow: 0 0 24px #FFD700, inset 0 0 14px #FFD700; } #logList li { padding: 6px 0; border-bottom: 1px dashed #a88947; margin-bottom: 6px; color: #2f2520; line-height: 1.4; }/* Collapsed by default */
#scrollLog {
  max-height: 45px;       /* just enough to show the header or first line */
  overflow: hidden;       /* hide the rest */
  transition: none;       /* no animation */
  cursor: pointer;        /* indicate it's interactive */
  border-top: 2px solid #a88947;
  border-bottom: 2px solid #a88947;
  padding: 4px 0;
}

/* On hover, reveal all items */
#scrollLog:hover {
  max-height: 300px;      /* enough to show all items */
  overflow-y: auto;       /* allow scrolling if too many */
}
#scrollLog::before {
  content: "📜 Scroll Log (hover to expand)";
  display: block;
  text-align: center;
  font-weight: bold;
  color: #2f2520
   background: linear-gradient(to right, #d8b86a, #c2a76d, #a88947);
  border-bottom: 1px dashed #a88947;
  padding: 4px;
}


#logList {
  list-style: none;
  padding: 0;
  margin: 0;
}

#logList li {
  padding: 8px 0;
  margin-bottom: 8px;
  color: #2f2520;
  line-height: 1.4;
  position: relative;
}

#logList li::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #ffffff, #f8f5f0);
  box-shadow: 0 0 6px rgba(255,255,255,0.3);
  margin-top: 8px;
  border-radius: 1px;
}

 .clear-btn {
  margin-top: 12px;
  background: #2f2520;
  color: #fefcea;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
}
 .token-coin.pulse { animation: pulseHonor 1.2s ease-in-out; }  #qrCanvas { border: 3px solid #a88947; border-radius: 12px; box-shadow: 0 0 12px rgba(194,167,109,0.3); background: radial-gradient(circle at center, #fefcea, #e0e0e0); animation: shimmerQR 2s infinite; } @keyframes shimmerQR { 0% { box-shadow: 0 0 6px rgba(255,215,0,0.2); } 50% { box-shadow: 0 0 12px rgba(255,215,0,0.6); } 100% { box-shadow: 0 0 6px rgba(255,215,0,0.2); } } .denotation-panel { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 16px; background: radial-gradient(circle at center, #fefcea, #e0e0e0); border: 4px solid #a88947; border-radius: 20px; box-shadow: 0 0 20px rgba(194,167,109,0.3), inset 0 0 12px rgba(255,255,255,0.2); width: 240px; } .denotation-frame { padding: 12px; background: linear-gradient(to bottom right, #fffbe6, #e0d9c0); border-radius: 16px; box-shadow: 0 0 12px rgba(255,215,0,0.3); display: flex; flex-direction: column; align-items: center; }
  #vaultSummary {
  display: none;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to bottom right, #fffbe6, #e0d9c0);
  border: 4px solid #a88947;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 30px rgba(194,167,109,0.4), inset 0 0 12px rgba(255,255,255,0.2);
  z-index: 1000;
  opacity: 0.0; /* ← Adjust this value from 0 (fully transparent) to 1 (fully solid) */
  backdrop-filter: blur(4px);
}
.card-back {
  width: 300px;
  height: 180px;
  border-radius: 20px;
  background: radial-gradient(circle at center, #fefcea, #d4af37);
  border: 6px solid #c2a76d;
  box-shadow:
    inset 0 0 12px #fff3b0,
    0 0 24px rgba(194,167,109,0.6),
    0 12px 24px rgba(60,42,93,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: glowPulse 6s ease-in-out infinite;
  position: relative;
  padding: 16px;
}
#qrCanvas,
#qrCard {
  animation: floatCoin 4s ease-in-out infinite;
  animation-delay: 2s; /* starts halfway through the coin’s cycle */
}

.card-back .qr-info {
  font-size: 14px;
  color: #2f2520;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 2px rgba(255,255,255,0.3);
  margin-top: 8px;
}

.card-back .select-btn {
  margin-top: 10px;
  background: linear-gradient(to right, #d8b86a, #c2a76d, #a88947);
  color: #2f2520;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #a88947;
  border-radius: 10px;
  padding: 8px 16px;
  box-shadow:
    0 4px 10px rgba(0,0,0,0.2),
    inset 0 0 6px rgba(255,255,255,0.3);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;
}

.card-back .select-btn:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 12px rgba(194,167,109,0.6),
    inset 0 0 8px rgba(255,255,255,0.4);
}

.card-back .watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: rgba(0,0,0,0.03);
  font-weight: bold;
  font-family: 'Georgia', serif;
  letter-spacing: 2px;
  pointer-events: none;
}


.popup-notice {
  display: none; /* hidden by default */
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 2000;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fffbe6;
  border: 3px solid #a88947;
  border-radius: 12px;
  padding: 20px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 0 20px rgba(194,167,109,0.6);
  font-family: 'Georgia', serif;
  color: #2f2520;
}
/* Portrait orientation on phones/tablets */
@media screen and (max-width: 768px) and (orientation: portrait) {
  body {
    padding: 16px 12px;       /* reduce global padding */
    font-size: 14px;          /* scale down base text */
  }

  #dashboard {
    font-size: 14px;          /* smaller HUD text */
    padding: 8px 12px;
  }

  .hud-button {
    font-size: 7px;
    padding: 5px 10px;
  }

  .token-coin {
    width: 55vw;              /* slightly smaller coin */
    height: 55vw;
    max-width: 200px;
    max-height: 200px;
  }

  .denomination {
    font-size: 15px;
  }

  .qr-info {
    font-size: 13px;
  }

  .select-btn,
  .proceed-btn,
  .clear-btn {
    font-size: 13px;
    padding: 7px 14px;
  }

  .card-inner {
    width: 200%;
    height: auto;
    max-width: 320px;
  }

  .card-back {
    padding: 16px;
  }

  .denotation-panel {
    width: 200%;
    max-width: 280px;
    padding: 12px;
  }
}
/* Default (desktop/tablet): keep HUD in one row */
#dashboard .hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
}

/* Mobile portrait: stack wording and button */
@media (max-width: 768px) and (orientation: portrait) {
  #dashboard .hud {
    flex-direction: column;   /* stack vertically */
    align-items: flex-start;  /* wording left-aligned */
    gap: 6px;
  }

  #dashboard .hud-section {
    width: 100%;              /* each section full width */
  }

  #dashboard .hud-button {
    align-self: center;       /* center the Proceed button */
    font-size: 13px;
    padding: 7px 14px;
  }
}
/* Default button styling (desktop/tablet stays inline in HUD) */
.hud-button {
  background: linear-gradient(to right, #d8b86a, #c2a76d, #a88947);
  color: #2f2520;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #a88947;
  border-radius: 10px;
  padding: 8px 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2),
              inset 0 0 6px rgba(255,255,255,0.3);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.3s;
}

/* Hover effect (desktop only) */
.hud-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(194,167,109,0.6),
              inset 0 0 8px rgba(255,255,255,0.4);
}

/* Mobile: float bottom-right */
@media (max-width: 768px) {
  /* Remove .hud-button float here */
  /* .hud-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2000;
    font-size: 13px;
    padding: 10px 18px;
  } */
}

/* Keep only the Proceed button floating */
.proceed-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 2000;
}

/* Ensure dropdown stays in normal flow */
.chosen-token,
.token-dropdown {
  position: static !important;
  display: block;
  margin-top: 8px;
  margin-bottom: 60px;   /* ← extra breathing room so it clears the floating button */
  z-index: 100;
}


/* Keep only the Proceed button floating */
.proceed-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 2000;
}

   /* Shared container for coin + QR */
.token-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 90vw;   /* never exceed viewport width */
}

/* Coin sizing */
.token-coin {
  width: 40vw;       /* scale with viewport */
  height: 40vw;
  max-width: 220px;  /* respectful cap for tablets */
  max-height: 220px;
  min-width: 140px;  /* don’t shrink too tiny */
  min-height: 140px;
}



/* Portrait phones */
@media (max-width: 768px) and (orientation: portrait) {
  .token-coin {
    width: 50vw;
    height: 50vw;
    max-width: 180px;
    max-height: 180px;
  }

  #qrCard, #qrCanvas {
    width: 70vw;
    max-width: 220px;
  }
}

/* Landscape tablets/phones */
@media (max-width: 1024px) and (orientation: landscape) {
  .token-display {
    flex-direction: row;   /* coin + QR side by side */
    gap: 24px;
  }

  .token-coin {
    width: 28vw;
    height: 28vw;
    max-width: 160px;
    max-height: 160px;
  }

  #qrCard, #qrCanvas {
    width: 35vw;
    max-width: 200px;
  }
}
 /* QR card sizing + depth */
#qrCard, 
#qrCanvas {
  width: 36vw;              /* smaller than before */
  max-width: 180px;         /* respectful cap */
  min-width: 120px;
  height: auto;
  margin: 9px auto 0 auto; /* spacing so it doesn’t bury selector */

  border: 3px solid #a88947;
  border-radius: 14px;
  background: radial-gradient(circle at center, #fefcea, #e0e0e0);

  /* Depth effects */
  box-shadow:
    0 4px 10px rgba(0,0,0,0.25),
    inset 0 0 8px rgba(255,255,255,0.25);
  transform: perspective(800px) rotateX(3deg) rotateY(-3deg) scale(0.95);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;               /* keep it behind selectors/words */
}

/* Hover/active depth shimmer */
#qrCard:hover, 
#qrCanvas:hover {
  transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.02);
  box-shadow:
    0 8px 16px rgba(0,0,0,0.3),
    inset 0 0 10px rgba(255,255,255,0.35);
}

/* Portrait phones: stack and scale down */
@media (max-width: 768px) and (orientation: portrait) {
  #qrCard, #qrCanvas {
    width: 60vw;
    max-width: 160px;
    margin-top: 10px;
  }
}

/* Landscape tablets/phones: side-by-side with coin */
@media (max-width: 1024px) and (orientation: landscape) {
  #qrCard, #qrCanvas {
    width: 28vw;
    max-width: 150px;
  }
}


    
</style>
</head>
<body>

<h1>🏛️ Prestige Vault</h1> <hr style="border: none; height: 2px; background: linear-gradient(to right, #a88947, #c2a76d, #d8b86a); margin: 20px auto 40px; max-width: 400px;">

<div id="dashboard">
  <div class="hud">
    <div class="hud-section">🪙 Tokens: <span id="hudCount">0</span></div>
    <div class="hud-section">🔥 Total Prestige: <span id="hudTotal">0.00</span></div>
    <div class="hud-section">
      </div>
     <a id="hudLink" href="#" target="_blank" class="hud-button">🔗 Proceed to Ritual</a>
  </div>

  <!-- Scroll Log embedded -->
  <div id="scrollLog">
    <h3>📜 Selected Tokens</h3>
    <ul id="logList"></ul>
    <button id="clearLedger" class="clear-btn">☑ Archive & Reset</button>
  </div>
 
</div>
<!-- Token Selector -->
<label for="denominationSelect">🔑 Choose Token:</label><br>
<select id="denominationSelect" class="hud-button" style="margin-top: 6px;">
  <option value="">--</option>
  <option value="0.01">0.01 Prestige</option>
  <option value="0.10">0.10 Prestige</option>
  <option value="0.25">0.25 Prestige</option>
  <option value="1.00">1.00 Prestige</option>
  <option value="5.00">5.00 Prestige</option>
  <option value="10.00">10.00 Prestige</option>
  <option value="20.00">20.00 Prestige</option>
  <option value="50.00">50.00 Prestige</option>
  <option value="100.00">100.00 Prestige</option>
</select>

<!-- Coin Display -->
<div class="token-display" id="tokenDisplay">
  <div class="card">
    <div class="card-inner">
      <div class="card-front">
        <div class="token-coin">
          <div class="crest-core">
            <div class="crest-text">Prestige</div>
          </div>
          <div class="denomination" id="displayDenomination">--</div>
        </div>
      </div>
      <div class="card-back">
        <div class="denotation-bill">
          <canvas id="qrCanvas" width="955" height="95"></canvas>
          <div class="bill-denomination" id="displayDenomination">--</div>
          <div class="qr-info" id="qrInfo">Serial: --<br>Issued: --</div>
        </div>
        <button id="selectBtn" class="select-btn" disabled>Select</button>
        <div class="watermark">Prestige</div>
      </div>
    </div>
  </div>
</div>


<!-- Vault Summary -->
<div id="vaultSummary" style="display:none; position:fixed; bottom:400px; left:50%; transform:translateX(-50%);
background:#fefcea; border:2px solid #a88947; border-radius:12px; padding:20px; box-shadow:0 0 20px rgba(0,0,0,0.2); z-index:1000;">
  <h3 style="margin-top:0;">🏛️ Vault Summary</h3>
  <p id="summaryText" style="font-size:14px; color:#2f2520;"></p>
  <button onclick="document.getElementById('vaultSummary').style.display='none'" class="clear-btn">Close</button>
</div>
  
 


<script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></script>
<script>
  // JS goes here — see section 3 below
  const displayDenomination = document.getElementById('displayDenomination');
const qrInfo = document.getElementById('qrInfo');
const hudCount = document.getElementById('hudCount');
const hudTotal = document.getElementById('hudTotal');
const hudLink = document.getElementById('hudLink');
const qrCanvas = document.getElementById('qrCanvas');
const selectBtn = document.getElementById('selectBtn');
const logList = document.getElementById('logList');
const tokenDisplay = document.getElementById('tokenDisplay');
const denominationSelect = document.getElementById('denominationSelect');
const clearLedger = document.getElementById('clearLedger');
const vaultSummary = document.getElementById('vaultSummary');
const summaryText = document.getElementById('summaryText');

let selected = [];
let total = 0;

denominationSelect.onchange = (e) => {
  const value = parseFloat(e.target.value);
  if (!isNaN(value)) showToken(value);
};

clearLedger.onclick = () => {
  logList.innerHTML = '';
  selected = [];
  total = 0;
  hudCount.textContent = '0';
  hudTotal.textContent = '0.00';
  hudLink.href = '#';
  vaultSummary.style.display = 'none';
};

function showToken(value) {
  const serial = `PRG-${value.toFixed(2)}-${Date.now()}`;
  const issued = new Date().toISOString().split('T')[0];
  const payload = {
    denomination: value.toFixed(2),
    currency: "Prestige",
    serial: serial,
    issued: issued,
    redeem_url: `https://prestige.exchange/redeem/${serial}`
  };

  const coin = document.querySelector('.token-coin');
  coin.classList.remove('rarity-bronze', 'rarity-silver', 'rarity-gold');
  if (value >= 20.00) coin.classList.add('rarity-gold');
  else if (value >= 1.00) coin.classList.add('rarity-silver');
  else coin.classList.add('rarity-bronze');

  displayDenomination.textContent = payload.denomination;
  qrInfo.innerHTML = `Serial: ${payload.serial}<br>Issued: ${payload.issued}`;
  new QRious({
    element: qrCanvas,
    value: JSON.stringify(payload),
    size: 120
  });

  tokenDisplay.style.display = 'flex';
  selectBtn.disabled = false;
  selectBtn.textContent = ' Select';

  selectBtn.onclick = () => {
    selected.push(payload);
    total += parseFloat(payload.denomination);
    hudCount.textContent = selected.length;
    hudTotal.textContent = total.toFixed(2);
    hudLink.href = payload.redeem_url;
    selectBtn.textContent = ' Selected';
    selectBtn.disabled = true;

    coin.classList.add('pulse');
    setTimeout(() => {
      coin.classList.remove('pulse');
    }, 1200);

    summaryText.innerHTML = `
      You have selected <strong>${selected.length}</strong> tokens totaling <strong>${total.toFixed(2)} Prestige</strong>.
      <br>Last token: ${payload.denomination} Prestige — ${payload.serial}
    `;
    vaultSummary.style.display = 'block';

    const rarityIcon = value >= 20.00 ? '🟡' : value >= 1.00 ? '⚪' : '🟤';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logItem = document.createElement('li');
    logItem.innerHTML = `${rarityIcon} ${payload.denomination} Prestige<br><small>🕰️ ${timestamp} — ${payload.serial}</small>`;
    logList.appendChild(logItem);
  };
}

</script>
  
  
  <script>
function checkOrientation() {
  const notice = document.getElementById("orientationNotice");
  const message = document.getElementById("orientationMessage");

  // If user checked "don't show again", skip entirely
  if (localStorage.getItem("hideOrientationNotice") === "true") {
    notice.style.display = "none";
    return;
  }

  if (window.innerWidth < 768) {
    if (screen.orientation.type.startsWith("portrait")) {
      message.textContent = "📱 For best view: reduce size to 50% or rotate to landscape.";
      notice.style.display = "flex";
    } else {
      message.textContent = "📱 Landscape mode detected. Adjust to your preference.";
      notice.style.display = "flex";
    }
  } else {
    notice.style.display = "none";
  }
}

function dismissNotice() {
  const dontShow = document.getElementById("dontShowAgain").checked;
  if (dontShow) {
    localStorage.setItem("hideOrientationNotice", "true");
  }
  document.getElementById("orientationNotice").style.display = "none";
}

// Run once on load
window.addEventListener("load", checkOrientation);
// Only fire on actual orientation change, not every resize
screen.orientation.addEventListener("change", checkOrientation);
</script>

<div id="orientationNotice" class="popup-notice">
  <div class="popup-content">
    <p id="orientationMessage"></p>
    <label style="display:block; margin:8px 0; font-size:13px;">
      <input type="checkbox" id="dontShowAgain"> Don’t show again
    </label>
    <button onclick="dismissNotice()">OK</button>
  </div>
</div>


</body>
</html>
