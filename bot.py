import os
import json
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes
from datetime import datetime

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# ID администраторов (замените на свои Telegram ID)
ADMIN_IDS = [123456789, 987654321]  # Ваши ID через запятую

# Путь к файлу с данными
DATA_FILE = 'players_data.json'

# Загрузка данных игроков
def load_players_data():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        # Загружаем начальные данные
        initial_data = {
            "last_updated": datetime.now().isoformat(),
            "players": {
                "mbappe": {
                    "name": "Килиан Мбаппе",
                    "position": "ЦФД",
                    "age": "14 лет",
                    "foot": "Правая",
                    "height": "170 см",
                    "weight": "65 кг",
                    "matches": 15,
                    "goals": 12,
                    "assists": 8,
                    "rating": 91,
                    "number": "(9)"
                },
                # ... остальные игроки с начальными данными
            }
        }
        save_players_data(initial_data)
        return initial_data

def save_players_data(data):
    data['last_updated'] = datetime.now().isoformat()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Проверка прав администратора
def is_admin(user_id):
    return user_id in ADMIN_IDS

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    
    if is_admin(user_id):
        keyboard = [
            [InlineKeyboardButton("📊 Редактировать статистику", callback_data='edit_stats')],
            [InlineKeyboardButton("🔄 Обновить данные на сайте", callback_data='update_site')],
            [InlineKeyboardButton("📋 Просмотреть статистику", callback_data='view_stats')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            f"👑 Админ-панель управления статистикой\n"
            f"Выберите действие:",
            reply_markup=reply_markup
        )
    else:
        await update.message.reply_text("🚫 У вас нет доступа к админ-панели.")

# Обработчик кнопок
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    user_id = query.from_user.id
    if not is_admin(user_id):
        await query.edit_message_text("🚫 Нет доступа")
        return
    
    data = query.data
    
    if data == 'edit_stats':
        await show_players_list(query)
    elif data == 'view_stats':
        await show_current_stats(query)
    elif data == 'update_site':
        await update_site_data(query)
    elif data.startswith('player_'):
        player_id = data.split('_')[1]
        await show_edit_options(query, player_id)
    elif data.startswith('edit_'):
        parts = data.split('_')
        player_id = parts[1]
        field = parts[2]
        context.user_data['editing'] = {'player': player_id, 'field': field}
        await query.edit_message_text(
            f"Введите новое значение для {get_field_name(field)}:\n"
            f"Пример: {get_field_example(field)}"
        )
    elif data == 'back_to_menu':
        await start_from_callback(query)
    elif data == 'back_to_players':
        await show_players_list(query)

def get_field_name(field):
    field_names = {
        'matches': 'матчи',
        'goals': 'голы',
        'assists': 'ассисты',
        'saves': 'сейвы',
        'cleansheets': 'сухие матчи',
        'height': 'рост',
        'weight': 'вес',
        'rating': 'рейтинг'
    }
    return field_names.get(field, field)

def get_field_example(field):
    examples = {
        'matches': '15',
        'goals': '5',
        'assists': '3',
        'saves': '8',
        'cleansheets': '2',
        'height': '175 см',
        'weight': '68 кг',
        'rating': '85'
    }
    return examples.get(field, 'значение')

async def show_players_list(query):
    data = load_players_data()
    players = data['players']
    
    keyboard = []
    for player_id, player_data in players.items():
        name = player_data['name']
        keyboard.append([InlineKeyboardButton(f"⚽ {name}", callback_data=f'player_{player_id}')])
    
    keyboard.append([InlineKeyboardButton("⬅️ Назад", callback_data='back_to_menu')])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.edit_message_text(
        "Выберите игрока для редактирования:",
        reply_markup=reply_markup
    )

async def show_edit_options(query, player_id):
    data = load_players_data()
    player = data['players'][player_id]
    
    keyboard = []
    
    # Основная статистика
    if player['position'] == 'Вратарь':
        keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'edit_{player_id}_matches')])
        keyboard.append([InlineKeyboardButton(f"Сейвы: {player.get('saves', 0)}", callback_data=f'edit_{player_id}_saves')])
        keyboard.append([InlineKeyboardButton(f"Сухие матчи: {player.get('cleansheets', 0)}", callback_data=f'edit_{player_id}_cleansheets')])
    else:
        keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'edit_{player_id}_matches')])
        keyboard.append([InlineKeyboardButton(f"Голы: {player.get('goals', 0)}", callback_data=f'edit_{player_id}_goals')])
        keyboard.append([InlineKeyboardButton(f"Ассисты: {player.get('assists', 0)}", callback_data=f'edit_{player_id}_assists')])
    
    # Физические данные
    keyboard.append([InlineKeyboardButton(f"Рост: {player.get('height', '0 см')}", callback_data=f'edit_{player_id}_height')])
    keyboard.append([InlineKeyboardButton(f"Вес: {player.get('weight', '0 кг')}", callback_data=f'edit_{player_id}_weight')])
    keyboard.append([InlineKeyboardButton(f"Рейтинг: {player.get('rating', 0)}", callback_data=f'edit_{player_id}_rating')])
    
    keyboard.append([InlineKeyboardButton("⬅️ Назад к списку", callback_data='back_to_players')])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.edit_message_text(
        f"📝 Редактирование: {player['name']}\n"
        f"Выберите параметр для изменения:",
        reply_markup=reply_markup
    )

