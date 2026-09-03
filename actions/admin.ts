'use server';

import { createHash } from 'crypto';

export async function checkPassword(password: string) {
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminPasswordHash) {
    throw new Error('ADMIN_PASSWORD_HASH не установлен в .env.local');
  }

  const hash = createHash('sha256').update(password).digest('hex');
  return hash === adminPasswordHash;
}