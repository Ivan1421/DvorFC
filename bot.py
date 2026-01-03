#!/usr/bin/env python3
"""
🤖 Бот для Футбольного Двора "МЕРА"
Упрощенная версия для GitHub Actions
"""

import os
import json
import logging
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# ========== ЗАГРУЗКА СЕКРЕТОВ ==========
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
ADMIN_ID = os.environ.get("ADMIN_ID")

if not TELEGRAM_TOKEN:
    print("❌ TELEGRAM_TOKEN не найден")
    exit(1)

if not ADMIN_ID:
    print("❌ ADMIN_ID не найден")
    exit(1)

ADMIN_ID = int(ADMIN_ID)
print(f"✅ Секреты загружены. Админ: {ADMIN_ID}")

# ========== НАСТРОЙКИ ==========
DATA_FILE = "players_data.json"
STATS_JS_FILE = "stats.js"
logging.basicConfig(level=logging.INFO)

# ========== ДАННЫЕ ==========
def load_data():
    """Загружает данные из файла или создает новые"""
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"❌ Ошибка загрузки: {e}")
    
    # Создаем новые данные
    return get_default_data()

def get_default_data():
    """Возвращает данные по умолчанию"""
    return {
        "last_updated": datetime.now().isoformat(),
        "players": {
            "mbappe": {"matches": 0, "goals": 0, "assists": 0, "rating": 91},
            "raya": {"matches": 0, "saves": 0, "cleansheets": 0, "rating": 92},
            "kepa": {"matchesAsCD": 0, "goals": 0, "assists": 0, "matchesAsGK": 0, "saves": 0, "cleansheets": 0, "rating": 88},
            "maradona": {"matches": 0, "goals": 0, "assists": 0, "rating": 85},
            "sanya": {"matches": 0, "goals": 0, "assists": 0, "rating": 88},
            "messi": {"matches": 0, "goals": 0, "assists": 0, "rating": 85},
            "batrakov": {"matches": 0, "goals": 0, "assists": 0, "rating": 84},
            "abibas": {"matches": 0, "goals": 0, "assists": 0, "rating": 79},
            "beloszhneka": {"matches": 0, "goals": 0, "assists": 0, "rating": 92},
            "ramos": {"matches": 0, "goals": 0, "assists": 0, "rating": 87},
            "andryushka": {"matches": 0, "goals": 0, "assists": 0, "rating": 78},
            "hokkeist": {"matches": 0, "goals": 0, "assists": 0, "rating": 82}
        }
    }

def save_data(data):
    """Сохраняет данные в файл"""
    data['last_updated'] = datetime.now().isoformat()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return data

