// ===================== ДФЛ — script.js (без рынка) =====================

const $ = id => document.getElementById(id);
function on(id, evt, fn) { const el = $(id); if (el) el.addEventListener(evt, fn); }
function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const playstyleDescriptions = {
    'golova': { name: 'Точный удар головы', description: 'Игрок демонстрирует исключительную игру головой.' },
    'golova_silver': { name: 'Точный удар головы', description: 'Игрок демонстрирует исключительную игру головой.' },
    'Bezjalostniy': { name: 'Выносливый', description: 'Игрок обладает отличной выносливостью и способен совершать множество забегов, не уставая быстро.' },
    'vinos_silver': { name: 'Выносливый', description: 'Игрок обладает отличной выносливостью и способен совершать множество забегов, не уставая быстро.' },
    'obmanshik_silver': { name: 'Трюкачество', description: 'Игрок сможет более эффективно выполнять финты и обыгрывать защитников в ситуациях 1 на 1.' },
    'truk_gold': { name: 'Трюкачество', description: 'Игрок сможет более эффективно выполнять финты и обыгрывать защитников в ситуациях 1 на 1.' },
    'borec': { name: 'Борец', description: 'Игрок обладает большей силой в физических единоборствах, как при защите мяча во время ведения, так и при борьбе с соперником в схватке.' },
    'borec_silver': { name: 'Борец', description: 'Игрок обладает большей силой в физических единоборствах, как при защите мяча во время ведения, так и при борьбе с соперником в схватке.' },
    'strag': { name: 'Страж', description: 'Игрок обладает более высоким уровнем мастерства и успешности в выполнении отбора мяча.' },
    'strag_silver': { name: 'Страж', description: 'Игрок обладает более высоким уровнем мастерства и успешности в выполнении отбора мяча.' },
    'bistro_silver': { name: 'Быстрый', description: 'Игрок обладает более взрывным ускорением для дриблинга и передач мяча в штрафную.' },
    'bistro_gold': { name: 'Быстрый', description: 'Игрок обладает более взрывным ускорением для дриблинга и передач мяча в штрафную.' },
    'pushka': { name: 'Пушечный удар', description: 'Игрок может наносить мощные и плотные удары.' },
    'pushka_silver': { name: 'Пушечный удар', description: 'Игрок может наносить мощные и плотные удары.' },
    'tochno': { name: 'Мастер точного удара', description: 'Игрок может с большой точностью наносить удары с подкруткой, отправляя мяч мимо вратаря.' },
    'tochno_silver': { name: 'Мастер точного удара', description: 'Игрок может с большой точностью наносить удары с подкруткой, отправляя мяч мимо вратаря.' },
    'vihod': { name: 'Выход вратаря', description: 'Вратарь обладает способностью быстро выбегать из ворот, чтобы оказывать давление на соперника.' },
    'otraz': { name: 'Отражение', description: 'Вратарь обладает способностью отбивать мяч далеко, в стороны и в более безопасные зоны.' },
    'otraz_silver': { name: 'Отражение', description: 'Вратарь обладает способностью отбивать мяч далеко, в стороны и в более безопасные зоны.' },
    'bombardir_silver': { name: 'Супер бомбардир', description: 'Игрок может точно отправить мяч в сетку с близкого и среднего расстояния.' },
    'bombardir': { name: 'Супер бомбардир', description: 'Игрок может точно отправить мяч в сетку с близкого и среднего расстояния.' },
    'parashut': { name: 'Парашют', description: 'Игрок обладает исключительным мастерством перебрасывания мяча через вратаря.' },
    'tiki_taka_silver': { name: 'Тики-така', description: 'Игрок способен выполнять более точные и быстрые пасы по земле.' },
    'tiki_taka': { name: 'Тики-така', description: 'Игрок способен выполнять более точные и быстрые пасы по земле.' },
    'prostrel_silver': { name: 'Прострел', description: 'Игрок способен выполнять более точные и быстрые удары по земле.' },
    'prostrel': { name: 'Прострел', description: 'Игрок способен выполнять более точные и быстрые удары по земле.' },
    'naves_silver': { name: 'Навес низом на ход', description: 'Игрок может выполнять высокоскоростные навесы в штрафную.' },
    'naves': { name: 'Навес низом на ход', description: 'Игрок может выполнять высокоскоростные навесы в штрафную.' },
    'intuation_silver': { name: 'Интуиция', description: 'Игрок обладает способностью читать действия соперника в ситуациях 1 на 1.' },
    'intuation': { name: 'Интуиция', description: 'Игрок обладает способностью читать действия соперника в ситуациях 1 на 1.' },
    'uskoritel_silver': { name: 'Ускоритель', description: 'Игрок способен быстро набрать скорость при ускорении без мяча.' },
    'simulant': { name: 'Симулянт', description: 'Игрок обладает выдающимся актерским мастерством в симуляции физического контакта' },
    'simulant_silver': { name: 'Симулянт', description: 'Игрок обладает выдающимся актерским мастерством в симуляции физического контакта' },
    'pevec': { name: 'Певец', description: '' },
    'pan': { name: 'Мастер Паны', description: 'Игрок обладает превосходным процентом успешного прокидывания мяча между ног.' },
    'far': { name: 'Широкий Охват', description: 'Игрок способен дотянуться до мяча в решающий момент и отразить удар из-за пределов штрафной площади, предотвращая голы с дальней дистанции.' },
    'far_silver': { name: 'Широкий Охват', description: 'Игрок способен дотянуться до мяча в решающий момент и отразить удар из-за пределов штрафной площади, предотвращая голы с дальней дистанции.' }
};

