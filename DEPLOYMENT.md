# Deployment Guide - Vercel

This guide will walk you through deploying the InvestInHuman Academy website to Vercel.

## Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] SMTP credentials (info@investinhuman.tn)
- [x] Code pushed to GitHub repository

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add remote (if not already added)
git remote add origin https://github.com/MarwenKing15/InvestInHuman_Academy_V1.git

# Push to GitHub
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your repository: `InvestInHuman_Academy_V1`
4. Click **"Import"**

### 3. Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (leave default)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### 4. Add Environment Variables

Click **"Environment Variables"** and add these **REQUIRED** variables:

| Name | Value | Notes |
|------|-------|-------|
| `SMTP_HOST` | `ssl0.ovh.net` | Your SMTP server |
| `SMTP_PORT` | `465` | SMTP port (SSL) |
| `SMTP_USER` | `info@investinhuman.tn` | Your email address |
| `SMTP_PASS` | `your_actual_password` | ⚠️ Use real password |
| `RECEIVER_EMAIL` | `info@investinhuman.tn` | Where emails are sent |

**Optional Variables:**

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_APP_NAME` | `InvestInHuman Academy` |
| `NEXT_PUBLIC_APP_VERSION` | `1.0.0` |
| `NEXT_TELEMETRY_DISABLED` | `1` |

**Important Notes:**
- Add variables to **Production**, **Preview**, and **Development** environments
- Never commit real passwords to `.env.local` or `.env.production`
- Keep your SMTP password secure

### 5. Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Vercel will provide a URL: `https://your-project.vercel.app`

### 6. Custom Domain (Optional)

#### Add Your Domain

1. Go to **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `investinhuman.tn` or `www.investinhuman.tn`
4. Vercel will provide DNS records

#### Configure DNS

Add these records to your domain provider (OVH, GoDaddy, etc.):

**For Apex Domain (investinhuman.tn):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.investinhuman.tn):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### SSL Certificate
Vercel automatically provisions SSL certificates via Let's Encrypt (free).

### 7. Verify Deployment

1. **Visit your site:** `https://your-project.vercel.app`
2. **Test language switching:** Switch between DE/EN/FR/AR
3. **Test contact form:**
   - Go to Contact page
   - Fill out the form
   - Submit and verify email arrives at `info@investinhuman.tn`
4. **Test all pages:**
   - [ ] Home
   - [ ] About Us
   - [ ] Seminars
   - [ ] Language Courses
   - [ ] Au Pair & Volunteering
   - [ ] Coaching
   - [ ] Partnerships
   - [ ] Studies Abroad
   - [ ] Contact

### 8. Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Language switcher works
- [ ] Contact form sends emails
- [ ] Seminar translations display correctly
- [ ] Images load properly
- [ ] Animations work smoothly
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] SSL certificate is active (https://)

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update homepage content"
git push origin main
```

Vercel will:
1. Detect the push
2. Build your project
3. Deploy automatically
4. Send you a notification

## Monitoring

### View Deployments

1. Go to your Vercel dashboard
2. Click on your project
3. View all deployments and their status

### Analytics (Optional)

Enable Vercel Analytics:
1. Go to **Analytics** tab
2. Click **"Enable Analytics"**
3. View traffic, performance, and visitor data

### Logs

View build and runtime logs:
1. Go to **Deployments**
2. Click on any deployment
3. View **Build Logs** or **Function Logs**

## Troubleshooting

### Build Fails

**Problem:** Build fails with TypeScript errors

**Solution:**
```bash
# Run locally first to check for errors
npm run build

# Fix any TypeScript errors
# Then commit and push again
```

### Email Not Sending

**Problem:** Contact form doesn't send emails

**Solution:**
1. Verify SMTP credentials in Vercel environment variables
2. Check `SMTP_PASS` is correct (no typos)
3. Ensure all 5 SMTP variables are set
4. Check Vercel function logs for errors

### Environment Variables Not Working

**Problem:** Variables not available in production

**Solution:**
1. Ensure variables are added to **Production** environment
2. Redeploy after adding variables (click **"Redeploy"** in deployment)
3. For public variables, use `NEXT_PUBLIC_` prefix

### Images Not Loading

**Problem:** Images show broken links

**Solution:**
- Ensure images are in `public/` folder
- Use absolute paths: `/image.jpg` not `./image.jpg`
- Check image file extensions match code

## Rolling Back

If something goes wrong:

1. Go to **Deployments**
2. Find a previous working deployment
3. Click **"⋯"** menu
4. Click **"Promote to Production"**

## Performance Optimization

### Enable Edge Network

Vercel automatically deploys to their global CDN. No action needed.

### Image Optimization

Next.js automatically optimizes images. Use `next/image`:

```tsx
import Image from 'next/image'

<Image src="/logo.png" alt="Logo" width={200} height={100} />
```

### Caching

Vercel automatically caches static assets. Configure in `next.config.mjs`:

```js
const nextConfig = {
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

## Security

### Environment Variables

- ✅ **DO:** Store sensitive data in Vercel environment variables
- ❌ **DON'T:** Commit passwords to `.env.local` or `.env.production`
- ❌ **DON'T:** Share SMTP passwords publicly

### HTTPS

Vercel enforces HTTPS automatically. No configuration needed.

### Headers

Add security headers in `next.config.mjs`:

```js
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
}
```

## Cost

### Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Analytics (limited)

### Paid Plans:
- Pro: $20/month (more bandwidth, team features)
- Enterprise: Custom pricing (SLA, advanced security)

For this project, **Free Tier is sufficient**.

## Support

### Vercel Documentation
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

### InvestInHuman Support
- Email: info@investinhuman.tn
- GitHub Issues: [Create an issue](https://github.com/MarwenKing15/InvestInHuman_Academy_V1/issues)

---

**Last Updated:** November 10, 2025  
**Deployment Platform:** Vercel  
**Framework:** Next.js 14+
