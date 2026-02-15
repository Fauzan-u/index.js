const TelegramBot = require('node-telegram-bot-api');

// --- SETUP TOKEN ---
const token = '8542152891:AAFO5VGX1CzoniV5vZLyndn7sqyKaZxl57U';
const bot = new TelegramBot(token, { polling: true });

const urlVideo = 'https://files.catbox.moe/gh8iga.mp4';
const urlAudio = 'https://files.catbox.moe/e0exqp.mp3';

let userState = {}; 

const bugData = {
    'Bug Delay Parah': "⏳" + " \u0345".repeat(400) + " 💀 BUG_DELAY_PARAH_V55 💀 ",
    'Bug Force Close': "💥" + " \u200e".repeat(600) + " 💀 BUG_FORCE_CLOSE_V55 💀 ",
    'Virtex Extreme': "💀" + Buffer.from("virtex").toString('base64').repeat(8),
    'Blank Message': "🗑️" + " \u200b".repeat(800)
};

// --- MENU UTAMA ---
bot.onText(/\/start/, (msg) => {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "⏳ Bug Delay Parah", callback_data: 'Bug Delay Parah' }],
                [{ text: "💥 Bug Force Close", callback_data: 'Bug Force Close' }],
                [{ text: "💀 Virtex Extreme", callback_data: 'Virtex Extreme' }],
                [{ text: "🗑️ Blank Message", callback_data: 'Blank Message' }]
            ]
        }
    };

    const header = `╔════════════════════╗\n   SENDER BUG V3.0 PRO\n   DEV: FAUZAAN\n╚════════════════════╝\n\n_Pilih jenis serangan:_`;
    bot.sendVideo(msg.chat.id, urlVideo, { caption: header, parse_mode: 'Markdown', ...opts });
    bot.sendAudio(msg.chat.id, urlAudio);
});

// --- CALLBACK HANDLER ---
bot.on('callback_query', (q) => {
    userState[q.message.chat.id] = q.data; 
    bot.sendMessage(q.message.chat.id, `🎯 **${q.data.toUpperCase()} LOCKED.**\n\n_Masukkan nomor target:_`);
});

// --- ANIMATED EXECUTION & INSTANT REPORT ---
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (userState[chatId] && text && !text.startsWith('/')) {
        const bugName = userState[chatId];
        const targetNum = text.replace(/[^0-9]/g, '');

        const loadingMsg = await bot.sendMessage(chatId, `🚀 **MENGIRIM...**\n[▒▒▒▒▒▒▒▒▒▒] 0%`);
        
        const frames = ["40%", "70%", "100%"];
        const bars = ["[████▒▒▒▒▒▒]", "[███████▒▒▒]", "[██████████]"];

        for (let i = 0; i < frames.length; i++) {
            await new Promise(res => setTimeout(res, 600));
            await bot.editMessageText(`🚀 **MENGIRIM ${bugName.toUpperCase()}...**\n${bars[i]} ${frames[i]}\n_Target: ${targetNum}_`, {
                chat_id: chatId,
                message_id: loadingMsg.message_id
            }).catch(e => {});
        }

        // --- LAPORAN INSTAN (BERHASIL + NOMOR) ---
        setTimeout(() => {
            const code = bugData[bugName];
            const instantReport = `✅ **BERHASIL**\n🎯 **TARGET: ${targetNum}**\n\n\`${code}\``;

            bot.sendMessage(chatId, instantReport, { parse_mode: 'Markdown' });
            delete userState[chatId];
        }, 800);
    }
});

console.log("Fauzan V55 - Instant Report Active!");