const basePlayers = {
    raya: { name: "Шустик", position: "Вратарь", age: "15 лет", icon: "🧤", foot: "Правая", height: "160 см", weight: "45 кг", rating: 90, number: "(1)", description: "Стена, которую не пробить", playstyles: ['vihod', 'otraz', 'far'], playstyleColors: { vihod: "gold", otraz: "gold", far: "gold" } },
    maxim: { name: "Бузмаков Максим", position: "Защитник", age: "14 лет", icon: "⚽", foot: "Правая", height: "176 см", weight: "58 кг", rating: 90, number: "(8)", description: "Защитник ФК МЕРА", playstyles: ["strag", 'intuation', "borec"], playstyleColors: { strag: "gold", intuation: "gold", borec: "gold" } },
    batrakov: { name: "Кравченко Глеб", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Правая", height: "143 см", weight: "33 кг", rating: 87, number: "(83)", description: "Мелкая копия Батракова", playstyles: ["Bezjalostniy", 'obmanshik_silver', 'naves'], playstyleColors: { Bezjalostniy: "gold", obmanshik_silver: "silver", naves: 'gold' } },
    aleksey_doroshenko: { name: "Дорошенко Алексей", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Амбидекстер", height: "145 см", weight: "35 кг", rating: 90, number: "(22)", description: "Лучший дриблер двора", playstyles: ["truk_gold", "bombardir", "tochno"], playstyleColors: { truk_gold: "gold", bombardir: "gold", tochno: "gold" } },
    tankov: { name: "Танков Тимофей", position: "Универсальный", age: "13 лет", icon: "⚽", foot: "Левая", height: "160 см", weight: "40 кг", rating: 87, number: "(99)", description: "", playstyles: [], playstyleColors: {} },
};

const yard78Players = [
    { id: "timofey_zaytsev", name: "Зайцев Тимофей", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Правая", height: "155 см", weight: "50 кг", rating: 91, number: "(7)", description: "Игрок ФК 78 ", playstyles: [], playstyleColors: {} },
    { id: "sanya_bobrikov", name: "Бобриков Александр", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Амбидекстр", height: "175 см", weight: "51 кг", rating: 91, number: "(11)", description: "Нападающий ФК 78 ", playstyles: ["pushka"], playstyleColors: { pushka: "gold" } },
    { id: "maxim_dcp", name: "Максим ДЦП", position: "Вратарь", age: "13 лет", icon: "⚽", foot: "Правая", height: "178 см", weight: "55 кг", rating: 91, number: "(1)", description: "Вратарь ФК 78 ", playstyles: ["otraz", "vihod", 'far'], playstyleColors: { otraz: "gold", vihod: "gold", far: "gold" } },
    { id: "ivan", name: "Новиков Иван", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "164 см", weight: "55 кг", rating: 86, number: "(76)", description: "Игрок ФК 78 ", playstyles: [], playstyleColors: {} },
    { id: "elisey", name: "Пожидаев Елисей", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "43 кг", rating: 86, number: "(19)", description: "Второй Ямаль", playstyles: ["pevec", "pan"], playstyleColors: { pevec: "gold", pan: "gold" } },
    { id: "demid", name: "Пасько Демид", position: "Нападающий", age: "12 лет", icon: "⚽", foot: "Правая", height: "167 см", weight: "48 кг", rating: 87, number: "(45)", description: "Русский пыр не знает дыр", playstyles: ['pushka'], playstyleColors: { pushka: 'gold' } },
    { id: "lesha_podavalny", name: "Чурилов Алексей", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "47 кг", rating: 87, number: "(41)", description: "Угловой?...💀💀💀", playstyles: ["naves", 'tiki_taka'], playstyleColors: { naves: "gold", tiki_taka: 'gold' } },
    { id: "safonov", name: "Сафонов Иван", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "47 кг", rating: 88, number: "(20)", description: "Однофамилец вратаря ПСЖ", playstyles: ['tiki_taka'], playstyleColors: { tiki_taka: 'gold' } },
    { id: "ostap", name: "Остап", position: "Запасной", age: "13 лет", icon: "⚽", foot: "Правая", height: "? см", weight: "? кг", rating: 1, number: "(67)", description: "Единица в рейтинге, потому что Топ-1 Кемерово", playstyles: [], playstyleColors: {} }
];

const yuzhkaPlayers = [
    { id: "russkov_artem", name: "Руссё Диктатор", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Амбидекстр", height: "178 см", weight: "58 кг", rating: 93, number: "(8)", description: "дикий сюю ю ю ю", playstyles: ["tiki_taka", "bombardir", "bistro_gold"], playstyleColors: { bistro_gold: "gold", bombardir: "gold", tiki_taka: "gold" } },
    { id: "shuklin", name: "Шуклин Кирилл", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Левая", height: "160 см", weight: "45 кг", rating: 89, number: "(11)", description: "Гром всегда позднее молнии", playstyles: ["bistro_silver", "bombardir_silver", "truk_gold"], playstyleColors: { bistro_silver: "silver", bombardir_silver: "silver", truk_gold: "gold" } },
    { id: "bombar", name: "Бадартинов Михаил", position: "Нападающий", age: "15 лет", icon: "⚽", foot: "Правая", height: "180 см", weight: "72 кг", rating: 89, number: "(57)", description: "Коч коч братан", playstyles: ["borec", "pushka"], playstyleColors: { borec: "gold", pushka: "gold" } },
    { id: "mes", name: "Кирьянов Артем", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "55 кг", rating: 89, number: "(28)", description: "Не имей сто друзей а имей в друзьях Меса", playstyles: ["otraz"], playstyleColors: { otraz: "gold" } },
    { id: "shilov", name: "Шилов Дмитрий", position: "Полузащитник", age: "14 лет", icon: "⚽", foot: "Правая", height: "165 см", weight: "50 кг", rating: 86, number: "(?)", description: "Игрок южки", playstyles: ["truk_gold", "tochno_silver"], playstyleColors: { truk_gold: "gold", tochno_silver: "silver" } },
    { id: "diana", name: "Епончинцева Диана", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "165 см", weight: "50 кг", rating: 87, number: "(9)", description: "Единственная девушка среди игроков", playstyles: [], playstyleColors: {} }
];

const arsenalPlayers = [
    { id: "andryushka", name: "Бузмаков Андрей", position: "Нападающий", age: "9 лет", icon: "⚽", foot: "Правая", height: "140 см", weight: "32 кг", rating: 80, number: "(7)", description: "Самый молодой игрок двора", playstyles: ['bistro_silver', 'tochno_silver'], playstyleColors: { bistro_silver: "silver", tochno_silver: "silver" } },
    { id: "gleb", name: "Глеб", position: "Защитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "48 кг", rating: 80, number: "(15)", description: "Работяга", playstyles: ["naves", "vinos_silver"], playstyleColors: { naves: "gold", vinos_silver: "silver" } },
    { id: "kostya", name: "Лехнер Константин", position: "Вратарь", age: "12 лет", icon: "⚽", foot: "Правая", height: "150 см", weight: "35 кг", rating: 84, number: "(32)", description: "Не бойся творить историю", playstyles: ['vihod', "otraz_silver"], playstyleColors: { vihod: "gold", otraz_silver: "silver" } },
    { id: "saveliy_78", name: "Соколов Савелий", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Правая", height: "164 см", weight: "45 кг", rating: 81, number: "(78)", description: "Самый преданный игрок", playstyles: ["truk_gold", "simulant_silver"], playstyleColors: { truk_gold: "gold", simulant_silver: "silver" } }
];

const zvezdaPlayers = [
    { id: "david", name: "Дарсалия Давид", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "175 см", weight: "60 кг", rating: 78, number: "(10)", description: "Лидер атак ФК Звёзды", playstyles: [], playstyleColors: {} },
    { id: "matveyB", name: "Матвей Бобов", position: "Вратарь", age: "15 лет", icon: "⚽", foot: "Правая", height: "180 см", weight: "80 кг", rating: 76, number: "(14)", description: "Вратарь Фк звёзды", playstyles: [], playstyleColors: {} },
    { id: "nazar", name: "Осинцев Назар", position: "Защитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "178 см", weight: "100 кг", rating: 49, number: "(67)", description: "Супертяжелый вес", playstyles: [], playstyleColors: {} },
    { id: "kuharskiy", name: "Кухарский Тимофей", position: "Нападающий", age: "9 лет", icon: "⚽", foot: "Правая", height: "145 см", weight: "35 кг", rating: 69, number: "(3)", description: "Самый младший из Звезд", playstyles: [], playstyleColors: {} },
    { id: "irakliy", name: "Дарсалия Ираклий", position: "Нападающий", age: "15 лет", icon: "⚽", foot: "Правая", height: "175 см", weight: "60 кг", rating: 70, number: "(6)", description: "Брат капитана", playstyles: [], playstyleColors: {} },
];

const psgPlayers = [
    { id: "artem", name: "Соколов Артем", position: "Нападающий", age: "12 лет", icon: "⚽", foot: "Правая", height: "130 см", weight: "60 кг", rating: 72, number: "(9)", description: "Игрок ПСЖ", playstyles: [], playstyleColors: {} },
    { id: "EgorNast", name: "Зверев Егор", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Левая", height: "145 см", weight: "50 кг", rating: 72, number: "(8)", description: "Игрок ПСЖ", playstyles: [], playstyleColors: {} },
    { id: "maxronaldo", name: "Максим Роналду", position: "Нападающий", age: "11 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "55 кг", rating: 71, number: "(17)", description: "Фанатик Роналду", playstyles: [], playstyleColors: {} },
    { id: "haaland", name: "Шапов Леонид", position: "Нападающий", age: "10 лет", icon: "⚽", foot: "Левая", height: "141 см", weight: "37 кг", rating: 81, number: "(14)", description: "Болельщик Холланда", playstyles: ["borec_silver", 'tiki_taka_silver'], playstyleColors: { borec_silver: "silver", tiki_taka_silver: "silver" } }
];

const playersData = { ...basePlayers };
[yard78Players, yuzhkaPlayers, arsenalPlayers, psgPlayers, zvezdaPlayers].forEach(list => {
    list.forEach(p => { playersData[p.id] = p; });
});

const meraTeamIds = ['raya', 'maxim', 'batrakov', 'aleksey_doroshenko', 'tankov'];
const yard78PlayerIds = yard78Players.map(p => p.id);
const yuzhkaPlayerIds = yuzhkaPlayers.map(p => p.id);
const arsenalPlayerIds = arsenalPlayers.map(p => p.id);
const psgPlayerIds = psgPlayers.map(p => p.id);
const zvezdaPlayerIds = zvezdaPlayers.map(p => p.id);

// Команды (нужны для матчей и профиля игрока)
const CAPTAINS = {
    mera: { id: 'mera', name: 'ФК "МЕРА"', players: meraTeamIds, logo: './Photos%20(2)/IMG_0807.jpeg' },
    school78: { id: 'school78', name: 'ФК 78 школа', players: yard78PlayerIds, logo: './Photos%20(2)/IMG_0797.jpeg' },
    yuzhka: { id: 'yuzhka', name: 'ФК Южный', players: yuzhkaPlayerIds, logo: './Photos%20(2)/IMG_0800.jpeg' },
    arsenal: { id: 'arsenal', name: 'ФК Арсенал', players: arsenalPlayerIds, logo: './Photos%20(2)/IMG_0853.jpeg' },
    psg: { id: 'psg', name: 'ФК ПСЖ', players: psgPlayerIds, logo: './Photos%20(2)/IMG_0833.jpeg' },
    zvezda: { id: 'zvezda', name: 'ФК Звёзды', players: zvezdaPlayerIds, logo: './Photos%20(2)/IMG_0801.jpeg' }
};

const allPlayerIds = Object.keys(playersData);
const allTeamPlayerIds = [...meraTeamIds, ...yard78PlayerIds, ...yuzhkaPlayerIds, ...arsenalPlayerIds, ...psgPlayerIds, ...zvezdaPlayerIds];
let currentPlayerIds = allPlayerIds.filter(id => !allTeamPlayerIds.includes(id));
let filteredPlayerIds = [...currentPlayerIds];
let activeSort = 'none';
let themeClickCount = 0;
let supabaseClient = null;
let adminLoggedIn = false;
let currentEditingMatchId = null;
let matchesData = [];

let currentUser = null;
let currentUserData = null;
let pollsData = [];
let complaintsData = [];
let userVotes = {};
let allUsersData = [];
let pollVotersData = {};

let onlineHeartbeatInterval = null;
const ONLINE_HEARTBEAT_MS = 30000;
const ONLINE_THRESHOLD_SEC = 90;
const ADMIN_EMAIL = 'admin@fcmera.com';

// ===================== Локальные аккаунты =====================
let localAccounts = [];
try {
    const saved = localStorage.getItem('dfl_local_accounts');
    if (saved) localAccounts = JSON.parse(saved);
} catch (e) { localAccounts = []; }

function saveLocalAccounts() {
    try { localStorage.setItem('dfl_local_accounts', JSON.stringify(localAccounts)); } catch (e) {}
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return 'h' + Math.abs(hash).toString(36) + '_' + str.length;
}

// ===================== Supabase =====================
try {
    const SUPABASE_URL = 'https://pgcdeufbvdricaccjpls.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_8Tf6g3Uvv4d2f3kewhAVUQ_CoIZ5qxp';
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase клиент создан');
    }
} catch (e) { supabaseClient = null; }

// ===================== Уведомления =====================
function showNotification(message, type = 'success') {
    let el = $('notification-market') || $('notification');
    if (!el) {
        el = document.createElement('div');
        el.id = 'notification';
        el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;padding:12px 20px;border-radius:12px;color:#fff;font-weight:600;max-width:90vw;text-align:center;box-shadow:0 6px 20px rgba(0,0,0,.25);transition:opacity .3s;opacity:0;pointer-events:none;';
        document.body.appendChild(el);
    }
    el.textContent = message;
    if (el.id === 'notification') {
        el.style.background = type === 'error' ? '#dc2626' : '#16a34a';
        el.style.opacity = '1';
        clearTimeout(el._timeout);
        el._timeout = setTimeout(() => { el.style.opacity = '0'; }, 3000);
    } else {
        el.className = 'notification-market';
        if (type === 'error') el.classList.add('error');
        el.classList.add('show');
        clearTimeout(el._timeout);
        el._timeout = setTimeout(() => el.classList.remove('show'), 3000);
    }
}

// ===================== Сессии =====================
function saveUserSession() {
    if (currentUser && currentUserData) {
        try {
            localStorage.setItem('dfl_current_user', JSON.stringify({
                id: currentUser.id,
                username: currentUserData.username,
                name: currentUserData.name,
                confirmed: currentUserData.confirmed,
                player_id: currentUserData.player_id,
                created_at: currentUserData.created_at
            }));
        } catch (e) {}
    } else {
        try { localStorage.removeItem('dfl_current_user'); } catch (e) {}
    }
}

function restoreUserSession() {
    try {
        const saved = localStorage.getItem('dfl_current_user');
        if (saved) {
            const parsed = JSON.parse(saved);
            let user = allUsersData.find(u => String(u.id) === String(parsed.id));
            if (!user) user = localAccounts.find(u => String(u.id) === String(parsed.id));
            if (!user) user = parsed;
            currentUser = { id: parsed.id };
            currentUserData = user;
            updateUserUI();
            return true;
        }
    } catch (e) {}
    return false;
}

function setAdminUI(isOn) {
    const panel = $('admin-panel');
    if (panel) panel.classList.toggle('visible', isOn);
    const btn = $('admin-login-btn');
    if (btn) {
        btn.textContent = isOn ? '👑 Админ' : '🔐 Вход для админов';
        btn.classList.toggle('logged', isOn);
    }
    const panelBtn = $('admin-panel-btn');
    if (panelBtn) panelBtn.style.display = isOn ? 'flex' : 'none';
}

function restoreAdminSession() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        adminLoggedIn = true;
        return true;
    }
    return false;
}

// Проверяем, что флаг в localStorage подтверждён настоящей сессией Supabase
async function verifyAdminSession() {
    if (!adminLoggedIn) return false;
    if (!supabaseClient) return true;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session || session.user.email !== ADMIN_EMAIL) {
            adminLoggedIn = false;
            localStorage.removeItem('adminLoggedIn');
            setAdminUI(false);
            return false;
        }
        return true;
    } catch (e) { return true; }
}

// ===================== Онлайн =====================
function getCurrentOnlineIdentity() {
    if (adminLoggedIn && !currentUser) {
        return { id: 'admin_global', name: 'Администратор', role: 'admin', player_id: null };
    }
    if (currentUser && currentUserData) {
        return {
            id: String(currentUser.id),
            name: currentUserData.name || currentUserData.username || 'Пользователь',
            role: 'user',
            player_id: currentUserData.player_id || null
        };
    }
    return null;
}

async function sendOnlineHeartbeat() {
    if (!supabaseClient) return;
    const identity = getCurrentOnlineIdentity();
    if (!identity) return;
    try {
        await supabaseClient.from('online_users').upsert({
            user_id: identity.id,
            user_name: identity.name,
            user_role: identity.role,
            player_id: identity.player_id,
            last_seen: new Date().toISOString()
        }, { onConflict: 'user_id' });
    } catch (e) { console.warn('Онлайн-пинг не удался:', e); }
}

async function removeOnlineSelf() {
    if (!supabaseClient) return;
    const identity = getCurrentOnlineIdentity();
    if (!identity) return;
    try { await supabaseClient.from('online_users').delete().eq('user_id', identity.id); } catch (e) {}
}

function startOnlineHeartbeat() {
    if (onlineHeartbeatInterval) clearInterval(onlineHeartbeatInterval);
    sendOnlineHeartbeat();
    onlineHeartbeatInterval = setInterval(sendOnlineHeartbeat, ONLINE_HEARTBEAT_MS);
    window.addEventListener('beforeunload', () => { removeOnlineSelf(); });
}

async function fetchOnlineUsers() {
    if (!supabaseClient) return [];
    try {
        const cutoff = new Date(Date.now() - ONLINE_THRESHOLD_SEC * 1000).toISOString();
        const { data, error } = await supabaseClient
            .from('online_users').select('*').gte('last_seen', cutoff).order('last_seen', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (e) {
        console.warn('Ошибка загрузки онлайна:', e);
        return [];
    }
}

async function renderOnlinePanel() {
    const listContainer = $('online-users-list');
    const countEl = $('online-total-count');
    if (!listContainer || !countEl) return;

    listContainer.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Загрузка...</p>';
    const users = await fetchOnlineUsers();
    countEl.textContent = users.length;

    if (users.length === 0) {
        listContainer.innerHTML = `<div class="online-empty"><div class="online-empty-icon">😴</div><p>Пока никого нет на сайте</p></div>`;
        return;
    }

    let html = '';
    users.forEach(u => {
        const roleLabel = u.user_role === 'admin' ? '👑 Админ' : '👤 Игрок';
        let avatarHtml = '👤';
        if (u.player_id && typeof playerPhotos !== 'undefined' && playerPhotos[u.player_id]) {
            avatarHtml = `<img src="${esc(playerPhotos[u.player_id])}" alt="">`;
        } else if (u.player_id && playersData[u.player_id]) {
            avatarHtml = playersData[u.player_id].icon || '⚽';
        }
        const secondsAgo = Math.floor((Date.now() - new Date(u.last_seen).getTime()) / 1000);
        let timeLabel;
        if (secondsAgo < 10) timeLabel = 'только что';
        else if (secondsAgo < 60) timeLabel = `${secondsAgo} сек назад`;
        else timeLabel = `${Math.floor(secondsAgo / 60)} мин назад`;

        html += `<div class="online-user-card role-${esc(u.user_role)}">
            <div class="online-user-avatar">${avatarHtml}</div>
            <div class="online-user-info">
                <div class="online-user-name">${esc(u.user_name)}</div>
                <div class="online-user-meta"><span class="online-role-pill ${esc(u.user_role)}">${roleLabel}</span></div>
            </div>
            <div class="online-user-time">🟢 ${timeLabel}</div>
        </div>`;
    });
    listContainer.innerHTML = html;
}

// ===================== Плейстайлы и карточки игроков =====================
function hasPlaystyles(playerId) {
    const player = playersData[playerId];
    return !!(player && player.playstyles && player.playstyles.length > 0);
}

function getPlaystyleColor(playerId, style) {
    const player = playersData[playerId];
    if (player && player.playstyleColors && player.playstyleColors[style]) return player.playstyleColors[style];
    return 'gold';
}

function openPlaystyleDetail(styleKey, playerId) {
    const overlay = $('playstyle-detail-overlay');
    const iconEl = $('playstyle-detail-icon');
    const nameEl = $('playstyle-detail-name');
    const descEl = $('playstyle-detail-desc');
    const cardEl = $('playstyle-detail-card');
    if (!overlay || !iconEl || !nameEl || !descEl || !cardEl) return;
    const styleInfo = playstyleDescriptions[styleKey];
    if (!styleInfo) return;
    const isSilver = getPlaystyleColor(playerId, styleKey) === 'silver';
    cardEl.className = 'playstyle-detail-card' + (isSilver ? ' silver-border' : '');
    iconEl.className = 'playstyle-detail-icon' + (isSilver ? ' silver' : '');
    iconEl.innerHTML = '';
    if (typeof playstylePhotos !== 'undefined' && playstylePhotos[styleKey]) {
        const img = document.createElement('img');
        img.src = playstylePhotos[styleKey];
        iconEl.appendChild(img);
    } else iconEl.textContent = '🎮';
    nameEl.textContent = styleInfo.name;
    descEl.textContent = styleInfo.description || 'Описание отсутствует';
    overlay.classList.add('active');
}

function closePlaystyleDetail() {
    const overlay = $('playstyle-detail-overlay');
    if (overlay) overlay.classList.remove('active');
}

function playstyleIconsHtml(playerId) {
    return playersData[playerId].playstyles.map(style => {
        const colorClass = getPlaystyleColor(playerId, style) === 'silver' ? 'silver' : '';
        if (typeof playstylePhotos !== 'undefined' && playstylePhotos[style]) {
            return `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}"><img src="${playstylePhotos[style]}"></div>`;
        }
        return `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}">${style}</div>`;
    }).join('');
}

function bindPlaystyleClicks(container) {
    container.querySelectorAll('.playstyle-icon').forEach(el => {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            const styleKey = this.getAttribute('data-style');
            const pId = this.getAttribute('data-player');
            if (styleKey && pId) openPlaystyleDetail(styleKey, pId);
        });
    });
}

function renderPlaystyles(playerId, containerId) {
    const container = $(containerId);
    if (!container) return;
    const section = container.closest('.playstyles-section');
    if (!hasPlaystyles(playerId)) {
        if (section) section.classList.add('playstyles-section-hidden');
        return;
    }
    if (section) section.classList.remove('playstyles-section-hidden');
    container.innerHTML = playstyleIconsHtml(playerId);
    bindPlaystyleClicks(container);
}

function buildPlayerCardsHtml(playerIds) {
    let html = '';
    playerIds.forEach(id => {
        const p = playersData[id];
        if (!p) return;
        const cardClass = 'player-card' + (meraTeamIds.includes(id) ? ' mera-player' : '');
        const playstylesBlock = hasPlaystyles(id)
            ? `<div class="playstyles-section" id="playstyles-${id}"><div class="playstyles-title">🎮 Плейстайлы</div><div class="playstyles-grid" id="playstyles-grid-${id}"></div></div>` : '';
        html += `<div class="${cardClass}" data-player="${id}">
            <div class="player-photo" id="${id}-photo-card"></div>
            <div class="player-info">
                <h3>${esc(p.name)}</h3>
                <p>${esc(p.position)} • ${esc(p.age)}</p>
                <div class="player-number">${esc(p.number)}</div>
            </div>
            <div class="player-stats">
                <div class="stat-item"><div class="stat-value">${esc(p.height)}</div><div class="stat-label">Рост</div></div>
                <div class="stat-item"><div class="stat-value">${esc(p.weight)}</div><div class="stat-label">Вес</div></div>
                <div class="stat-item"><div class="stat-value">${p.rating}</div><div class="stat-label">Рейтинг</div></div>
            </div>
            <div class="player-description">${esc(p.description || '')}</div>
            ${playstylesBlock}
        </div>`;
    });
    return html;
}

function fillPlayerCardPhotos(playerIds) {
    playerIds.forEach(id => {
        const cardPhoto = $(`${id}-photo-card`);
        if (cardPhoto && playersData[id]) {
            if (typeof playerPhotos !== 'undefined' && playerPhotos[id]) {
                cardPhoto.innerHTML = `<img src="${playerPhotos[id]}" alt="${esc(playersData[id].name)}">`;
            } else {
                cardPhoto.textContent = playersData[id].icon || '⚽';
                cardPhoto.style.fontSize = '2.5rem';
                cardPhoto.style.display = 'flex';
                cardPhoto.style.alignItems = 'center';
                cardPhoto.style.justifyContent = 'center';
            }
        }
        if (hasPlaystyles(id)) renderPlaystyles(id, `playstyles-grid-${id}`);
    });
}

function renderMainPlayerCards() {
    const container = $('players-grid-container');
    if (!container) return;
    container.innerHTML = buildPlayerCardsHtml(filteredPlayerIds);
    const countEl = $('players-count');
    if (countEl) countEl.textContent = `Найдено: ${filteredPlayerIds.length}`;
    fillPlayerCardPhotos(filteredPlayerIds);
    container.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', function () { openPlayerModal(this.getAttribute('data-player')); });
    });
}

function renderPlayerCards(containerId, playerIds) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = buildPlayerCardsHtml(playerIds);
    fillPlayerCardPhotos(playerIds);
    container.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', function () { openPlayerModal(this.getAttribute('data-player')); });
    });
}

function filterPlayers(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') filteredPlayerIds = [...currentPlayerIds];
    else filteredPlayerIds = currentPlayerIds.filter(id => { const p = playersData[id]; return p && p.name.toLowerCase().includes(term); });
    applySortToFiltered();
}

function applySortToFiltered() {
    if (activeSort === 'rating') filteredPlayerIds.sort((a, b) => playersData[b].rating - playersData[a].rating);
    else if (activeSort === 'name') filteredPlayerIds.sort((a, b) => playersData[a].name.localeCompare(playersData[b].name));
    renderMainPlayerCards();
}

function resetSortAndFilter() {
    const search = $('player-search');
    if (search) search.value = '';
    filteredPlayerIds = [...currentPlayerIds];
    activeSort = 'none';
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    renderMainPlayerCards();
}

function openPlayerModal(playerId) {
    const player = playersData[playerId];
    if (!player) return;
    $('modal-name').textContent = player.name;
    $('modal-position').textContent = `${player.position} • ${player.age}`;
    $('modal-mera-tag').style.display = meraTeamIds.includes(playerId) ? 'inline-block' : 'none';
    const burmalda = $('modal-burmalda-tag');
    if (burmalda) burmalda.style.display = 'none';
    const ratingElement = $('modal-rating');
    ratingElement.textContent = player.rating;
    if (player.rating >= 85) ratingElement.className = 'rating-value rating-high';
    else if (player.rating >= 75) ratingElement.className = 'rating-value rating-medium';
    else ratingElement.className = 'rating-value rating-low';
    $('modal-description-text').textContent = player.description || '';
    const modalPhoto = $('modal-photo');
    modalPhoto.innerHTML = '';
    if (typeof playerPhotos !== 'undefined' && playerPhotos[playerId]) {
        const img = document.createElement('img');
        img.src = playerPhotos[playerId];
        modalPhoto.appendChild(img);
    } else {
        modalPhoto.textContent = player.icon || '⚽';
        modalPhoto.style.fontSize = '3rem';
        modalPhoto.style.display = 'flex';
        modalPhoto.style.alignItems = 'center';
        modalPhoto.style.justifyContent = 'center';
    }
    $('modal-foot').textContent = player.foot || 'Правая';
    $('modal-height').textContent = player.height || '';
    $('modal-weight').textContent = player.weight || '';
    const section = $('modal-playstyles-section');
    const grid = $('modal-playstyles-grid');
    if (hasPlaystyles(playerId)) {
        section.classList.remove('playstyles-section-hidden');
        grid.innerHTML = playstyleIconsHtml(playerId);
        bindPlaystyleClicks(grid);
    } else {
        section.classList.add('playstyles-section-hidden');
        grid.innerHTML = '';
    }
    $('player-modal').classList.add('active');
}

function showPage(pageId) {
    const page = $(pageId);
    if (!page) return;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    page.classList.add('active');
    window.scrollTo(0, 0);
}

// ===================== Матчи =====================
async function loadMatches() {
    try {
        if (!supabaseClient) { renderMatchesEmpty('❌ Supabase не подключен'); return; }
        const { data, error } = await supabaseClient.from('matches').select('*').order('id', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) { matchesData = data; renderMatches(); }
        else { matchesData = []; renderMatchesEmpty('📭 Нет матчей'); }
    } catch (error) { matchesData = []; renderMatchesEmpty('❌ Ошибка загрузки'); }
}

function renderMatchesEmpty(message) {
    const container = $('matches-list');
    if (container) container.innerHTML = `<p style="text-align:center;color:#666;padding:30px;">${message}</p>`;
}

async function saveMatchesToSupabase() {
    try {
        if (!supabaseClient) return;
        await supabaseClient.from('matches').delete().neq('id', 0);
        const { error } = await supabaseClient.from('matches').insert(matchesData);
        if (error) throw error;
    } catch (error) { console.error('Ошибка сохранения матчей:', error); }
}

function renderMatches() {
    const container = $('matches-list');
    if (!container) return;
    if (matchesData.length === 0) { renderMatchesEmpty('📭 Нет матчей'); return; }
    const typeLabels = { home: '🏠 Домашний', away: '✈️ Выездной', neutral: '🏰 Нейтральное' };
    let html = '';
    matchesData.forEach(match => {
        const team1 = CAPTAINS[match.team1];
        const team2 = CAPTAINS[match.team2];
        const team1Name = team1 ? team1.name : match.team1;
        const team2Name = team2 ? team2.name : match.team2;
        const team1Logo = team1 ? team1.logo : '';
        const team2Logo = team2 ? team2.logo : '';
        const typeClass = typeLabels[match.type] ? match.type : 'neutral';
        const resultClass = match.result || 'win';
        let resultText = '';
        if (match.result === 'win') resultText = `🏆 Победа ${esc(team1Name)}`;
        else if (match.result === 'loss') resultText = `❌ Поражение ${esc(team1Name)}`;
        else if (match.result === 'away') resultText = `🏆 Победа ${esc(team2Name)}`;
        const penaltyHtml = match.penalty ? `<div class="match-penalty">${esc(match.penalty)}</div>` : '';
        html += `<div class="match-card" data-match-id="${match.id}">
            <div class="match-header">
                <span class="match-date">${esc(match.date)}</span>
                <span class="match-time">${esc(match.time)}</span>
                <span class="match-location-tag ${typeClass}">${typeLabels[typeClass]}</span>
                ${adminLoggedIn ? `<button class="admin-btn" onclick="editMatch('${match.id}')">✏️</button>` : ''}
            </div>
            <div class="match-teams">
                <div class="team">
                    ${team1Logo ? `<img src="${team1Logo}" class="team-logo">` : `<span style="font-size:2rem;">🏆</span>`}
                    <span class="team-name">${esc(team1Name)}</span>
                </div>
                <div class="match-score">
                    <span class="score">${match.score1}</span>
                    <span class="score-divider">:</span>
                    <span class="score">${match.score2}</span>
                </div>
                <div class="team">
                    ${team2Logo ? `<img src="${team2Logo}" class="team-logo">` : `<span style="font-size:2rem;">🏆</span>`}
                    <span class="team-name">${esc(team2Name)}</span>
                </div>
            </div>
            ${penaltyHtml}
            <div class="match-result ${resultClass}">${resultText}</div>
        </div>`;
    });
    container.innerHTML = html;
    container.querySelectorAll('.match-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.admin-btn')) return;
            showPage('match-tactics-page');
            const title = $('match-tactics-title');
            if (title) title.textContent = '⚽ Тактика матча (нет данных)';
        });
    });
}

