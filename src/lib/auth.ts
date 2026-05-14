import { createHash, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

const iterations = 120000;
const keyLength = 64;
const digest = 'sha512';

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  const derived = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return { passwordHash: derived, salt };
}

export function verifyPassword(password: string, passwordHash: string, salt: string) {
  const candidate = Buffer.from(hashPassword(password, salt).passwordHash, 'hex');
  const stored = Buffer.from(passwordHash, 'hex');

  if (candidate.length !== stored.length) {
    return false;
  }

  return timingSafeEqual(candidate, stored);
}

export function hashValue(value: string) {
  return createHash('sha256').update(value).digest('hex');
}