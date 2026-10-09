const meraPlayerIds = ['batrakov', 'aleksey_doroshenko', 'maxim', 'raya', 'tankov'];
const burmaldaPlayerIds = [];

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
    raya: { name: "Шустик", position: "Вратарь", age: "15 лет", icon: "🧤", foot: "Правая", height: "160 см", weight: "45 кг", rating: 94, number: "(1)", description: "Стена, которую не пробить", playstyles: ['vihod','otraz','far'], playstyleColors: {vihod: "gold", otraz: "gold",far: "gold"} },
    maxim: { name: "Бузмаков Максим", position: "Защитник", age: "14 лет", icon: "⚽", foot: "Правая", height: "176 см", weight: "58 кг", rating: 94, number: "(8)", description: "Защитник ФК МЕРА", playstyles: ["strag",'intuation',"borec"], playstyleColors: { strag: "gold", intuation: "gold", borec: "gold" } },
    batrakov: { name: "Кравченко Глеб", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Правая", height: "143 см", weight: "33 кг", rating: 91, number: "(83)", description: "Мелкая копия Батракова", playstyles: ["Bezjalostniy",'obmanshik_silver','naves'], playstyleColors: { Bezjalostniy: "gold", obmanshik_silver: "silver", naves: 'gold' } },
    aleksey_doroshenko: { name: "Дорошенко Алексей", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Амбидекстер", height: "145 см", weight: "35 кг", rating: 95, number: "(22)", description: "Лучший дриблер двора", playstyles: ["truk_gold","bombardir","tochno"], playstyleColors: {truk_gold:"gold", bombardir:"gold",tochno:"gold"} },
    tankov: { name: "Танков Тимофей", position: "Универсальный", age: "13 лет", icon: "⚽", foot: "Левая", height: "160 см", weight: "40 кг", rating: 92, number: "(99)", description: "", playstyles: [], playstyleColors: {} },
};

const yard78Players = [
    { id: "timofey_zaytsev", name: "Зайцев Тимофей", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Правая", height: "155 см", weight: "50 кг", rating: 94, number: "(7)", description: "Игрок ФК 78 ", playstyles: [], playstyleColors: {} },
    { id: "sanya_bobrikov", name: "Бобриков Александр", position: "Нападающий", age: "13 лет", icon: "⚽", foot: "Амбидекстр", height: "175 см", weight: "51 кг", rating: 95, number: "(11)", description: "Нападающий ФК 78 ", playstyles: ["pushka"], playstyleColors: {pushka: "gold"} },
    { id: "kirill_beschastny", name: "Бесчастнов Кирилл", position: "Защитник", age: "14 лет", icon: "⚽", foot: "Правая", height: "162 см", weight: "52 кг", rating: 91, number: "(5)", description: "Игрок ФК 78 ", playstyles: [], playstyleColors: {} },
    { id: "maxim_dcp", name: "Максим ДЦП", position: "Вратарь", age: "13 лет", icon: "⚽", foot: "Правая", height: "178 см", weight: "55 кг", rating: 95, number: "(1)", description: "Вратарь ФК 78 ", playstyles: ["otraz", "vihod",'far'], playstyleColors: {otraz: "gold", vihod: "gold",far: "gold" } },
    { id: "ivan", name: "Новиков Иван", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "164 см", weight: "55 кг", rating: 91, number: "(76)", description: "Игрок ФК 78 ", playstyles: [], playstyleColors: {} },
    { id: "elisey", name: "Пожидаев Елисей", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "43 кг", rating: 88, number: "(19)", description: "Второй Ямаль", playstyles: ["pevec", "pan"], playstyleColors: {pevec: "gold", pan: "gold"} },
    { id: "demid", name: "Пасько Демид", position: "Нападающий", age: "12 лет", icon: "⚽", foot: "Правая", height: "167 см", weight: "48 кг", rating: 91, number: "(45)", description: "Русский пыр не знает дыр", playstyles: ['pushka'], playstyleColors: { pushka: 'gold' } },
    { id: "lesha_podavalny", name: "Чурилов Алексей", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "47 кг", rating: 90, number: "(41)", description: "Угловой?...💀💀💀", playstyles: ["naves",'tiki_taka'], playstyleColors: {naves:"gold", tiki_taka: 'gold'} },
    { id: "safonov", name: "Сафонов Иван", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "47 кг", rating: 93, number: "(20)", description: "Однофамилец вратаря ПСЖ", playstyles: ['tiki_taka'], playstyleColors: {tiki_taka: 'gold'} },
    { id: "alimov", name: "Алимов Кирилл", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "47 кг", rating: 93, number: "(97)", description: "Новичок ФК 78", playstyles: ['tiki_taka'], playstyleColors: {tiki_taka: 'gold'} },
    { id: "ostap", name: "Остап", position: "Запасной", age: "13 лет", icon: "⚽", foot: "Правая", height: "? см", weight: "? кг", rating: 1, number: "(67)", description: "Единица в рейтинге, потому что Топ-1 Кемерово", playstyles: [], playstyleColors: {} }
];

const yuzhkaPlayers = [
    { id: "russkov_artem", name: "Руссё Диктатор", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Амбидекстр", height: "178 см", weight: "58 кг", rating: 98, number: "(8)", description: "дикий сюю ю ю ю", playstyles: ["tiki_taka","bombardir","bistro_gold"], playstyleColors: {bistro_gold: "gold", bombardir: "gold", tiki_taka: "gold"} },
    { id: "shuklin", name: "Шуклин Кирилл", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Левая", height: "160 см", weight: "45 кг", rating: 94, number: "(11)", description: "Гром всегда позднее молнии", playstyles: ["bistro_silver","bombardir_silver","truk_gold"], playstyleColors: {bistro_silver: "silver", bombardir_silver: "silver", truk_gold: "gold"} },
    { id: "bombar", name: "Бадартинов Михаил", position: "Нападающий", age: "15 лет", icon: "⚽", foot: "Правая", height: "180 см", weight: "72 кг", rating: 92, number: "(57)", description: "Коч коч братан", playstyles: ["borec","pushka"], playstyleColors: {borec: "gold", pushka: "gold"} },
    { id: "mes", name: "Кирьянов Артем", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "55 кг", rating: 93, number: "(28)", description: "Не имей сто друзей а имей в друзьях Меса", playstyles: ["otraz"], playstyleColors: {otraz: "gold"} },
    { id: "shilov", name: "Шилов Дмитрий", position: "Полузащитник", age: "14 лет", icon: "⚽", foot: "Правая", height: "165 см", weight: "50 кг", rating: 93, number: "(?)", description: "Игрок южки", playstyles: ["truk_gold", "tochno_silver"], playstyleColors: {truk_gold: "gold", tochno_silver: "silver"} },
    { id: "diana", name: "Епончинцева Диана", position: "Полузащитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "165 см", weight: "50 кг", rating: 94, number: "(9)", description: "Единственная девушка среди игроков", playstyles: [], playstyleColors: {} }
];

const arsenalPlayers = [
    { id: "andryushka", name: "Бузмаков Андрей", position: "Нападающий", age: "9 лет", icon: "⚽", foot: "Правая", height: "140 см", weight: "32 кг", rating: 86, number: "(7)", description: "Самый молодой игрок двора", playstyles: ['bistro_silver','tochno_silver'], playstyleColors: {bistro_silver: "silver", tochno_silver: "silver"} },
    { id: "gleb", name: "Глеб", position: "Защитник", age: "13 лет", icon: "⚽", foot: "Правая", height: "168 см", weight: "48 кг", rating: 86, number: "(15)", description: "Работяга", playstyles: ["naves", "vinos_silver"], playstyleColors: {naves: "gold", vinos_silver: "silver"} },
    { id: "kostya", name: "Лехнер Константин", position: "Вратарь", age: "12 лет", icon: "⚽", foot: "Правая", height: "150 см", weight: "35 кг", rating: 91, number: "(32)", description: "Не бойся творить историю", playstyles: ['vihod', "otraz_silver"], playstyleColors: {vihod: "gold", otraz_silver: "silver"} },
    { id: "saveliy_78", name: "Соколов Савелий", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Правая", height: "164 см", weight: "45 кг", rating: 88, number: "(78)", description: "Самый преданный игрок", playstyles: ["truk_gold", "simulant_silver"], playstyleColors: {truk_gold: "gold", simulant_silver: "silver"} }
];

const zvezdaPlayers = [
    { id: "david", name: "Дарсалия Давид", position: "Полузащитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "175 см", weight: "60 кг", rating: 85, number: "(10)", description: "Лидер атак ФК Звёзды", playstyles: [], playstyleColors: {} },
    { id: "matveyB", name: "Матвей Бобов", position: "Вратарь", age: "15 лет", icon: "⚽", foot: "Правая", height: "180 см", weight: "80 кг", rating: 83, number: "(14)", description: "Вратарь Фк звёзды", playstyles: [], playstyleColors: {} },
    { id: "nazar", name: "Осинцев Назар", position: "Защитник", age: "15 лет", icon: "⚽", foot: "Правая", height: "178 см", weight: "100 кг", rating: 56, number: "(67)", description: "Супертяжелый вес", playstyles: [], playstyleColors: {} },
    { id: "kuharskiy", name: "Кухарский Тимофей", position: "Нападающий", age: "9 лет", icon: "⚽", foot: "Правая", height: "145 см", weight: "35 кг", rating: 76, number: "(3)", description: "Самый младший из Звезд", playstyles: [], playstyleColors: {} },
    { id: "irakliy", name: "Дарсалия Ираклий", position: "Нападающий", age: "15 лет", icon: "⚽", foot: "Правая", height: "175 см", weight: "60 кг", rating: 77, number: "(6)", description: "Брат капитана", playstyles: [], playstyleColors: {} },
];

const psgPlayers = [
    { id: "artem", name: "Соколов Артем", position: "Нападающий", age: "12 лет", icon: "⚽", foot: "Правая", height: "130 см", weight: "60 кг", rating: 67, number: "(9)", description: "Игрок ПСЖ", playstyles: [], playstyleColors: {} },
    { id: "EgorNast", name: "Зверев Егор", position: "Полузащитник", age: "12 лет", icon: "⚽", foot: "Левая", height: "145 см", weight: "50 кг", rating: 67, number: "(8)", description: "Игрок ПСЖ", playstyles: [], playstyleColors: {} },
    { id: "maxronaldo", name: "Максим Роналду", position: "Нападающий", age: "11 лет", icon: "⚽", foot: "Правая", height: "160 см", weight: "55 кг", rating: 77, number: "(17)", description: "Фанатик Роналду", playstyles: [], playstyleColors: {} },
    { id: "haaland", name: "Шапов Леонид", position: "Нападающий", age: "10 лет", icon: "⚽", foot: "Левая", height: "141 см", weight: "37 кг", rating: 87, number: "(14)", description: "Болельщик Холланда", playstyles: ["borec_silver", 'tiki_taka_silver'], playstyleColors: {borec_silver: "silver", tiki_taka_silver: "silver"} }
];

const playersData = { ...basePlayers };
yard78Players.forEach(p => { playersData[p.id] = p; });
yuzhkaPlayers.forEach(p => { playersData[p.id] = p; });
arsenalPlayers.forEach(p => { playersData[p.id] = p; });
psgPlayers.forEach(p => { playersData[p.id] = p; });
zvezdaPlayers.forEach(p => { playersData[p.id] = p; });

const meraTeamIds = ['raya', 'maxim', 'batrakov', 'aleksey_doroshenko', 'tankov'];
const yard78PlayerIds = yard78Players.map(p => p.id);
const yuzhkaPlayerIds = yuzhkaPlayers.map(p => p.id);
const arsenalPlayerIds = arsenalPlayers.map(p => p.id);
const psgPlayerIds = psgPlayers.map(p => p.id);
const zvezdaPlayerIds = zvezdaPlayers.map(p => p.id);

const CAPTAINS = {
    mera: { id: 'mera', name: 'ФК "МЕРА"', captain: 'Капитан МЕРЫ', budget: 1985, players: meraTeamIds, logo: './Photos%20(2)/IMG_0807.jpeg' },
    school78: { id: 'school78', name: 'ФК 78 школа', captain: 'Капитан 78 школы', budget: 25, players: yard78PlayerIds, logo: './Photos%20(2)/IMG_0797.jpeg' },
    yuzhka: { id: 'yuzhka', name: 'ФК Южный', captain: 'Капитан Южного', budget: 625, players: yuzhkaPlayerIds, logo: './Photos%20(2)/IMG_0800.jpeg' },
    arsenal: { id: 'arsenal', name: 'ФК Арсенал', captain: 'Капитан Арсенала', budget: 470, players: arsenalPlayerIds, logo: './Photos%20(2)/IMG_0853.jpeg' },
    psg: { id: 'psg', name: 'ФК ПСЖ', captain: 'Капитан ПСЖ', budget: 300, players: psgPlayerIds, logo: './Photos%20(2)/IMG_0833.jpeg' },
    zvezda: { id: 'zvezda', name: 'ФК Звёзды', captain: 'Капитан Звёзд', budget: 0, players: zvezdaPlayerIds, logo: './Photos%20(2)/IMG_0801.jpeg' }
};

const matchTacticsData = {};
const marketData = { teams: CAPTAINS, players: {} };

Object.keys(playersData).forEach(id => {
    const p = playersData[id];
    marketData.players[id] = {
        id: id, name: p.name, position: p.position, rating: p.rating,
        price: Math.round(p.rating * 10),
        team: Object.keys(CAPTAINS).find(tid => CAPTAINS[tid].players.includes(id)) || 'unknown',
        icon: p.icon || '⚽'
    };
});

let marketState = { currentCaptain: null, transferList: [], pendingTransfers: {}, transfers: [], offers: [] };
let activeLoans = {};
const LOAN_CHECK_INTERVAL = 60000;

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
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'h' + Math.abs(hash).toString(36) + '_' + str.length;
}

try {
    const SUPABASE_URL = 'https://pgcdeufbvdricaccjpls.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_8Tf6g3Uvv4d2f3kewhAVUQ_CoIZ5qxp';
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase клиент создан');
    }
} catch (e) { supabaseClient = null; }

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

function restoreAdminSession() {
    const savedAdmin = localStorage.getItem('adminLoggedIn');
    if (savedAdmin === 'true') {
        adminLoggedIn = true;
        return true;
    }
    return false;
}

function checkAndReturnLoans() {
    const now = new Date();
    let changed = false;
    Object.keys(activeLoans).forEach(playerId => {
        const loan = activeLoans[playerId];
        const endDate = new Date(loan.endDate);
        if (now >= endDate) {
            const fromTeam = CAPTAINS[loan.fromTeam];
            const toTeam = CAPTAINS[loan.toTeam];
            if (fromTeam && toTeam) {
                const toIndex = toTeam.players.indexOf(playerId);
                if (toIndex !== -1) toTeam.players.splice(toIndex, 1);
                if (!fromTeam.players.includes(playerId)) fromTeam.players.push(playerId);
                marketData.players[playerId].team = loan.fromTeam;
                delete activeLoans[playerId];
                changed = true;
            } else delete activeLoans[playerId];
        }
    });
    if (changed) { saveMarketData(); updateMarketUI(); renderMyTeam(); }
}

function isPlayerOnLoan(playerId) { return !!activeLoans[playerId]; }
function getPlayerLoanInfo(playerId) { return activeLoans[playerId] || null; }
function saveLoansData() { try { localStorage.setItem('activeLoans', JSON.stringify(activeLoans)); } catch (e) {} }
function loadLoansData() {
    try {
        const saved = localStorage.getItem('activeLoans');
        if (saved) {
            activeLoans = JSON.parse(saved);
            const now = new Date();
            let changed = false;
            Object.keys(activeLoans).forEach(playerId => {
                if (new Date(activeLoans[playerId].endDate) < now) { delete activeLoans[playerId]; changed = true; }
            });
            if (changed) saveLoansData();
        }
    } catch (e) {}
}

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
    if (marketState.currentCaptain && marketState.userEmail) {
        const captain = CAPTAINS[marketState.currentCaptain];
        return {
            id: 'captain_' + marketState.userEmail,
            name: captain ? captain.captain : marketState.userEmail,
            role: 'captain',
            player_id: null
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
    } catch (e) {
        console.warn('Онлайн-пинг не удался:', e);
    }
}

async function removeOnlineSelf() {
    if (!supabaseClient) return;
    const identity = getCurrentOnlineIdentity();
    if (!identity) return;
    try {
        await supabaseClient.from('online_users').delete().eq('user_id', identity.id);
    } catch (e) {}
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
            .from('online_users')
            .select('*')
            .gte('last_seen', cutoff)
            .order('last_seen', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (e) {
        console.warn('Ошибка загрузки онлайна:', e);
        return [];
    }
}

async function renderOnlinePanel() {
    const listContainer = document.getElementById('online-users-list');
    const countEl = document.getElementById('online-total-count');
    if (!listContainer || !countEl) return;

    listContainer.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Загрузка...</p>';

    const users = await fetchOnlineUsers();
    countEl.textContent = users.length;

    if (users.length === 0) {
        listContainer.innerHTML = `
            <div class="online-empty">
                <div class="online-empty-icon">😴</div>
                <p>Пока никого нет на сайте</p>
            </div>
        `;
        return;
    }

    let html = '';
    users.forEach(u => {
        const roleLabel = u.user_role === 'admin' ? '👑 Админ'
                       : u.user_role === 'captain' ? '⚽ Капитан'
                       : '👤 Игрок';

        let avatarHtml = '👤';
        if (u.player_id && typeof playerPhotos !== 'undefined' && playerPhotos[u.player_id]) {
            avatarHtml = `<img src="${playerPhotos[u.player_id]}" alt="">`;
        } else if (u.player_id && playersData[u.player_id]) {
            avatarHtml = playersData[u.player_id].icon || '⚽';
        }

        const secondsAgo = Math.floor((Date.now() - new Date(u.last_seen).getTime()) / 1000);
        let timeLabel = 'только что';
        if (secondsAgo < 10) timeLabel = 'только что';
        else if (secondsAgo < 60) timeLabel = `${secondsAgo} сек назад`;
        else timeLabel = `${Math.floor(secondsAgo / 60)} мин назад`;

        html += `<div class="online-user-card role-${u.user_role}">
            <div class="online-user-avatar">${avatarHtml}</div>
            <div class="online-user-info">
                <div class="online-user-name">${u.user_name}</div>
                <div class="online-user-meta">
                    <span class="online-role-pill ${u.user_role}">${roleLabel}</span>
                </div>
            </div>
            <div class="online-user-time">🟢 ${timeLabel}</div>
        </div>`;
    });
    listContainer.innerHTML = html;
}

async function loginCaptain(email, password) {
    try {
        if (!supabaseClient) {
            showMarketNotification('❌ Supabase не подключен!', 'error');
            return false;
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim()
        });

        if (error) {
            showMarketNotification(`❌ ${error.message}`, 'error');
            return false;
        }

        let teamId = null;
        const userEmail = data.user.email;

        if (userEmail === 'mera@fc.com') teamId = 'mera';
        else if (userEmail === 'school78@fc.com') teamId = 'school78';
        else if (userEmail === 'yuzhka@fc.com') teamId = 'yuzhka';
        else if (userEmail === 'arsenal@fc.com') teamId = 'arsenal';
        else if (userEmail === 'psg@fc.com') teamId = 'psg';
        else if (userEmail === 'zvezda@fc.com') teamId = 'zvezda';
        else {
            showMarketNotification('❌ Неизвестная команда!', 'error');
            await supabaseClient.auth.signOut();
            return false;
        }
        const captain = CAPTAINS[teamId];
        if (!captain) {
            showMarketNotification('❌ Команда не найдена!', 'error');
            await supabaseClient.auth.signOut();
            return false;
        }

        marketState.currentCaptain = teamId;
        marketState.userEmail = userEmail;

        document.getElementById('captain-name').textContent = `👑 ${captain.captain}`;
        document.getElementById('budget-display').textContent = `💰 ${captain.budget} монет`;
        document.getElementById('captain-avatar').textContent = captain.captain.charAt(0);
        document.getElementById('login-input').style.display = 'none';
        document.getElementById('password-input').style.display = 'none';
        document.getElementById('login-btn').textContent = `👤 ${captain.captain}`;
        document.getElementById('login-btn').style.background = '#28a745';
        document.getElementById('logout-btn').style.display = 'inline-block';
        document.getElementById('my-team-section').style.display = 'block';

        showMarketNotification(`✅ Добро пожаловать, капитан ${captain.captain}!`, 'success');
        updateMarketUI();
        renderMyTeam();
        renderTransfers();
        updateOfferBadge();
        sendOnlineHeartbeat();
        return true;

    } catch (error) {
        console.error('Ошибка входа:', error);
        showMarketNotification(`❌ Ошибка: ${error.message || 'Неизвестная ошибка'}`, 'error');
        return false;
    }
}

async function logoutCaptain() {
    await removeOnlineSelf();
    try {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
    } catch (e) {
        console.error('Ошибка выхода:', e);
    }

    marketState.currentCaptain = null;
    marketState.userEmail = null;

    document.getElementById('captain-name').textContent = 'Не авторизован';
    document.getElementById('budget-display').textContent = '💰 0 монет';
    document.getElementById('captain-avatar').textContent = '👤';
    document.getElementById('login-input').style.display = 'none';
    document.getElementById('password-input').style.display = 'none';
    document.getElementById('login-btn').textContent = '🔑 Войти';
    document.getElementById('login-btn').style.background = '';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('my-team-section').style.display = 'none';

    updateMarketUI();
    updateOfferBadge();
    showMarketNotification('👋 Вы вышли из системы', 'success');
}

async function checkAuthStatus() {
    try {
        if (!supabaseClient) return false;

        const { data: { session }, error } = await supabaseClient.auth.getSession();

        if (error || !session) return false;

        const userEmail = session.user.email;
        let teamId = null;

        if (userEmail === 'mera@fc.com') teamId = 'mera';
        else if (userEmail === 'school78@fc.com') teamId = 'school78';
        else if (userEmail === 'yuzhka@fc.com') teamId = 'yuzhka';
        else if (userEmail === 'arsenal@fc.com') teamId = 'arsenal';
        else if (userEmail === 'psg@fc.com') teamId = 'psg';
        else if (userEmail === 'zvezda@fc.com') teamId = 'zvezda';

        if (teamId && CAPTAINS[teamId]) {
            marketState.userEmail = userEmail;
            marketState.currentCaptain = teamId;

            const captain = CAPTAINS[teamId];
            document.getElementById('captain-name').textContent = `👑 ${captain.captain}`;
            document.getElementById('budget-display').textContent = `💰 ${captain.budget} монет`;
            document.getElementById('captain-avatar').textContent = captain.captain.charAt(0);
            document.getElementById('login-input').style.display = 'none';
            document.getElementById('password-input').style.display = 'none';
            document.getElementById('login-btn').textContent = `👤 ${captain.captain}`;
            document.getElementById('login-btn').style.background = '#28a745';
            document.getElementById('logout-btn').style.display = 'inline-block';
            document.getElementById('my-team-section').style.display = 'block';

            updateMarketUI();
            renderMyTeam();
            renderTransfers();
            updateOfferBadge();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        return false;
    }
}

function updateOfferBadge() {
    const badge = document.getElementById('offer-badge');
    if (!badge) return;
    const captainId = marketState.currentCaptain;
    if (!captainId) { badge.classList.add('hidden'); badge.textContent = '0'; return; }
    const incomingPending = (marketState.offers || []).filter(o => o.toTeam === captainId && o.status === 'pending');
    if (incomingPending.length > 0) { badge.textContent = incomingPending.length; badge.classList.remove('hidden'); }
    else badge.classList.add('hidden');
}

async function saveMarketToSupabase() {
    if (!supabaseClient) return false;
    try {
        const data = {
            teams: {},
            transferList: marketState.transferList || [],
            pendingTransfers: marketState.pendingTransfers || {},
            transfers: marketState.transfers || [],
            offers: marketState.offers || [],
            activeLoans: activeLoans || {}
        };
        Object.keys(CAPTAINS).forEach(id => {
            data.teams[id] = { budget: CAPTAINS[id].budget, players: CAPTAINS[id].players };
        });
        const { error } = await supabaseClient
            .from('market')
            .upsert({ id: 'market_data', data: data });
        if (error) throw error;
        return true;
    } catch (error) {
        console.warn('⚠️ Ошибка сохранения в Supabase:', error);
        return false;
    }
}

async function loadMarketFromSupabase() {
    try {
        loadLoansData();
        if (!supabaseClient) { renderMarketEmpty('❌ Supabase не подключен'); return false; }
        const { data, error } = await supabaseClient.from('market').select('data').eq('id', 'market_data').single();
        if (error) {
            if (error.code === 'PGRST116') { renderMarketEmpty('📭 Рынок пуст'); return false; }
            throw error;
        }
        if (data && data.data) { applyLoadedData(data.data); return true; }
        else { renderMarketEmpty('📭 Рынок пуст'); return false; }
    } catch (error) { renderMarketEmpty('❌ Ошибка загрузки'); return false; }
}

function renderMarketEmpty(message) {
    const grid = document.getElementById('market-grid');
    if (!grid) return;
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#666;"><div style="font-size:3rem;margin-bottom:10px;">📭</div><p>${message}</p></div>`;
}

function applyLoadedData(data) {
    if (data.teams) {
        Object.keys(data.teams).forEach(id => {
            if (CAPTAINS[id]) {
                CAPTAINS[id].budget = data.teams[id].budget;
                CAPTAINS[id].players = data.teams[id].players;
            }
        });
    }
    marketState.transferList = data.transferList || [];
    marketState.pendingTransfers = data.pendingTransfers || {};
    marketState.transfers = data.transfers || [];
    marketState.offers = data.offers || [];
    if (data.activeLoans) {
        activeLoans = data.activeLoans;
        saveLoansData();
    }
    if (marketState.transferList.length === 0) renderMarketEmpty('📭 Рынок пуст');
    updateOfferBadge();
}

function addTransfer(playerId, fromTeamId, toTeamId, price) {
    const player = playersData[playerId];
    if (!player) return;
    const transfer = {
        playerId, playerName: player.name, playerIcon: player.icon || '⚽',
        fromTeam: fromTeamId, toTeam: toTeamId, price,
        time: new Date().toISOString()
    };
    marketState.transfers = marketState.transfers || [];
    marketState.transfers.unshift(transfer);
    if (marketState.transfers.length > 100) {
        marketState.transfers = marketState.transfers.slice(0, 100);
    }
    saveMarketData();
    renderTransfers();
}

function renderTransfers() {
    const container = document.getElementById('transfers-list');
    if (!container) return;
    const transfers = marketState.transfers || [];
    if (transfers.length === 0) {
        container.innerHTML = `<div class="transfers-empty"><div class="empty-icon">📭</div><p>История пуста</p></div>`;
        return;
    }
    let html = '';
    transfers.slice(0, 10).forEach(transfer => {
        const fromTeam = CAPTAINS[transfer.fromTeam];
        const toTeam = CAPTAINS[transfer.toTeam];
        const fromName = fromTeam ? fromTeam.name : 'Неизвестно';
        const toName = toTeam ? toTeam.name : 'Неизвестно';
        const fromClass = transfer.fromTeam || 'unknown';
        const toClass = transfer.toTeam || 'unknown';
        const timeStr = new Date(transfer.time).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        html += `<div class="transfer-item">
            <div class="transfer-player"><span>${transfer.playerIcon}</span>${transfer.playerName}</div>
            <div>
                <span class="transfer-team-badge ${fromClass}">${fromName}</span>
                <span class="transfer-arrow">➜</span>
                <span class="transfer-team-badge ${toClass}">${toName}</span>
            </div>
            <div>
                <span class="transfer-price">💰 ${transfer.price}</span>
                <span class="transfer-time">🕐 ${timeStr}</span>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function buyPlayer(playerId, price, sellerId) {
    const captainTeamId = marketState.currentCaptain;
    if (!captainTeamId) { showMarketNotification('❌ Войдите как капитан!', 'error'); return; }
    if (isPlayerOnLoan(playerId)) { showMarketNotification('❌ Игрок в аренде!', 'error'); return; }
    const buyerTeam = CAPTAINS[captainTeamId];
    const player = marketData.players[playerId];
    if (!player) { showMarketNotification('❌ Игрок не найден!', 'error'); return; }
    if (buyerTeam.budget < price) { showMarketNotification(`❌ Недостаточно средств!`, 'error'); return; }
    if (buyerTeam.players.includes(playerId)) { showMarketNotification('❌ Уже в вашей команде!', 'error'); return; }
    if (!marketState.pendingTransfers[playerId]) { showMarketNotification('❌ Уже не продается!', 'error'); updateMarketUI(); return; }
    buyerTeam.budget -= price;
    const sellerTeam = CAPTAINS[sellerId];
    if (sellerTeam) sellerTeam.budget += price;
    const sellerIndex = sellerTeam.players.indexOf(playerId);
    if (sellerIndex !== -1) sellerTeam.players.splice(sellerIndex, 1);
    buyerTeam.players.push(playerId);
    delete marketState.pendingTransfers[playerId];
    const transferIndex = marketState.transferList.findIndex(t => t.playerId === playerId);
    if (transferIndex !== -1) marketState.transferList.splice(transferIndex, 1);
    marketData.players[playerId].team = captainTeamId;
    addTransfer(playerId, sellerId, captainTeamId, price);
    showMarketNotification(`✅ ${player.name} куплен!`, 'success');
    saveMarketData(); updateMarketUI(); renderMyTeam(); updateBudgetDisplay(); updateOfferBadge();
}

function sellPlayer(playerId, price) {
    const captainTeamId = marketState.currentCaptain;
    if (!captainTeamId) return;
    if (isPlayerOnLoan(playerId)) { showMarketNotification('❌ Игрок в аренде!', 'error'); return; }
    const team = CAPTAINS[captainTeamId];
    const player = marketData.players[playerId];
    if (!player || !team.players.includes(playerId)) { showMarketNotification('❌ Не ваш игрок!', 'error'); return; }
    if (marketState.pendingTransfers[playerId]) { showMarketNotification('❌ Уже на рынке!', 'error'); return; }
    if (price < 50) { showMarketNotification('❌ Минимум 50 монет!', 'error'); return; }
    marketState.transferList.push({ playerId, seller: captainTeamId, price });
    marketState.pendingTransfers[playerId] = { seller: captainTeamId, price };
    showMarketNotification(`📢 ${player.name} выставлен!`, 'success');
    saveMarketData(); updateMarketUI(); renderMyTeam();
}

function removeFromMarket(playerId) {
    const captainTeamId = marketState.currentCaptain;
    if (!captainTeamId || !marketState.pendingTransfers[playerId]) return;
    if (marketState.pendingTransfers[playerId].seller !== captainTeamId) return;
    delete marketState.pendingTransfers[playerId];
    const index = marketState.transferList.findIndex(t => t.playerId === playerId);
    if (index !== -1) marketState.transferList.splice(index, 1);
    showMarketNotification('✅ Снят с продажи', 'success');
    saveMarketData(); updateMarketUI(); renderMyTeam();
}

function openSellDialog(playerId) {
    if (isPlayerOnLoan(playerId)) {
        showMarketNotification('❌ В аренде!', 'error');
        return;
    }

    if (INFINITE_PRICE_PLAYERS.includes(playerId)) {
        sellPlayer(playerId, INFINITE_PRICE_VALUE);
        return;
    }

    const price = prompt('Введите цену (мин. 50):', '500');
    if (price === null) return;
    const priceNum = parseInt(price);
    if (isNaN(priceNum) || priceNum < 50) {
        showMarketNotification('❌ Минимум 50!', 'error');
        return;
    }
    sellPlayer(playerId, priceNum);
}
function getPlayerPhoto(playerId, className = '') {
    const photo = typeof playerPhotos !== 'undefined' && playerPhotos[playerId] ? playerPhotos[playerId] : null;
    if (photo) return `<div class="${className}"><img src="${photo}" alt="Фото"></div>`;
    const icon = playersData[playerId]?.icon || '⚽';
    return `<div class="${className}"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:1.8rem;">${icon}</div></div>`;
}

function updateMarketUI() {
    const grid = document.getElementById('market-grid');
    if (!grid) return;
    const filterTeam = document.getElementById('market-filter-team').value;
    const filterPosition = document.getElementById('market-filter-position').value;
    checkAndReturnLoans();
    let filtered = [...marketState.transferList];
    if (filterTeam !== 'all') filtered = filtered.filter(t => t.seller === filterTeam);
    if (filterPosition !== 'all') filtered = filtered.filter(t => { const p = marketData.players[t.playerId]; return p && p.position === filterPosition; });
    filtered = filtered.filter(t => !isPlayerOnLoan(t.playerId));
    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#666;"><div style="font-size:3rem;margin-bottom:10px;">📭</div><p>Нет игроков на рынке</p></div>`;
        return;
    }
    let html = '';
    filtered.forEach(transfer => {
        const player = marketData.players[transfer.playerId];
        if (!player) return;
        const isMine = marketState.currentCaptain && marketState.pendingTransfers[transfer.playerId]?.seller === marketState.currentCaptain;
        const canBuy = marketState.currentCaptain && transfer.seller !== marketState.currentCaptain && !CAPTAINS[marketState.currentCaptain].players.includes(transfer.playerId);
        const sellerTeam = CAPTAINS[transfer.seller];
        html += `<div class="market-player-card">
            ${getPlayerPhoto(transfer.playerId, 'player-photo-market')}
            <h4>${player.name}</h4>
            <p style="color:#666;">${player.position} • Рейтинг: ${player.rating}</p>
            <p style="font-size:0.8rem;color:#888;">Команда: ${sellerTeam ? sellerTeam.name : 'Неизвестно'}</p>
            <div class="player-price">💰 ${transfer.price} монет</div>
            ${isMine ? `<button class="sell-btn" onclick="removeFromMarket('${transfer.playerId}')">❌ Снять</button>` :
                canBuy ? `<button class="buy-btn" onclick="buyPlayer('${transfer.playerId}', ${transfer.price}, '${transfer.seller}')">🛒 Купить</button>` :
                marketState.currentCaptain === transfer.seller ? `<button style="background:#ffc107;color:#333;padding:10px;border-radius:30px;border:none;font-weight:bold;width:100%;" disabled>⏳ Ваш игрок</button>` :
                `<button style="background:#6c757d;color:white;padding:10px;border-radius:30px;border:none;width:100%;" disabled>🔒 Войдите</button>`
            }
        </div>`;
    });
    grid.innerHTML = html;
}

function renderMyTeam() {
    const grid = document.getElementById('my-team-grid');
    const captainTeamId = marketState.currentCaptain;
    if (!captainTeamId) { grid.innerHTML = ''; return; }
    const team = CAPTAINS[captainTeamId];
    if (!team || team.players.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:#666;"><p>Нет игроков</p></div>`;
        return;
    }
    let html = '';
    team.players.forEach(playerId => {
        const player = marketData.players[playerId];
        if (!player) return;
        const isOnMarket = !!marketState.pendingTransfers[playerId];
        const isOnLoan = isPlayerOnLoan(playerId);
        const loanInfo = isOnLoan ? getPlayerLoanInfo(playerId) : null;
        const loanClass = isOnLoan ? 'on-loan' : '';
        let loanLabel = '';
        if (isOnLoan && loanInfo) {
            const toTeam = CAPTAINS[loanInfo.toTeam];
            const daysLeft = Math.ceil((new Date(loanInfo.endDate) - new Date()) / (1000*60*60*24));
            loanLabel = `<span style="display:inline-block;background:#ff6b00;color:#fff;font-size:.58rem;padding:2px 9px;border-radius:999px;margin-top:5px;">📋 В аренде у ${toTeam ? toTeam.name : ''} (${daysLeft} дн.)</span>`;
        }
        html += `<div class="my-player-card ${loanClass}">
            ${getPlayerPhoto(playerId, 'player-photo-my')}
            <h4>${player.name}</h4>
            <p style="font-size:0.8rem;color:#666;">${player.position}</p>
            <p style="font-weight:bold;">⭐ ${player.rating}</p>
            ${loanLabel}
            ${isOnLoan ? '' : (isOnMarket ? `<span style="display:inline-block;background:#ffc107;padding:3px 12px;border-radius:20px;font-size:0.7rem;font-weight:bold;margin-top:5px;">📢 В продаже</span>` : `<button class="sell-btn" onclick="openSellDialog('${playerId}')">📤 Выставить</button>`)}
        </div>`;
    });
    grid.innerHTML = html;
}

function updateBudgetDisplay() {
    const captainTeamId = marketState.currentCaptain;
    if (!captainTeamId) return;
    const team = CAPTAINS[captainTeamId];
    document.getElementById('budget-display').textContent = `💰 ${team.budget} монет`;
}

function updateTeamSelects() {
    const select = document.getElementById('market-filter-team');
    select.innerHTML = '<option value="all">Все команды</option>';
    Object.values(CAPTAINS).forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        select.appendChild(option);
    });
}

function showMarketNotification(message, type = 'success') {
    const el = document.getElementById('notification-market');
    if (!el) return;
    el.textContent = message;
    el.className = 'notification-market';
    if (type === 'error') el.classList.add('error');
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => el.classList.remove('show'), 3000);
}

function saveMarketData() { saveMarketToSupabase(); }

function initMarket() {
    loadMarketFromSupabase().then(() => {
        updateTeamSelects(); updateMarketUI(); renderTransfers(); updateOfferBadge();
        if (marketState.currentCaptain) { renderMyTeam(); updateBudgetDisplay(); }
        setInterval(checkAndReturnLoans, LOAN_CHECK_INTERVAL);
    });
}

function hasPlaystyles(playerId) {
    const player = playersData[playerId];
    return player && player.playstyles && player.playstyles.length > 0;
}

function getPlaystyleColor(playerId, style) {
    const player = playersData[playerId];
    if (player && player.playstyleColors && player.playstyleColors[style]) return player.playstyleColors[style];
    return 'gold';
}

function openPlaystyleDetail(styleKey, playerId) {
    const overlay = document.getElementById('playstyle-detail-overlay');
    const iconEl = document.getElementById('playstyle-detail-icon');
    const nameEl = document.getElementById('playstyle-detail-name');
    const descEl = document.getElementById('playstyle-detail-desc');
    const cardEl = document.getElementById('playstyle-detail-card');
    const styleInfo = playstyleDescriptions[styleKey];
    if (!styleInfo) return;
    const color = getPlaystyleColor(playerId, styleKey);
    const colorClass = color === 'silver' ? 'silver' : '';
    cardEl.className = 'playstyle-detail-card' + (colorClass ? ' silver-border' : '');
    iconEl.className = 'playstyle-detail-icon' + (colorClass ? ' ' + colorClass : '');
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
    document.getElementById('playstyle-detail-overlay').classList.remove('active');
    if (iqInterval) { clearInterval(iqInterval); iqInterval = null; }
}

function renderPlaystyles(playerId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!hasPlaystyles(playerId)) {
        const section = container.closest('.playstyles-section');
        if (section) section.classList.add('playstyles-section-hidden');
        return;
    }
    const section = container.closest('.playstyles-section');
    if (section) section.classList.remove('playstyles-section-hidden');
    const player = playersData[playerId];
    const styles = player.playstyles;
    let html = '';
    styles.forEach(style => {
        const color = getPlaystyleColor(playerId, style);
        const colorClass = color === 'silver' ? 'silver' : '';
        if (typeof playstylePhotos !== 'undefined' && playstylePhotos[style]) {
            html += `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}"><img src="${playstylePhotos[style]}"></div>`;
        } else {
            html += `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}">${style}</div>`;
        }
    });
    container.innerHTML = html;
    container.querySelectorAll('.playstyle-icon').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            const styleKey = this.getAttribute('data-style');
            const playerId = this.getAttribute('data-player');
            if (styleKey && playerId) openPlaystyleDetail(styleKey, playerId);
        });
    });
}

