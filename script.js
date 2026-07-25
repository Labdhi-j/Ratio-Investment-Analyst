/* ── COPY & CLEAR ─────────────────────────────────────────────── */
document.getElementById('copy-btn').addEventListener('click', function () {
  var val = document.getElementById('fin-data').value.trim();
  if (!val) {
    alert('Please paste some financial data first.');
    return;
  }
  navigator.clipboard.writeText(val).then(function () {
    var btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = 'Copy & Send to Agents'; }, 2000);
  }).catch(function () {
    alert('Copy failed — please select and copy the text manually.');
  });
});

document.getElementById('clear-btn').addEventListener('click', function () {
  document.getElementById('fin-data').value = '';
});

/* ── LOADING INDICATOR LOGIC ──────────────────────────────────── *
 *
 * The watsonx Orchestrate embed loads an iframe asynchronously.
 * We show a spinner overlay immediately, then hide it once we
 * detect that the iframe has appeared inside the root element.
 * If the iframe takes longer than TIMEOUT_MS we assume it loaded
 * anyway and remove the overlay so the UI is never permanently blocked.
 *
 * Panel config:
 *   rootId    – id of the div the embed targets
 *   statusId  – id of the <span> in the panel header
 *   overlayId – id of the loading overlay element
 */
var PANELS = [
  { rootId: 'ledger-root',  statusId: 'ledger-status',  overlayId: 'ledger-overlay' },
  { rootId: 'verdict-root', statusId: 'verdict-status', overlayId: 'verdict-overlay' }
];

var POLL_INTERVAL_MS = 400;   // check every 400 ms
var TIMEOUT_MS       = 30000; // give up after 30 s

PANELS.forEach(function (panel) {
  var startTime = Date.now();

  var interval = setInterval(function () {
    var root    = document.getElementById(panel.rootId);
    var overlay = document.getElementById(panel.overlayId);
    var status  = document.getElementById(panel.statusId);

    // Consider the agent "ready" when an iframe has been injected
    var hasIframe = root && root.querySelector('iframe') !== null;
    var timedOut  = (Date.now() - startTime) >= TIMEOUT_MS;

    if (hasIframe || timedOut) {
      clearInterval(interval);

      // Fade out overlay
      if (overlay) {
        overlay.classList.add('hidden');
        // Remove from DOM after transition so it can't block clicks
        setTimeout(function () {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 450);
      }

      // Update header status badge
      if (status) {
        status.classList.remove('loading');
        status.classList.add('ready');
        status.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:var(--ledger);display:inline-block;"></span> Ready';
      }
    }
  }, POLL_INTERVAL_MS);
});
