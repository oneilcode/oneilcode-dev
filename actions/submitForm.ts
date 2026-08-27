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

    const telegramMessage = `
        📩 <b>Новое сообщение с сайта!</b>
        
        👤 <b>Имя:</b> ${name}
        📧 <b>Email:</b> ${email}
        💬 <b>Сообщение:</b>
        ${message}
        
        📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
            `;

    sendTelegramMessage(telegramMessage).catch((err) => {
      console.error('Telegram не отвечает, но сообщение сохранено:', err);
    });

    return {
      success: true,
      message: 'Сообщение успешно отправлено!',
    };
  } catch {
    return {
      success: false,
      message: 'Произошла ошибка. Попробуйте позже.',
    };
  }
}