function renderMainPlayerCards() {
    const container = document.getElementById('players-grid-container');
    if (!container) return;
    let html = '';
    filteredPlayerIds.forEach(id => {
        const p = playersData[id];
        if (!p) return;
        const isMera = meraTeamIds.includes(id);
        let cardClass = 'player-card';
        if (isMera) cardClass += ' mera-player';
        if (isPlayerOnLoan(id)) cardClass += ' on-loan';
        const hasStyles = hasPlaystyles(id);
        const playstylesBlock = hasStyles ? `<div class="playstyles-section" id="playstyles-${id}"><div class="playstyles-title">🎮 Плейстайлы</div><div class="playstyles-grid" id="playstyles-grid-${id}"></div></div>` : '';
        html += `<div class="${cardClass}" data-player="${id}">
            <div class="player-photo" id="${id}-photo-card"></div>
            <div class="player-info">
                <h3>${p.name}</h3>
                <p>${p.position} • ${p.age}</p>
                <div class="player-number">${p.number}</div>
            </div>
            <div class="player-stats">
                <div class="stat-item"><div class="stat-value">${p.height}</div><div class="stat-label">Рост</div></div>
                <div class="stat-item"><div class="stat-value">${p.weight}</div><div class="stat-label">Вес</div></div>
                <div class="stat-item"><div class="stat-value">${p.rating}</div><div class="stat-label">Рейтинг</div></div>
            </div>
            <div class="player-description">${p.description || ''}</div>
            ${playstylesBlock}
        </div>`;
    });
    container.innerHTML = html;
    document.getElementById('players-count').textContent = `Найдено: ${filteredPlayerIds.length}`;
    filteredPlayerIds.forEach(id => {
        const cardPhoto = document.getElementById(`${id}-photo-card`);
        if (cardPhoto) {
            if (typeof playerPhotos !== 'undefined' && playerPhotos[id]) cardPhoto.innerHTML = `<img src="${playerPhotos[id]}" alt="${playersData[id].name}">`;
            else {
                cardPhoto.textContent = playersData[id].icon || '⚽';
                cardPhoto.style.fontSize = '2.5rem';
                cardPhoto.style.display = 'flex';
                cardPhoto.style.alignItems = 'center';
                cardPhoto.style.justifyContent = 'center';
            }
        }
        if (hasPlaystyles(id)) renderPlaystyles(id, `playstyles-grid-${id}`);
    });
    document.querySelectorAll('#players-grid-container .player-card').forEach(card => {
        card.addEventListener('click', function() { openPlayerModal(this.getAttribute('data-player')); });
    });
}

