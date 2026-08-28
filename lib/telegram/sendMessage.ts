import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram env vars missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      },
      { timeout: 10000 }
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Telegram API error:', err.response?.status, err.response?.data ?? err.message);
    } else {
      console.error('Telegram unknown error:', err);
    }
    throw err;
  }
}