function populateTeamSelects(select1Id, select2Id) {
    const select1 = $(select1Id);
    const select2 = $(select2Id);
    if (!select1 || !select2) return;
    const val1 = select1.value;
    const val2 = select2.value;
    select1.innerHTML = '';
    select2.innerHTML = '';
    Object.values(CAPTAINS).forEach(team => {
        [select1, select2].forEach(sel => {
            const opt = document.createElement('option');
            opt.value = team.id;
            opt.textContent = team.name;
            sel.appendChild(opt);
        });
    });
    if (val1) select1.value = val1;
    if (val2) select2.value = val2;
}

function openAddMatchModal() {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return; }
    $('match-add-modal').classList.add('active');
    $('match-add-status').textContent = '';
    populateTeamSelects('add-match-team1', 'add-match-team2');
    $('add-match-date').value = new Date().toISOString().split('T')[0];
    $('add-match-time').value = '18:00';
}

function openEditMatchModal(matchId) {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return; }
    const match = matchesData.find(m => m.id == matchId);
    if (!match) return;
    currentEditingMatchId = matchId;
    $('match-edit-modal').classList.add('active');
    $('match-edit-status').textContent = '';
    populateTeamSelects('edit-match-team1', 'edit-match-team2');
    $('edit-match-date').value = match.date || '';
    $('edit-match-time').value = match.time || '';
    $('edit-match-team1').value = match.team1 || '';
    $('edit-match-team2').value = match.team2 || '';
    $('edit-score1').value = match.score1 || 0;
    $('edit-score2').value = match.score2 || 0;
    $('edit-match-type').value = match.type || 'neutral';
    $('edit-match-result').value = match.result || 'win';
    $('edit-match-penalty').value = match.penalty || '';
}

