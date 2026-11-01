(function(){
  const REQUIRED_MARKET_IDS = [
    'login-btn','login-input','password-input','logout-btn',
    'market-filter-team','market-filter-position','market-grid','my-team-grid',
    'offer-badge','back-from-market','transfer-money-btn','transfer-money-close','transfer-money-modal','transfer-submit-btn',
    'make-offer-btn','make-offer-close','make-offer-modal','offer-submit-btn',
    'view-offers-btn','view-offers-close','view-offers-modal','transfers-list','notification-market'
  ];

  const originalGetElementById = document.getElementById.bind(document);
  const created = new Map();

  document.getElementById = function(id) {
    const el = originalGetElementById(id);
    if (el) return el;
    if (!REQUIRED_MARKET_IDS.includes(id)) return null;
    if (!created.has(id)) {
      const fake = document.createElement('div');
      fake.id = id;
      fake.style.display = 'none';
      fake.setAttribute('data-market-safe', 'true');
      document.body.appendChild(fake);
      created.set(id, fake);
    }
    return created.get(id);
  };

  const originalQuerySelectorAll = document.querySelectorAll.bind(document);
  document.querySelectorAll = function(selector) {
    const items = originalQuerySelectorAll(selector);
    if (selector === '.page' || selector === '.sort-btn' || selector === '.admin-section-tab' || selector === '.admin-tab-content' || selector === '.player-card') {
      return items;
    }
    return items;
  };
})();