function renderPlayerCards(containerId, playerIds, themeClass = '') {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    playerIds.forEach(id => {
        const p = playersData[id];
        if (!p) return;
        const isMera = meraTeamIds.includes(id);
        let cardClass = 'player-card';
        if (isMera) cardClass += ' mera-player';
        if (isPlayerOnLoan(id)) cardClass += ' on-loan';
        const hasStyles = hasPlaystyles(id);
        const playstylesBlock = hasStyles ? `<div class="playstyles-section" id="playstyles-${id}"><div class="playstyles-title">🎮 Плейстайлы</div><div class="playstyles-grid" id="playstyles-grid-${id}"></div></div>` : '';
        html += `<div class="${cardClass}" data-player="${id}">
            <div class="player-photo" id="${id}-photo-card"></div>
            <div class="player-info">
                <h3>${p.name}</h3>
                <p>${p.position} • ${p.age}</p>
                <div class="player-number">${p.number}</div>
            </div>
            <div class="player-stats">
                <div class="stat-item"><div class="stat-value">${p.height}</div><div class="stat-label">Рост</div></div>
                <div class="stat-item"><div class="stat-value">${p.weight}</div><div class="stat-label">Вес</div></div>
                <div class="stat-item"><div class="stat-value">${p.rating}</div><div class="stat-label">Рейтинг</div></div>
            </div>
            <div class="player-description">${p.description || ''}</div>
            ${playstylesBlock}
        </div>`;
    });
    container.innerHTML = html;
    playerIds.forEach(id => {
        const cardPhoto = document.getElementById(`${id}-photo-card`);
        if (cardPhoto) {
            if (typeof playerPhotos !== 'undefined' && playerPhotos[id]) cardPhoto.innerHTML = `<img src="${playerPhotos[id]}" alt="${playersData[id].name}">`;
            else {
                cardPhoto.textContent = playersData[id].icon || '⚽';
                cardPhoto.style.fontSize = '2.5rem';
                cardPhoto.style.display = 'flex';
                cardPhoto.style.alignItems = 'center';
                cardPhoto.style.justifyContent = 'center';
            }
        }
        if (hasPlaystyles(id)) renderPlaystyles(id, `playstyles-grid-${id}`);
    });
    container.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', function() { openPlayerModal(this.getAttribute('data-player')); });
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
    document.getElementById('player-search').value = '';
    filteredPlayerIds = [...currentPlayerIds];
    activeSort = 'none';
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    renderMainPlayerCards();
}

