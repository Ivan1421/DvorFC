(function(){
  const KNOWN_MARKET_IDS = new Set([
    'captain-name','budget-display','captain-avatar','login-btn','login-input','password-input','logout-btn',
    'market-filter-team','market-filter-position','market-grid','my-team-grid','my-team-section','offer-badge',
    'back-from-market','transfer-money-btn','transfer-money-close','transfer-money-modal','transfer-submit-btn',
    'make-offer-btn','make-offer-close','make-offer-modal','offer-submit-btn','view-offers-btn',
    'view-offers-close','view-offers-modal','transfers-list','notification-market','market-state','market-data'
  ]);

  const originalGetElementById = document.getElementById.bind(document);
  const ghostElements = new Map();

  function createGhostElement(id) {
    const el = document.createElement('div');
    el.id = id;
    el.style.display = 'none';
    el.hidden = true;
    el.setAttribute('data-market-safe', 'true');
    el.textContent = '';
    el.value = '';
    el.innerHTML = '';
    return el;
  }

  document.getElementById = function(id) {
    const found = originalGetElementById(id);
    if (found) return found;

    if (typeof id !== 'string') return null;

    const shouldGhost = (
      KNOWN_MARKET_IDS.has(id) ||
      id.includes('market') ||
      id.includes('offer') ||
      id.includes('transfer') ||
      id.includes('captain') ||
      id.includes('budget') ||
      id.includes('login') ||
      id.includes('logout')
    );

    if (!shouldGhost) return null;

    if (!ghostElements.has(id)) {
      ghostElements.set(id, createGhostElement(id));
    }

    return ghostElements.get(id);
  };
})();

const playstyleDescriptions = {
