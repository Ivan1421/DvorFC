// Автоматически сгенерировано ботом
// Последнее обновление: загружается с сайта

const playersData = {
    "mbappe": {
        "name": "Килиан Мбаппе",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 91,
        "position": "ЦФД",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚡",
        "number": "(9)"
    },
    "raya": {
        "name": "Давид Рая",
        "matches": 0,
        "saves": 0,
        "cleansheets": 0,
        "rating": 92,
        "position": "Вратарь",
        "age": "14 лет",
        "foot": "Правая",
        "height": "160 см",
        "weight": "45 кг",
        "icon": "🧤",
        "number": "(1)"
    },
    "kepa": {
        "name": "Кепа",
        "matchesAsCD": 0,
        "goals": 0,
        "assists": 0,
        "matchesAsGK": 0,
        "saves": 0,
        "cleansheets": 0,
        "rating": 88,
        "position": "Центральный защитник-Вратарь",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "🛡️🧤",
        "number": "(66)"
    },
    "maradona": {
        "name": "Марадона",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 85,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(11)"
    },
    "sanya": {
        "name": "Саня",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 88,
        "position": "Нападающий",
        "age": "14 лет",
        "foot": "Левая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(7)"
    },
    "messi": {
        "name": "Лионель Месси",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 85,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Левая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(10)"
    },
    "batrakov": {
        "name": "Батраков",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 84,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(3)"
    },
    "abibas": {
        "name": "Абибас",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 79,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(6)"
    },
    "beloszhneka": {
        "name": "Белоснежка",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 92,
        "position": "Защитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(5)"
    },
    "ramos": {
        "name": "Рамос",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 87,
        "position": "Защитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(4)"
    },
    "andryushka": {
        "name": "Андрюшка",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 78,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "⚽",
        "number": "(77)"
    },
    "hokkeist": {
        "name": "Хоккеист",
        "matches": 0,
        "goals": 0,
        "assists": 0,
        "rating": 82,
        "position": "Полузащитник",
        "age": "14 лет",
        "foot": "Правая",
        "height": "0 см",
        "weight": "0 кг",
        "icon": "🏒",
        "number": "(13)"
    }
};

// Функция для обновления статистики на странице
function updateStats() {
    console.log('🔄 Обновление статистики...');
    
    try {
        // Обновляем карточки игроков на странице "Состав двора"
        for (const playerId in playersData) {
            const player = playersData[playerId];
            const cards = document.querySelectorAll('[data-player="' + playerId + '"]');
            
            cards.forEach(card => {
                if (card) {
                    const stats = card.querySelectorAll('.stat-value');
                    if (stats.length >= 3) {
                        if (playerId === 'raya') {
                            // Для вратаря (Рая)
                            stats[0].textContent = player.matches || 0;
                            stats[1].textContent = player.cleansheets || 0;
                            stats[2].textContent = player.saves || 0;
                        } else if (playerId === 'kepa') {
                            // Для Кепы (комбинированная позиция)
                            const totalMatches = (player.matchesAsCD || 0) + (player.matchesAsGK || 0);
                            stats[0].textContent = totalMatches;
                            stats[1].textContent = player.goals || 0;
                            stats[2].textContent = player.assists || 0;
                        } else {
                            // Для полевых игроков
                            stats[0].textContent = player.matches || 0;
                            stats[1].textContent = player.goals || 0;
                            stats[2].textContent = player.assists || 0;
                        }
                    }
                }
            });
        }
        
        console.log('✅ Статистика обновлена!');
        
        // Показываем уведомление при обновлении
        showUpdateNotification();
        
    } catch (error) {
        console.error('❌ Ошибка обновления:', error);
    }
}

// Показать уведомление об обновлении
function showUpdateNotification() {
    // Проверяем, не показывали ли уже уведомление
    if (sessionStorage.getItem('notificationShown')) {
        return;
    }
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: Arial, sans-serif;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">🔄</span>
            <div>
                <strong>Статистика загружена!</strong><br>
                <small>Данные актуальны</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Запоминаем, что уведомление показано
    sessionStorage.setItem('notificationShown', 'true');
    
    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Добавляем CSS анимации
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Автоматическое обновление каждые 30 секунд
function startAutoUpdate() {
    updateStats();
    setInterval(updateStats, 30000); // 30 секунд
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAutoUpdate);
} else {
    startAutoUpdate();
}