function openPlayerModal(playerId) {
    const player = playersData[playerId];
    if (!player) return;
    document.getElementById('modal-name').textContent = player.name;
    document.getElementById('modal-position').textContent = `${player.position} • ${player.age}`;
    const meraTag = document.getElementById('modal-mera-tag');
    if (meraTeamIds.includes(playerId)) meraTag.style.display = 'inline-block';
    else meraTag.style.display = 'none';
    document.getElementById('modal-burmalda-tag').style.display = 'none';
    const ratingElement = document.getElementById('modal-rating');
    ratingElement.textContent = player.rating;
    if (player.rating >= 85) ratingElement.className = 'rating-value rating-high';
    else if (player.rating >= 75) ratingElement.className = 'rating-value rating-medium';
    else ratingElement.className = 'rating-value rating-low';
    document.getElementById('modal-description-text').textContent = player.description || '';
    const modalPhoto = document.getElementById('modal-photo');
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
    document.getElementById('modal-foot').textContent = player.foot || 'Правая';
    document.getElementById('modal-height').textContent = player.height || '';
    document.getElementById('modal-weight').textContent = player.weight || '';
    const modalPlaystylesSection = document.getElementById('modal-playstyles-section');
    const modalPlaystylesGrid = document.getElementById('modal-playstyles-grid');
    if (hasPlaystyles(playerId)) {
        modalPlaystylesSection.classList.remove('playstyles-section-hidden');
        const styles = player.playstyles;
        let html = '';
        styles.forEach(style => {
            const color = getPlaystyleColor(playerId, style);
            const colorClass = color === 'silver' ? 'silver' : '';
            if (typeof playstylePhotos !== 'undefined' && playstylePhotos[style]) {
                html += `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}"><img src="${playstylePhotos[style]}"></div>`;
            } else {
                html += `<div class="playstyle-icon ${colorClass}" data-style="${style}" data-player="${playerId}">${style}</div>`;
            }
        });
        modalPlaystylesGrid.innerHTML = html;
        modalPlaystylesGrid.querySelectorAll('.playstyle-icon').forEach(el => {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                const styleKey = this.getAttribute('data-style');
                const pId = this.getAttribute('data-player');
                if (styleKey && pId) openPlaystyleDetail(styleKey, pId);
            });
        });
    } else {
        modalPlaystylesSection.classList.add('playstyles-section-hidden');
        modalPlaystylesGrid.innerHTML = '';
    }
    document.getElementById('player-modal').classList.add('active');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}
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
    const container = document.getElementById('matches-list');
    if (container) container.innerHTML = `<p style="text-align:center;color:#666;padding:30px;">${message}</p>`;
}

async function saveMatchesToSupabase() {
    try {
        if (!supabaseClient) return;
        await supabaseClient.from('matches').delete().neq('id', 0);
        const { error } = await supabaseClient.from('matches').insert(matchesData);
        if (error) throw error;
    } catch (error) {}
}

function renderMatches() {
    const container = document.getElementById('matches-list');
    if (!container) return;
    if (matchesData.length === 0) { renderMatchesEmpty('📭 Нет матчей'); return; }
    let html = '';
    matchesData.forEach(match => {
        const team1 = CAPTAINS[match.team1];
        const team2 = CAPTAINS[match.team2];
        const team1Name = team1 ? team1.name : match.team1;
        const team2Name = team2 ? team2.name : match.team2;
        const team1Logo = team1 ? team1.logo : '';
        const team2Logo = team2 ? team2.logo : '';
        const typeLabels = { home: '🏠 Домашний', away: '✈️ Выездной', neutral: '🏰 Нейтральное' };
        const typeClass = match.type || 'neutral';
        const resultClass = match.result || 'win';
        let resultText = '';
        if (match.result === 'win') resultText = `🏆 Победа ${team1Name}`;
        else if (match.result === 'loss') resultText = `❌ Поражение ${team1Name}`;
        else if (match.result === 'away') resultText = `🏆 Победа ${team2Name}`;
        const penaltyHtml = match.penalty ? `<div class="match-penalty">${match.penalty}</div>` : '';
        html += `<div class="match-card" data-match-id="${match.id}">
            <div class="match-header">
                <span class="match-date">${match.date}</span>
                <span class="match-time">${match.time}</span>
                <span class="match-location-tag ${typeClass}">${typeLabels[typeClass]}</span>
                ${adminLoggedIn ? `<button class="admin-btn" onclick="editMatch('${match.id}')">✏️</button>` : ''}
            </div>
            <div class="match-teams">
                <div class="team">
                    ${team1Logo ? `<img src="${team1Logo}" class="team-logo">` : `<span style="font-size:2rem;">🏆</span>`}
                    <span class="team-name">${team1Name}</span>
                </div>
                <div class="match-score">
                    <span class="score">${match.score1}</span>
                    <span class="score-divider">:</span>
                    <span class="score">${match.score2}</span>
                </div>
                <div class="team">
                    ${team2Logo ? `<img src="${team2Logo}" class="team-logo">` : `<span style="font-size:2rem;">🏆</span>`}
                    <span class="team-name">${team2Name}</span>
                </div>
            </div>
            ${penaltyHtml}
            <div class="match-result ${resultClass}">${resultText}</div>
        </div>`;
    });
    container.innerHTML = html;
    container.querySelectorAll('.match-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.admin-btn')) return;
            showPage('match-tactics-page');
            document.getElementById('match-tactics-title').textContent = '⚽ Тактика матча (нет данных)';
        });
    });
}

async function adminLogin(email, password) {
    try {
        if (!supabaseClient) { document.getElementById('admin-auth-status').textContent = '❌ Supabase не подключен!'; return; }
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
        if (error) { document.getElementById('admin-auth-status').textContent = `❌ Неверный логин или пароль`; return; }
        if (data.user.email !== 'admin@fcmera.com') {
            await supabaseClient.auth.signOut();
            document.getElementById('admin-auth-status').textContent = '❌ Нет прав администратора!';
            return;
        }
        adminLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('admin-auth-modal').classList.remove('active');
        document.getElementById('admin-panel').classList.add('visible');
        document.getElementById('admin-login-btn').textContent = '👑 Админ';
        document.getElementById('admin-login-btn').classList.add('logged');
        document.getElementById('admin-panel-btn').style.display = 'flex';
        document.getElementById('admin-auth-status').textContent = '';

        updateUserUI();
        renderMatches(); renderPolls(); renderComplaints(); loadAllUsers();
        sendOnlineHeartbeat();
        showMarketNotification('✅ Вы вошли как администратор!', 'success');
    } catch (err) {
        document.getElementById('admin-auth-status').textContent = `❌ ${err.message || 'Ошибка'}`;
    }
}

async function adminLogout() {
    await removeOnlineSelf();
    adminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('admin-panel').classList.remove('visible');
    document.getElementById('admin-login-btn').textContent = '🔐 Вход для админов';
    document.getElementById('admin-login-btn').classList.remove('logged');
    document.getElementById('admin-panel-btn').style.display = 'none';
    renderMatches(); renderPolls(); renderComplaints();
    updateUserUI();
    showMarketNotification('👋 Вы вышли из админ-панели', 'success');
}

function checkAdminSession() {
    if (restoreAdminSession()) {
        document.getElementById('admin-panel').classList.add('visible');
        document.getElementById('admin-login-btn').textContent = '👑 Админ';
        document.getElementById('admin-login-btn').classList.add('logged');
        document.getElementById('admin-panel-btn').style.display = 'flex';
        renderMatches(); renderPolls(); renderComplaints(); loadAllUsers();
        renderAdminPollsList(); renderAdminComplaintsList();
    }
}

function renderBalancePanel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    Object.values(CAPTAINS).forEach(team => {
        const row = document.createElement('div');
        row.className = 'balance-row';
        row.innerHTML = `
            <label>${team.name}</label>
            <input type="number" id="balance-input-${containerId}-${team.id}" value="${team.budget}" min="0">
            <button class="balance-btn" onclick="setTeamBalance('${team.id}', '${containerId}')">💾</button>
            <button class="balance-btn" onclick="addTeamBalance('${team.id}', 75)">➕75</button>
            <button class="balance-btn" onclick="addTeamBalance('${team.id}', 500)">➕500</button>
            <button class="balance-btn danger" onclick="addTeamBalance('${team.id}', -75)">➖75</button>
        `;
        container.appendChild(row);
    });
}

async function setTeamBalance(teamId, containerId) {
    const input = document.getElementById(`balance-input-${containerId}-${teamId}`);
    if (!input) return;
    const newBalance = parseInt(input.value);
    if (isNaN(newBalance) || newBalance < 0) { showMarketNotification('❌ Сумма!', 'error'); return; }
    const team = CAPTAINS[teamId];
    if (!team) return;
    team.budget = newBalance;
    await saveMarketData(); updateBudgetDisplay();
    showMarketNotification(`✅ ${team.name}: ${newBalance} монет`, 'success');
}

async function addTeamBalance(teamId, amount) {
    const team = CAPTAINS[teamId];
    if (!team) return;
    team.budget = Math.max(0, team.budget + amount);
    document.querySelectorAll(`input[id*="balance-input"][id$="-${teamId}"]`).forEach(inp => inp.value = team.budget);
    await saveMarketData(); updateBudgetDisplay();
    showMarketNotification(`✅ ${team.name}: ${team.budget} монет`, 'success');
}

function openAddMatchModal() {
    document.getElementById('match-add-modal').classList.add('active');
    document.getElementById('match-add-status').textContent = '';
    populateTeamSelects('add-match-team1', 'add-match-team2');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('add-match-date').value = today;
    document.getElementById('add-match-time').value = '18:00';
}

function openEditMatchModal(matchId) {
    const match = matchesData.find(m => m.id == matchId);
    if (!match) return;
    currentEditingMatchId = matchId;
    document.getElementById('match-edit-modal').classList.add('active');
    document.getElementById('match-edit-status').textContent = '';
    populateTeamSelects('edit-match-team1', 'edit-match-team2');
    document.getElementById('edit-match-date').value = match.date || '';
    document.getElementById('edit-match-time').value = match.time || '';
    document.getElementById('edit-match-team1').value = match.team1 || '';
    document.getElementById('edit-match-team2').value = match.team2 || '';
    document.getElementById('edit-score1').value = match.score1 || 0;
    document.getElementById('edit-score2').value = match.score2 || 0;
    document.getElementById('edit-match-type').value = match.type || 'neutral';
    document.getElementById('edit-match-result').value = match.result || 'win';
    document.getElementById('edit-match-penalty').value = match.penalty || '';
}

function populateTeamSelects(select1Id, select2Id) {
    const select1 = document.getElementById(select1Id);
    const select2 = document.getElementById(select2Id);
    if (!select1 || !select2) return;
    const val1 = select1.value;
    const val2 = select2.value;
    select1.innerHTML = '';
    select2.innerHTML = '';
    Object.values(CAPTAINS).forEach(team => {
        const opt1 = document.createElement('option');
        opt1.value = team.id; opt1.textContent = team.name;
        select1.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = team.id; opt2.textContent = team.name;
        select2.appendChild(opt2);
    });
    if (val1) select1.value = val1;
    if (val2) select2.value = val2;
}

async function addMatch() {
    const date = document.getElementById('add-match-date').value;
    const time = document.getElementById('add-match-time').value;
    const team1 = document.getElementById('add-match-team1').value;
    const team2 = document.getElementById('add-match-team2').value;
    const score1 = parseInt(document.getElementById('add-score1').value) || 0;
    const score2 = parseInt(document.getElementById('add-score2').value) || 0;
    const type = document.getElementById('add-match-type').value;
    const result = document.getElementById('add-match-result').value;
    const penalty = document.getElementById('add-match-penalty').value.trim();
    if (!date || !time || !team1 || !team2) { document.getElementById('match-add-status').textContent = '❌ Заполните!'; return; }
    if (team1 === team2) { document.getElementById('match-add-status').textContent = '❌ Разные команды!'; return; }
    const newMatch = { id: Date.now(), date, time, team1, team2, score1, score2, type, result, penalty };
    matchesData.push(newMatch);
    await saveMatchesToSupabase();
    renderMatches();
    document.getElementById('match-add-modal').classList.remove('active');
    showMarketNotification('✅ Матч добавлен!', 'success');
}

async function saveEditMatch() {
    if (!currentEditingMatchId) return;
    const match = matchesData.find(m => m.id == currentEditingMatchId);
    if (!match) return;
    match.date = document.getElementById('edit-match-date').value;
    match.time = document.getElementById('edit-match-time').value;
    match.team1 = document.getElementById('edit-match-team1').value;
    match.team2 = document.getElementById('edit-match-team2').value;
    match.score1 = parseInt(document.getElementById('edit-score1').value) || 0;
    match.score2 = parseInt(document.getElementById('edit-score2').value) || 0;
    match.type = document.getElementById('edit-match-type').value;
    match.result = document.getElementById('edit-match-result').value;
    match.penalty = document.getElementById('edit-match-penalty').value.trim();
    await saveMatchesToSupabase();
    renderMatches();
    document.getElementById('match-edit-modal').classList.remove('active');
    showMarketNotification('✅ Сохранено!', 'success');
}

async function deleteMatch() {
    if (!currentEditingMatchId || !confirm('Удалить матч?')) return;
    matchesData = matchesData.filter(m => m.id != currentEditingMatchId);
    await saveMatchesToSupabase();
    renderMatches();
    document.getElementById('match-edit-modal').classList.remove('active');
    showMarketNotification('🗑️ Удален', 'success');
}

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

async function savePollsToSupabase() {
    if (!supabaseClient) {
        savePollsToLocal();
        return;
    }
    try {
        for (const poll of pollsData) {
            const { error } = await supabaseClient
                .from('polls')
                .upsert(poll, { onConflict: 'id' });
            if (error) console.error('Ошибка upsert:', error);
        }
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        savePollsToLocal();
    }
}

function getUnansweredPollsCount() {
    if (!currentUser || !currentUserData || !currentUserData.confirmed) return 0;
    return pollsData.filter(poll => {
        if (!poll || poll.closed) return false;
        return userVotes[poll.id] === undefined;
    }).length;
}