def create_stats_js(data):
    """Создает stats.js файл для сайта"""
    # Полные данные игроков
    full_data = {
        "mbappe": {
            "name": "Килиан Мбаппе", "matches": data['players']['mbappe']['matches'],
            "goals": data['players']['mbappe']['goals'], "assists": data['players']['mbappe']['assists'],
            "rating": data['players']['mbappe']['rating'], "position": "ЦФД", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚡", "number": "(9)"
        },
        "raya": {
            "name": "Давид Рая", "matches": data['players']['raya']['matches'],
            "saves": data['players']['raya']['saves'], "cleansheets": data['players']['raya']['cleansheets'],
            "rating": data['players']['raya']['rating'], "position": "Вратарь", "age": "14 лет",
            "foot": "Правая", "height": "160 см", "weight": "45 кг", "icon": "🧤", "number": "(1)"
        },
        "kepa": {
            "name": "Кепа", "matchesAsCD": data['players']['kepa']['matchesAsCD'],
            "goals": data['players']['kepa']['goals'], "assists": data['players']['kepa']['assists'],
            "matchesAsGK": data['players']['kepa']['matchesAsGK'], "saves": data['players']['kepa']['saves'],
            "cleansheets": data['players']['kepa']['cleansheets'], "rating": data['players']['kepa']['rating'],
            "position": "Центральный защитник-Вратарь", "age": "14 лет", "foot": "Правая",
            "height": "0 см", "weight": "0 кг", "icon": "🛡️🧤", "number": "(66)"
        },
        "maradona": {
            "name": "Марадона", "matches": data['players']['maradona']['matches'],
            "goals": data['players']['maradona']['goals'], "assists": data['players']['maradona']['assists'],
            "rating": data['players']['maradona']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(11)"
        },
        "sanya": {
            "name": "Саня", "matches": data['players']['sanya']['matches'],
            "goals": data['players']['sanya']['goals'], "assists": data['players']['sanya']['assists'],
            "rating": data['players']['sanya']['rating'], "position": "Нападающий", "age": "14 лет",
            "foot": "Левая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(7)"
        },
        "messi": {
            "name": "Лионель Месси", "matches": data['players']['messi']['matches'],
            "goals": data['players']['messi']['goals'], "assists": data['players']['messi']['assists'],
            "rating": data['players']['messi']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Левая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(10)"
        },
        "batrakov": {
            "name": "Батраков", "matches": data['players']['batrakov']['matches'],
            "goals": data['players']['batrakov']['goals'], "assists": data['players']['batrakov']['assists'],
            "rating": data['players']['batrakov']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(3)"
        },
        "abibas": {
            "name": "Абибас", "matches": data['players']['abibas']['matches'],
            "goals": data['players']['abibas']['goals'], "assists": data['players']['abibas']['assists'],
            "rating": data['players']['abibas']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(6)"
        },
        "beloszhneka": {
            "name": "Белоснежка", "matches": data['players']['beloszhneka']['matches'],
            "goals": data['players']['beloszhneka']['goals'], "assists": data['players']['beloszhneka']['assists'],
            "rating": data['players']['beloszhneka']['rating'], "position": "Защитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(5)"
        },
        "ramos": {
            "name": "Рамос", "matches": data['players']['ramos']['matches'],
            "goals": data['players']['ramos']['goals'], "assists": data['players']['ramos']['assists'],
            "rating": data['players']['ramos']['rating'], "position": "Защитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(4)"
        },
        "andryushka": {
            "name": "Андрюшка", "matches": data['players']['andryushka']['matches'],
            "goals": data['players']['andryushka']['goals'], "assists": data['players']['andryushka']['assists'],
            "rating": data['players']['andryushka']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "⚽", "number": "(77)"
        },
        "hokkeist": {
            "name": "Хоккеист", "matches": data['players']['hokkeist']['matches'],
            "goals": data['players']['hokkeist']['goals'], "assists": data['players']['hokkeist']['assists'],
            "rating": data['players']['hokkeist']['rating'], "position": "Полузащитник", "age": "14 лет",
            "foot": "Правая", "height": "0 см", "weight": "0 кг", "icon": "🏒", "number": "(13)"
        }
    }
    
    js_content = f"""// Автоматически сгенерировано ботом
// Последнее обновление: {datetime.now().strftime('%d.%m.%Y %H:%M')}

const playersData = {json.dumps(full_data, ensure_ascii=False, indent=2)};

// Функция для обновления статистики на странице
function updateStats() {{
    console.log('🔄 Обновление статистики...');
    
    try {{
        // Обновляем карточки игроков
        for (const playerId in playersData) {{
            const player = playersData[playerId];
            const cards = document.querySelectorAll('[data-player="' + playerId + '"]');
            
            cards.forEach(card => {{
                if (card) {{
                    const stats = card.querySelectorAll('.stat-value');
                    if (stats.length >= 3) {{
                        if (playerId === 'raya') {{
                            // Для вратаря (Рая)
                            stats[0].textContent = player.matches || 0;
                            stats[1].textContent = player.cleansheets || 0;
                            stats[2].textContent = player.saves || 0;
                        }} else if (playerId === 'kepa') {{
                            // Для Кепы (комбинированная позиция)
                            const totalMatches = (player.matchesAsCD || 0) + (player.matchesAsGK || 0);
                            stats[0].textContent = totalMatches;
                            stats[1].textContent = player.goals || 0;
                            stats[2].textContent = player.assists || 0;
                        }} else {{
                            // Для полевых игроков
                            stats[0].textContent = player.matches || 0;
                            stats[1].textContent = player.goals || 0;
                            stats[2].textContent = player.assists || 0;
                        }}
                    }}
                }}
            }});
        }}
        
        console.log('✅ Статистика обновлена!');
        
        // Показываем уведомление
        showUpdateNotification();
        
    }} catch (error) {{
        console.error('❌ Ошибка обновления:', error);
    }}
}}

// Показать уведомление об обновлении
function showUpdateNotification() {{
    if (sessionStorage.getItem('notificationShown')) {{
        return;
    }}
    
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
                <strong>Статистика обновлена!</strong><br>
                <small>{datetime.now().strftime('%d.%m.%Y %H:%M')}</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    sessionStorage.setItem('notificationShown', 'true');
    
    setTimeout(() => {{
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }}, 5000);
    
    if (!document.querySelector('#notification-styles')) {{
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {{
                from {{ transform: translateX(100%); opacity: 0; }}
                to {{ transform: translateX(0); opacity: 1; }}
            }}
            @keyframes slideOut {{
                from {{ transform: translateX(0); opacity: 1; }}
                to {{ transform: translateX(100%); opacity: 0; }}
            }}
        `;
        document.head.appendChild(style);
    }}
}}

// Автоматическое обновление каждые 30 секунд
function startAutoUpdate() {{
    updateStats();
    setInterval(updateStats, 30000);
}}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', startAutoUpdate);
}} else {{
    startAutoUpdate();
}}
"""
    
    with open(STATS_JS_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    return js_content

# ========== КОМАНДЫ БОТА ==========
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("🚫 Нет доступа")
        return
    
    keyboard = [
        [InlineKeyboardButton("✏️ Редактировать", callback_data='edit_menu')],
        [InlineKeyboardButton("📊 Статистика", callback_data='stats')],
        [InlineKeyboardButton("🔄 Обновить сайт", callback_data='update_site')]
    ]
    
    await update.message.reply_text(
        "👑 Админ-панель\nВыберите действие:",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def edit_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Редактирование статистики игрока"""
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("🚫 Нет доступа")
        return
    
    if len(context.args) != 3:
        await update.message.reply_text(
            "❌ Неправильный формат\n\n"
            "📝 Формат: `/edit игрок поле значение`\n\n"
            "🎮 Игроки:\n"
            "• mbappe - Килиан Мбаппе\n"
            "• raya - Давид Рая\n"
            "• kepa - Кепа\n"
            "• maradona - Марадона\n"
            "• sanya - Саня\n"
            "• messi - Лионель Месси\n"
            "• batrakov - Батраков\n"
            "• abibas - Абибас\n"
            "• beloszhneka - Белоснежка\n"
            "• ramos - Рамос\n"
            "• andryushka - Андрюшка\n"
            "• hokkeist - Хоккеист\n\n"
            "📊 Примеры:\n"
            "`/edit mbappe goals 5`\n"
            "`/edit raya saves 12`\n"
            "`/edit kepa matchesAsCD 3`",
            parse_mode='Markdown'
        )
        return
    
    player_id = context.args[0].lower()
    field = context.args[1].lower()
    value_str = context.args[2]
    
    data = load_data()
    
    if player_id not in data['players']:
        await update.message.reply_text(f"❌ Игрок '{player_id}' не найден")
        return
    
    try:
        value = int(value_str)
    except ValueError:
        await update.message.reply_text(f"❌ Значение должно быть числом")
        return
    
    # Обновляем значение
    data['players'][player_id][field] = value
    save_data(data)
    
    # Обновляем сайт
    create_stats_js(data)
    
    # Получаем имя игрока
    player_names = {
        'mbappe': 'Килиан Мбаппе', 'raya': 'Давид Рая', 'kepa': 'Кепа',
        'maradona': 'Марадона', 'sanya': 'Саня', 'messi': 'Лионель Месси',
        'batrakov': 'Батраков', 'abibas': 'Абибас', 'beloszhneka': 'Белоснежка',
        'ramos': 'Рамос', 'andryushka': 'Андрюшка', 'hokkeist': 'Хоккеист'
    }
    
    await update.message.reply_text(
        f"✅ Обновлено!\n"
        f"👤 {player_names.get(player_id, player_id)}\n"
        f"📊 {field}: {value}\n"
        f"📅 {datetime.now().strftime('%d.%m.%Y %H:%M')}\n\n"
        f"🔄 stats.js обновлен!"
    )

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик inline-кнопок"""
    query = update.callback_query
    await query.answer()
    
    if query.data == 'edit_menu':
        await query.edit_message_text(
            "✏️ Используйте команду:\n"
            "`/edit [игрок] [поле] [значение]`\n\n"
            "Примеры:\n"
            "`/edit mbappe goals 5`\n"
            "`/edit raya saves 30`\n"
            "`/edit kepa matchesAsCD 3`\n\n"
            "📊 Поля:\n"
            "• matches - Матчи\n"
            "• goals - Голы\n"
            "• assists - Ассисты\n"
            "• saves - Сейвы (вратарь)\n"
            "• cleansheets - Сухие матчи (вратарь)\n"
            "• matchesAsCD - Матчи как защитника (Кепа)\n"
            "• matchesAsGK - Матчи как вратаря (Кепа)",
            parse_mode='Markdown'
        )
    
    elif query.data == 'stats':
        data = load_data()
        message = "📊 Текущая статистика:\n\n"
        
        player_names = {
            'mbappe': '⚡ Мбаппе', 'raya': '🧤 Рая', 'kepa': '🛡️ Кепа',
            'maradona': '⚽ Марадона', 'sanya': '⚽ Саня', 'messi': '⭐ Месси',
            'batrakov': '⚽ Батраков', 'abibas': '⚽ Абибас', 'beloszhneka': '⚽ Белоснежка',
            'ramos': '⚽ Рамос', 'andryushka': '⚽ Андрюшка', 'hokkeist': '🏒 Хоккеист'
        }
        
        for player_id, player in data['players'].items():
            message += f"{player_names.get(player_id, player_id)}:\n"
            if 'saves' in player:
                message += f"  🧤 Матчи: {player.get('matches', 0)}\n"
                message += f"  🛡️ Сейвы: {player.get('saves', 0)}\n"
                message += f"  ✅ Сухие: {player.get('cleansheets', 0)}\n"
            elif 'matchesAsCD' in player:
                message += f"  🛡️ Матчи(защ): {player.get('matchesAsCD', 0)}\n"
                message += f"  ⚽ Голы: {player.get('goals', 0)}\n"
                message += f"  🎯 Ассисты: {player.get('assists', 0)}\n"
                message += f"  🧤 Матчи(вр): {player.get('matchesAsGK', 0)}\n"
                message += f"  🛡️ Сейвы: {player.get('saves', 0)}\n"
                message += f"  ✅ Сухие: {player.get('cleansheets', 0)}\n"
            else:
                message += f"  ⚽ Матчи: {player.get('matches', 0)}\n"
                message += f"  🎯 Голы: {player.get('goals', 0)}\n"
                message += f"  🎯 Ассисты: {player.get('assists', 0)}\n"
            message += f"  ⭐ Рейтинг: {player.get('rating', 0)}\n\n"
        
        message += f"\n📅 Обновлено: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
        
        await query.edit_message_text(message)
    
    elif query.data == 'update_site':
        data = load_data()
        create_stats_js(data)
        
        await query.edit_message_text(
            "✅ Сайт обновлен!\n\n"
            f"📅 Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}\n"
            "🔄 Файл stats.js перезаписан\n"
            "🌐 Обновите страницу сайта"
        )

def main():
    print("🚀 Запуск упрощенного бота...")
    
    # Инициализация данных
    data = load_data()
    print(f"✅ Данные загружены. Игроков: {len(data['players'])}")
    
    # Создаем stats.js
    create_stats_js(data)
    print("✅ stats.js создан/обновлен")
    
    # Запускаем бота
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Обработчики команд
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("edit", edit_command))
    app.add_handler(CallbackQueryHandler(button_handler))
    
    print("✅ Бот запущен и готов к работе!")
    print("📱 Напишите /start в Telegram для начала работы")
    
    app.run_polling()

if __name__ == '__main__':
    main()