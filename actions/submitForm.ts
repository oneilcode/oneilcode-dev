'use server';

import { createClient } from '@/lib/supabase/server';
import { sendTelegramMessage } from '@/lib/telegram/sendMessage';
import { z } from 'zod';

type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

const formSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  email: z.string().email('Неверный формат email'),
  message: z.string().min(5, 'Сообщение слишком короткое'),
});

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function submitForm(state: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const result = formSchema.safeParse({ name, email, message });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('messages').insert([{ name, email, message }]);

    if (error) {
      return {
        success: false,
        message: 'Не удалось отправить сообщение. Попробуйте позже.',
      };
    }
  } catch (err) {
    console.error('Unexpected error while saving to Supabase:', err);
    return {
      success: false,
      message: 'Произошла ошибка. Попробуйте позже.',
    };
  }

  const telegramMessage = `
📩 <b>Новое сообщение с сайта!</b>

👤 <b>Имя:</b> ${escapeHtml(name)}
📧 <b>Email:</b> ${escapeHtml(email)}
💬 <b>Сообщение:</b>
${escapeHtml(message)}

📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    await sendTelegramMessage(telegramMessage);
  } catch (err) {
    console.error('Сообщение сохранено в Supabase, но Telegram-уведомление не отправлено:', err);
  }

  return {
    success: true,
    message: 'Сообщение успешно отправлено!',
  };
}
