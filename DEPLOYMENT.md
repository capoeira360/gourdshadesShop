# Gourdshades Deployment Guide

## 🚀 Production Build Complete

Your Next.js application has been successfully built for production and is ready for deployment!

## 📁 Essential Files for Deployment

### Required Files & Directories:
```
├── .next/                    # Build output (REQUIRED)
├── public/                   # Static assets (REQUIRED)
├── src/                      # Source code (REQUIRED for server-side)
├── package.json              # Dependencies (REQUIRED)
├── package-lock.json         # Lock file (REQUIRED)
├── next.config.ts            # Next.js config (REQUIRED)
├── postcss.config.mjs        # PostCSS config (REQUIRED)
├── eslint.config.mjs         # ESLint config (optional)
├── tsconfig.json             # TypeScript config (REQUIRED)
└── .env.local                # Environment variables (REQUIRED)
```

## 🌐 Hosting Platform Options

### 1. **Vercel (Recommended for Next.js)**
- **Deploy Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 18.x or higher
- **Environment Variables**: Set in Vercel dashboard
- **Auto-deployment**: Connect GitHub repository

### 2. **Netlify**
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18.x or higher
- **Functions**: Automatic serverless functions

### 3. **Railway**
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: Automatic detection
- **Environment Variables**: Set in Railway dashboard

### 4. **Render**
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Auto-deploy**: Connect GitHub repository

## 🔧 Environment Variables Required

Create these environment variables on your hosting platform:

```env
# Email Configuration (REQUIRED for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

## ✉️ EmailJS Setup (Static-Friendly Forms)

If deploying to a static host (no server-side API routes), you can enable contact and enquiry forms via EmailJS.

### Required Environment Variables

Add these to `.env.local` (and your hosting dashboard for production):

```env
# EmailJS Public Key and Service
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-emailjs-service-id

# Template IDs
# Use one template or separate templates for each form
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-default-template-id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=optional-contact-template-id
NEXT_PUBLIC_EMAILJS_ENQUIRY_TEMPLATE_ID=optional-enquiry-template-id

# Site URL used in emails
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Template Parameters Used

Your EmailJS templates should reference these variables:

- `name` — sender name
- `email` — sender email
- `phone` — sender phone
- `message` — message content
- `timestamp` — ISO timestamp
- `site_url` — site origin or configured URL
- `items_summary` — newline-separated list of cart items (enquiry form)
- `total_items` — total count of items (enquiry form)
- `total_value` — formatted total value like `$123.45` (enquiry form)

Example template body:

```
New {{#if items_summary}}Enquiry{{else}}Contact{{/if}} from {{name}}

Email: {{email}}
Phone: {{phone}}
Message:
{{message}}

{{#if items_summary}}
Items:
{{items_summary}}
Total Items: {{total_items}}
Total Value: {{total_value}}
{{/if}}

Submitted at: {{timestamp}}
Site: {{site_url}}
```

### Notes

- When EmailJS variables are set, the app sends messages client-side; otherwise it falls back to Next.js API routes.
- For static hosting, ensure EmailJS variables are set; API endpoints will 404.
- Protect your EmailJS account by using the public key (not secret key) on the client.

## 📋 Pre-Deployment Checklist

- ✅ Production build completed successfully
- ✅ All TypeScript errors resolved
- ✅ All ESLint warnings fixed
- ✅ Environment variables configured
- ✅ Email functionality tested
- ✅ All images optimized and accessible
- ✅ Responsive design verified
- ✅ SEO metadata configured

## 🔍 Build Statistics

```
Route (app)                         Size     First Load JS
┌ ○ /                            50.4 kB        285 kB
├ ○ /about                       4.13 kB        239 kB
├ ○ /contact                     2.27 kB        237 kB
├ ○ /products                    5.28 kB        240 kB
├ ƒ /products/[id]               8.21 kB        243 kB
├ ○ /services                    2.56 kB        237 kB
└ ○ /wishlist                    2.02 kB        236 kB

Total First Load JS: 246 kB (Excellent performance!)
```

## 🚀 Quick Deploy Commands

### For Git-based deployment:
```bash
# Commit your changes
git add .
git commit -m "Production build ready for deployment"
git push origin main

# The hosting platform will automatically build and deploy
```

### For manual deployment:
```bash
# Create deployment package
npm run build
tar -czf gourdshades-deployment.tar.gz .next public src package.json package-lock.json next.config.ts postcss.config.mjs tsconfig.json
```

## 🔗 Post-Deployment Steps

1. **Verify Domain**: Ensure custom domain is properly configured
2. **Test Contact Forms**: Verify email functionality works
3. **Check Performance**: Run Lighthouse audit
4. **Monitor Logs**: Check for any runtime errors
5. **SSL Certificate**: Ensure HTTPS is enabled
6. **Analytics**: Set up Google Analytics if needed

## 📞 Support

If you encounter any issues during deployment:
- Check the hosting platform's logs
- Verify all environment variables are set
- Ensure Node.js version compatibility (18.x+)
- Contact hosting platform support if needed

---

**🎉 Your Gourdshades website is ready for the world!**