function updatePollsUnansweredBadge() {
    const badge = document.getElementById('polls-unanswered-badge');
    if (!badge) return;
    const count = getUnansweredPollsCount();
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function renderPolls() {
    const container = document.getElementById('polls-list');
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
            <div class="poll-question">${poll.question}</div>
            <div style="font-size:.78rem;color:#666;margin-bottom:8px;">
                ${noChange ? '🚫 <b>Один голос навсегда</b>' : '✅ Можно переголосовать'}
            </div>
            <div class="poll-options">`;
        poll.options.forEach((option, optIndex) => {
            const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            const isVoted = userVoted && userVotes[poll.id] === optIndex;
            const canClick = !poll.closed && (!noChange || !userVoted);
            html += `<div class="poll-option ${isVoted ? 'voted' : ''}" ${canClick ? `onclick="votePoll('${poll.id}', ${optIndex})"` : ''} style="${!canClick ? 'opacity:.7;cursor:not-allowed;' : ''}">
                <span class="option-text">${option.text}</span>
                <span class="vote-count">${option.votes || 0} (${percent}%)</span>
            </div>`;
        });
        html += `</div>
            <div class="poll-meta">
                <span class="poll-status ${poll.closed ? 'closed' : ''}">${poll.closed ? '🔒 Закрыт' : '🟢 Активен'}</span>
                <span style="font-size:0.8rem;color:#888;">Всего голосов: ${totalVotes}</span>
            </div>`;
        if (adminLoggedIn && pollVotersData[poll.id]) {
            html += `<div class="poll-voters-list"><b>👑 Проголосовали:</b>`;
            pollVotersData[poll.id].forEach(v => {
                const votedUser = allUsersData.find(u => String(u.id) === String(v.user_id)) || localAccounts.find(u => String(u.id) === String(v.user_id));
                const userName = votedUser ? (votedUser.name || votedUser.username) : 'Пользователь';
                const optionText = poll.options[v.option_index]?.text || '?';
                html += `<div class="voter-row">👤 ${userName} → <b>${optionText}</b></div>`;
            });
            html += `</div>`;
        } else if (!adminLoggedIn && userVoted && currentUser && currentUserData && currentUserData.confirmed) {
            const votedOption = poll.options[userVotes[poll.id]];
            html += `<div style="margin-top:8px;font-size:.78rem;color:#16a34a;">
                ✅ <b>Ваш голос:</b> ${votedOption?.text || 'учтён'}
            </div>`;
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

window.votePoll = async function(pollId, optionIndex) {
    if (!currentUser || !currentUserData) {
        showMarketNotification('❌ Голосовать могут только пользователи с аккаунтом!', 'error');
        return;
    }

    if (!currentUserData.confirmed) {
        showMarketNotification('❌ Аккаунт не подтверждён администратором!', 'error');
        return;
    }

    const voterId = currentUser.id;
    const voterName = currentUserData.name || currentUserData.username || 'Пользователь';

    const poll = pollsData.find(p => String(p.id) === String(pollId));
    if (!poll) return;
    if (poll.closed) { showMarketNotification('❌ Опрос закрыт!', 'error'); return; }

    const alreadyVoted = userVotes[poll.id] !== undefined;
    const noChange = poll.no_change === true;

    if (noChange && alreadyVoted) {
        showMarketNotification('❌ Переголосовать нельзя!', 'error');
        return;
    }

    if (alreadyVoted && !noChange) {
        const oldOption = userVotes[poll.id];
        if (poll.options[oldOption] && poll.options[oldOption].votes > 0) {
            poll.options[oldOption].votes -= 1;
        }
        if (supabaseClient) {
            try {
                await supabaseClient.from('poll_votes').delete()
                    .eq('poll_id', pollId)
                    .eq('user_id', String(voterId));
            } catch (e) {}
        }
    }

    poll.options[optionIndex].votes = (poll.options[optionIndex].votes || 0) + 1;
    userVotes[poll.id] = optionIndex;

    if (supabaseClient) {
        try {
            await supabaseClient.from('poll_votes').insert([{
                poll_id: pollId,
                user_id: String(voterId),
                user_name: voterName,
                option_index: optionIndex
            }]);
            await supabaseClient.from('polls').update({ options: poll.options }).eq('id', pollId);
        } catch (e) {
            console.error('Ошибка сохранения голоса:', e);
        }
    }

    savePollsToLocal();
    await loadPollVoters();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    showMarketNotification(alreadyVoted ? '✅ Голос изменён!' : '✅ Голос учтён!', 'success');
};

window.togglePollClosed = async function(pollId) {
    const poll = pollsData.find(p => String(p.id) === String(pollId));
    if (!poll) return;
    poll.closed = !poll.closed;

    if (supabaseClient) {
        try {
            await supabaseClient.from('polls').update({ closed: poll.closed }).eq('id', pollId);
        } catch (e) {}
    }
    savePollsToLocal();
    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();
    showMarketNotification(poll.closed ? '🔒 Закрыт' : '🔓 Открыт', 'success');
};

window.deletePoll = async function(pollId) {
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
    showMarketNotification('🗑️ Удалён', 'success');
};

function checkComplaintUpdates() {
    const myName = currentUserData?.name || currentUserData?.username
                || marketState.userEmail || null;
    if (!myName) return;

    const savedSeen = JSON.parse(localStorage.getItem('dfl_seen_verdicts') || '{}');
    const myResolved = complaintsData.filter(c =>
        c.from_user === myName && c.status !== 'pending'
    );

    let newVerdicts = [];
    myResolved.forEach(c => {
        if (!savedSeen[c.id]) {
            newVerdicts.push(c);
            savedSeen[c.id] = true;
        }
    });

    if (newVerdicts.length > 0) {
        localStorage.setItem('dfl_seen_verdicts', JSON.stringify(savedSeen));
        newVerdicts.forEach(c => {
            const icon = c.status === 'resolved' ? '✅' : '❌';
            const text = c.verdict || (c.status === 'resolved' ? 'Подтверждено' : 'Отклонено');
            showMarketNotification(
                `${icon} Вердикт по вашей жалобе "${c.reason}": ${text}`,
                c.status === 'resolved' ? 'success' : 'error'
            );
        });
    }
}

function openCreatePollModal() {
    document.getElementById('create-poll-modal').classList.add('active');
    document.getElementById('poll-question').value = '';
    document.getElementById('create-poll-status').textContent = '';
    document.getElementById('create-poll-status').className = 'request-status';
    document.getElementById('poll-no-change-checkbox').checked = false;
    const container = document.getElementById('poll-options-container');
    container.innerHTML = `
        <input type="text" class="poll-option-input" placeholder="Вариант 1" style="margin-bottom:8px;">
        <input type="text" class="poll-option-input" placeholder="Вариант 2" style="margin-bottom:8px;">
    `;
}

async function submitCreatePoll() {
    const question = document.getElementById('poll-question').value.trim();
    const optionInputs = document.querySelectorAll('#poll-options-container .poll-option-input');
    const options = [];
    optionInputs.forEach(inp => {
        const val = inp.value.trim();
        if (val) options.push({ text: val, votes: 0 });
    });
    const noChange = document.getElementById('poll-no-change-checkbox').checked;
    const statusEl = document.getElementById('create-poll-status');

    if (!question) {
        statusEl.textContent = '❌ Введите вопрос!';
        statusEl.className = 'request-status error';
        return;
    }
    if (options.length < 2) {
        statusEl.textContent = '❌ Минимум 2 варианта!';
        statusEl.className = 'request-status error';
        return;
    }
    if (options.length > 6) {
        statusEl.textContent = '❌ Максимум 6 вариантов!';
        statusEl.className = 'request-status error';
        return;
    }

    const newPoll = {
        id: Date.now(),
        question,
        options,
        closed: false,
        no_change: noChange,
        created_at: new Date().toISOString()
    };

    let savedToSupabase = false;
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('polls').insert([newPoll]).select().single();
            if (error) {
                console.error('Ошибка Supabase:', error);
                statusEl.textContent = '❌ Ошибка сохранения: ' + error.message;
                statusEl.className = 'request-status error';
                return;
            }
            savedToSupabase = true;
        } catch (e) {
            console.error('Исключение Supabase:', e);
            statusEl.textContent = '❌ Ошибка подключения';
            statusEl.className = 'request-status error';
            return;
        }
    }

    pollsData.unshift(newPoll);

    if (!savedToSupabase) {
        savePollsToLocal();
    }

    renderPolls();
    if (adminLoggedIn) renderAdminPollsList();

    document.getElementById('create-poll-modal').classList.remove('active');
    showMarketNotification('✅ Опрос создан!', 'success');
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

function renderComplaints() {
    const container = document.getElementById('complaints-list');
    if (!container) return;

    const myName = currentUserData?.name || currentUserData?.username
                || marketState.userEmail || null;
    const isAdmin = adminLoggedIn;

    if (!isAdmin && !myName) {
        container.innerHTML = `<p style="text-align:center;color:#666;padding:30px;">
            🔒 Войдите, чтобы видеть свои жалобы
        </p>`;
        return;
    }

    let visibleComplaints;
    if (isAdmin) {
        visibleComplaints = complaintsData;
    } else {
        visibleComplaints = complaintsData.filter(c => c.from_user === myName);
    }

    let headerHtml = '';
    if (isAdmin) {
        headerHtml = `
            <div style="margin-bottom:14px;padding:10px 14px;
                background:#fef3c7;border-radius:10px;
                border-left:4px solid #d97706;font-size:.85rem;color:#92400e;">
                👑 <b>Режим администратора.</b> Показаны все жалобы.
            </div>
        `;
    } else {
        headerHtml = `
            <div style="margin-bottom:14px;padding:10px 14px;
                background:var(--accent-soft);border-radius:10px;
                border-left:4px solid var(--accent);font-size:.85rem;">
                🔒 <b>Показаны только ваши жалобы.</b>
                Чужие жалобы видны только администратору.
            </div>
        `;
    }

    if (visibleComplaints.length === 0) {
        container.innerHTML = headerHtml +
            `<p style="text-align:center;color:#666;padding:30px;">
                📭 ${isAdmin ? 'Нет жалоб' : 'У вас пока нет жалоб'}
            </p>`;
        return;
    }

    let html = headerHtml;
    visibleComplaints.forEach(complaint => {
        const date = new Date(complaint.created_at).toLocaleString('ru-RU');
        const isMine = myName && complaint.from_user === myName;

        let verdictHtml = '';
        if (complaint.status === 'pending') {
            verdictHtml = `<div class="complaint-verdict pending">⏳ Ожидает рассмотрения</div>`;
        } else if (complaint.status === 'resolved') {
            verdictHtml = `<div class="complaint-verdict resolved">
                ✅ <b>Вердикт:</b> ${complaint.verdict || 'Нарушение подтверждено'}
            </div>`;
        } else if (complaint.status === 'rejected') {
            verdictHtml = `<div class="complaint-verdict rejected">
                ❌ <b>Вердикт:</b> ${complaint.verdict || 'Нарушение не подтверждено'}
            </div>`;
        }

        let adminControls = '';
        if (isAdmin && complaint.status === 'pending') {
            adminControls = `<div class="complaint-verdict-input">
                <input type="text" id="verdict-input-${complaint.id}"
                    placeholder="Напишите вердикт (необязательно)...">
                <button class="resolve-btn"
                    onclick="resolveComplaint('${complaint.id}', 'resolved')">✅ Подтвердить</button>
                <button class="reject-btn"
                    onclick="resolveComplaint('${complaint.id}', 'rejected')">❌ Отклонить</button>
            </div>`;
        }

        const mineLabel = (isMine && isAdmin)
            ? `<span style="display:inline-block;background:#0066cc;color:#fff;
                font-size:.65rem;font-weight:800;padding:2px 10px;border-radius:999px;
                margin-left:8px;">⭐ ВАША</span>`
            : '';

        html += `<div class="complaint-item" style="${isMine && isAdmin ? 'border-left-color:#0066cc;' : ''}">
            <div class="complaint-header">
                <span class="complaint-from">
                    ${isAdmin
                        ? `👤 ${complaint.from_user || 'Аноним'}${mineLabel}`
                        : '📝 Моя жалоба'}
                </span>
                <span class="complaint-date">🕐 ${date}</span>
            </div>
            <div class="complaint-reason">📌 ${complaint.reason}</div>
            <div class="complaint-text">${complaint.text}</div>
            ${verdictHtml}
            ${adminControls}
        </div>`;
    });
    container.innerHTML = html;
}

window.resolveComplaint = async function(complaintId, status) {
    const complaint = complaintsData.find(c => c.id == complaintId);
    if (!complaint) return;
    const input = document.getElementById(`verdict-input-${complaintId}`);
    const verdict = input ? input.value.trim() : '';
    complaint.status = status;
    complaint.verdict = verdict || (status === 'resolved' ? 'Подтверждено' : 'Отклонено');
    if (supabaseClient) {
        try { await supabaseClient.from('complaints').update({ status: complaint.status, verdict: complaint.verdict }).eq('id', complaintId); } catch (e) {}
    }
    renderComplaints();
    showMarketNotification(status === 'resolved' ? '✅ Подтверждена' : '❌ Отклонена', 'success');
};

async function submitComplaint() {
    const authorName = currentUserData?.name || currentUserData?.username
                    || marketState.userEmail || null;

    if (!authorName) {
        showMarketNotification('❌ Войдите в аккаунт или как капитан!', 'error');
        return;
    }

    if (currentUser && (!currentUserData || !currentUserData.confirmed)) {
        showMarketNotification('❌ Аккаунт не подтверждён!', 'error');
        return;
    }

    const reasonSelect = document.getElementById('complaint-reason');
    const customReasonInput = document.getElementById('complaint-custom-reason');
    const text = document.getElementById('complaint-text').value.trim();
    const statusEl = document.getElementById('complaint-status');

    let reason = reasonSelect.value;
    if (reason === 'Другое') reason = customReasonInput.value.trim();

    if (!reason) {
        statusEl.textContent = '❌ Укажите причину!';
        statusEl.className = 'request-status error';
        return;
    }
    if (!text) {
        statusEl.textContent = '❌ Опишите ситуацию!';
        statusEl.className = 'request-status error';
        return;
    }

    const complaint = {
        id: Date.now(),
        from_user: authorName,
        reason: reason,
        text: text,
        status: 'pending',
        verdict: '',
        created_at: new Date().toISOString()
    };

    try {
        if (supabaseClient) {
            const { error } = await supabaseClient.from('complaints').insert([complaint]);
            if (error) {
                statusEl.textContent = `❌ Ошибка: ${error.message}`;
                statusEl.className = 'request-status error';
                return;
            }
        }
        complaintsData.unshift(complaint);
        renderComplaints();
        if (adminLoggedIn) renderAdminComplaintsList();

        document.getElementById('complaint-modal').classList.remove('active');
        document.getElementById('complaint-reason').value = '';
        document.getElementById('complaint-custom-reason').value = '';
        document.getElementById('complaint-custom-reason-group').style.display = 'none';
        document.getElementById('complaint-text').value = '';
        statusEl.textContent = '';

        showMarketNotification('✅ Жалоба отправлена!', 'success');
    } catch (error) {
        statusEl.textContent = `❌ Ошибка: ${error.message || 'Неизвестная ошибка'}`;
        statusEl.className = 'request-status error';
    }
}

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

