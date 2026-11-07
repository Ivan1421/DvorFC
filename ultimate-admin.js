// ultimate-admin.js — управление DFL Ultimate из админ-панели сайта ДФЛ.
// Подключается в index.html ПОСЛЕ app.js. Использует глобалы app.js: supabaseClient, showNotification.
(function () {
'use strict';

// Каталог игроков Ultimate (ДЕРЖАТЬ ОБЯЗАТЕЛЬНО в синхроне с ALL_PLAYERS в dfl-ultimate.html): [id, имя, позиция, рейтинг]
const CATALOG = [
['nazar','Осинцев Назар','DF',56],['artem','Соколов Артём','FW',67],['EgorNast','Зверев Егор','MF',67],
['kuharskiy','Кухарский Тимофей','FW',76],['irakliy','Дарсалия Ираклий','FW',77],['maxronaldo','Максим Роналду','FW',77],
['matveyB','Матвей Бобов','GK',83],['david','Дарсалия Давид','MF',85],['andryushka','Бузмаков Андрей','FW',86],
['gleb','Глеб','DF',86],['haaland','Шапов Леонид','FW',87],['saveliy_78','Соколов Савелий','MF',88],
['elisey','Пожидаев Елисей','MF',90],['lesha_podavalny','Чурилов Алексей','MF',90],['batrakov','Кравченко Глеб','MF',91],
['demid','Пасько Демид','FW',91],['ivan','Новиков Иван','MF',91],['kostya','Лехнер Константин','GK',91],
['tankov','Танков Тимофей','MF',92],['bombar','Бадартинов Михаил','FW',92],['safonov','Сафонов Иван','MF',93],
['mes','Кирьянов Артём','MF',93],['shilov','Шилов Дмитрий','MF',93],['maxim','Бузмаков Максим','DF',94],
['raya','Шустик','GK',94],['shuklin','Шуклин Кирилл','MF',94],['diana','Епончинцева Диана','MF',94],
['timofey_zaytsev','Зайцев Тимофей','FW',94],['aleksey_doroshenko','Дорошенко Алексей','FW',95],
['sanya_bobrikov','Бобриков Александр','FW',95],['maxim_dcp','Максим ДЦП','GK',95],['russkov_artem','Руссё Диктатор','MF',98],
['ostap','Остап','MF',1]
];
const CAT = {}; CATALOG.forEach(c => CAT[c[0]] = { id: c[0], name: c[1], pos: c[2], rating: c[3] });
const TIERS = ['common', 'rare', 'epic', 'legend', 'icon'];
const TIER_LABEL = { common: 'Обычный', rare: 'Редкий', epic: 'Эпик', legend: 'Легенда', icon: 'Икона' };
const DEFAULT_PRICE = { common: 25, rare: 75, epic: 200, legend: 500, icon: 1200 };
const rarityOf = r => r >= 94 ? 'icon' : r >= 90 ? 'legend' : r >= 85 ? 'epic' : r >= 75 ? 'rare' : 'common';
const FIELD_ATTRS = [['fin','Завершение'],['sho','Удар'],['pas','Пас'],['dri','Дриблинг'],['def','Защита'],['phy','Физика'],['spd','Скорость']];
const GK_ATTRS = [['ref','Реакция'],['div','Бросок'],['han','Игра руками'],['kic','Удар от ворот'],['spd','Скорость'],['pos','Позиционирование']];

const S = { users: [], bans: {}, sel: null, sub: 'accounts', filter: 'all', q: '', prices: {}, cfgOther: {}, pending: [], custBase: 'raya' };
const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sb = () => { try { return supabaseClient; } catch (e) { return null; } };
const toast = (m, t) => { try { showNotification(m, t || 'success'); } catch (e) { alert(m); } };
const root = () => document.getElementById('admin-tab-ultimate');
const catName = id => (CAT[id] ? CAT[id].name : id);

function injectStyle() {
  if (document.getElementById('ult-admin-style')) return;
  const st = document.createElement('style'); st.id = 'ult-admin-style';
  st.textContent = `
  .ult-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
  .ult-bar input,.ult-bar select,.ult-box input,.ult-box select,.ult-prices input,.ult-prices select{padding:8px 10px;border-radius:8px;border:1px solid rgba(128,128,128,.4);background:rgba(128,128,128,.1);color:inherit;font:inherit;font-size:.85rem}
  .ult-bar input[type=text]{flex:1;min-width:160px}
  .ult-subtab{padding:8px 16px;border-radius:999px;border:1px solid rgba(128,128,128,.4);background:transparent;color:inherit;cursor:pointer;font-weight:700}
  .ult-subtab.on{background:#0066cc;color:#fff;border-color:#0066cc}
  .ult-row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border:1px solid rgba(128,128,128,.3);border-radius:10px;margin-bottom:8px;background:rgba(128,128,128,.07)}
  .ult-row.sel{border-color:#0066cc;box-shadow:0 0 0 1px #0066cc}
  .ult-sub{font-size:.74rem;opacity:.7;margin-top:2px}
  .ult-tag{font-size:.64rem;font-weight:800;padding:2px 8px;border-radius:999px;background:rgba(128,128,128,.25);margin-left:6px}
  .ult-tag.ban{background:#dc2626;color:#fff}
  .ult-tag.on{background:#16a34a;color:#fff}
  .ult-box{border:1px solid rgba(128,128,128,.3);border-radius:12px;padding:14px;margin:12px 0;background:rgba(128,128,128,.06)}
  .ult-box h4{margin-bottom:10px;font-size:.95rem}
  .ult-line{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
  .ult-line label{min-width:90px;font-size:.8rem;opacity:.8}
  .ult-btn{padding:8px 14px;border-radius:8px;border:none;background:#0066cc;color:#fff;font-weight:700;cursor:pointer;font-size:.8rem}
  .ult-btn.red{background:#dc2626}.ult-btn.green{background:#16a34a}.ult-btn.gray{background:#6b7280}
  .ult-attrs{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin:8px 0}
  .ult-attrs label{display:flex;flex-direction:column;font-size:.72rem;gap:3px}
  .ult-attrs input{width:100%}
  .ult-cards{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow:auto}
  .ult-prices{width:100%;border-collapse:collapse;font-size:.82rem}
  .ult-prices td,.ult-prices th{padding:6px 8px;border-bottom:1px solid rgba(128,128,128,.25);text-align:left}
  .ult-prices input[type=number]{width:90px}
  .ult-hint{font-size:.74rem;opacity:.7;margin:6px 0}
  `;
  document.head.appendChild(st);
}

async function load() {
  const r = root(); if (!r) return;
  injectStyle();
  if (!sb()) { r.innerHTML = '<p style="padding:20px">Supabase не подключен</p>'; return; }
  r.innerHTML = '<p style="padding:20px">Загрузка…</p>';
  try {
    const [u, b, c] = await Promise.all([
      sb().from('ultimate_saves').select('*').order('updated_at', { ascending: false }).limit(500),
      sb().from('ultimate_bans').select('*'),
      sb().from('ultimate_config').select('*').eq('id', 'config').maybeSingle()
    ]);
    if (u.error) throw u.error;
    S.users = u.data || [];
    S.bans = {}; (b.data || []).forEach(x => { S.bans[x.user_id] = x; });
    const cfg = (c.data && c.data.data) || {};
    S.prices = Object.assign({}, cfg.prices || {});
    S.cfgOther = Object.assign({}, cfg); delete S.cfgOther.prices;
  } catch (e) {
    r.innerHTML = '<p style="padding:20px">❌ Не удалось загрузить данные: ' + E(e.message || e) + '<br>Выполните ultimate.sql в Supabase → SQL Editor.</p>';
    return;
  }
  render();
}

function render() {
  const r = root(); if (!r) return;
  r.innerHTML = `
    <div class="ult-bar">
      <button class="ult-subtab ${S.sub === 'accounts' ? 'on' : ''}" data-act="sub" data-v="accounts">👥 Аккаунты</button>
      <button class="ult-subtab ${S.sub === 'shop' ? 'on' : ''}" data-act="sub" data-v="shop">🧩 Магазин (пазлы)</button>
      <button class="ult-btn gray" data-act="reload">🔄 Обновить</button>
    </div>
    <div id="ult-body"></div>`;
  S.sub === 'accounts' ? renderAccounts() : renderShop();
}

// ---------- Аккаунты ----------
function visibleUsers() {
  const q = S.q.trim().toLowerCase();
  return S.users.filter(u => {
    if (S.filter === 'users' && u.is_guest) return false;
    if (S.filter === 'guests' && !u.is_guest) return false;
    if (S.filter === 'banned' && !S.bans[u.user_id]) return false;
    if (q && !((u.name || '').toLowerCase().includes(q) || u.user_id.toLowerCase().includes(q))) return false;
    return true;
  });
}
function ago(ts) {
  const s = Math.max(0, (Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 90) return 'онлайн';
  if (s < 3600) return Math.floor(s / 60) + ' мин назад';
  if (s < 86400) return Math.floor(s / 3600) + ' ч назад';
  return Math.floor(s / 86400) + ' дн назад';
}
function renderAccounts() {
  const body = document.getElementById('ult-body');
  const list = visibleUsers();
  body.innerHTML = `
    <div class="ult-bar">
      <input type="text" id="ult-q" placeholder="Поиск по имени или ID…" value="${E(S.q)}">
      <select id="ult-filter">
        ${[['all','Все'],['users','Аккаунты'],['guests','Гости'],['banned','Забаненные']].map(o => `<option value="${o[0]}" ${S.filter === o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}
      </select>
      <span class="ult-hint">Всего: ${S.users.length}</span>
    </div>
    <div id="ult-list">${list.length ? list.map(rowHtml).join('') : '<p style="padding:16px;opacity:.7">Пока никто не заходил в DFL Ultimate (или нет совпадений).</p>'}</div>
    <div id="ult-detail"></div>`;
  if (S.sel) openUser(S.sel, true);
}
function rowHtml(u) {
  const d = u.data || {};
  const banned = S.bans[u.user_id];
  return `<div class="ult-row ${S.sel === u.user_id ? 'sel' : ''}">
    <div><b>${E(u.name || u.user_id)}</b><span class="ult-tag">${u.is_guest ? 'гость' : 'аккаунт'}</span>${banned ? '<span class="ult-tag ban">БАН</span>' : ''}${ago(u.updated_at) === 'онлайн' ? '<span class="ult-tag on">онлайн</span>' : ''}
      <div class="ult-sub">${E(u.user_id)} · 💰 ${d.coins ?? 0} · 🧩 ${d.fragments ?? 0} · 🃏 ${(d.owned || []).length} · ${ago(u.updated_at)}</div></div>
    <button class="ult-btn" data-act="open" data-uid="${E(u.user_id)}">Управлять</button></div>`;
}

async function openUser(uid, keep) {
  S.sel = uid;
  const u = S.users.find(x => x.user_id === uid); if (!u) return;
  try {
    const { data } = await sb().from('ultimate_ops').select('*').eq('user_id', uid).eq('applied', false).order('id');
    S.pending = data || [];
  } catch (e) { S.pending = []; }
  document.querySelectorAll('#ult-list .ult-row').forEach((el, i) => {});
  const list = document.getElementById('ult-list'); if (list) list.innerHTML = visibleUsers().map(rowHtml).join('');
  const box = document.getElementById('ult-detail'); if (!box) return;
  box.innerHTML = detailHtml(u);
  if (!keep) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ownedHtml(d) {
  const owned = d.owned || [], dupes = d.dupes || {}, custom = d.custom || {};
  if (!owned.length) return '<p class="ult-hint">Карточек нет</p>';
  return owned.map(pid => {
    const c = custom[pid];
    const name = c ? `${catName(c.base)} ★ особая` : catName(pid);
    const rating = c ? c.rating : (CAT[pid] ? CAT[pid].rating : '?');
    const n = 1 + (dupes[pid] || 0);
    return `<div class="ult-row"><div><b>${E(name)}</b> <span class="ult-tag">ОВР ${rating}</span>${n > 1 ? `<span class="ult-tag">×${n}</span>` : ''}</div>
      <button class="ult-btn red" data-act="removeCard" data-pid="${E(pid)}">Убрать 1</button></div>`;
  }).join('');
}
function attrInputs(base) {
  const gk = CAT[base] && CAT[base].pos === 'GK';
  return (gk ? GK_ATTRS : FIELD_ATTRS).map(a => `<label>${a[1]}<input type="number" min="1" max="199" data-attr="${a[0]}" placeholder="авто"></label>`).join('');
}
function detailHtml(u) {
  const d = u.data || {}; const uid = u.user_id; const ban = S.bans[uid];
  const sorted = CATALOG.slice().sort((a, b) => b[3] - a[3]);
  const opts = sorted.map(c => `<option value="${c[0]}">${E(c[1])} (${c[3]})</option>`).join('');
  return `<div class="ult-box" data-uid="${E(uid)}">
    <h4>🎮 ${E(u.name || uid)} <span class="ult-tag">${E(uid)}</span> ${ban ? '<span class="ult-tag ban">БАН</span>' : ''}</h4>
    <p class="ult-hint">Изменения применятся, когда игрок откроет DFL Ultimate (до 20 секунд, если игра уже открыта).${S.pending.length ? ` <b>В очереди: ${S.pending.length}</b>` : ''}</p>

    <div class="ult-box"><h4>💰 Баланс</h4>
      <div class="ult-line"><label>Монеты (сейчас ${d.coins ?? 0})</label><input type="number" id="ult-coins" value="${d.coins ?? 0}">
        <button class="ult-btn" data-act="setBal" data-k="coins">Установить</button>
        <button class="ult-btn green" data-act="addBal" data-k="coins">+/− добавить</button></div>
      <div class="ult-line"><label>Пазлы (сейчас ${d.fragments ?? 0})</label><input type="number" id="ult-frags" value="${d.fragments ?? 0}">
        <button class="ult-btn" data-act="setBal" data-k="frags">Установить</button>
        <button class="ult-btn green" data-act="addBal" data-k="frags">+/− добавить</button></div>
      <p class="ult-hint">«+/− добавить» берёт число из поля как прибавку (отрицательное — списать).</p>
    </div>

    <div class="ult-box"><h4>🚫 Бан</h4>
      ${ban ? `<p class="ult-hint">Причина: ${E(ban.reason || '—')}</p><button class="ult-btn green" data-act="unban">Разбанить</button>`
            : `<div class="ult-line"><input type="text" id="ult-reason" placeholder="Причина бана" style="flex:1;min-width:160px"><button class="ult-btn red" data-act="ban">Забанить</button></div>`}
    </div>

    <div class="ult-box"><h4>🃏 Карточки (${(d.owned || []).length})</h4>
      <div class="ult-cards">${ownedHtml(d)}</div>
      <div class="ult-line" style="margin-top:10px"><label>Выдать карточку</label><select id="ult-give">${opts}</select>
        <button class="ult-btn green" data-act="giveCard">Выдать</button></div>
    </div>

    <div class="ult-box"><h4>★ Особая карточка (любой ОВР и характеристики)</h4>
      <div class="ult-line"><label>Игрок</label><select id="ult-cbase" data-ch="cbase">${opts.replace(`value="${S.custBase}"`, `value="${S.custBase}" selected`)}</select>
        <label style="min-width:40px">ОВР</label><input type="number" id="ult-covr" min="1" max="199" value="99" style="width:90px">
        <button class="ult-btn gray" data-act="allOvr">Все = ОВР</button></div>
      <div class="ult-attrs" id="ult-attrs">${attrInputs(S.custBase)}</div>
      <p class="ult-hint">Пустые характеристики заполнятся автоматически. Допустимо 1–199.</p>
      <button class="ult-btn green" data-act="giveCustom">Выдать особую карточку</button>
    </div>

    ${S.pending.length ? `<div class="ult-box"><h4>⏳ Ожидают применения</h4>${S.pending.map(o => `<div class="ult-sub">#${o.id} · ${E(o.type)} · ${E(JSON.stringify(o.payload))}</div>`).join('')}</div>` : ''}
  </div>`;
}

async function op(uid, type, payload) {
  try {
    const { error } = await sb().from('ultimate_ops').insert({ user_id: uid, type, payload: payload || {} });
    if (error) throw error;
    toast('✅ Команда отправлена игроку', 'success');
    await openUser(uid, true);
  } catch (e) { toast('❌ ' + (e.message || 'Ошибка (вы вошли как админ?)'), 'error'); }
}
async function setBan(uid, on) {
  try {
    if (on) {
      const reason = (document.getElementById('ult-reason') || {}).value || '';
      const { error } = await sb().from('ultimate_bans').upsert({ user_id: uid, reason: reason.trim() || 'Нарушение правил' }, { onConflict: 'user_id' });
      if (error) throw error;
      S.bans[uid] = { user_id: uid, reason: reason.trim() || 'Нарушение правил' };
    } else {
      const { error } = await sb().from('ultimate_bans').delete().eq('user_id', uid);
      if (error) throw error;
      delete S.bans[uid];
    }
    toast(on ? '🚫 Игрок забанен' : '✅ Игрок разбанен', 'success');
    renderAccounts();
  } catch (e) { toast('❌ ' + (e.message || 'Ошибка'), 'error'); }
}

// ---------- Магазин ----------
function renderShop() {
  const body = document.getElementById('ult-body');
  const rows = CATALOG.slice().sort((a, b) => b[3] - a[3]).map(c => {
    const t = rarityOf(c[3]); const def = DEFAULT_PRICE[t]; const cur = S.prices[c[0]];
    const sold = !(typeof cur === 'number' && cur <= 0);
    const val = typeof cur === 'number' && cur > 0 ? cur : def;
    return `<tr data-pid="${c[0]}" data-def="${def}" data-tier="${t}">
      <td>${E(c[1])}</td><td>${c[3]}</td><td>${TIER_LABEL[t]}</td><td>${def}</td>
      <td><input type="number" min="1" class="ult-price" value="${val}" ${sold ? '' : 'disabled'}></td>
      <td><label><input type="checkbox" class="ult-sold" ${sold ? 'checked' : ''}> в продаже</label></td></tr>`;
  }).join('');
  body.innerHTML = `<div class="ult-box ult-prices">
    <h4>🧩 Цены в магазине пазлов</h4>
    <p class="ult-hint">Цена по умолчанию зависит от редкости. Измените цену или снимите игрока с продажи, затем нажмите «Сохранить все». Игроки применят новые цены в течение 20 секунд.</p>
    <div class="ult-line"><label>Массово</label>
      <select id="ult-bulk-tier"><option value="all">Все редкости</option>${TIERS.map(t => `<option value="${t}">${TIER_LABEL[t]}</option>`).join('')}</select>
      <input type="number" id="ult-bulk-mult" step="0.1" min="0.1" value="1.5" style="width:90px"> ×
      <button class="ult-btn gray" data-act="bulk">Применить к полям</button>
      <button class="ult-btn gray" data-act="resetPrices">Сбросить к умолчанию</button>
      <button class="ult-btn green" data-act="savePrices">💾 Сохранить все</button></div>
    <div style="overflow-x:auto"><table class="ult-prices"><thead><tr><th>Игрок</th><th>ОВР</th><th>Редкость</th><th>По умолч.</th><th>Цена 🧩</th><th></th></tr></thead><tbody id="ult-price-rows">${rows}</tbody></table></div>
  </div>`;
}
async function savePrices() {
  const prices = {};
  document.querySelectorAll('#ult-price-rows tr').forEach(tr => {
    const pid = tr.dataset.pid, def = parseInt(tr.dataset.def);
    const sold = tr.querySelector('.ult-sold').checked;
    const v = parseInt(tr.querySelector('.ult-price').value);
    if (!sold) prices[pid] = -1;
    else if (v > 0 && v !== def) prices[pid] = v;
  });
  try {
    const data = Object.assign({}, S.cfgOther, { prices });
    const { error } = await sb().from('ultimate_config').upsert({ id: 'config', data, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if (error) throw error;
    S.prices = prices;
    toast('✅ Цены сохранены', 'success');
  } catch (e) { toast('❌ ' + (e.message || 'Ошибка (вы вошли как админ?)'), 'error'); }
}

// ---------- События ----------
function init() {
  const tab = document.querySelector('.admin-section-tab[data-tab="ultimate"]');
  if (tab) tab.addEventListener('click', load);
  const r = root(); if (!r) return;
  r.addEventListener('input', e => { if (e.target.id === 'ult-q') { S.q = e.target.value; const l = document.getElementById('ult-list'); if (l) l.innerHTML = visibleUsers().map(rowHtml).join('') || '<p style="padding:16px;opacity:.7">Нет совпадений</p>'; } });
  r.addEventListener('change', e => {
    if (e.target.id === 'ult-filter') { S.filter = e.target.value; renderAccounts(); }
    if (e.target.id === 'ult-cbase') { S.custBase = e.target.value; document.getElementById('ult-attrs').innerHTML = attrInputs(S.custBase); }
    if (e.target.classList.contains('ult-sold')) { const tr = e.target.closest('tr'); tr.querySelector('.ult-price').disabled = !e.target.checked; }
  });
  r.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act; const uid = S.sel;
    const num = id => parseInt((document.getElementById(id) || {}).value);
    if (act === 'sub') { S.sub = b.dataset.v; render(); }
    else if (act === 'reload') load();
    else if (act === 'open') openUser(b.dataset.uid);
    else if (act === 'setBal') { const v = num(b.dataset.k === 'coins' ? 'ult-coins' : 'ult-frags'); if (isNaN(v) || v < 0) return toast('Введите число ≥ 0', 'error'); op(uid, b.dataset.k === 'coins' ? 'set_coins' : 'set_frags', { value: v }); }
    else if (act === 'addBal') { const v = num(b.dataset.k === 'coins' ? 'ult-coins' : 'ult-frags'); if (isNaN(v) || v === 0) return toast('Введите число (можно отрицательное)', 'error'); op(uid, b.dataset.k === 'coins' ? 'add_coins' : 'add_frags', { value: v }); }
    else if (act === 'ban') setBan(uid, true);
    else if (act === 'unban') setBan(uid, false);
    else if (act === 'giveCard') op(uid, 'give_card', { pid: document.getElementById('ult-give').value });
    else if (act === 'removeCard') { if (confirm('Убрать одну копию этой карточки у игрока?')) op(uid, 'remove_card', { pid: b.dataset.pid }); }
    else if (act === 'allOvr') { const v = num('ult-covr'); if (!isNaN(v)) document.querySelectorAll('#ult-attrs input').forEach(i => { i.value = v; }); }
    else if (act === 'giveCustom') {
      const ovr = num('ult-covr'); if (isNaN(ovr) || ovr < 1 || ovr > 199) return toast('ОВР должен быть 1–199', 'error');
      const attrs = {};
      document.querySelectorAll('#ult-attrs input').forEach(i => { const v = parseInt(i.value); if (!isNaN(v)) attrs[i.dataset.attr] = Math.max(1, Math.min(199, v)); });
      op(uid, 'give_custom', { base: document.getElementById('ult-cbase').value, rating: ovr, attrs });
    }
    else if (act === 'bulk') {
      const tier = document.getElementById('ult-bulk-tier').value; const m = parseFloat(document.getElementById('ult-bulk-mult').value);
      if (!(m > 0)) return;
      document.querySelectorAll('#ult-price-rows tr').forEach(tr => {
        if (tier !== 'all' && tr.dataset.tier !== tier) return;
        const inp = tr.querySelector('.ult-price'); inp.value = Math.max(1, Math.round(parseInt(tr.dataset.def) * m));
      });
    }
    else if (act === 'resetPrices') { document.querySelectorAll('#ult-price-rows tr').forEach(tr => { tr.querySelector('.ult-price').value = tr.dataset.def; tr.querySelector('.ult-sold').checked = true; tr.querySelector('.ult-price').disabled = false; }); }
    else if (act === 'savePrices') savePrices();
  });
}
document.addEventListener('DOMContentLoaded', init);
})();
