# Security Documentation for CTRL+BUILD

## Defense in Depth Strategy

This document outlines the comprehensive security measures implemented for the CTRL+BUILD website.

---

## 🔒 Critical Security Headers

### Content Security Policy (CSP)

**Implementation:** Configured in `_headers` file for Cloudflare Pages deployment

**Policy Details:**
- `default-src 'self'` - Only allow resources from the same origin
- `script-src` - Whitelisted: self, unsafe-inline (for Next.js), unsafe-eval (for GSAP animations), Google Analytics domains
- `style-src` - self, unsafe-inline (for inline styles), Google Fonts
- `font-src` - self, fonts.gstatic.com, data URIs
- `img-src` - self, data URIs, https (for external images)
- `connect-src` - self, Google Analytics domains
- `frame-src 'none'` - No iframes allowed
- `object-src 'none'` - No plugins
- `base-uri 'self'` - Prevent base tag hijacking
- `form-action 'self'` - Forms can only submit to our domain
- `upgrade-insecure-requests` - Force HTTPS

**External Sources Whitelisted:**
- Google Analytics: `www.googletagmanager.com`, `www.google-analytics.com`, `ssl.google-analytics.com`
- Google Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`

### HTTP Strict Transport Security (HSTS)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- **max-age:** 1 year (31,536,000 seconds)
- **includeSubDomains:** Enforces HTTPS for all subdomains
- **preload:** Eligible for browser preload lists

### X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Prevents browsers from MIME-sniffing, forcing strict content-type interpretation.

### X-Frame-Options

```
X-Frame-Options: DENY
```

Prevents the site from being embedded in iframes (clickjacking protection).

### X-XSS-Protection

```
X-XSS-Protection: 1; mode=block
```

Enables browser XSS filter (legacy support for older browsers).

### Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
```

Sends full referrer for same-origin requests, sends only origin for cross-origin HTTPS requests, sends nothing for HTTP.

### Permissions-Policy

Disables unnecessary browser features:
```
accelerometer=(), camera=(), geolocation=(), gyroscope=(), 
magnetometer=(), microphone=(), payment=(), usb=(), vr=()
```

---

## 🛡️ Secure Contact Endpoint

### Current Implementation

The contact page uses a `mailto:` link, which means there's no server-side contact form endpoint. This is actually more secure as it avoids potential attack vectors.

### Security Utilities Created

The following security functions are available in `src/lib/security.ts` for future API endpoints:

**Rate Limiting:**
- In-memory store (15-minute window, 5 requests max)
- Can be extended to use Redis/Database for production

**Input Validation:**
- Email format validation
- String sanitization (XSS prevention)
- SQL injection detection
- Length limits (10-5000 characters for messages)

**Honeypot Protection:**
- Invisible form field that bots fill out
- Legitimate users leave it empty
- Silent rejection if honeypot is filled

**Validation Example:**
```typescript
import { validateContactForm } from '@/lib/security';

const result = validateContactForm({
  email: 'user@example.com',
  name: 'John Doe',
  message: 'Hello, I need a website.',
  honeypot: '' // Empty for legitimate users
});

if (!result.valid) {
  console.error(result.error);
}
```

### Future API Security (if contact form is implemented)

If you add a server-side contact form in the future:

1. **Create API route:** `src/app/api/contact/route.ts`
2. **Implement rate limiting:** Use `checkRateLimit()` with IP address
3. **Add honeypot field:** Hide field with CSS, reject submissions if filled
4. **Validate input:** Use `validateContactForm()`
5. **Sanitize output:** Use `sanitizeInput()` before storing
6. **Add CAPTCHA:** Consider Google reCAPTCHA v3 for production

---

## 🔍 Vulnerability Scanning

### Snyk Integration

**Installed as devDependency:**
```bash
npm install --save-dev snyk@^1.1318.0
```

**Scripts Added:**
- `npm run security` - Run npm audit with high severity threshold
- `npm run snyk` - Run Snyk vulnerability scan

### Dependabot

**Configuration:** `.github/dependabot.yml`

**Features:**
- Weekly security updates (Mondays at 9 AM ET)
- Automatic PR creation for security patches
- Groups production and development dependencies
- Ignores major version updates (requires manual review)
- Auto-assigns to maintainer

### GitHub Actions Security Audit

**Workflow:** `.github/workflows/security-audit.yml`

**Triggers:**
- On pull requests to master/main/develop
- On push to master/main/develop
- Weekly schedule (Mondays at 9 AM UTC)

**Jobs:**
1. **Security Audit** - Runs `npm audit --audit-level=high`
2. **Snyk Scan** - Runs Snyk vulnerability scanner
3. **Dependency Check** - Checks for outdated packages