function renderUsersList() {
    const container = document.getElementById('users-list');
    if (!container) return;
    const unconfirmed = allUsersData.filter(u => !u.confirmed);
    const confirmed = allUsersData.filter(u => u.confirmed);
    let html = '';
    html += `<h3 style="color:#f59e0b;margin-bottom:10px;">⏳ Неподтверждённые (${unconfirmed.length})</h3>`;
    if (unconfirmed.length === 0) {
        html += '<p style="color:#666;padding:10px;">✅ Нет неподтверждённых</p>';
    } else {
        unconfirmed.forEach(user => {
            html += `
                <div class="user-item">
                    <div class="user-info-block">
                        <div class="user-username">👤 ${user.username || 'Без логина'}</div>
                        <div class="user-realname">📝 Имя: ${user.name || 'Не указано'}</div>
                        <span class="user-status-small unconfirmed">⏳ Не подтверждён</span>
                    </div>
                    <div class="user-actions-block">
                        <select id="player-select-${user.id}">
                            <option value="">Выберите игрока...</option>
                            ${Object.keys(playersData).map(pid =>
                                `<option value="${pid}">${playersData[pid].name}</option>`
                            ).join('')}
                        </select>
                        <button class="confirm-btn" onclick="confirmUser('${user.id}')">✅ Подтвердить</button>
                        <button class="delete-user-btn" onclick="deleteUser('${user.id}')">🗑️</button>
                    </div>
                </div>
            `;
        });
    }
    html += `<h3 style="color:#16a34a;margin-bottom:10px;margin-top:20px;">✅ Подтверждённые (${confirmed.length})</h3>`;
    if (confirmed.length === 0) {
        html += '<p style="color:#666;padding:10px;">Нет подтверждённых</p>';
    } else {
        confirmed.forEach(user => {
            const player = user.player_id && playersData[user.player_id];
            html += `
                <div class="user-item">
                    <div class="user-info-block">
                        <div class="user-username">👤 ${user.username || 'Без логина'}</div>
                        <div class="user-realname">📝 Имя: ${user.name || 'Не указано'}</div>
                        <div class="user-realname">🎮 Игрок: ${player ? player.name : 'Не привязан'}</div>
                        <span class="user-status-small confirmed">✅ Подтверждён</span>
                    </div>
                    <div class="user-actions-block">
                        <select id="player-select-${user.id}">
                            <option value="">Сменить игрока...</option>
                            ${Object.keys(playersData).map(pid =>
                                `<option value="${pid}" ${user.player_id === pid ? 'selected' : ''}>${playersData[pid].name}</option>`
                            ).join('')}
                        </select>
                        <button class="confirm-btn" onclick="confirmUser('${user.id}')">💾</button>
                        <button class="delete-user-btn" onclick="deleteUser('${user.id}')">🗑️</button>
                    </div>
                </div>
            `;
        });
    }
    container.innerHTML = html;
}

window.confirmUser = async function(userId) {
    const select = document.getElementById(`player-select-${userId}`);
    const playerId = select ? select.value : '';
    if (!playerId) { showMarketNotification('❌ Выберите игрока!', 'error'); return; }
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
        showMarketNotification('✅ Подтверждён!', 'success');
        loadAllUsers();
    } catch (error) { showMarketNotification('❌ Ошибка!', 'error'); }
};

window.deleteUser = async function(userId) {
    if (!confirm('Удалить пользователя?')) return;
    try {
        if (supabaseClient) {
            try { await supabaseClient.from('user_accounts').delete().eq('id', userId); } catch (e) {}
        }
        localAccounts = localAccounts.filter(u => String(u.id) !== String(userId));
        saveLocalAccounts();
        showMarketNotification('🗑️ Удалён', 'success');
        loadAllUsers();
    } catch (error) { showMarketNotification('❌ Ошибка!', 'error'); }
};

async function registerUser(name, username, password) {
    try {
        const existingLocal = localAccounts.find(a => a.username.toLowerCase() === username.toLowerCase());
        if (existingLocal) { showMarketNotification('❌ Логин занят!', 'error'); return; }
        if (supabaseClient) {
            try {
                const { data: existing } = await supabaseClient.from('user_accounts').select('id').eq('username', username.trim()).maybeSingle();
                if (existing) { showMarketNotification('❌ Логин занят!', 'error'); return; }
            } catch (e) {}
        }
        const passwordHash = simpleHash(password);
        const newUser = {
            username: username.trim(),
            password_hash: passwordHash,
            name: name.trim(),
            confirmed: false,
            player_id: null,
            created_at: new Date().toISOString()
        };
        let savedToSupabase = false;
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('user_accounts').insert([newUser]).select().single();
                if (!error && data) {
                    savedToSupabase = true;
                    showMarketNotification('✅ Регистрация! Ждите подтверждения.', 'success');
                }
            } catch (e) {}
        }
        const localUser = { id: 'local_' + Date.now(), ...newUser };
        localAccounts.push(localUser);
        saveLocalAccounts();
        if (!savedToSupabase) showMarketNotification('✅ Регистрация! Ждите подтверждения.', 'success');
        document.getElementById('account-modal').classList.remove('active');
    } catch (error) {
        showMarketNotification(`❌ Ошибка`, 'error');
    }
}

async function loginUser(username, password) {
    try {
        const passwordHash = simpleHash(password);
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('user_accounts').select('*').eq('username', username.trim()).eq('password_hash', passwordHash).maybeSingle();
                if (!error && data) {
                    currentUser = { id: data.id };
                    currentUserData = data;
                    saveUserSession();
                    updateUserUI();
                    await loadUserVotes();
                    renderPolls();
                    document.getElementById('account-modal').classList.remove('active');
                    sendOnlineHeartbeat();
                    showMarketNotification(`✅ Добро пожаловать, ${data.name || data.username}!`, 'success');
                    return;
                }
            } catch (e) {}
        }
        const local = localAccounts.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password_hash === passwordHash);
        if (local) {
            currentUser = { id: local.id };
            currentUserData = local;
            saveUserSession();
            updateUserUI();
            await loadUserVotes();
            renderPolls();
            document.getElementById('account-modal').classList.remove('active');
            sendOnlineHeartbeat();
            showMarketNotification(`✅ Добро пожаловать, ${local.name || local.username}!`, 'success');
            return;
        }
        showMarketNotification('❌ Неверный логин или пароль!', 'error');
    } catch (error) {
        showMarketNotification(`❌ Ошибка`, 'error');
    }
}

async function loadUserVotes() {
    if (!supabaseClient) return;
    if (!currentUser) {
        userVotes = {};
        return;
    }
    try {
        const { data, error } = await supabaseClient
            .from('poll_votes')
            .select('*')
            .eq('user_id', String(currentUser.id));
        if (error) throw error;
        userVotes = {};
        (data || []).forEach(vote => { userVotes[vote.poll_id] = vote.option_index; });
    } catch (error) {
        console.error('Ошибка загрузки голосов:', error);
    }
}

function updateUserUI() {
    const avatarBtn = document.getElementById('avatar-btn');
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
    document.getElementById('account-modal').classList.remove('active');
    showMarketNotification('👋 Вы вышли', 'success');
}

function openAccountModal() {
    const modal = document.getElementById('account-modal');
    modal.classList.add('active');
    if (currentUser && currentUserData) {
        document.getElementById('account-content-guest').style.display = 'none';
        document.getElementById('account-content-user').style.display = 'block';
        const playerId = currentUserData.player_id;
        const player = playerId ? playersData[playerId] : null;
        const avatarEl = document.getElementById('account-avatar-big');
        if (playerId && typeof playerPhotos !== 'undefined' && playerPhotos[playerId]) {
            avatarEl.innerHTML = `<img src="${playerPhotos[playerId]}" alt="">`;
        } else if (player) {
            avatarEl.textContent = player.icon || '⚽';
        } else {
            avatarEl.textContent = '👤';
        }
        document.getElementById('account-user-name').textContent = currentUserData.name || currentUserData.username || 'Без имени';
        document.getElementById('account-user-email').textContent = 'Логин: ' + (currentUserData.username || '—');
        const statusEl = document.getElementById('account-user-status');
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
        document.getElementById('account-player-name').textContent = player ? player.name : '—';
        document.getElementById('account-player-rating').textContent = player ? `⭐ ${player.rating}` : '—';
        document.getElementById('account-player-position').textContent = player ? player.position : '—';
        const teamId = playerId ? Object.keys(CAPTAINS).find(tid => CAPTAINS[tid].players.includes(playerId)) : null;
        document.getElementById('account-player-team').textContent = teamId ? CAPTAINS[teamId].name : '—';
const INFINITE_PRICE_PLAYERS = ['raya', 'aleksey_doroshenko', 'maxim'];
const INFINITE_PRICE_VALUE = 999999999999;
        const adminPanelBtn = document.getElementById('account-admin-panel-btn');
        const adminLoginBtn = document.getElementById('account-admin-login-btn');
        const adminLogoutBtn = document.getElementById('account-admin-logout-btn');
        if (adminLoggedIn) {
            adminPanelBtn.style.display = 'block';
            adminLoginBtn.style.display = 'none';
            adminLogoutBtn.style.display = 'block';
        } else {
            adminPanelBtn.style.display = 'none';
            adminLoginBtn.style.display = 'block';
            adminLogoutBtn.style.display = 'none';
        }
    } else {
        document.getElementById('account-content-guest').style.display = 'block';
        document.getElementById('account-content-user').style.display = 'none';
    }
}
function initRulesAccordion() {
    const rulesData = [
        { section: '1', title: 'Общие положения Регламента', rules: [
            { num: '1.1.1', text: 'Настоящий Регламент регулирует проведение матчей и трансферную политику в Дворовой Футбольной Лиге.' },
            { num: '1.1.2', text: 'Регламент распространяется как на обычные, так и на молодежные команды.' },
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
            { num: '2.5', text: 'Команда имеет право отказаться от матча не менее чем за час до игры, в противном случае команде будет выставлено техническое поражение.' },
        ]},
        { section: '3', title: 'Финансы и трансферы', rules: [
            { num: '3.1.1', text: 'За победу в основное время матча команде дается 75 монет (проигрыш - 0), за победу в серии пенальти - 50 монет (проигрыш - 25).' },
            { num: '3.1.2', text: 'Если команда получает техническое поражение в матче, со счета команды списывается 75 монет, а также вводится 7-дневный бан на матчи.' },
            { num: '3.2', text: 'Уйти из клуба в другой бесплатно игроку запрещено, уход из клуба бесплатно = завершение карьеры в ДФЛ.' },
            { num: '3.3', text: 'При покупке игрока его разрешение не требуется, однако во избежание договорных матчей капитанам следует проводить переговоры с игроком перед трансфером.' },
            { num: '3.4.1', text: 'Трансферный бан - временный запрет команды на покупку игроков. Решение о его назначении принимается организаторами лиги.' },
            { num: '3.4.2', text: 'Трансферный бан назначается в случае многочисленности* команды или нарушений, связанных с рынком.' },
            { num: '3.5', text: 'Многочисленность команды - ситуация, при которой в составе команды одновременно находится более 10 игроков.' },
            { num: '3.6', text: 'Аренда игрока осуществляется сроком не менее 7 дней, аренда на иной срок является недействительной.' },
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
            { num: '5.3', text: 'Регистрация игрока обходится команде в 75 монет, в случае, если игрок до этого не играл в ДФЛ и не был дисквалифицирован.' },
            { num: '5.4', text: 'Требования к судье: не играет ни за одну играющую в матче команду, знает правила и не болеет за какую либо команду, играющую в матче, с его назначением согласны обе команды.' },
        ]},
        { section: '6', title: 'Виды нарушений и ответственность', rules: [
            { num: '6.1.1', text: 'Виды наказания игрока за пресечение Регламента ДФЛ: Дисквалификация (временная/пожизненная), запрет на участие в матчах (временный), запрет на переход в другую команду.' },
            { num: '6.1.2', text: 'Виды наказания команды за пресечение Регламента ДФЛ: Запрет проведения матчей (временный), запрет трансферной политики (временный).' },
            { num: '6.2', text: 'Решения о назначении наказания принимаются исключительно после доказательства о нарушении организаторами согласно действующему Регламенту.' },
            { num: '6.3', text: 'За распространение заведомо ложной информации о проведении, месте, времени, формате, условиях матча, которое привело к изменениям/отмене/проведению матча, предполагается ответственность.'},
            { num: '6.4.1', text: 'Если матч рассудили предвзято, его результат будет аннулирован, а судья наказан дисквалификацией.'},
            { num: '6.4.2', text: 'Если при пункте 6.4.1 будет доказана виновность команды, она наказывается штрафом 75-125 монет и дисквалификацией/трансферным баном.'},
            { num: '6.5', text: 'Если команда не проводит матчи без причины более 4 месяцев, она исчезает из сайта, а все данные, матчи с данной командой будут стерты.' },
            { num: '6.6', text: 'Необоснованное обогащение засчет команды, находящейся в кризисе или критической ситуации, наказывается штрафом в размере обогащения команды.'},
        ]},
        { section: '7', title: 'Полномочия организаторов Лиги', rules: [
            { num: '7.1.1', text: 'Организаторы Лиги имеют наиболее расширенные полномочия, чем обычные игроки/судьи.' },
            { num: '7.1.2', text: 'Все решения, принимающиеся организаторами Лиги, должны соответствовать Регламенту. Ограничивать действия организаторов может только Регламент.' },
            { num: '7.1.3', text: 'Капитан/представитель команды имеет право запросить отчет действий организатора, если это касается его команды или решается вопрос, не затрагиваемый Регламентом.' },
            { num: '7.4', text: 'Организаторы имеют исключительное право изменять рыночные балансы клубов, изменять Регламент, и выносить вердикт по жалобам/апелляциям.' },
            { num: '7.5', text: 'Назначение матчей происходит под ведомом организаторов Лиги.' },
            { num: '7.6', text: 'Организаторы Лиги имеют право назначить судью на матч, в случае, если данный кандидат проходит требования Регламента (см 5.4).' },
        ]},
    ];
    const rulesList = document.getElementById('rules-list');
    if (!rulesList) return;
    let html = '';
    rulesData.forEach((section) => {
        html += `<div class="rules-section">
            <div class="rules-section-header" onclick="toggleRulesSection(this)">
                <span><span class="section-num">${section.section}.</span> ${section.title}</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="rules-section-body">
                ${section.rules.map(rule => `<div class="rule-item"><span class="rule-num">${rule.num}.</span> ${rule.text}</div>`).join('')}
            </div>
        </div>`;
    });
    rulesList.innerHTML = html;
}

