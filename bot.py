#!/usr/bin/env python3
"""
🤖 Бот для Футбольного Двора "МЕРА"
Запуск через GitHub Actions
"""

import os
import json
import logging
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes, MessageHandler, filters
import subprocess

# ========== ЗАГРУЗКА СЕКРЕТОВ ==========
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
ADMIN_ID = os.environ.get("ADMIN_ID")

if not TELEGRAM_TOKEN:
    print("❌ TELEGRAM_TOKEN не найден в GitHub Secrets")
    print("📋 Добавьте в Secrets: TELEGRAM_TOKEN = ваш_токен")
    exit(1)

if not ADMIN_ID:
    print("❌ ADMIN_ID не найден в GitHub Secrets")
    print("📋 Добавьте в Secrets: ADMIN_ID = ваш_id")
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
                data = json.load(f)
                # Добавляем недостающие поля
                default_data = get_default_data()
                for player_id, player in default_data['players'].items():
                    if player_id in data['players']:
                        for key in player.keys():
                            if key not in data['players'][player_id]:
                                data['players'][player_id][key] = player[key]
                return data
    except Exception as e:
        print(f"❌ Ошибка загрузки: {e}")
    
    # Создаем новые данные
    return get_default_data()

def get_default_data():
    """Возвращает данные по умолчанию"""
    return {
        "last_updated": datetime.now().isoformat(),
        "players": {
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
    js_content = f"""// Автоматически сгенерировано ботом
// Последнее обновление: {datetime.now().strftime('%d.%m.%Y %H:%M')}

const playersData = {json.dumps(data['players'], ensure_ascii=False, indent=2)};

// Функция для обновления статистики на странице
function updateStats() {{
    console.log('🔄 Обновление статистики...');
    
    try {{
        // Обновляем карточки игроков на странице "Состав двора"
        for (const playerId in playersData) {{
            const player = playersData[playerId];
            const cards = document.querySelectorAll('[data-player="' + playerId + '"]');
            
            cards.forEach(card => {{
                if (card) {{
                    const stats = card.querySelectorAll('.stat-value');
                    if (stats.length >= 3) {{
                        if ('saves' in player) {{
                            // Для вратаря (Рая)
                            stats[0].textContent = player.matches || 0;
                            stats[1].textContent = player.cleansheets || 0;
                            stats[2].textContent = player.saves || 0;
                        }} else if ('matchesAsCD' in player) {{
                            // Для Кепы (комбинированная позиция)
                            stats[0].textContent = (player.matchesAsCD || 0) + (player.matchesAsGK || 0);
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
        
        // Показываем уведомление при первом обновлении
        if (!localStorage.getItem('statsUpdated')) {{
            showUpdateNotification();
            localStorage.setItem('statsUpdated', 'true');
        }}
    }} catch (error) {{
        console.error('❌ Ошибка обновления:', error);
    }}
}}

// Показать уведомление об обновлении
function showUpdateNotification() {{
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
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">🔄</span>
            <div>
                <strong>Статистика обновлена!</strong><br>
                <small>Данные актуальны на ${datetime.now().strftime('%d.%m.%Y %H:%M')}</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Автоматически скрыть через 5 секунд
    setTimeout(() => {{
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }}, 5000);
    
    // Добавляем CSS анимации
    const style = document.createElement('style');
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

// Автоматическое обновление каждые 5 минут
function startAutoUpdate() {{
    updateStats();
    setInterval(updateStats, 5 * 60 * 1000); // 5 минут
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

def git_commit_and_push():
    """Выполняет коммит и пуш в GitHub"""
    try:
        subprocess.run(["git", "config", "--global", "user.email", "bot@github.com"], check=True)
        subprocess.run(["git", "config", "--global", "user.name", "GitHub Bot"], check=True)
        subprocess.run(["git", "add", DATA_FILE, STATS_JS_FILE], check=True)
        subprocess.run(["git", "commit", "-m", f"🤖 Автоматическое обновление данных от {datetime.now().strftime('%d.%m.%Y %H:%M')}"], check=True)
        subprocess.run(["git", "push"], check=True)
        return True
    except Exception as e:
        print(f"❌ Ошибка Git: {e}")
        return False

# ========== КОМАНДЫ БОТА ==========
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("🚫 Нет доступа")
        return
    
    keyboard = [
        [InlineKeyboardButton("✏️ Редактировать статистику", callback_data='edit_menu')],
        [InlineKeyboardButton("📊 Просмотреть статистику", callback_data='view_stats')],
        [InlineKeyboardButton("🔄 Обновить сайт", callback_data='update_site')],
        [InlineKeyboardButton("📝 Быстрое добавление", callback_data='quick_add')]
    ]
    
    await update.message.reply_text(
        "👑 Админ-панель Футбольного Двора 'МЕРА'\n"
        "Выберите действие:",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def edit_player(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Редактирование статистики игрока"""
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("🚫 Нет доступа")
        return
    
    if len(context.args) < 3:
        await update.message.reply_text(
            "❌ Неправильный формат команды\n\n"
            "📝 Формат: `/edit [игрок] [поле] [значение]`\n\n"
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
            "📊 Поля для полевых игроков:\n"
            "• matches - Матчи\n"
            "• goals - Голы\n"
            "• assists - Ассисты\n"
            "• rating - Рейтинг\n\n"
            "🧤 Поля для вратаря:\n"
            "• matches - Матчи\n"
            "• saves - Сейвы\n"
            "• cleansheets - Сухие матчи\n"
            "• rating - Рейтинг\n\n"
            "🛡️ Поля для Кепы:\n"
            "• matchesAsCD - Матчи как защитника\n"
            "• goals - Голы\n"
            "• assists - Ассисты\n"
            "• matchesAsGK - Матчи как вратаря\n"
            "• saves - Сейвы\n"
            "• cleansheets - Сухие матчи\n\n"
            "📋 Примеры:\n"
            "`/edit mbappe goals 5`\n"
            "`/edit raya saves 12`\n"
            "`/edit kepa matchesAsCD 3`\n"
            "`/edit maradona rating 87`",
            parse_mode='Markdown'
        )
        return
    
    player_id = context.args[0].lower()
    field = context.args[1].lower()
    value_str = ' '.join(context.args[2:])
    
    data = load_data()
    
    if player_id not in data['players']:
        await update.message.reply_text(f"❌ Игрок '{player_id}' не найден")
        return
    
    # Проверяем существование поля
    player = data['players'][player_id]
    
    # Определяем тип значения
    try:
        # Для числовых полей
        if field in ['matches', 'goals', 'assists', 'saves', 'cleansheets', 'rating', 
                     'matchesAsCD', 'matchesAsGK', 'height', 'weight']:
            value = int(value_str)
        else:
            # Для строковых полей
            value = value_str
    except ValueError:
        await update.message.reply_text(f"❌ Неверное значение для поля '{field}'. Должно быть число.")
        return
    
    # Обновляем значение
    data['players'][player_id][field] = value
    save_data(data)
    
    # Обновляем сайт
    create_stats_js(data)
    git_success = git_commit_and_push()
    
    # Формируем ответ
    response = f"""
✅ Статистика обновлена!

👤 Игрок: {player['name']}
📝 Поле: {field}
🎯 Значение: {value}

📅 Обновлено: {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
    
    if git_success:
        response += "\n🔄 Сайт автоматически обновлен!"
    else:
        response += "\n⚠️ Сайт обновлен локально. Нужно запушить вручную."
    
    await update.message.reply_text(response)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик inline-кнопок"""
    query = update.callback_query
    await query.answer()
    
    if query.data == 'edit_menu':
        keyboard = [
            [
                InlineKeyboardButton("⚽ Мбаппе", callback_data='edit_mbappe'),
                InlineKeyboardButton("🧤 Рая", callback_data='edit_raya')
            ],
            [
                InlineKeyboardButton("🛡️ Кепа", callback_data='edit_kepa'),
                InlineKeyboardButton("⭐ Марадона", callback_data='edit_maradona')
            ],
            [
                InlineKeyboardButton("⚽ Саня", callback_data='edit_sanya'),
                InlineKeyboardButton("⭐ Месси", callback_data='edit_messi')
            ],
            [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
        ]
        
        await query.edit_message_text(
            "✏️ Выберите игрока для редактирования:",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    elif query.data.startswith('edit_'):
        player_id = query.data.replace('edit_', '')
        data = load_data()
        
        if player_id in data['players']:
            player = data['players'][player_id]
            
            # Создаем кнопки для редактирования полей
            keyboard = []
            
            if player_id == 'raya':
                # Для вратаря
                keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'set_{player_id}_matches')])
                keyboard.append([InlineKeyboardButton(f"Сейвы: {player.get('saves', 0)}", callback_data=f'set_{player_id}_saves')])
                keyboard.append([InlineKeyboardButton(f"Сухие: {player.get('cleansheets', 0)}", callback_data=f'set_{player_id}_cleansheets')])
                keyboard.append([InlineKeyboardButton(f"Рейтинг: {player.get('rating', 0)}", callback_data=f'set_{player_id}_rating')])
            elif player_id == 'kepa':
                # Для Кепы
                keyboard.append([InlineKeyboardButton(f"Матчи(защ): {player.get('matchesAsCD', 0)}", callback_data=f'set_{player_id}_matchesAsCD')])
                keyboard.append([InlineKeyboardButton(f"Голы: {player.get('goals', 0)}", callback_data=f'set_{player_id}_goals')])
                keyboard.append([InlineKeyboardButton(f"Ассисты: {player.get('assists', 0)}", callback_data=f'set_{player_id}_assists')])
                keyboard.append([InlineKeyboardButton(f"Матчи(вр): {player.get('matchesAsGK', 0)}", callback_data=f'set_{player_id}_matchesAsGK')])
                keyboard.append([InlineKeyboardButton(f"Сейвы: {player.get('saves', 0)}", callback_data=f'set_{player_id}_saves')])
                keyboard.append([InlineKeyboardButton(f"Сухие: {player.get('cleansheets', 0)}", callback_data=f'set_{player_id}_cleansheets')])
                keyboard.append([InlineKeyboardButton(f"Рейтинг: {player.get('rating', 0)}", callback_data=f'set_{player_id}_rating')])
            else:
                # Для полевых игроков
                keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'set_{player_id}_matches')])
                keyboard.append([InlineKeyboardButton(f"Голы: {player.get('goals', 0)}", callback_data=f'set_{player_id}_goals')])
                keyboard.append([InlineKeyboardButton(f"Ассисты: {player.get('assists', 0)}", callback_data=f'set_{player_id}_assists')])
                keyboard.append([InlineKeyboardButton(f"Рейтинг: {player.get('rating', 0)}", callback_data=f'set_{player_id}_rating')])
            
            keyboard.append([InlineKeyboardButton("🔙 Назад", callback_data='edit_menu')])
            
            await query.edit_message_text(
                f"✏️ Редактирование: {player['name']}\n"
                f"📊 Текущая статистика:",
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
    
    elif query.data.startswith('set_'):
        # Разбираем callback_data: set_playerid_field
        parts = query.data.split('_')
        if len(parts) >= 3:
            player_id = parts[1]
            field = parts[2]
            
            # Сохраняем данные для ввода
            context.user_data['editing'] = {'player': player_id, 'field': field}
            
            await query.edit_message_text(
                f"✏️ Введите новое значение для {field}:\n"
                f"📝 Формат: просто число (например: 5)\n\n"
                f"Или отправьте 'отмена' для отмены."
            )
    
    elif query.data == 'view_stats':
        data = load_data()
        message = "📊 Текущая статистика игроков:\n\n"
        
        for player_id, player in data['players'].items():
            message += f"👤 {player['name']}\n"
            
            if 'saves' in player and player_id == 'raya':
                message += f"   🧤 Матчи: {player.get('matches', 0)}\n"
                message += f"   🛡️ Сейвы: {player.get('saves', 0)}\n"
                message += f"   ✅ Сухие: {player.get('cleansheets', 0)}\n"
            elif 'matchesAsCD' in player:
                message += f"   🛡️ Матчи(защ): {player.get('matchesAsCD', 0)}\n"
                message += f"   ⚽ Голы: {player.get('goals', 0)}\n"
                message += f"   🎯 Ассисты: {player.get('assists', 0)}\n"
                message += f"   🧤 Матчи(вр): {player.get('matchesAsGK', 0)}\n"
                message += f"   🛡️ Сейвы: {player.get('saves', 0)}\n"
                message += f"   ✅ Сухие: {player.get('cleansheets', 0)}\n"
            else:
                message += f"   ⚽ Матчи: {player.get('matches', 0)}\n"
                message += f"   🎯 Голы: {player.get('goals', 0)}\n"
                message += f"   🎯 Ассисты: {player.get('assists', 0)}\n"
            
            message += f"   ⭐ Рейтинг: {player.get('rating', 0)}\n\n"
        
        message += f"\n📅 Последнее обновление: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
        
        await query.edit_message_text(message)
    
    elif query.data == 'update_site':
        data = load_data()
        create_stats_js(data)
        git_success = git_commit_and_push()
        
        if git_success:
            await query.edit_message_text(
                "✅ Сайт успешно обновлен!\n\n"
                f"📅 Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}\n"
                "🔄 Данные автоматически загружены на GitHub\n"
                "🌐 Сайт обновится в течение 1-2 минут"
            )
        else:
            await query.edit_message_text(
                "⚠️ Данные обновлены локально, но произошла ошибка Git.\n"
                "Нужно запушить изменения вручную."
            )
    
    elif query.data == 'quick_add':
        keyboard = [
            [InlineKeyboardButton("⚽ Добавить гол Мбаппе", callback_data='add_mbappe_goal')],
            [InlineKeyboardButton("🧤 Добавить сейв Рая", callback_data='add_raya_save')],
            [InlineKeyboardButton("🛡️ Добавить матч Кепа", callback_data='add_kepa_match')],
            [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
        ]
        
        await query.edit_message_text(
            "⚡ Быстрое добавление статистики:\n"
            "Выберите действие:",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    elif query.data == 'add_mbappe_goal':
        data = load_data()
        data['players']['mbappe']['goals'] = data['players']['mbappe'].get('goals', 0) + 1
        data['players']['mbappe']['matches'] = data['players']['mbappe'].get('matches', 0) + 1
        save_data(data)
        create_stats_js(data)
        git_commit_and_push()
        
        await query.edit_message_text(
            "✅ Добавлен гол Мбаппе!\n"
            f"🎯 Всего голов: {data['players']['mbappe']['goals']}\n"
            f"⚽ Всего матчей: {data['players']['mbappe']['matches']}\n\n"
            "🔄 Сайт обновлен автоматически!"
        )
    
    elif query.data == 'add_raya_save':
        data = load_data()
        data['players']['raya']['saves'] = data['players']['raya'].get('saves', 0) + 1
        data['players']['raya']['matches'] = data['players']['raya'].get('matches', 0) + 1
        save_data(data)
        create_stats_js(data)
        git_commit_and_push()
        
        await query.edit_message_text(
            "✅ Добавлен сейв Рая!\n"
            f"🛡️ Всего сейвов: {data['players']['raya']['saves']}\n"
            f"🧤 Всего матчей: {data['players']['raya']['matches']}\n\n"
            "🔄 Сайт обновлен автоматически!"
        )
    
    elif query.data == 'add_kepa_match':
        data = load_data()
        data['players']['kepa']['matchesAsCD'] = data['players']['kepa'].get('matchesAsCD', 0) + 1
        save_data(data)
        create_stats_js(data)
        git_commit_and_push()
        
        await query.edit_message_text(
            "✅ Добавлен матч Кепа как защитника!\n"
            f"🛡️ Всего матчей (защ): {data['players']['kepa']['matchesAsCD']}\n\n"
            "🔄 Сайт обновлен автоматически!"
        )
    
    elif query.data == 'back_to_main':
        keyboard = [
            [InlineKeyboardButton("✏️ Редактировать статистику", callback_data='edit_menu')],
            [InlineKeyboardButton("📊 Просмотреть статистику", callback_data='view_stats')],
            [InlineKeyboardButton("🔄 Обновить сайт", callback_data='update_site')],
            [InlineKeyboardButton("📝 Быстрое добавление", callback_data='quick_add')]
        ]
        
        await query.edit_message_text(
            "👑 Админ-панель Футбольного Двора 'МЕРА'\n"
            "Выберите действие:",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик текстовых сообщений для ввода значений"""
    if update.effective_user.id != ADMIN_ID:
        return
    
    message_text = update.message.text.strip()
    
    # Проверяем, находимся ли мы в режиме редактирования
    if 'editing' in context.user_data:
        editing_data = context.user_data['editing']
        player_id = editing_data['player']
        field = editing_data['field']
        
        if message_text.lower() == 'отмена':
            await update.message.reply_text("❌ Редактирование отменено.")
            del context.user_data['editing']
            return
        
        try:
            value = int(message_text)
            data = load_data()
            
            if player_id in data['players']:
                data['players'][player_id][field] = value
                save_data(data)
                create_stats_js(data)
                git_success = git_commit_and_push()
                
                response = f"""
✅ Обновлено!

👤 {data['players'][player_id]['name']}
📝 {field}: {value}

📅 {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
                if git_success:
                    response += "\n🔄 Сайт автоматически обновлен!"
                
                await update.message.reply_text(response)
            else:
                await update.message.reply_text("❌ Ошибка: игрок не найден")
            
            del context.user_data['editing']
            
        except ValueError:
            await update.message.reply_text("❌ Введите число или 'отмена' для отмены")
        return
    
    # Если сообщение начинается с числа и мы не в режиме редактирования
    try:
        if message_text.isdigit() and len(message_text) < 4:
            await update.message.reply_text(
                "Введите команду или выберите действие в меню.\n"
                "Нажмите /start для открытия меню."
            )
    except:
        pass

def main():
    print("🚀 Запуск бота для Футбольного Двора 'МЕРА'...")
    
    # Инициализация данных
    data = load_data()
    print(f"✅ Данные загружены. Игроков: {len(data['players'])}")
    
    # Создаем stats.js
    create_stats_js(data)
    print("✅ stats.js создан")
    
    # Запускаем бота
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Обработчики команд
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("edit", edit_player))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    print("✅ Бот запущен и готов к работе!")
    print(f"👑 Админ ID: {ADMIN_ID}")
    print("📱 Напишите /start в Telegram для начала работы")
    
    app.run_polling()

if __name__ == '__main__':
    main()