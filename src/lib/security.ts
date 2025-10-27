interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore[identifier];

  if (!entry || entry.resetTime < now) {
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 10000);
}

export function isHoneypotEmpty(honeypot: string | undefined): boolean {
  return !honeypot || honeypot.trim() === '';
}

export interface ContactFormData {
  email: string;
  name: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateContactForm(
  data: ContactFormData
): ValidationResult {
  if (!isHoneypotEmpty(data.honeypot)) {
    return { valid: false, error: 'Invalid submission' };
  }

  const email = data.email?.trim();
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  const name = data.name?.trim();
  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Please provide a valid name (2-100 characters)' };
  }

  const message = data.message?.trim();
  if (!message || message.length < 10 || message.length > 5000) {
    return { valid: false, error: 'Please provide a message (10-5000 characters)' };
  }

  return { valid: true };
}

export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /(\%27)|(\')|(union|select|insert|delete|update|drop|create|alter|exec|execute)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

export function containsXSS(input: string): boolean {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<img[^>]*src[^>]*>/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

export function isInputSafe(input: string): boolean {
  const sanitized = sanitizeInput(input);
  return (
    !containsSQLInjection(sanitized) &&
    !containsXSS(sanitized) &&
    sanitized.length <= 10000
  );
}

export function generateCSRFToken(): string {
  if (typeof window === 'undefined') {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
  } else {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
}

export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