window.toggleRulesSection = function(header) {
    header.closest('.rules-section').classList.toggle('open');
};

document.addEventListener('DOMContentLoaded', function() {
    initRulesAccordion();

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
    document.getElementById('theme-toggle').addEventListener('click', function() {
        themeClickCount++;
        if (themeClickCount >= 15) {
            themeClickCount = 0;
            document.getElementById('secret-overlay').classList.add('active');
        }
        document.body.classList.toggle('dark-theme');
        this.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    const newsList = document.getElementById('news-list');
    if (newsList) {
        newsList.innerHTML = '';
        if (typeof newsData !== 'undefined' && Array.isArray(newsData)) {
            newsData.forEach((news, index) => {
                const item = document.createElement('div');
                item.className = 'news-item';
                let mediaHtml = '';
                if (typeof newsMedia !== 'undefined' && newsMedia[index] && newsMedia[index].url) {
                    const media = newsMedia[index];
                    const isVideo = media.type === 'video';
                    if (isVideo) mediaHtml = `<div class="news-media"><video controls src="${media.url}"></video></div>`;
                    else mediaHtml = `<div class="news-media"><img src="${media.url}" alt=""></div>`;
                }
                item.innerHTML = `
                    <div class="news-date">${news.date}</div>
                    <div class="news-title">${news.title}</div>
                    <div class="news-text">${news.text}</div>
                    <span class="news-tag">${news.tag}</span>
                    ${mediaHtml}
                `;
                newsList.appendChild(item);
            });
        }
    }

    const adminRestored = restoreAdminSession();
    if (adminRestored) {
        document.getElementById('admin-panel').classList.add('visible');
        document.getElementById('admin-login-btn').textContent = '👑 Админ';
        document.getElementById('admin-login-btn').classList.add('logged');
        document.getElementById('admin-panel-btn').style.display = 'flex';
    }

    (async () => {
        if (supabaseClient && adminRestored) {
            try {
                const { data } = await supabaseClient.from('user_accounts').select('*');
                if (data) allUsersData = data;
            } catch (e) {}
        }

        const userRestored = restoreUserSession();
        if (userRestored) await loadUserVotes();

        updateUserUI();
        startOnlineHeartbeat();

        if (!userRestored && !adminRestored) {
            setTimeout(() => { openAccountModal(); }, 800);
        }

        loadPolls().then(() => updatePollsUnansweredBadge());
        loadComplaints();
    })();

    document.getElementById('avatar-btn').addEventListener('click', openAccountModal);
    document.getElementById('account-close').addEventListener('click', () => {
        document.getElementById('account-modal').classList.remove('active');
    });
    document.getElementById('account-modal').addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
    document.getElementById('tab-login').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('tab-register').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('register-form').classList.remove('active');
    });
    document.getElementById('tab-register').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('tab-login').classList.remove('active');
        document.getElementById('register-form').classList.add('active');
        document.getElementById('login-form').classList.remove('active');
    });
    document.getElementById('auth-login-submit').addEventListener('click', function() {
        const username = document.getElementById('auth-login-username').value.trim();
        const password = document.getElementById('auth-login-password').value.trim();
        if (username && password) {
            loginUser(username, password);
            document.getElementById('auth-login-username').value = '';
            document.getElementById('auth-login-password').value = '';
        } else {
            document.getElementById('auth-login-status').textContent = '❌ Введите логин и пароль!';
        }
    });
    document.getElementById('auth-register-submit').addEventListener('click', function() {
        const name = document.getElementById('auth-register-name').value.trim();
        const username = document.getElementById('auth-register-username').value.trim();
        const password = document.getElementById('auth-register-password').value.trim();
        const password2 = document.getElementById('auth-register-password2').value.trim();
        const statusEl = document.getElementById('auth-register-status');
        if (!name) { statusEl.textContent = '❌ Введите имя!'; return; }
        if (!username) { statusEl.textContent = '❌ Введите логин!'; return; }
        if (!password || password.length < 6) { statusEl.textContent = '❌ Пароль минимум 6 символов!'; return; }
        if (password !== password2) { statusEl.textContent = '❌ Пароли не совпадают!'; return; }
        registerUser(name, username, password);
        document.getElementById('auth-register-name').value = '';
        document.getElementById('auth-register-username').value = '';
        document.getElementById('auth-register-password').value = '';
        document.getElementById('auth-register-password2').value = '';
    });
    document.getElementById('guest-btn').addEventListener('click', function() {
        document.getElementById('account-modal').classList.remove('active');
        showMarketNotification('👤 Вы вошли как гость', 'info');
    });
    document.getElementById('account-logout-btn').addEventListener('click', logoutUser);
    document.getElementById('account-admin-login-btn').addEventListener('click', function() {
        document.getElementById('account-modal').classList.remove('active');
        setTimeout(() => {
            document.getElementById('admin-auth-modal').classList.add('active');
            document.getElementById('admin-auth-status').textContent = '';
        }, 200);
    });
    document.getElementById('account-admin-logout-btn').addEventListener('click', function() {
        adminLogout();
        document.getElementById('account-modal').classList.remove('active');
    });
    document.getElementById('account-admin-panel-btn').addEventListener('click', function() {
        document.getElementById('account-modal').classList.remove('active');
        showPage('admin-panel-page');
        loadAllUsers();
        renderBalancePanel('balance-teams-container');
        renderAdminPollsList();
        renderAdminComplaintsList();
        renderOnlinePanel();
    });

    document.getElementById('matches-btn').addEventListener('click', () => { showPage('matches-page'); loadMatches(); });
    document.getElementById('yards-btn').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('news-btn').addEventListener('click', () => showPage('news-page'));
    document.getElementById('rules-btn').addEventListener('click', () => showPage('rules-page'));
    document.getElementById('admin-panel-btn').addEventListener('click', () => {
        showPage('admin-panel-page');
        loadAllUsers();
        renderBalancePanel('balance-teams-container');
        renderAdminPollsList();
        renderAdminComplaintsList();
        renderOnlinePanel();
    });
    document.getElementById('complaint-btn-main').addEventListener('click', function() {
        const isLoggedIn = currentUser || marketState.currentCaptain;
        if (!isLoggedIn) {
            openAccountModal();
            showMarketNotification('❌ Войдите как капитан или пользователь!', 'error');
            return;
        }
        if (currentUser && (!currentUserData || !currentUserData.confirmed)) {
            showMarketNotification('❌ Аккаунт не подтверждён!', 'error');
            return;
        }
        document.getElementById('complaint-modal').classList.add('active');
        document.getElementById('complaint-status').textContent = '';
    });
    document.getElementById('market-btn').addEventListener('click', () => {
        showPage('market-page');
        updateMarketUI(); renderTransfers();
        if (marketState.currentCaptain) renderMyTeam();
    });

    const complaintsNavBtn = document.getElementById('complaints-nav-btn');
    if (complaintsNavBtn) {
        complaintsNavBtn.addEventListener('click', () => {
            showPage('complaints-page');
            renderComplaints();
            checkComplaintUpdates();
        });
    }

    document.getElementById('back-from-players').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-squad').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-matches').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-yards').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-news').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-rules').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-market').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-polls').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-complaints').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-admin-panel').addEventListener('click', () => showPage('home-page'));
    document.getElementById('back-from-yard-mera').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-yard-78').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-yard-yuzhka').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-yard-arsenal').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-yard-psg').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-yard-zvezda').addEventListener('click', () => showPage('yards-page'));
    document.getElementById('back-from-match-tactics').addEventListener('click', () => showPage('matches-page'));

    document.getElementById('yard-mera').addEventListener('click', () => showPage('yard-mera-page'));
    document.getElementById('yard-78-school').addEventListener('click', () => showPage('yard-78-page'));
    document.getElementById('yard-yuzhka').addEventListener('click', () => showPage('yard-yuzhka-page'));
    document.getElementById('yard-arsenal').addEventListener('click', () => showPage('yard-arsenal-page'));
    document.getElementById('yard-psg').addEventListener('click', () => showPage('yard-psg-page'));
    document.getElementById('yard-zvezda').addEventListener('click', () => showPage('yard-zvezda-page'));

    renderMainPlayerCards();
    renderPlayerCards('yard-mera-grid', meraTeamIds, 'yard-mera-theme');
    renderPlayerCards('yard-78-grid', yard78PlayerIds, 'yard-78-theme');
    renderPlayerCards('yard-zvezda-grid', zvezdaPlayerIds, 'yard-zvezda-theme');
    renderPlayerCards('yard-yuzhka-grid', yuzhkaPlayerIds, 'yard-yuzhka-theme');
    renderPlayerCards('yard-arsenal-grid', arsenalPlayerIds, 'yard-arsenal-theme');
    renderPlayerCards('yard-psg-grid', psgPlayerIds, 'yard-psg-theme');

    document.getElementById('player-search').addEventListener('input', function(e) { filterPlayers(e.target.value); });
    document.getElementById('sort-rating').addEventListener('click', function() {
        activeSort = 'rating';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applySortToFiltered();
    });
    document.getElementById('sort-name').addEventListener('click', function() {
        activeSort = 'name';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applySortToFiltered();
    });
    document.getElementById('reset-sort').addEventListener('click', () => resetSortAndFilter());

    const squad1Players = ['raya', 'lesha_podavalny', 'maxim', 'batrakov', 'aleksey_doroshenko'];
    squad1Players.forEach(id => {
        const photoEl = document.getElementById(`${id}-photo-small`);
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
        item.addEventListener('click', function() {
            const playerId = this.getAttribute('data-player');
            if (playerId && playersData[playerId]) openPlayerModal(playerId);
        });
    });

    const loginBtn = document.getElementById('login-btn');
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    const logoutBtn = document.getElementById('logout-btn');

    loginBtn.addEventListener('click', function() {
        if (loginInput.style.display === 'none') {
            loginInput.style.display = 'inline-block';
            passwordInput.style.display = 'inline-block';
            loginInput.placeholder = 'Email (mera@fc.com, school78@fc.com, yuzhka@fc.com, arsenal@fc.com, psg@fc.com, zvezda@fc.com)';
            passwordInput.placeholder = 'Пароль...';
            loginInput.focus();
        } else {
            const email = loginInput.value.trim();
            const password = passwordInput.value.trim();
            if (email && password) {
                loginCaptain(email, password);
                loginInput.value = '';
                passwordInput.value = '';
            } else {
                showMarketNotification('❌ Введите email и пароль!', 'error');
            }
        }
    });

    loginInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') loginBtn.click();
    });
    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') loginBtn.click();
    });

    logoutBtn.addEventListener('click', logoutCaptain);

    document.getElementById('market-filter-team').addEventListener('change', updateMarketUI);
    document.getElementById('market-filter-position').addEventListener('change', updateMarketUI);

    checkAuthStatus().then(() => { initMarket(); });

    document.getElementById('modal-close').addEventListener('click', () => document.getElementById('player-modal').classList.remove('active'));
    document.getElementById('player-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('playstyle-detail-close').addEventListener('click', closePlaystyleDetail);
    document.getElementById('playstyle-detail-overlay').addEventListener('click', function(e) { if (e.target === this) closePlaystyleDetail(); });

    const secretOverlay = document.getElementById('secret-overlay');
    document.getElementById('secret-close').addEventListener('click', () => secretOverlay.classList.remove('active'));
    secretOverlay.addEventListener('click', function(e) { if (e.target === this) secretOverlay.classList.remove('active'); });
    document.getElementById('secret-submit').addEventListener('click', function() {
        const input = document.getElementById('secret-password').value.trim();
        if (input === 'FCMERA_11...04') {
            document.getElementById('secret-error').textContent = '';
            document.getElementById('secret-content').classList.add('active');
            document.getElementById('secret-password').disabled = true;
            document.getElementById('secret-submit').textContent = '✅ Открыто';
        } else {
            document.getElementById('secret-error').textContent = '❌ Неверный пароль!';
            document.getElementById('secret-password').value = '';
        }
    });
    document.getElementById('secret-password').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('secret-submit').click(); });

    document.getElementById('complaint-close').addEventListener('click', () => document.getElementById('complaint-modal').classList.remove('active'));
    document.getElementById('complaint-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('complaint-reason').addEventListener('change', function() {
        document.getElementById('complaint-custom-reason-group').style.display = this.value === 'Другое' ? 'block' : 'none';
    });
    document.getElementById('complaint-submit-btn').addEventListener('click', submitComplaint);

    document.getElementById('create-poll-close').addEventListener('click', () => document.getElementById('create-poll-modal').classList.remove('active'));
    document.getElementById('create-poll-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('add-poll-option-btn').addEventListener('click', function() {
        const container = document.getElementById('poll-options-container');
        const count = container.querySelectorAll('.poll-option-input').length;
        if (count >= 6) return;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'poll-option-input';
        input.placeholder = `Вариант ${count + 1}`;
        input.style.marginBottom = '8px';
        container.appendChild(input);
    });
    document.getElementById('create-poll-submit-btn').addEventListener('click', submitCreatePoll);

    document.querySelectorAll('.admin-section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.admin-section-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`admin-tab-${this.dataset.tab}`).classList.add('active');
            if (this.dataset.tab === 'online') renderOnlinePanel();
            if (this.dataset.tab === 'users') loadAllUsers();
            if (this.dataset.tab === 'balances') renderBalancePanel('balance-teams-container');
            if (this.dataset.tab === 'polls') renderAdminPollsList();
            if (this.dataset.tab === 'complaints') renderAdminComplaintsList();
        });
    });

    const onlineRefreshBtn = document.getElementById('online-refresh-btn');
    if (onlineRefreshBtn) {
        onlineRefreshBtn.addEventListener('click', renderOnlinePanel);
    }

    document.getElementById('admin-login-btn').addEventListener('click', function() {
        if (adminLoggedIn) adminLogout();
        else {
            document.getElementById('admin-auth-modal').classList.add('active');
            document.getElementById('admin-auth-status').textContent = '';
        }
    });
    document.getElementById('admin-auth-close').addEventListener('click', () => document.getElementById('admin-auth-modal').classList.remove('active'));
    document.getElementById('admin-auth-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('admin-auth-submit').addEventListener('click', function() {
        const email = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value.trim();
        if (email && password) adminLogin(email, password);
        else document.getElementById('admin-auth-status').textContent = '❌ Введите email и пароль!';
    });
    document.getElementById('admin-password').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('admin-auth-submit').click(); });
    document.getElementById('admin-email').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('admin-auth-submit').click(); });

    document.getElementById('admin-add-match-btn').addEventListener('click', openAddMatchModal);
    document.getElementById('admin-logout-btn').addEventListener('click', adminLogout);
    document.getElementById('match-add-close').addEventListener('click', () => document.getElementById('match-add-modal').classList.remove('active'));
    document.getElementById('match-add-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('submit-add-btn').addEventListener('click', addMatch);
    document.getElementById('match-edit-close').addEventListener('click', () => document.getElementById('match-edit-modal').classList.remove('active'));
    document.getElementById('match-edit-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('submit-edit-btn').addEventListener('click', saveEditMatch);
    document.getElementById('delete-match-btn').addEventListener('click', deleteMatch);

    window.editMatch = function(matchId) { openEditMatchModal(matchId); };

    document.getElementById('transfer-money-btn').addEventListener('click', openTransferMoney);
    document.getElementById('transfer-money-close').addEventListener('click', () => document.getElementById('transfer-money-modal').classList.remove('active'));
    document.getElementById('transfer-money-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('transfer-submit-btn').addEventListener('click', submitTransferMoney);

    document.getElementById('make-offer-btn').addEventListener('click', openMakeOffer);
    document.getElementById('make-offer-close').addEventListener('click', () => document.getElementById('make-offer-modal').classList.remove('active'));
    document.getElementById('make-offer-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.getElementById('offer-submit-btn').addEventListener('click', submitOffer);

    document.getElementById('view-offers-btn').addEventListener('click', openViewOffers);
    document.getElementById('view-offers-close').addEventListener('click', () => document.getElementById('view-offers-modal').classList.remove('active'));
    document.getElementById('view-offers-modal').addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });

    const createPollBtn = document.getElementById('create-poll-btn');
    if (createPollBtn) {
        createPollBtn.addEventListener('click', openCreatePollModal);
    }

    window.setTeamBalance = setTeamBalance;
    window.addTeamBalance = addTeamBalance;
    window.removeFromMarket = removeFromMarket;
    window.buyPlayer = buyPlayer;
    window.respondToOffer = respondToOffer;
    window.openSellDialog = openSellDialog;
    window.confirmUser = confirmUser;
    window.deleteUser = deleteUser;
    window.votePoll = votePoll;
    window.togglePollClosed = togglePollClosed;
    window.deletePoll = deletePoll;
    window.toggleRulesSection = toggleRulesSection;
    window.resolveComplaint = resolveComplaint;

    setInterval(() => {
        const onlineTab = document.getElementById('admin-tab-online');
        if (onlineTab && onlineTab.classList.contains('active') && adminLoggedIn) {
            renderOnlinePanel();
        }
    }, 30000);

    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            document.body.classList.remove('preloading');
            setTimeout(() => { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 600);
        }
    }, 700);

    console.log('✅ Сайт загружен!');
});