**Behavior:**
- Fails CI/CD if high/critical vulnerabilities found
- Comments on PRs with audit results
- Uploads artifacts for review

---

## 🔑 Secret Management

### Current Secrets

**Google Analytics ID:**
- **Location:** `src/app/layout.tsx:119`
- **Value:** `G-RWE7TFWDRQ` (hardcoded in production)
- **Status:** ✅ Safe (public tracking ID, meant to be exposed)
- **Action:** No action needed

### Best Practices for Future Secrets

If you need to add environment variables:

1. **Create `.env.local`** (gitignored) for local development
2. **Add to Cloudflare Pages Dashboard** - Environment variables for production
3. **Use `NEXT_PUBLIC_` prefix** for client-side variables only
4. **Never commit:** `.env.local`, `.env.production`, or `.env.development`

**Example structure:**
```
.env.local (gitignored)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_ANALYTICS_ID=G-RWE7TFWDRQ

Cloudflare Pages Dashboard:
NEXT_PUBLIC_SITE_URL=https://ctrl-build.com
GOOGLE_ANALYTICS_ID=G-RWE7TFWDRQ
```

---

## 🚨 Security Audit Results

### Hardcoded Secrets Scan

**Scanned for:** API keys, passwords, tokens, credentials

**Findings:**
✅ **No hardcoded secrets found**

- Google Analytics ID (`G-RWE7TFWDRQ`) is intentionally public
- All other configuration is safe to expose
- No database credentials, API keys, or private tokens

### Dependency Vulnerabilities

**Last Audit:** January 2025

**Current Status:** ⚠️ 2 moderate severity vulnerabilities

**Vulnerable Packages:**
1. **esbuild** (≤0.24.2) - Development server request handling
   - **Impact:** Moderate
   - **Package:** Development dependency (not in production build)
   - **Affects:** wrangler (Cloudflare Pages deployment tool)
   - **Risk Level:** Low (only affects development environment)

**Resolution Strategy:**
- Vulnerabilities are in dev dependencies only
- Not included in production build (`next build --output export`)
- Will be auto-updated by Dependabot
- No immediate action required (production build is secure)

---

## 📊 Security Headers Verification

### Testing Security Headers

Use these tools to verify your security headers:

1. **Security Headers:** https://securityheaders.com/
2. **Mozilla Observatory:** https://observatory.mozilla.org/
3. **SSL Labs:** https://www.ssllabs.com/ssltest/

### Expected Test Results

- **A+ rating** on Security Headers
- **A+ rating** on SSL Labs
- **Green status** on CSP evaluation
- **All security headers present** (CSP, HSTS, X-Frame-Options, etc.)

---

## 🛠️ Maintenance

### Weekly Tasks

1. Review Dependabot PRs for security updates
2. Run `npm audit` locally
3. Check GitHub Actions security workflow status
4. Review Cloudflare security analytics

### Monthly Tasks

1. Review and update security headers as needed
2. Audit external dependencies for changes
3. Check for new Snyk vulnerabilities
4. Review and update this documentation

### When Adding New Features

1. **New API endpoints:** Implement rate limiting and validation
2. **New external services:** Update CSP whitelist
3. **User authentication:** Add CSRF protection
4. **File uploads:** Validate file types and sizes
5. **Email sending:** Use environment variables for SMTP credentials

---

## 🎯 Incident Response

### If You Discover a Vulnerability

1. **DO NOT** create a GitHub issue
2. **Email:** contact@ctrl-build.com
3. **Response time:** Within 48 hours
4. **Fix deployment:** Within 7 days for critical issues

### Security Updates Process

1. Dependabot opens PR for security update
2. Review the PR and test locally
3. Verify no breaking changes
4. Merge and deploy immediately
5. Monitor for issues

---

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Snyk Documentation](https://docs.snyk.io/)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)
- [Next.js Security Best Practices](https://nextjs.org/docs/going-to-production#security)

---

## ✅ Security Checklist

- [x] Content Security Policy implemented
- [x] HTTP Strict Transport Security enabled
- [x] X-Content-Type-Options set to nosniff
- [x] X-Frame-Options set to DENY
- [x] Referrer-Policy configured
- [x] Permissions-Policy restrictive
- [x] Snyk added to package.json
- [x] Security audit workflow created
- [x] Dependabot configured
- [x] No hardcoded secrets
- [x] Security utilities created
- [x] Documentation complete

---

**Last Updated:** January 2025  
**Maintained By:** CTRL+BUILD Security Team