async def handle_text_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_admin(user_id):
        return
    
    if 'editing' in context.user_data:
        editing = context.user_data['editing']
        player_id = editing['player']
        field = editing['field']
        new_value = update.message.text
        
        # Обновляем данные
        data = load_players_data()
        if player_id in data['players']:
            # Преобразуем числовые значения
            if field in ['matches', 'goals', 'assists', 'saves', 'cleansheets', 'rating']:
                try:
                    new_value = int(new_value)
                except ValueError:
                    await update.message.reply_text("❌ Ошибка! Введите целое число")
                    return
            
            data['players'][player_id][field] = new_value
            save_players_data(data)
            
            # Очищаем состояние редактирования
            del context.user_data['editing']
            
            # Показываем подтверждение и возвращаем к меню игрока
            player_name = data['players'][player_id]['name']
            await update.message.reply_text(f"✅ Данные обновлены для {player_name}!")
            
            # Показываем обновлённое меню редактирования
            query = update.message
            context.bot_data['temp_query'] = query
            await show_edit_options_from_message(context.bot, player_id, query.chat_id, query.message_id)
        else:
            await update.message.reply_text("❌ Игрок не найден")

async def show_edit_options_from_message(bot, player_id, chat_id, message_id):
    data = load_players_data()
    player = data['players'][player_id]
    
    keyboard = []
    
    if player['position'] == 'Вратарь':
        keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'edit_{player_id}_matches')])
        keyboard.append([InlineKeyboardButton(f"Сейвы: {player.get('saves', 0)}", callback_data=f'edit_{player_id}_saves')])
        keyboard.append([InlineKeyboardButton(f"Сухие матчи: {player.get('cleansheets', 0)}", callback_data=f'edit_{player_id}_cleansheets')])
    else:
        keyboard.append([InlineKeyboardButton(f"Матчи: {player.get('matches', 0)}", callback_data=f'edit_{player_id}_matches')])
        keyboard.append([InlineKeyboardButton(f"Голы: {player.get('goals', 0)}", callback_data=f'edit_{player_id}_goals')])
        keyboard.append([InlineKeyboardButton(f"Ассисты: {player.get('assists', 0)}", callback_data=f'edit_{player_id}_assists')])
    
    keyboard.append([InlineKeyboardButton(f"Рост: {player.get('height', '0 см')}", callback_data=f'edit_{player_id}_height')])
    keyboard.append([InlineKeyboardButton(f"Вес: {player.get('weight', '0 кг')}", callback_data=f'edit_{player_id}_weight')])
    keyboard.append([InlineKeyboardButton(f"Рейтинг: {player.get('rating', 0)}", callback_data=f'edit_{player_id}_rating')])
    
    keyboard.append([InlineKeyboardButton("⬅️ Назад к списку", callback_data='back_to_players')])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    await bot.edit_message_text(
        f"📝 Редактирование: {player['name']}\n"
        f"✅ Данные обновлены!\n"
        f"Выберите следующий параметр:",
        chat_id=chat_id,
        message_id=message_id,
        reply_markup=reply_markup
    )

async def show_current_stats(query):
    data = load_players_data()
    players = data['players']
    
    message = "📊 Текущая статистика:\n\n"
    for player_id, player in players.items():
        message += f"⚽ {player['name']} {player['number']}\n"
        
        if player['position'] == 'Вратарь':
            message += f"   🧤 Матчи: {player.get('matches', 0)}\n"
            message += f"   🛡️ Сейвы: {player.get('saves', 0)}\n"
            message += f"   ✅ Сухие: {player.get('cleansheets', 0)}\n"
        else:
            message += f"   ⚽ Голы: {player.get('goals', 0)}\n"
            message += f"   🎯 Ассисты: {player.get('assists', 0)}\n"
            message += f"   📅 Матчи: {player.get('matches', 0)}\n"
        
        message += f"   📏 {player.get('height', '0 см')} / {player.get('weight', '0 кг')}\n"
        message += f"   ⭐ Рейтинг: {player.get('rating', 0)}\n\n"
    
    message += f"\n🔄 Последнее обновление: {data['last_updated'][:16].replace('T', ' ')}"
    
    keyboard = [[InlineKeyboardButton("⬅️ Назад", callback_data='back_to_menu')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(message, reply_markup=reply_markup)

async def update_site_data(query):
    data = load_players_data()
    
    # Генерируем JavaScript файл с обновлёнными данными
    generate_js_data(data)
    
    await query.edit_message_text(
        "✅ Данные для сайта обновлены!\n"
        "Загрузите файл 'updated_players_data.js' на хостинг сайта."
    )

def generate_js_data(data):
    js_content = "// Автоматически сгенерированные данные\n"
    js_content += "const playersData = " + json.dumps(data['players'], ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "// Обновление статистики на сайте\n"
    js_content += "function updatePlayersStats() {\n"
    js_content += "    for (const playerId in playersData) {\n"
    js_content += "        const player = playersData[playerId];\n"
    js_content += "        // Обновляем карточки игроков\n"
    js_content += "        updatePlayerCard(playerId, player);\n"
    js_content += "    }\n"
    js_content += "}\n\n"
    js_content += "// Запускаем обновление при загрузке страницы\n"
    js_content += "window.addEventListener('load', updatePlayersStats);"
    
    with open('updated_players_data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("✅ Файл updated_players_data.js создан")

async def start_from_callback(query):
    keyboard = [
        [InlineKeyboardButton("📊 Редактировать статистику", callback_data='edit_stats')],
        [InlineKeyboardButton("🔄 Обновить данные на сайте", callback_data='update_site')],
        [InlineKeyboardButton("📋 Просмотреть статистику", callback_data='view_stats')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.edit_message_text(
        "👑 Админ-панель управления статистикой\n"
        "Выберите действие:",
        reply_markup=reply_markup
    )

def main():
    # Токен вашего бота (получите у @BotFather)
    TOKEN = "ВАШ_TELEGRAM_BOT_TOKEN"
    
    # Создаём приложение
    application = Application.builder().token(TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text_message))
    
    # Запускаем бота
    print("🤖 Бот запущен...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()