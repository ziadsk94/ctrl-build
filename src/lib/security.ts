/**
 * Security Utilities
 * 
 * Defense-in-Depth security functions for CTRL+BUILD
 * Implements honeypot, rate limiting, and validation mechanisms
 */

// Rate limiting using in-memory store (for production, use Redis/Database)
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per window

/**
 * Rate limiting function based on IP address
 * @param identifier - IP address or unique identifier
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore[identifier];

  if (!entry || entry.resetTime < now) {
    // New entry or expired window
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limited
  }

  entry.count++;
  return true;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize string input to prevent XSS
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 10000); // Max length
}

/**
 * Validate honeypot field
 * Honeypot fields should be empty (bots fill them, humans don't see them)
 * @param honeypot - Value of honeypot field
 * @returns true if honeypot is empty (valid)
 */
export function isHoneypotEmpty(honeypot: string | undefined): boolean {
  return !honeypot || honeypot.trim() === '';
}

/**
 * Validate contact form submission
 * @param data - Form submission data
 * @returns Validation result with optional error message
 */
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
  // Check honeypot (should be empty for legitimate submissions)
  if (!isHoneypotEmpty(data.honeypot)) {
    // Silent rejection for bots
    return { valid: false, error: 'Invalid submission' };
  }

  // Validate email
  const email = data.email?.trim();
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  // Validate name
  const name = data.name?.trim();
  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Please provide a valid name (2-100 characters)' };
  }

  // Validate message
  const message = data.message?.trim();
  if (!message || message.length < 10 || message.length > 5000) {
    return { valid: false, error: 'Please provide a message (10-5000 characters)' };
  }

  return { valid: true };
}

/**
 * Check for SQL injection patterns
 * @param input - String to check
 * @returns true if potentially malicious
 */
export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /(\%27)|(\')|(union|select|insert|delete|update|drop|create|alter|exec|execute)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check for XSS patterns
 * @param input - String to check
 * @returns true if potentially malicious
 */
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

/**
 * Comprehensive input validation
 * @param input - String to validate
 * @returns true if safe
 */
export function isInputSafe(input: string): boolean {
  const sanitized = sanitizeInput(input);
  return (
    !containsSQLInjection(sanitized) &&
    !containsXSS(sanitized) &&
    sanitized.length <= 10000
  );
}

/**
 * Generate CSRF token (for future API usage)
 * @returns CSRF token
 */
export function generateCSRFToken(): string {
  if (typeof window === 'undefined') {
    // Server-side: use crypto module
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
  } else {
    // Client-side: use Web Crypto API
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
}

/**
 * Verify CSRF token
 * @param token - Token to verify
 * @param sessionToken - Session token
 * @returns true if valid
 */
export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

