// firebase-init.js
// Скопируйте реальные значения firebaseConfig из Firebase Console → Project settings → Your apps → SDK setup and configuration
// Вы выбрали: projectId = "football-13f55" — оно уже подставлено ниже.

const firebaseConfig = {
  apiKey: "AIzaSyDT0c3cpwmv5jVLvv3dGe9JlnKXMhNnyjw",
  authDomain: "football-13f55.firebaseapp.com", // например "your-project.firebaseapp.com"
  projectId: "football-13f55",
  storageBucket: "football-13f55.firebasestorage.app",
  messagingSenderId: "655636296342",
  appId: "1:655636296342:web:0be6f1b4d4381b7571c8b7"
};

(function initFirebase() {
  try {
    if (!firebase || !firebase.initializeApp) {
      console.error('Firebase SDK not found. Make sure firebase-app-compat.js is loaded before firebase-init.js');
      return;
    }

    // Если конфиг не заполнен — предупредить
    if (firebaseConfig.apiKey === 'REPLACE_WITH_API_KEY') {
      console.warn('firebaseConfig содержит заглушки. Пожалуйста, вставьте реальные значения из Firebase Console. Пока инициализация будет выполняться с заглушками.');
    }

    // Инициализация
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (e) {
      // Если уже инициализирован — используем существующий экземпляр
      console.warn('Firebase уже инициализирован:', e && e.message);
    }

    const dbInstance = firebase.firestore();
    // Делаем доступным глобально для существующего кода (index.html использует переменную db)
    window.db = dbInstance;

    // Включаем offline persistence (опционально)
    if (dbInstance && dbInstance.enablePersistence) {
      dbInstance.enablePersistence()
        .catch(function(err) {
          if (err && err.code === 'failed-precondition') {
            console.warn('Persistence failed — возможно открыто несколько вкладок.');
          } else if (err && err.code === 'unimplemented') {
            console.warn('Persistence не поддерживается в этом браузере.');
          } else {
            console.warn('Ошибка при включении persistence:', err);
          }
        });
    }

    // Realtime listener для документа football/market
    let unsubscribeMarket = () => {};
    try {
      const marketRef = dbInstance.collection('football').doc('market');
      unsubscribeMarket = marketRef.onSnapshot(docSnap => {
        if (docSnap && docSnap.exists) {
          const data = docSnap.data();
          console.log('[firebase-init] Realtime market update', data);
          // Если в index.html есть функция для применения данных — вызываем
          if (typeof window.applyMarketData === 'function') {
            window.applyMarketData(data);
          } else {
            // Сохраняем в глобальную переменную, чтобы существующий код мог прочитать
            window.__firebase_market_data = data;
          }
        } else {
          console.log('[firebase-init] market doc не найден');
        }
      }, err => {
        console.error('[firebase-init] Ошибка realtime market listener:', err);
      });
    } catch (e) {
      console.warn('[firebase-init] Не удалось создать realtime listener для market:', e);
    }

    // Realtime listener для коллекции my_collection (limit 100)
    let unsubscribeCollection = () => {};
    try {
      const colQuery = dbInstance.collection('my_collection').limit(100);
      unsubscribeCollection = colQuery.onSnapshot(qSnap => {
        const items = [];
        qSnap.forEach(d => items.push({ id: d.id, ...d.data() }));
        console.log('[firebase-init] Realtime my_collection update —', items.length, 'items');
        if (typeof window.applyMyCollection === 'function') {
          window.applyMyCollection(items);
        } else {
          window.__firebase_my_collection = items;
        }
      }, err => {
        console.error('[firebase-init] Ошибка realtime my_collection listener:', err);
      });
    } catch (e) {
      console.warn('[firebase-init] Не удалось создать realtime listener для my_collection:', e);
    }

    // Отписка — можно вызвать из приложения
    window.unsubscribeFirestoreListeners = function() {
      try { unsubscribeMarket(); } catch (e) {}
      try { unsubscribeCollection(); } catch (e) {}
    };

    console.log('[firebase-init] Инициализация завершена. Проверьте в Firebase Console, что projectId совпадает и что база в Native mode.');
  } catch (err) {
    console.error('Ошибка инициализации firebase-init.js', err);
  }
})();