async function addMatch() {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return; }
    const date = $('add-match-date').value;
    const time = $('add-match-time').value;
    const team1 = $('add-match-team1').value;
    const team2 = $('add-match-team2').value;
    const score1 = parseInt($('add-score1').value) || 0;
    const score2 = parseInt($('add-score2').value) || 0;
    const type = $('add-match-type').value;
    const result = $('add-match-result').value;
    const penalty = $('add-match-penalty').value.trim();
    if (!date || !time || !team1 || !team2) { $('match-add-status').textContent = '❌ Заполните!'; return; }
    if (team1 === team2) { $('match-add-status').textContent = '❌ Разные команды!'; return; }
    matchesData.push({ id: Date.now(), date, time, team1, team2, score1, score2, type, result, penalty });
    await saveMatchesToSupabase();
    renderMatches();
    $('match-add-modal').classList.remove('active');
    showNotification('✅ Матч добавлен!', 'success');
}

async function saveEditMatch() {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return; }
    if (!currentEditingMatchId) return;
    const match = matchesData.find(m => m.id == currentEditingMatchId);
    if (!match) return;
    match.date = $('edit-match-date').value;
    match.time = $('edit-match-time').value;
    match.team1 = $('edit-match-team1').value;
    match.team2 = $('edit-match-team2').value;
    match.score1 = parseInt($('edit-score1').value) || 0;
    match.score2 = parseInt($('edit-score2').value) || 0;
    match.type = $('edit-match-type').value;
    match.result = $('edit-match-result').value;
    match.penalty = $('edit-match-penalty').value.trim();
    await saveMatchesToSupabase();
    renderMatches();
    $('match-edit-modal').classList.remove('active');
    showNotification('✅ Сохранено!', 'success');
}

async function deleteMatch() {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return; }
    if (!currentEditingMatchId || !confirm('Удалить матч?')) return;
    matchesData = matchesData.filter(m => m.id != currentEditingMatchId);
    await saveMatchesToSupabase();
    renderMatches();
    $('match-edit-modal').classList.remove('active');
    showNotification('🗑️ Удален', 'success');
}

// ===================== Админ: вход / выход =====================
async function adminLogin(email, password) {
    const statusEl = $('admin-auth-status');
    try {
        if (!supabaseClient) { statusEl.textContent = '❌ Supabase не подключен!'; return; }
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
        if (error) { statusEl.textContent = '❌ Неверный логин или пароль'; return; }
        if (data.user.email !== ADMIN_EMAIL) {
            await supabaseClient.auth.signOut();
            statusEl.textContent = '❌ Нет прав администратора!';
            return;
        }
        adminLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        $('admin-auth-modal').classList.remove('active');
        setAdminUI(true);
        statusEl.textContent = '';

        await loadComplaints();
        await loadAllUsers();
        updateUserUI();
        renderMatches();
        renderPolls();
        renderComplaints();
        renderAdminComplaintsList();
        renderAdminPollsList();
        sendOnlineHeartbeat();
        showNotification('✅ Вы вошли как администратор!', 'success');
    } catch (err) {
        statusEl.textContent = `❌ ${err.message || 'Ошибка'}`;
    }
}

async function adminLogout() {
    await removeOnlineSelf();
    adminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    try { if (supabaseClient) await supabaseClient.auth.signOut(); } catch (e) {}
    setAdminUI(false);
    renderMatches(); renderPolls(); renderComplaints();
    updateUserUI();
    showNotification('👋 Вы вышли из админ-панели', 'success');
}

// ===================== Опросы =====================
async function loadPolls() {
    try {
        if (!supabaseClient) {
            if (!loadPollsFromLocal()) pollsData = [];
            await loadPollVoters();
            renderPolls();
            return;
        }
        const { data, error } = await supabaseClient.from('polls').select('*').order('id', { ascending: false });
        if (error) throw error;
        pollsData = data || [];
        if (pollsData.length > 0) savePollsToLocal();
        await loadPollVoters();
        renderPolls();
    } catch (error) {
        console.error('Ошибка загрузки опросов:', error);
        if (!loadPollsFromLocal()) pollsData = [];
        await loadPollVoters();
        renderPolls();
    }
}

async function loadPollVoters() {
    pollVotersData = {};
    if (!supabaseClient) return;
    try {
        const { data } = await supabaseClient.from('poll_votes').select('*');
        if (data) {
            data.forEach(v => {
                if (!pollVotersData[v.poll_id]) pollVotersData[v.poll_id] = [];
                pollVotersData[v.poll_id].push(v);
            });
        }
    } catch (e) {}
}

function savePollsToLocal() {
    try { localStorage.setItem('dfl_polls', JSON.stringify(pollsData)); } catch (e) {}
}
function loadPollsFromLocal() {
    try {
        const saved = localStorage.getItem('dfl_polls');
        if (saved) { pollsData = JSON.parse(saved); return true; }
    } catch (e) {}
    return false;
}

function getUnansweredPollsCount() {
    if (!currentUser || !currentUserData || !currentUserData.confirmed) return 0;
    return pollsData.filter(poll => poll && !poll.closed && userVotes[poll.id] === undefined).length;
}

function updatePollsUnansweredBadge() {
    const badge = $('polls-unanswered-badge');
    if (!badge) return;
    const count = getUnansweredPollsCount();
    if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
    else badge.classList.add('hidden');
}

function voterNameById(userId) {
    const u = allUsersData.find(x => String(x.id) === String(userId)) || localAccounts.find(x => String(x.id) === String(userId));
    return u ? (u.name || u.username) : 'Пользователь';
}

function votersListHtml(poll) {
    let html = `<div class="poll-voters-list"><b>👑 Проголосовали:</b>`;
    pollVotersData[poll.id].forEach(v => {
        const optionText = poll.options[v.option_index]?.text || '?';
        html += `<div class="voter-row">👤 ${esc(v.user_name || voterNameById(v.user_id))} → <b>${esc(optionText)}</b></div>`;
    });
    return html + `</div>`;
}

function renderPolls() {
    const container = $('polls-list');
    if (!container) return;
    if (pollsData.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;padding:30px;">📭 Нет опросов</p>';
        updatePollsUnansweredBadge();
        return;
    }
    let html = '';
    pollsData.forEach(poll => {
        if (!poll || !Array.isArray(poll.options)) return;
        const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
        const userVoted = userVotes[poll.id] !== undefined;
        const noChange = poll.no_change === true;
        const canVote = currentUser && currentUserData && currentUserData.confirmed;
        const shouldHighlight = canVote && !poll.closed && !userVoted;
        html += `<div class="poll-item ${shouldHighlight ? 'poll-unanswered' : ''}" data-poll-id="${poll.id}">
            ${shouldHighlight ? `<div class="poll-unanswered-label">🔴 ВЫ НЕ ГОЛОСОВАЛИ</div>` : ''}
            <div class="poll-question">${esc(poll.question)}</div>
            <div style="font-size:.78rem;color:#666;margin-bottom:8px;">
                ${noChange ? '🚫 <b>Один голос навсегда</b>' : '✅ Можно переголосовать'}
            </div>
            <div class="poll-options">`;
        poll.options.forEach((option, optIndex) => {
            const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
            const isVoted = userVoted && userVotes[poll.id] === optIndex;
            const canClick = !poll.closed && (!noChange || !userVoted);
            html += `<div class="poll-option ${isVoted ? 'voted' : ''}" ${canClick ? `onclick="votePoll('${poll.id}', ${optIndex})"` : ''} style="${!canClick ? 'opacity:.7;cursor:not-allowed;' : ''}">
                <span class="option-text">${esc(option.text)}</span>
                <span class="vote-count">${option.votes || 0} (${percent}%)</span>
            </div>`;
        });
        html += `</div>
            <div class="poll-meta">
                <span class="poll-status ${poll.closed ? 'closed' : ''}">${poll.closed ? '🔒 Закрыт' : '🟢 Активен'}</span>
                <span style="font-size:0.8rem;color:#888;">Всего голосов: ${totalVotes}</span>
            </div>`;
        if (adminLoggedIn && pollVotersData[poll.id]) {
            html += votersListHtml(poll);
        } else if (!adminLoggedIn && userVoted && canVote) {
            const votedOption = poll.options[userVotes[poll.id]];
            html += `<div style="margin-top:8px;font-size:.78rem;color:#16a34a;">✅ <b>Ваш голос:</b> ${esc(votedOption?.text || 'учтён')}</div>`;
        }
        if (adminLoggedIn) {
            html += `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
                <button class="admin-btn" onclick="togglePollClosed('${poll.id}')">${poll.closed ? '🔓 Открыть' : '🔒 Закрыть'}</button>
                <button class="admin-btn" style="background:#dc2626;" onclick="deletePoll('${poll.id}')">🗑️ Удалить</button>
            </div>`;
        }
        html += `</div>`;
    });
    container.innerHTML = html;
    updatePollsUnansweredBadge();
}

