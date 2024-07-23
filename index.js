const TelegramBot = require('node-telegram-bot-api');
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('bot.db')

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

bot.on('polling_error', (err) => console.log(err));

bot.on('message', (msg) => {
    console.log(msg.from.username, msg.date, msg.text)
    const chatId = msg.chat.id;

    const currentTimestamp = Math.floor(Date.now() / 1000)

    // Don't check old messages
    if (currentTimestamp - msg.date > 10) {
        return
    }

    if (!msg.text) return

    const text = msg.text
        .toLowerCase()
        .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, " ")
        .replaceAll(/\s+/g, " ")
        .trim();

    if (text.length < 3) return
    db.all(`
    SELECT original_text, response_link, hero_name 
    from Responses 
    join Heroes on Responses.hero_id = Heroes.id 
    where processed_text like '${text}%'`,
        (error, rows) => {
            if (error) {
                console.log(error)
                return
            }

            if (!rows || rows.length === 0) return

            // Select random response
            const index = getRandomInt(rows.length)

            const { response_link, original_text, hero_name } = rows[index];
            
            bot.sendMessage(
                chatId,
                `[${hero_name}: ${original_text}](${response_link})`,
                { reply_to_message_id: msg.message_id, parse_mode: "Markdown", disable_notification: true });
        })
});