function openTransferMoney() {
    if (!marketState.currentCaptain) { showMarketNotification('❌ Войдите как капитан!', 'error'); return; }
    document.getElementById('transfer-money-modal').classList.add('active');
    document.getElementById('transfer-status').textContent = '';
    document.getElementById('transfer-amount').value = '';
    document.getElementById('transfer-comment').value = '';
    const select = document.getElementById('transfer-to-team');
    select.innerHTML = '';
    Object.values(CAPTAINS).forEach(team => {
        if (team.id !== marketState.currentCaptain) {
            const opt = document.createElement('option');
            opt.value = team.id;
            opt.textContent = `${team.name} (💰 ${team.budget})`;
            select.appendChild(opt);
        }
    });
}

async function submitTransferMoney() {
    const fromTeamId = marketState.currentCaptain;
    if (!fromTeamId) return;
    const toTeamId = document.getElementById('transfer-to-team').value;
    const amount = parseInt(document.getElementById('transfer-amount').value);
    const comment = document.getElementById('transfer-comment').value.trim();
    const statusEl = document.getElementById('transfer-status');
    if (!amount || amount < 1) { statusEl.textContent = '❌ Сумма!'; return; }
    const fromTeam = CAPTAINS[fromTeamId];
    const toTeam = CAPTAINS[toTeamId];
    if (fromTeam.budget < amount) { statusEl.textContent = '❌ Мало средств!'; return; }
    fromTeam.budget -= amount;
    toTeam.budget += amount;
    const transfer = {
        playerId: 'transfer_money', playerName: `💰 Перевод ${amount}`, playerIcon: '💰',
        fromTeam: fromTeamId, toTeam: toTeamId, price: amount,
        time: new Date().toISOString(), comment
    };
    marketState.transfers.unshift(transfer);
    await saveMarketData(); updateBudgetDisplay(); renderTransfers();
    statusEl.textContent = '✅ Переведено!';
    setTimeout(() => document.getElementById('transfer-money-modal').classList.remove('active'), 1500);
}

function openMakeOffer() {
    if (!marketState.currentCaptain) { showMarketNotification('❌ Войдите!', 'error'); return; }
    document.getElementById('make-offer-modal').classList.add('active');
    const select = document.getElementById('offer-player-select');
    select.innerHTML = '';
    Object.keys(playersData).forEach(id => {
        if (isPlayerOnLoan(id)) return;
        const teamId = Object.keys(CAPTAINS).find(tid => CAPTAINS[tid].players.includes(id));
        if (teamId && teamId !== marketState.currentCaptain) {
            const player = playersData[id];
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${player.name} (${CAPTAINS[teamId].name})`;
            select.appendChild(opt);
        }
    });
    document.getElementById('offer-type').addEventListener('change', function() {
        const isLoan = this.value === 'loan';
        document.getElementById('offer-price-group').style.display = isLoan ? 'none' : 'block';
        document.getElementById('offer-loan-days-group').style.display = isLoan ? 'block' : 'none';
        document.getElementById('offer-loan-price-group').style.display = isLoan ? 'block' : 'none';
    });
    document.getElementById('offer-type').dispatchEvent(new Event('change'));
}

async function submitOffer() {
    const fromTeamId = marketState.currentCaptain;
    if (!fromTeamId) return;
    const playerId = document.getElementById('offer-player-select').value;
    const offerType = document.getElementById('offer-type').value;
    const price = parseInt(document.getElementById('offer-price').value);
    const loanDays = parseInt(document.getElementById('offer-loan-days').value);
    const loanPrice = parseInt(document.getElementById('offer-loan-price').value);
    const toTeamId = Object.keys(CAPTAINS).find(tid => CAPTAINS[tid].players.includes(playerId));
    if (!toTeamId) return;
    const player = playersData[playerId];
    const offer = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        fromTeam: fromTeamId, toTeam: toTeamId, playerId,
        playerName: player.name, playerIcon: player.icon || '⚽',
        type: offerType,
        price: offerType === 'transfer' ? price : loanPrice,
        loanDays: offerType === 'loan' ? loanDays : null,
        status: 'pending', time: new Date().toISOString()
    };
    marketState.offers = marketState.offers || [];
    marketState.offers.push(offer);
    await saveMarketData();
    showMarketNotification('✅ Отправлено!', 'success');
    updateOfferBadge();
    setTimeout(() => document.getElementById('make-offer-modal').classList.remove('active'), 1500);
}

function openViewOffers() {
    if (!marketState.currentCaptain) return;
    document.getElementById('view-offers-modal').classList.add('active');
    renderOffers();
}

function renderOffers() {
    const container = document.getElementById('offers-list-container');
    const captainId = marketState.currentCaptain;
    if (!captainId) return;
    const incomingOffers = (marketState.offers || []).filter(o => o.toTeam === captainId && o.status === 'pending');
    const outgoingOffers = (marketState.offers || []).filter(o => o.fromTeam === captainId);
    let html = '';
    if (incomingOffers.length === 0 && outgoingOffers.length === 0) html = '<p style="text-align:center;color:#666;padding:20px;">Нет предложений</p>';
    if (incomingOffers.length > 0) {
        html += `<h4 style="color:#28a745;margin-bottom:10px;">📥 Входящие</h4>`;
        incomingOffers.forEach(offer => {
            html += `<div class="offer-item">
                <div class="offer-header">
                    <span class="offer-from">от ${CAPTAINS[offer.fromTeam]?.name}</span>
                </div>
                <div class="offer-details">
                    <strong>${offer.playerIcon} ${offer.playerName}</strong> • ${offer.type === 'loan' ? 'Аренда' : 'Покупка'} • 💰${offer.price}
                </div>
                <div class="offer-actions">
                    <button class="accept-btn" onclick="respondToOffer('${offer.id}', 'accepted')">✅</button>
                    <button class="reject-btn" onclick="respondToOffer('${offer.id}', 'rejected')">❌</button>
                </div>
            </div>`;
        });
    }
    if (outgoingOffers.length > 0) {
        html += `<h4 style="color:#0066cc;margin-top:15px;margin-bottom:10px;">📤 Исходящие</h4>`;
        outgoingOffers.forEach(offer => {
            html += `<div class="offer-item" style="border-color: ${offer.status === 'accepted' ? '#28a745' : offer.status === 'rejected' ? '#dc3545' : '#ffc107'};">
                <div class="offer-details">
                    <strong>${offer.playerIcon} ${offer.playerName}</strong> • ${offer.status === 'accepted' ? '✅' : offer.status === 'rejected' ? '❌' : '⏳'}
                </div>
            </div>`;
        });
    }
    container.innerHTML = html;
}

async function respondToOffer(offerId, response) {
    const offer = (marketState.offers || []).find(o => o.id === offerId);
    if (!offer || offer.status !== 'pending') return;

    const renter = CAPTAINS[offer.fromTeam];
    const owner = CAPTAINS[offer.toTeam];

    if (!renter || !owner) {
        showMarketNotification('❌ Команда не найдена!', 'error');
        return;
    }

    if (response === 'accepted') {
        if (offer.type === 'transfer') {
            const price = offer.price || 0;
            if (renter.budget < price) {
                showMarketNotification('❌ У покупателя мало средств!', 'error');
                return;
            }
            renter.budget -= price;
            owner.budget += price;

            const ownerIdx = owner.players.indexOf(offer.playerId);
            if (ownerIdx !== -1) owner.players.splice(ownerIdx, 1);
            renter.players.push(offer.playerId);
            marketData.players[offer.playerId].team = offer.fromTeam;

            addTransfer(offer.playerId, offer.toTeam, offer.fromTeam, price);
            updateBudgetDisplay();
            renderMyTeam();
            updateMarketUI();
            showMarketNotification(`✅ ${offer.playerName} продан за ${price}💰`, 'success');

        } else if (offer.type === 'loan') {
            const days = offer.loanDays || 7;
            const price = offer.price || 0;

            if (renter.budget < price) {
                showMarketNotification('❌ У арендатора мало средств!', 'error');
                return;
            }
            renter.budget -= price;
            owner.budget += price;

            const endDate = new Date();
            endDate.setDate(endDate.getDate() + days);

            activeLoans[offer.playerId] = {
                fromTeam: offer.toTeam,
                toTeam: offer.fromTeam,
                endDate: endDate.toISOString(),
                startDate: new Date().toISOString(),
                days: days,
                paidPrice: price
            };

            const ownerIdx = owner.players.indexOf(offer.playerId);
            if (ownerIdx !== -1) owner.players.splice(ownerIdx, 1);
            if (!renter.players.includes(offer.playerId)) renter.players.push(offer.playerId);
            marketData.players[offer.playerId].team = offer.fromTeam;

            saveLoansData();
            showMarketNotification(`✅ ${offer.playerName} в аренде на ${days} дн. за ${price}💰`, 'success');
        }
        offer.status = 'accepted';
    } else {
        offer.status = 'rejected';
        showMarketNotification('❌ Отклонено', 'success');
    }

    await saveMarketData();
    updateOfferBadge();
    renderOffers();
}
function renderAdminPollsList() {
    const container = document.getElementById('admin-polls-list');
    if (!container) return;
    if (pollsData.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Нет опросов</p>';
        return;
    }
    let html = '';
    pollsData.forEach(poll => {
        const total = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
        html += `<div class="poll-item">
            <div class="poll-question">${poll.question}</div>
            <div style="font-size:.8rem;color:#666;margin-bottom:8px;">
                ${poll.no_change ? '🚫 Один голос' : '✅ Можно переголосовать'} • Всего: ${total}
            </div>`;
        if (pollVotersData[poll.id]) {
            html += `<div class="poll-voters-list"><b>👑 Проголосовали:</b>`;
            pollVotersData[poll.id].forEach(v => {
                const u = allUsersData.find(x => String(x.id) === String(v.user_id)) || localAccounts.find(x => String(x.id) === String(v.user_id));
                const n = u ? (u.name || u.username) : 'Пользователь';
                const t = poll.options[v.option_index]?.text || '?';
                html += `<div class="voter-row">👤 ${n} → <b>${t}</b></div>`;
            });
            html += `</div>`;
        }
        html += `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
            <button class="admin-btn" onclick="togglePollClosed('${poll.id}')">${poll.closed ? '🔓 Открыть' : '🔒 Закрыть'}</button>
            <button class="admin-btn" style="background:#dc2626;" onclick="deletePoll('${poll.id}')">🗑️ Удалить</button>
        </div>
    </div>`;
    });
    container.innerHTML = html;
}

function renderAdminComplaintsList() {
    const container = document.getElementById('admin-complaints-list');
    if (!container) return;
    if (complaintsData.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">📭 Нет жалоб</p>';
        return;
    }
    let html = '';
    complaintsData.forEach(complaint => {
        const date = new Date(complaint.created_at).toLocaleString('ru-RU');
        let verdictHtml = '';
        if (complaint.status === 'pending') verdictHtml = `<div class="complaint-verdict pending">⏳ Ожидает рассмотрения</div>`;
        else if (complaint.status === 'resolved') verdictHtml = `<div class="complaint-verdict resolved">✅ Вердикт: ${complaint.verdict || 'Нарушение подтверждено'}</div>`;
        else if (complaint.status === 'rejected') verdictHtml = `<div class="complaint-verdict rejected">❌ Вердикт: ${complaint.verdict || 'Нарушение не подтверждено'}</div>`;

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
                <span class="complaint-from">👤 ${complaint.from_user || 'Аноним'}</span>
                <span class="complaint-date">🕐 ${date}</span>
            </div>
            <div class="complaint-reason">📌 ${complaint.reason}</div>
            <div class="complaint-text">${complaint.text}</div>
            ${verdictHtml}
            ${adminControls}
        </div>`;
    });
    container.innerHTML = html;
}

window.adminResolveComplaint = async function(complaintId, status) {
    const complaint = complaintsData.find(c => c.id == complaintId);
    if (!complaint) return;
    const input = document.getElementById(`admin-verdict-input-${complaintId}`);
    const verdict = input ? input.value.trim() : '';
    complaint.status = status;
    complaint.verdict = verdict || (status === 'resolved' ? 'Нарушение подтверждено' : 'Нарушение не подтверждено');
    if (supabaseClient) {
        try {
            await supabaseClient.from('complaints').update({
                status: complaint.status,
                verdict: complaint.verdict
            }).eq('id', complaintId);
        } catch (e) {}
    }
    renderAdminComplaintsList();
    renderComplaints();
    showMarketNotification(status === 'resolved' ? '✅ Жалоба принята' : '❌ Жалоба отклонена', 'success');
};