window.votePoll = async function (pollId, optionIndex) {
    if (!currentUser || !currentUserData) {
        showNotification('❌ Голосовать могут только пользователи с аккаунтом!', 'error');
        return;
    }
    if (!currentUserData.confirmed) {
        showNotification('❌ Аккаунт не подтверждён администратором!', 'error');
        return;
    }
    const voterId = currentUser.id;
    const voterName = currentUserData.name || currentUserData.username || 'Пользователь';

    const poll = pollsData.find(p => String(p.id) === String(pollId));
    if (!poll) return;
    if (poll.closed) { showNotification('❌ Опрос закрыт!', 'error'); return; }

    const alreadyVoted = userVotes[poll.id] !== undefined;
    const noChange = poll.no_change === true;
    if (noChange && alreadyVoted) { showNotification('❌ Переголосовать нельзя!', 'error'); return; }

    if (alreadyVoted && !noChange) {
        const oldOption = userVotes[poll.id];
        if (poll.options[oldOption] && poll.options[oldOption].votes > 0) poll.options[oldOption].votes -= 1;
        if (supabaseClient) {
            try {
                await supabaseClient.from('poll_votes').delete().eq('poll_id', poll.id).eq('user_id', String(voterId));
            } catch (e) {}
        }
    }

    poll.options[optionIndex].votes = (poll.options[optionIndex].votes || 0) + 1;
    userVotes[poll.id] = optionIndex;

    if (supabaseClient) {
        try {
            await supabaseClient.from('poll_votes').insert([{
                poll_id: poll.id,
                user_id: String(voterId),
                user_name: voterName,
                option_index: optionIndex
            }]);
            await supabaseClient.from('polls').update({ options: poll.options }).eq('id', poll.id);
        } catch (e) { console.error('Ошибка сохранения голоса:', e); }
    }

    savePollsToLocal();
    await loadPollVoters();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    showNotification(alreadyVoted ? '✅ Голос изменён!' : '✅ Голос учтён!', 'success');
};

window.togglePollClosed = async function (pollId) {
    const poll = pollsData.find(p => String(p.id) === String(pollId));
    if (!poll) return;
    poll.closed = !poll.closed;
    if (supabaseClient) {
        try { await supabaseClient.from('polls').update({ closed: poll.closed }).eq('id', poll.id); } catch (e) {}
    }
    savePollsToLocal();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    showNotification(poll.closed ? '🔒 Закрыт' : '🔓 Открыт', 'success');
};

window.deletePoll = async function (pollId) {
    if (!confirm('Удалить этот опрос?')) return;
    pollsData = pollsData.filter(p => String(p.id) !== String(pollId));
    if (supabaseClient) {
        try {
            await supabaseClient.from('polls').delete().eq('id', pollId);
            await supabaseClient.from('poll_votes').delete().eq('poll_id', pollId);
        } catch (e) {}
    }
    savePollsToLocal();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    showNotification('🗑️ Удалён', 'success');
};

function openCreatePollModal() {
    $('create-poll-modal').classList.add('active');
    $('poll-question').value = '';
    $('create-poll-status').textContent = '';
    $('create-poll-status').className = 'request-status';
    $('poll-no-change-checkbox').checked = false;
    $('poll-options-container').innerHTML = `
        <input type="text" class="poll-option-input" placeholder="Вариант 1" style="margin-bottom:8px;">
        <input type="text" class="poll-option-input" placeholder="Вариант 2" style="margin-bottom:8px;">
    `;
}

async function submitCreatePoll() {
    const question = $('poll-question').value.trim();
    const options = [];
    document.querySelectorAll('#poll-options-container .poll-option-input').forEach(inp => {
        const val = inp.value.trim();
        if (val) options.push({ text: val, votes: 0 });
    });
    const noChange = $('poll-no-change-checkbox').checked;
    const statusEl = $('create-poll-status');
    const fail = msg => { statusEl.textContent = msg; statusEl.className = 'request-status error'; };

    if (!question) return fail('❌ Введите вопрос!');
    if (options.length < 2) return fail('❌ Минимум 2 варианта!');
    if (options.length > 6) return fail('❌ Максимум 6 вариантов!');

    const newPoll = { id: Date.now(), question, options, closed: false, no_change: noChange, created_at: new Date().toISOString() };

    let savedToSupabase = false;
    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('polls').insert([newPoll]);
            if (error) { console.error('Ошибка Supabase:', error); return fail('❌ Ошибка сохранения: ' + error.message); }
            savedToSupabase = true;
        } catch (e) {
            console.error('Исключение Supabase:', e);
            return fail('❌ Ошибка подключения');
        }
    }

    pollsData.unshift(newPoll);
    if (!savedToSupabase) savePollsToLocal();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    $('create-poll-modal').classList.remove('active');
    showNotification('✅ Опрос создан!', 'success');
}

function renderAdminPollsList() {
    const container = $('admin-polls-list');
    if (!container) return;
    if (pollsData.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Нет опросов</p>';
        return;
    }
    let html = '';
    pollsData.forEach(poll => {
        if (!poll || !Array.isArray(poll.options)) return;
        const total = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
        html += `<div class="poll-item">
            <div class="poll-question">${esc(poll.question)}</div>
            <div style="font-size:.8rem;color:#666;margin-bottom:8px;">
                ${poll.no_change ? '🚫 Один голос' : '✅ Можно переголосовать'} • Всего: ${total}
            </div>`;
        if (pollVotersData[poll.id]) html += votersListHtml(poll);
        html += `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
            <button class="admin-btn" onclick="togglePollClosed('${poll.id}')">${poll.closed ? '🔓 Открыть' : '🔒 Закрыть'}</button>
            <button class="admin-btn" style="background:#dc2626;" onclick="deletePoll('${poll.id}')">🗑️ Удалить</button>
        </div></div>`;
    });
    container.innerHTML = html;
}

// ===================== Жалобы =====================
function currentAuthorName() {
    return currentUserData?.name || currentUserData?.username || null;
}

async function loadComplaints() {
    try {
        if (!supabaseClient) { complaintsData = []; renderComplaints(); if (adminLoggedIn) renderAdminComplaintsList(); return; }
        const { data, error } = await supabaseClient.from('complaints').select('*').order('id', { ascending: false });
        if (error) throw error;
        complaintsData = data || [];
        renderComplaints();
        if (adminLoggedIn) renderAdminComplaintsList();
    } catch (error) { complaintsData = []; renderComplaints(); }
}

function checkComplaintUpdates() {
    const myName = currentAuthorName();
    if (!myName) return;
    let savedSeen = {};
    try { savedSeen = JSON.parse(localStorage.getItem('dfl_seen_verdicts') || '{}'); } catch (e) {}
    const newVerdicts = [];
    complaintsData.filter(c => c.from_user === myName && c.status !== 'pending').forEach(c => {
        if (!savedSeen[c.id]) { newVerdicts.push(c); savedSeen[c.id] = true; }
    });
    if (newVerdicts.length > 0) {
        try { localStorage.setItem('dfl_seen_verdicts', JSON.stringify(savedSeen)); } catch (e) {}
        newVerdicts.forEach(c => {
            const icon = c.status === 'resolved' ? '✅' : '❌';
            const text = c.verdict || (c.status === 'resolved' ? 'Подтверждено' : 'Отклонено');
            showNotification(`${icon} Вердикт по вашей жалобе "${c.reason}": ${text}`, c.status === 'resolved' ? 'success' : 'error');
        });
    }
}

function verdictHtmlFor(complaint, resolvedDefault, rejectedDefault) {
    if (complaint.status === 'pending') return `<div class="complaint-verdict pending">⏳ Ожидает рассмотрения</div>`;
    if (complaint.status === 'resolved') return `<div class="complaint-verdict resolved">✅ <b>Вердикт:</b> ${esc(complaint.verdict || resolvedDefault)}</div>`;
    if (complaint.status === 'rejected') return `<div class="complaint-verdict rejected">❌ <b>Вердикт:</b> ${esc(complaint.verdict || rejectedDefault)}</div>`;
    return '';
}

function renderComplaints() {
    const container = $('complaints-list');
    if (!container) return;
    const myName = currentAuthorName();
    const isAdmin = adminLoggedIn;

    if (!isAdmin && !myName) {
        container.innerHTML = `<p style="text-align:center;color:#666;padding:30px;">🔒 Войдите, чтобы видеть свои жалобы</p>`;
        return;
    }

    const visibleComplaints = isAdmin ? complaintsData : complaintsData.filter(c => c.from_user === myName);

    const headerHtml = isAdmin
        ? `<div style="margin-bottom:14px;padding:10px 14px;background:#fef3c7;border-radius:10px;border-left:4px solid #d97706;font-size:.85rem;color:#92400e;">👑 <b>Режим администратора.</b> Показаны все жалобы.</div>`
        : `<div style="margin-bottom:14px;padding:10px 14px;background:var(--accent-soft);border-radius:10px;border-left:4px solid var(--accent);font-size:.85rem;">🔒 <b>Показаны только ваши жалобы.</b> Чужие жалобы видны только администратору.</div>`;

    if (visibleComplaints.length === 0) {
        container.innerHTML = headerHtml + `<p style="text-align:center;color:#666;padding:30px;">📭 ${isAdmin ? 'Нет жалоб' : 'У вас пока нет жалоб'}</p>`;
        return;
    }

    let html = headerHtml;
    visibleComplaints.forEach(complaint => {
        const date = new Date(complaint.created_at).toLocaleString('ru-RU');
        const isMine = myName && complaint.from_user === myName;
        let adminControls = '';
        if (isAdmin && complaint.status === 'pending') {
            adminControls = `<div class="complaint-verdict-input">
                <input type="text" id="verdict-input-${complaint.id}" placeholder="Напишите вердикт (необязательно)...">
                <button class="resolve-btn" onclick="resolveComplaint('${complaint.id}', 'resolved')">✅ Подтвердить</button>
                <button class="reject-btn" onclick="resolveComplaint('${complaint.id}', 'rejected')">❌ Отклонить</button>
            </div>`;
        }
        const mineLabel = (isMine && isAdmin)
            ? `<span style="display:inline-block;background:#0066cc;color:#fff;font-size:.65rem;font-weight:800;padding:2px 10px;border-radius:999px;margin-left:8px;">⭐ ВАША</span>` : '';

        html += `<div class="complaint-item" style="${isMine && isAdmin ? 'border-left-color:#0066cc;' : ''}">
            <div class="complaint-header">
                <span class="complaint-from">${isAdmin ? `👤 ${esc(complaint.from_user || 'Аноним')}${mineLabel}` : '📝 Моя жалоба'}</span>
                <span class="complaint-date">🕐 ${date}</span>
            </div>
            <div class="complaint-reason">📌 ${esc(complaint.reason)}</div>
            <div class="complaint-text">${esc(complaint.text)}</div>
            ${verdictHtmlFor(complaint, 'Нарушение подтверждено', 'Нарушение не подтверждено')}
            ${adminControls}
        </div>`;
    });
    container.innerHTML = html;
}

