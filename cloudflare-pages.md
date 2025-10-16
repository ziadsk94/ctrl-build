# Cloudflare Pages Deployment Guide

## Deployment Steps

### 1. Connect Repository
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git repository (GitHub, GitLab, or Bitbucket)
4. Select your repository

### 2. Build Configuration
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (or leave empty)

### 3. Environment Variables
Add these in Cloudflare Pages dashboard under Settings > Environment Variables:
```
NODE_ENV=production
```

### 4. Custom Domain (Optional)
1. Go to your project settings
2. Navigate to "Custom domains"
3. Add your domain
4. Update DNS records as instructed

## Build Configuration Files

### `next.config.js`
- Configured for static export
- Images unoptimized for static hosting
- Output directory set to `out`

### `_headers`
- Security headers
- Cache control for static assets
- Optimized for performance

### `_redirects`
- Client-side routing support
- Custom redirects if needed

### `wrangler.toml`
- Cloudflare Workers configuration
- Environment settings

## Performance Optimizations

### Caching Strategy
- Static assets cached for 1 year
- HTML pages cached for shorter periods
- CDN distribution via Cloudflare

### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection enabled
- Referrer-Policy configured

## Deployment Commands

```bash
# Local build test
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

## Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version (18+ recommended)
2. **Image optimization**: Disabled for static export
3. **Routing issues**: Ensure `_redirects` file is present

### Performance Monitoring
- Use Cloudflare Analytics
- Monitor Core Web Vitals
- Check cache hit ratios

## Features Enabled
- ✅ Static site generation
- ✅ CDN distribution
- ✅ Automatic HTTPS
- ✅ Security headers
- ✅ Performance optimization
- ✅ Custom domain support
