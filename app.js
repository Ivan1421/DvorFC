const zvezdaPlayerIds = zvezdaPlayers.map(p => p.id);

const marketState = {
    currentCaptain: null,
    userEmail: null,
    transferList: [],
    pendingTransfers: {},
    transfers: [],
    offers: []
};

const marketData = { players: {} };
const INFINITE_PRICE_PLAYERS = [];
const INFINITE_PRICE_VALUE = 999999999;
const LOAN_CHECK_INTERVAL = 60000;

function ensureDomElement(id, tagName = 'div', attributes = {}) {
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement(tagName);
        el.id = id;
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'textContent') el.textContent = value;
            else if (key === 'className') el.className = value;
            else el.setAttribute(key, value);
        });
        el.style.display = attributes.styleDisplay || 'none';
        document.body.appendChild(el);
    }
    return el;
}

ensureDomElement('login-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('login-input', 'input', { type: 'text', className: 'hidden-market-ui' });
ensureDomElement('password-input', 'input', { type: 'password', className: 'hidden-market-ui' });
ensureDomElement('logout-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('market-filter-team', 'select', { className: 'hidden-market-ui' });
ensureDomElement('market-filter-position', 'select', { className: 'hidden-market-ui' });
ensureDomElement('market-grid', 'div', { className: 'hidden-market-ui' });
ensureDomElement('my-team-grid', 'div', { className: 'hidden-market-ui' });
ensureDomElement('offer-badge', 'span', { className: 'hidden-market-ui' });
ensureDomElement('back-from-market', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('transfer-money-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('transfer-money-close', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('transfer-money-modal', 'div', { className: 'hidden-market-ui' });
ensureDomElement('transfer-submit-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('make-offer-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('make-offer-close', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('make-offer-modal', 'div', { className: 'hidden-market-ui' });
ensureDomElement('offer-submit-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('view-offers-btn', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('view-offers-close', 'button', { type: 'button', className: 'hidden-market-ui' });
ensureDomElement('view-offers-modal', 'div', { className: 'hidden-market-ui' });
ensureDomElement('transfers-list', 'div', { className: 'hidden-market-ui' });
ensureDomElement('notification-market', 'div', { className: 'notification-market' });

function saveMarketData() {}
function updateMarketUI() {}
function renderMyTeam() {}
function renderTransfers() {}
function updateBudgetDisplay() {}
function updateOfferBadge() {}
function renderOffers() {}
function initMarket() {}

const allPlayerIds = Object.keys(playersData);
const allTeamPlayerIds = [...meraTeamIds, ...yard78PlayerIds, ...yuzhkaPlayerIds, ...arsenalPlayerIds, ...psgPlayerIds, ...zvezdaPlayerIds];
let currentPlayerIds = allPlayerIds.filter(id => !allTeamPlayerIds.includes(id));
let filteredPlayerIds = [...currentPlayerIds];
let activeSort = 'none';
let themeClickCount = 0;
let iqInterval = null;
let supabaseClient = null;
let adminLoggedIn = false;
let currentEditingMatchId = null;
let matchesData = [];