async function applyComplaintVerdict(complaintId, status, inputId, defResolved, defRejected) {
    if (!adminLoggedIn) { showNotification('❌ Только админ!', 'error'); return false; }
    const complaint = complaintsData.find(c => String(c.id) === String(complaintId));
    if (!complaint) { showNotification('❌ Жалоба не найдена (перезагрузите страницу)', 'error'); return false; }
    const input = $(inputId);
    const verdict = input ? input.value.trim() : '';
    complaint.status = status;
    complaint.verdict = verdict || (status === 'resolved' ? defResolved : defRejected);
    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('complaints')
                .update({ status: complaint.status, verdict: complaint.verdict }).eq('id', complaint.id);
            if (error) { console.error('Ошибка обновления жалобы:', error); showNotification(`❌ Ошибка: ${error.message}`, 'error'); return false; }
        } catch (e) { console.error('Исключение при обновлении:', e); }
    }
    renderComplaints();
    renderAdminComplaintsList();
    showNotification(status === 'resolved' ? '✅ Жалоба принята' : '❌ Жалоба отклонена', 'success');
    return true;
}

window.resolveComplaint = (id, status) =>
    applyComplaintVerdict(id, status, `verdict-input-${id}`, 'Подтверждено', 'Отклонено');
window.adminResolveComplaint = (id, status) =>
    applyComplaintVerdict(id, status, `admin-verdict-input-${id}`, 'Нарушение подтверждено', 'Нарушение не подтверждено');

async function submitComplaint() {
    const authorName = currentAuthorName();
    if (!authorName) { showNotification('❌ Войдите в аккаунт!', 'error'); return; }
    if (currentUser && (!currentUserData || !currentUserData.confirmed)) {
        showNotification('❌ Аккаунт не подтверждён!', 'error');
        return;
    }

    const reasonSelect = $('complaint-reason');
    const customReasonInput = $('complaint-custom-reason');
    const text = $('complaint-text').value.trim();
    const statusEl = $('complaint-status');
    const fail = msg => { statusEl.textContent = msg; statusEl.className = 'request-status error'; };

    let reason = reasonSelect.value;
    if (reason === 'Другое') reason = customReasonInput.value.trim();
    if (!reason) return fail('❌ Укажите причину!');
    if (!text) return fail('❌ Опишите ситуацию!');

    const complaint = {
        id: Date.now(), from_user: authorName, reason, text,
        status: 'pending', verdict: '', created_at: new Date().toISOString()
    };

    try {
        if (supabaseClient) {
            const { error } = await supabaseClient.from('complaints').insert([complaint]);
            if (error) return fail(`❌ Ошибка: ${error.message}`);
        }
        complaintsData.unshift(complaint);
        renderComplaints();
        if (adminLoggedIn) renderAdminComplaintsList();

        $('complaint-modal').classList.remove('active');
        reasonSelect.value = '';
        customReasonInput.value = '';
        $('complaint-custom-reason-group').style.display = 'none';
        $('complaint-text').value = '';
        statusEl.textContent = '';
        showNotification('✅ Жалоба отправлена!', 'success');
    } catch (error) {
        fail(`❌ Ошибка: ${error.message || 'Неизвестная ошибка'}`);
    }
}

function renderAdminComplaintsList() {
    const container = $('admin-complaints-list');
    if (!container) return;
    if (complaintsData.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">📭 Нет жалоб</p>';
        return;
    }
    let html = '';
    complaintsData.forEach(complaint => {
        const date = new Date(complaint.created_at).toLocaleString('ru-RU');
        let adminControls = '';
        if (complaint.status === 'pending') {
            adminControls = `<div class="complaint-verdict-input">
                <input type="text" id="admin-verdict-input-${complaint.id}" placeholder="Напишите вердикт (необязательно)...">
                <button class="resolve-btn" onclick="adminResolveComplaint('${complaint.id}', 'resolved')">✅ Принять</button>
                <button class="reject-btn" onclick="adminResolveComplaint('${complaint.id}', 'rejected')">❌ Отклонить</button>
            </div>`;
        }
        html += `<div class="complaint-item">
            <div class="complaint-header">
                <span class="complaint-from">👤 ${esc(complaint.from_user || 'Аноним')}</span>
                <span class="complaint-date">🕐 ${date}</span>
            </div>
            <div class="complaint-reason">📌 ${esc(complaint.reason)}</div>
            <div class="complaint-text">${esc(complaint.text)}</div>
            ${verdictHtmlFor(complaint, 'Нарушение подтверждено', 'Нарушение не подтверждено')}
            ${adminControls}
        </div>`;
    });
    container.innerHTML = html;
}

// ===================== Пользователи =====================
async function loadAllUsers() {
    if (!adminLoggedIn) return;
    try {
        if (!supabaseClient) { allUsersData = [...localAccounts]; renderUsersList(); return; }
        const { data, error } = await supabaseClient.from('user_accounts').select('*').order('created_at', { ascending: false });
        if (error) {
            allUsersData = [...localAccounts];
        } else {
            const supaUsers = data || [];
            const supaIds = new Set(supaUsers.map(u => String(u.id)));
            const extraLocal = localAccounts.filter(u => !supaIds.has(String(u.id)));
            allUsersData = [...supaUsers, ...extraLocal];
        }
        renderUsersList();
    } catch (error) {
        allUsersData = [...localAccounts];
        renderUsersList();
    }
}

function playerOptionsHtml(selectedId) {
    return Object.keys(playersData).map(pid =>
        `<option value="${pid}" ${selectedId === pid ? 'selected' : ''}>${esc(playersData[pid].name)}</option>`
    ).join('');
}

function renderUsersList() {
    const container = $('users-list');
    if (!container) return;
    const unconfirmed = allUsersData.filter(u => !u.confirmed);
    const confirmed = allUsersData.filter(u => u.confirmed);
    let html = `<h3 style="color:#f59e0b;margin-bottom:10px;">⏳ Неподтверждённые (${unconfirmed.length})</h3>`;
    if (unconfirmed.length === 0) {
        html += '<p style="color:#666;padding:10px;">✅ Нет неподтверждённых</p>';
    } else {
        unconfirmed.forEach(user => {
            html += `<div class="user-item">
                <div class="user-info-block">
                    <div class="user-username">👤 ${esc(user.username || 'Без логина')}</div>
                    <div class="user-realname">📝 Имя: ${esc(user.name || 'Не указано')}</div>
                    <span class="user-status-small unconfirmed">⏳ Не подтверждён</span>
                </div>
                <div class="user-actions-block">
                    <select id="player-select-${user.id}">
                        <option value="">Выберите игрока...</option>
                        ${playerOptionsHtml('')}
                    </select>
                    <button class="confirm-btn" onclick="confirmUser('${user.id}')">✅ Подтвердить</button>
                    <button class="delete-user-btn" onclick="deleteUser('${user.id}')">🗑️</button>
                </div>
            </div>`;
        });
    }
    html += `<h3 style="color:#16a34a;margin-bottom:10px;margin-top:20px;">✅ Подтверждённые (${confirmed.length})</h3>`;
    if (confirmed.length === 0) {
        html += '<p style="color:#666;padding:10px;">Нет подтверждённых</p>';
    } else {
        confirmed.forEach(user => {
            const player = user.player_id && playersData[user.player_id];
            html += `<div class="user-item">
                <div class="user-info-block">
                    <div class="user-username">👤 ${esc(user.username || 'Без логина')}</div>
                    <div class="user-realname">📝 Имя: ${esc(user.name || 'Не указано')}</div>
                    <div class="user-realname">🎮 Игрок: ${player ? esc(player.name) : 'Не привязан'}</div>
                    <span class="user-status-small confirmed">✅ Подтверждён</span>
                </div>
                <div class="user-actions-block">
                    <select id="player-select-${user.id}">
                        <option value="">Сменить игрока...</option>
                        ${playerOptionsHtml(user.player_id)}
                    </select>
                    <button class="confirm-btn" onclick="confirmUser('${user.id}')">💾</button>
                    <button class="delete-user-btn" onclick="deleteUser('${user.id}')">🗑️</button>
                </div>
            </div>`;
        });
    }
    container.innerHTML = html;
}

window.confirmUser = async function (userId) {
    if (!adminLoggedIn) return;
    const select = $(`player-select-${userId}`);
    const playerId = select ? select.value : '';
    if (!playerId) { showNotification('❌ Выберите игрока!', 'error'); return; }
    try {
        const user = allUsersData.find(u => String(u.id) === String(userId));
        if (user) { user.confirmed = true; user.player_id = playerId; }
        if (supabaseClient) {
            try { await supabaseClient.from('user_accounts').update({ confirmed: true, player_id: playerId }).eq('id', userId); } catch (e) {}
        }
        const localIdx = localAccounts.findIndex(u => String(u.id) === String(userId));
        if (localIdx !== -1) {
            localAccounts[localIdx].confirmed = true;
            localAccounts[localIdx].player_id = playerId;
            saveLocalAccounts();
        }
        if (currentUserData && String(currentUserData.id) === String(userId)) {
            currentUserData.confirmed = true;
            currentUserData.player_id = playerId;
            saveUserSession();
            updateUserUI();
        }
        showNotification('✅ Подтверждён!', 'success');
        loadAllUsers();
    } catch (error) { showNotification('❌ Ошибка!', 'error'); }
};

window.deleteUser = async function (userId) {
    if (!adminLoggedIn) return;
    if (!confirm('Удалить пользователя?')) return;
    try {
        if (supabaseClient) {
            try { await supabaseClient.from('user_accounts').delete().eq('id', userId); } catch (e) {}
        }
        localAccounts = localAccounts.filter(u => String(u.id) !== String(userId));
        saveLocalAccounts();
        showNotification('🗑️ Удалён', 'success');
        loadAllUsers();
    } catch (error) { showNotification('❌ Ошибка!', 'error'); }
};

async function registerUser(name, username, password) {
    try {
        const existingLocal = localAccounts.find(a => (a.username || '').toLowerCase() === username.toLowerCase());
        if (existingLocal) { showNotification('❌ Логин занят!', 'error'); return; }
        if (supabaseClient) {
            try {
                const { data: existing } = await supabaseClient.from('user_accounts').select('id').eq('username', username.trim()).maybeSingle();
                if (existing) { showNotification('❌ Логин занят!', 'error'); return; }
            } catch (e) {}
        }
        const newUser = {
            username: username.trim(),
            password_hash: simpleHash(password),
            name: name.trim(),
            confirmed: false,
            player_id: null,
            created_at: new Date().toISOString()
        };
        let savedToSupabase = false;
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('user_accounts').insert([newUser]).select().single();
                if (!error && data) savedToSupabase = true;
            } catch (e) {}
        }
        // Локальная копия — только если сервер недоступен (иначе в админке будут дубли)
        if (!savedToSupabase) {
            localAccounts.push({ id: 'local_' + Date.now(), ...newUser });
            saveLocalAccounts();
        }
        showNotification('✅ Регистрация! Ждите подтверждения.', 'success');
        $('account-modal').classList.remove('active');
    } catch (error) {
        showNotification('❌ Ошибка', 'error');
    }
}

async function finishUserLogin(userData) {
    currentUser = { id: userData.id };
    currentUserData = userData;
    saveUserSession();
    updateUserUI();
    await loadUserVotes();
    renderPolls();
    renderComplaints();
    $('account-modal').classList.remove('active');
    sendOnlineHeartbeat();
    showNotification(`✅ Добро пожаловать, ${userData.name || userData.username}!`, 'success');
}

async function loginUser(username, password) {
    try {
        const passwordHash = simpleHash(password);
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('user_accounts').select('*')
                    .eq('username', username.trim()).eq('password_hash', passwordHash).maybeSingle();
                if (!error && data) { await finishUserLogin(data); return; }
            } catch (e) {}
        }
        const local = localAccounts.find(a => (a.username || '').toLowerCase() === username.toLowerCase() && a.password_hash === passwordHash);
        if (local) { await finishUserLogin(local); return; }
        showNotification('❌ Неверный логин или пароль!', 'error');
    } catch (error) {
        showNotification('❌ Ошибка', 'error');
    }
}

async function loadUserVotes() {
    userVotes = {};
    if (!supabaseClient || !currentUser) return;
    try {
        const { data, error } = await supabaseClient.from('poll_votes').select('*').eq('user_id', String(currentUser.id));
        if (error) throw error;
        (data || []).forEach(vote => { userVotes[vote.poll_id] = vote.option_index; });
    } catch (error) { console.error('Ошибка загрузки голосов:', error); }
}

function updateUserUI() {
    const avatarBtn = $('avatar-btn');
    if (!avatarBtn) return;
    if (adminLoggedIn && !currentUser) {
        avatarBtn.innerHTML = `👑<span class="admin-dot"></span>`;
        return;
    }
    if (currentUser && currentUserData) {
        const playerId = currentUserData.player_id;
        const avatarSrc = playerId && typeof playerPhotos !== 'undefined' && playerPhotos[playerId] ? playerPhotos[playerId] : null;
        const dotClass = adminLoggedIn ? 'admin-dot' : (currentUserData.confirmed ? 'online-dot' : 'unconfirmed-dot');
        if (avatarSrc) avatarBtn.innerHTML = `<img src="${avatarSrc}" alt=""><span class="${dotClass}"></span>`;
        else avatarBtn.innerHTML = `👤<span class="${dotClass}"></span>`;
    } else {
        avatarBtn.innerHTML = '👤';
    }
}

async function logoutUser() {
    await removeOnlineSelf();
    currentUser = null;
    currentUserData = null;
    userVotes = {};
    saveUserSession();
    updateUserUI();
    renderPolls();
    renderComplaints();
    $('account-modal').classList.remove('active');
    showNotification('👋 Вы вышли', 'success');
}

function openAccountModal() {
    const modal = $('account-modal');
    if (!modal) return;
    modal.classList.add('active');
    if (currentUser && currentUserData) {
        $('account-content-guest').style.display = 'none';
        $('account-content-user').style.display = 'block';
        const playerId = currentUserData.player_id;
        const player = playerId ? playersData[playerId] : null;
        const avatarEl = $('account-avatar-big');
        if (playerId && typeof playerPhotos !== 'undefined' && playerPhotos[playerId]) {
            avatarEl.innerHTML = `<img src="${playerPhotos[playerId]}" alt="">`;
        } else if (player) {
            avatarEl.textContent = player.icon || '⚽';
        } else {
            avatarEl.textContent = '👤';
        }
        $('account-user-name').textContent = currentUserData.name || currentUserData.username || 'Без имени';
        $('account-user-email').textContent = 'Логин: ' + (currentUserData.username || '—');
        const statusEl = $('account-user-status');
        if (adminLoggedIn) {
            statusEl.textContent = '👑 Админ + Пользователь';
            statusEl.className = 'account-status-pill admin';
        } else if (currentUserData.confirmed) {
            statusEl.textContent = '✅ Подтверждён';
            statusEl.className = 'account-status-pill confirmed';
        } else {
            statusEl.textContent = '⏳ Неподтверждён';
            statusEl.className = 'account-status-pill unconfirmed';
        }
        $('account-player-name').textContent = player ? player.name : '—';
        $('account-player-rating').textContent = player ? `⭐ ${player.rating}` : '—';
        $('account-player-position').textContent = player ? player.position : '—';
        const teamId = playerId ? Object.keys(CAPTAINS).find(tid => CAPTAINS[tid].players.includes(playerId)) : null;
        $('account-player-team').textContent = teamId ? CAPTAINS[teamId].name : '—';

        $('account-admin-panel-btn').style.display = adminLoggedIn ? 'block' : 'none';
        $('account-admin-login-btn').style.display = adminLoggedIn ? 'none' : 'block';
        $('account-admin-logout-btn').style.display = adminLoggedIn ? 'block' : 'none';
    } else {
        $('account-content-guest').style.display = 'block';
        $('account-content-user').style.display = 'none';
    }
}

// ===================== Регламент =====================
function initRulesAccordion() {
    const rulesData = [
        { section: '1', title: 'Общие положения Регламента', rules: [
            { num: '1.1', text: 'Настоящий Регламент регулирует проведение матчей в Дворовой Футбольной Лиге.' },
            { num: '1.2.1', text: 'За пресечение Настоящего Регламента ДФЛ к команде нарушителя или самому нарушителю будут наложены определенные санкции. (штраф, дисквалификация)' },
            { num: '1.2.2', text: 'Игрок не является виновным в нарушении Регламента, пока не будет доказано обратное.' },
            { num: '1.3', text: 'Те вопросы, которые не затрагивает Регламент, будут решаться организаторами лиги.' },
            { num: '1.4.1', text: 'Критической ситуацией считается тяжелое положение команды в предматчевое время.' },
            { num: '1.4.2', text: 'Кризис команды - состояние, при котором состав команды малочислен (<5 игроков, можно нарушить 5.3)' },
        ]},
        { section: '2', title: 'Порядок проведения матчей', rules: [
            { num: '2.1', text: 'Перед проведением любого официального матча ДФЛ хозяева поля обязаны привести поле в годность (см. 2.4), а также обеспечить судейство (перед назначением судьи требуется разрешение обоих капитанов)' },
            { num: '2.2', text: 'Мяч в первом тайме сводит команда хозяев, если матч проходит на нейтральном поле, происходит жеребьевка.' },
            { num: '2.3', text: 'Формат игры определяется перед матчем капитанами команд.' },
            { num: '2.4', text: 'Поле считается годным для проведения матча, когда на поле присутствует соответствующая разметка и имеются ворота одного размера.' },
            { num: '2.5', text: 'Команда имеет право отказаться от матча без причины не менее чем за час до игры, в противном случае команде будет выставлено техническое поражение.' },
            { num: '2.5.1', text: 'Причины для отказа от матча: погодные условия, состояние поля, поведение игроков. Решение об отказе от матча должно быть обговорено с судьей.' },
        ]},
        { section: '3', title: 'Команды и составы', rules: [
            { num: '3.1', text: 'Если команда получает техническое поражение в матче, им вводится 7-дневный бан на матчи.' },
            { num: '3.1.3', text: 'Особые матчи: Арсенал/ПСЖ/Звезды - МЕРА/ФК78/Южный. Данные матчи разрешены, однако они не несут никакой ценности, и на сайте не отобразятся.' },
            { num: '3.2', text: 'Уйти из клуба в другой игроку разрешено с одобрения капитана/владельца команды.' },
            { num: '3.3', text: 'При переходе игрока его мнение учитывается ОБЯЗАТЕЛЬНО.' },
            { num: '3.5', text: 'Многочисленность команды - ситуация, при которой в составе команды одновременно находится более 10 игроков.' },
        ]},
        { section: '4', title: 'Апелляции и жалобы', rules: [
            { num: '4.1', text: 'При несогласии с решением судьи и подобных случаях команда имеет право подать апелляцию.' },
            { num: '4.2.1', text: 'Апелляции и жалобы рассматриваются только в том случае, если правильно указана информация жалобы.' },
            { num: '4.2.2', text: 'В любой жалобе или апелляции должны быть указаны: пункт регламента (если он нарушен), подробное описание ситуации и свои контакты/данные.' },
            { num: '4.3', text: 'Апелляции могут рассматриваться в течение 7 дней, после чего выносится вердикт.' },
        ]},
        { section: '5', title: 'Игроки и судьи', rules: [
            { num: '5.1', text: 'Если игрок не проявляет никакой активности в ДФЛ в течение 2 месяцев, его карта будет заморожена и не будет видна во вкладке команд.' },
            { num: '5.2', text: 'Требования к игроку для регистрации: возраст 9-16 лет, не имеет значительных проблем со здоровьем (инвалидность, психические расстройства и т.д.), не был до этого в ДФЛ.' },
            { num: '5.2.1', text: 'Игрок является частью команды, поэтому за нарушения, связанные с результатами команды и т.д. будет наказываться вся команда.' },
            { num: '5.3', text: 'Регистрация игрока - обязательное условие для участия в матчах.' },
            { num: '5.4', text: 'Требования к судье: не играет ни за одну играющую в матче команду, знает правила и не болеет за какую либо команду, играющую в матче, с его назначением согласны обе команды.' },
        ]},
        { section: '6', title: 'Виды нарушений и ответственность', rules: [
            { num: '6.1', text: 'Виды наказания игрока за пресечение Регламента ДФЛ: Дисквалификация (временная/пожизненная), запрет на участие в матчах (временный), запрет на переход в другую команду.' },
            { num: '6.2', text: 'Решения о назначении наказания принимаются исключительно после доказательства о нарушении организаторами согласно действующему Регламенту.' },
            { num: '6.3', text: 'За распространение заведомо ложной информации о проведении, месте, времени, формате, условиях матча, которое привело к изменениям/отмене/проведению матча, предполагается ответственность.' },
            { num: '6.4.1', text: 'Если матч рассудили предвзято, его результат будет аннулирован, а судья наказан дисквалификацией.' },
            { num: '6.4.2', text: 'Если при пункте 6.4.1 будет доказана виновность команды, она наказывается 14-ти-дневным матчевым баном.' },
            { num: '6.5', text: 'Если команда не проводит матчи без причины более 4 месяцев, она исчезает из сайта, а все данные, матчи с данной командой будут стерты.' },
        ]},
        { section: '7', title: 'Полномочия организаторов Лиги', rules: [
            { num: '7.1.1', text: 'Организаторы Лиги имеют наиболее расширенные полномочия, чем обычные игроки/судьи.' },
            { num: '7.1.2', text: 'Все решения, принимающиеся организаторами Лиги, должны соответствовать Регламенту. Ограничивать действия организаторов может только Регламент.' },
            { num: '7.1.3', text: 'Капитан/представитель команды имеет право запросить отчет действий организатора, если это касается его команды или решается вопрос, не затрагиваемый Регламентом.' },
            { num: '7.4', text: 'Организаторы имеют исключительное право изменять Регламент и выносить вердикт по жалобам/апелляциям.' },
            { num: '7.5', text: 'Назначение матчей происходит под ведомом организаторов Лиги.' },
            { num: '7.6', text: 'Организаторы Лиги имеют право назначить судью на матч, в случае, если данный кандидат проходит требования Регламента (см 5.4).' },
        ]},
    ];
    const rulesList = $('rules-list');
    if (!rulesList) return;
    rulesList.innerHTML = rulesData.map(section => `<div class="rules-section">
        <div class="rules-section-header" onclick="toggleRulesSection(this)">
            <span><span class="section-num">${section.section}.</span> ${section.title}</span>
            <span class="toggle-icon">▼</span>
        </div>
        <div class="rules-section-body">
            ${section.rules.map(rule => `<div class="rule-item"><span class="rule-num">${rule.num}.</span> ${rule.text}</div>`).join('')}
        </div>
    </div>`).join('');
}

window.toggleRulesSection = function (header) {
    header.closest('.rules-section').classList.toggle('open');
};

window.editMatch = function (matchId) { openEditMatchModal(matchId); };

// ===================== Инициализация =====================
document.addEventListener('DOMContentLoaded', function () {
    initRulesAccordion();

    // Тема
    const themeBtn = $('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
    if (themeBtn) themeBtn.addEventListener('click', function () {
        themeClickCount++;
        if (themeClickCount >= 15) {
            themeClickCount = 0;
            const so = $('secret-overlay');
            if (so) so.classList.add('active');
        }
        document.body.classList.toggle('dark-theme');
        this.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Новости
    const newsList = $('news-list');
    if (newsList) {
        newsList.innerHTML = '';
        if (typeof newsData !== 'undefined' && Array.isArray(newsData)) {
            newsData.forEach((news, index) => {
                const item = document.createElement('div');
                item.className = 'news-item';
                let mediaHtml = '';
                if (typeof newsMedia !== 'undefined' && newsMedia[index] && newsMedia[index].url) {
                    const media = newsMedia[index];
                    mediaHtml = media.type === 'video'
                        ? `<div class="news-media"><video controls src="${media.url}"></video></div>`
                        : `<div class="news-media"><img src="${media.url}" alt=""></div>`;
                }
                item.innerHTML = `
                    <div class="news-date">${news.date}</div>
                    <div class="news-title">${news.title}</div>
                    <div class="news-text">${news.text}</div>
                    <span class="news-tag">${news.tag}</span>
                    ${mediaHtml}`;
                newsList.appendChild(item);
            });
        }
    }

    // Восстановление сессий
    const adminRestored = restoreAdminSession();
    if (adminRestored) setAdminUI(true);

    (async () => {
        const adminOk = adminRestored ? await verifyAdminSession() : false;

        if (supabaseClient && adminOk) {
            try {
                const { data } = await supabaseClient.from('user_accounts').select('*');
                if (data) allUsersData = data;
            } catch (e) {}
        }

        const userRestored = restoreUserSession();
        if (userRestored) await loadUserVotes();

        updateUserUI();
        startOnlineHeartbeat();

        if (!userRestored && !adminOk) setTimeout(openAccountModal, 800);

        await loadPolls();
        updatePollsUnansweredBadge();
        await loadComplaints();
        if (adminOk) {
            renderMatches();
            renderAdminPollsList();
            renderAdminComplaintsList();
        }
    })();

    // Аккаунт
    on('avatar-btn', 'click', openAccountModal);
    on('account-close', 'click', () => $('account-modal').classList.remove('active'));
    on('account-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('tab-login', 'click', function () {
        this.classList.add('active');
        $('tab-register').classList.remove('active');
        $('login-form').classList.add('active');
        $('register-form').classList.remove('active');
    });
    on('tab-register', 'click', function () {
        this.classList.add('active');
        $('tab-login').classList.remove('active');
        $('register-form').classList.add('active');
        $('login-form').classList.remove('active');
    });
    on('auth-login-submit', 'click', function () {
        const username = $('auth-login-username').value.trim();
        const password = $('auth-login-password').value.trim();
        if (username && password) {
            loginUser(username, password);
            $('auth-login-username').value = '';
            $('auth-login-password').value = '';
            $('auth-login-status').textContent = '';
        } else {
            $('auth-login-status').textContent = '❌ Введите логин и пароль!';
        }
    });
    on('auth-register-submit', 'click', function () {
        const name = $('auth-register-name').value.trim();
        const username = $('auth-register-username').value.trim();
        const password = $('auth-register-password').value.trim();
        const password2 = $('auth-register-password2').value.trim();
        const statusEl = $('auth-register-status');
        if (!name) { statusEl.textContent = '❌ Введите имя!'; return; }
        if (!username) { statusEl.textContent = '❌ Введите логин!'; return; }
        if (!password || password.length < 6) { statusEl.textContent = '❌ Пароль минимум 6 символов!'; return; }
        if (password !== password2) { statusEl.textContent = '❌ Пароли не совпадают!'; return; }
        statusEl.textContent = '';
        registerUser(name, username, password);
        ['name', 'username', 'password', 'password2'].forEach(f => { $('auth-register-' + f).value = ''; });
    });
    on('guest-btn', 'click', function () {
        $('account-modal').classList.remove('active');
        showNotification('👤 Вы вошли как гость', 'success');
    });
    on('account-logout-btn', 'click', logoutUser);
    on('account-admin-login-btn', 'click', function () {
        $('account-modal').classList.remove('active');
        setTimeout(() => {
            $('admin-auth-modal').classList.add('active');
            $('admin-auth-status').textContent = '';
        }, 200);
    });
    on('account-admin-logout-btn', 'click', function () {
        adminLogout();
        $('account-modal').classList.remove('active');
    });

    const openAdminPanel = () => {
        if (!adminLoggedIn) return;
        showPage('admin-panel-page');
        loadAllUsers();
        renderAdminPollsList();
        renderAdminComplaintsList();
        renderOnlinePanel();
    };
    on('account-admin-panel-btn', 'click', function () {
        $('account-modal').classList.remove('active');
        openAdminPanel();
    });
    on('admin-panel-btn', 'click', openAdminPanel);

    // Навигация
    on('matches-btn', 'click', () => { showPage('matches-page'); loadMatches(); });
    on('yards-btn', 'click', () => showPage('yards-page'));
    on('news-btn', 'click', () => showPage('news-page'));
    on('rules-btn', 'click', () => showPage('rules-page'));
    on('polls-btn', 'click', () => { showPage('polls-page'); loadPolls(); });
    on('complaints-nav-btn', 'click', () => {
        showPage('complaints-page');
        renderComplaints();
        checkComplaintUpdates();
    });
    on('complaint-btn-main', 'click', function () {
        if (!currentUser) {
            openAccountModal();
            showNotification('❌ Войдите в аккаунт!', 'error');
            return;
        }
        if (!currentUserData || !currentUserData.confirmed) {
            showNotification('❌ Аккаунт не подтверждён!', 'error');
            return;
        }
        $('complaint-modal').classList.add('active');
        $('complaint-status').textContent = '';
    });

    ['players', 'squad', 'matches', 'yards', 'news', 'rules', 'polls', 'complaints', 'admin-panel'].forEach(name => {
        on(`back-from-${name}`, 'click', () => showPage('home-page'));
    });
    ['mera', '78', 'yuzhka', 'arsenal', 'psg', 'zvezda'].forEach(name => {
        on(`back-from-yard-${name}`, 'click', () => showPage('yards-page'));
    });
    on('back-from-match-tactics', 'click', () => showPage('matches-page'));

    on('yard-mera', 'click', () => showPage('yard-mera-page'));
    on('yard-78-school', 'click', () => showPage('yard-78-page'));
    on('yard-yuzhka', 'click', () => showPage('yard-yuzhka-page'));
    on('yard-arsenal', 'click', () => showPage('yard-arsenal-page'));
    on('yard-psg', 'click', () => showPage('yard-psg-page'));
    on('yard-zvezda', 'click', () => showPage('yard-zvezda-page'));

    // Карточки игроков
    renderMainPlayerCards();
    renderPlayerCards('yard-mera-grid', meraTeamIds);
    renderPlayerCards('yard-78-grid', yard78PlayerIds);
    renderPlayerCards('yard-zvezda-grid', zvezdaPlayerIds);
    renderPlayerCards('yard-yuzhka-grid', yuzhkaPlayerIds);
    renderPlayerCards('yard-arsenal-grid', arsenalPlayerIds);
    renderPlayerCards('yard-psg-grid', psgPlayerIds);

    on('player-search', 'input', e => filterPlayers(e.target.value));
    on('sort-rating', 'click', function () {
        activeSort = 'rating';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applySortToFiltered();
    });
    on('sort-name', 'click', function () {
        activeSort = 'name';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applySortToFiltered();
    });
    on('reset-sort', 'click', resetSortAndFilter);

    // Страница состава
    ['raya', 'lesha_podavalny', 'maxim', 'demid', 'aleksey_doroshenko'].forEach(id => {
        const photoEl = $(`${id}-photo-small`);
        if (photoEl) {
            if (typeof playerPhotos !== 'undefined' && playerPhotos[id]) photoEl.innerHTML = `<img src="${playerPhotos[id]}" alt="">`;
            else {
                photoEl.textContent = playersData[id]?.icon || '⚽';
                photoEl.style.fontSize = '1.8rem';
                photoEl.style.display = 'flex';
                photoEl.style.alignItems = 'center';
                photoEl.style.justifyContent = 'center';
            }
        }
    });
    document.querySelectorAll('#squad-page .player-item').forEach(item => {
        item.addEventListener('click', function () {
            const playerId = this.getAttribute('data-player');
            if (playerId && playersData[playerId]) openPlayerModal(playerId);
        });
    });

    // Модалки игрока / плейстайла
    on('modal-close', 'click', () => $('player-modal').classList.remove('active'));
    on('player-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('playstyle-detail-close', 'click', closePlaystyleDetail);
    on('playstyle-detail-overlay', 'click', function (e) { if (e.target === this) closePlaystyleDetail(); });

    // Секретка
    const secretOverlay = $('secret-overlay');
    on('secret-close', 'click', () => secretOverlay.classList.remove('active'));
    on('secret-overlay', 'click', function (e) { if (e.target === this) secretOverlay.classList.remove('active'); });
    on('secret-submit', 'click', function () {
        const input = $('secret-password').value.trim();
        if (input === 'FCMERA_11.04') {
            $('secret-error').textContent = '';
            $('secret-content').classList.add('active');
            $('secret-password').disabled = true;
            $('secret-submit').textContent = '✅ Открыто';
        } else {
            $('secret-error').textContent = '❌ Неверный пароль!';
            $('secret-password').value = '';
        }
    });
    on('secret-password', 'keydown', e => { if (e.key === 'Enter') $('secret-submit').click(); });

    // Жалобы
    on('complaint-close', 'click', () => $('complaint-modal').classList.remove('active'));
    on('complaint-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('complaint-reason', 'change', function () {
        $('complaint-custom-reason-group').style.display = this.value === 'Другое' ? 'block' : 'none';
    });
    on('complaint-submit-btn', 'click', submitComplaint);

    // Опросы
    on('create-poll-close', 'click', () => $('create-poll-modal').classList.remove('active'));
    on('create-poll-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('add-poll-option-btn', 'click', function () {
        const container = $('poll-options-container');
        const count = container.querySelectorAll('.poll-option-input').length;
        if (count >= 6) return;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'poll-option-input';
        input.placeholder = `Вариант ${count + 1}`;
        input.style.marginBottom = '8px';
        container.appendChild(input);
    });
    on('create-poll-submit-btn', 'click', submitCreatePoll);
    on('create-poll-btn', 'click', openCreatePollModal);

    // Вкладки админ-панели
    document.querySelectorAll('.admin-section-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.admin-section-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const content = $(`admin-tab-${this.dataset.tab}`);
            if (content) content.classList.add('active');
            if (this.dataset.tab === 'online') renderOnlinePanel();
            if (this.dataset.tab === 'users') loadAllUsers();
            if (this.dataset.tab === 'polls') renderAdminPollsList();
            if (this.dataset.tab === 'complaints') renderAdminComplaintsList();
        });
    });
    on('online-refresh-btn', 'click', renderOnlinePanel);

    // Вход админа
    on('admin-login-btn', 'click', function () {
        if (adminLoggedIn) adminLogout();
        else {
            $('admin-auth-modal').classList.add('active');
            $('admin-auth-status').textContent = '';
        }
    });
    on('admin-auth-close', 'click', () => $('admin-auth-modal').classList.remove('active'));
    on('admin-auth-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('admin-auth-submit', 'click', function () {
        const email = $('admin-email').value.trim();
        const password = $('admin-password').value.trim();
        if (email && password) adminLogin(email, password);
        else $('admin-auth-status').textContent = '❌ Введите email и пароль!';
    });
    on('admin-password', 'keydown', e => { if (e.key === 'Enter') $('admin-auth-submit').click(); });
    on('admin-email', 'keydown', e => { if (e.key === 'Enter') $('admin-auth-submit').click(); });

    // Матчи (админ)
    on('admin-add-match-btn', 'click', openAddMatchModal);
    on('admin-logout-btn', 'click', adminLogout);
    on('match-add-close', 'click', () => $('match-add-modal').classList.remove('active'));
    on('match-add-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('submit-add-btn', 'click', addMatch);
    on('match-edit-close', 'click', () => $('match-edit-modal').classList.remove('active'));
    on('match-edit-modal', 'click', function (e) { if (e.target === this) this.classList.remove('active'); });
    on('submit-edit-btn', 'click', saveEditMatch);
    on('delete-match-btn', 'click', deleteMatch);

    // Автообновление онлайн-панели
    setInterval(() => {
        const onlineTab = $('admin-tab-online');
        if (onlineTab && onlineTab.classList.contains('active') && adminLoggedIn) renderOnlinePanel();
    }, 30000);

    // Прелоадер
    setTimeout(() => {
        const preloader = $('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            document.body.classList.remove('preloading');
            setTimeout(() => { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 600);
        }
    }, 700);

    console.log('✅ Сайт загружен!');
});
