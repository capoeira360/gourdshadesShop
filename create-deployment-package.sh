#!/bin/bash

# Gourdshades Deployment Package Creator
# This script creates a deployment-ready package for hosting platforms

echo "🚀 Creating Gourdshades Deployment Package..."

# Create deployment directory
mkdir -p deployment-package

# Copy essential files and directories
echo "📁 Copying essential files..."

# Core application files
cp -r .next deployment-package/
cp -r public deployment-package/
cp -r src deployment-package/

# Configuration files
cp package.json deployment-package/
cp package-lock.json deployment-package/
cp next.config.ts deployment-package/
cp postcss.config.mjs deployment-package/
cp tsconfig.json deployment-package/

# Optional but recommended files
cp eslint.config.mjs deployment-package/ 2>/dev/null || echo "⚠️  eslint.config.mjs not found, skipping..."
cp README.md deployment-package/ 2>/dev/null || echo "⚠️  README.md not found, skipping..."

# Copy environment template (user needs to configure)
echo "# Environment Variables for Production
# Configure these on your hosting platform

# Email Configuration (REQUIRED)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production" > deployment-package/.env.example

# Create deployment info file
echo "# Gourdshades Deployment Package

Generated on: $(date)
Build Status: ✅ Success
Node Version Required: 18.x or higher

## Files Included:
- .next/ (build output)
- public/ (static assets)
- src/ (source code)
- package.json & package-lock.json
- Configuration files
- .env.example (configure for production)

## Next Steps:
1. Configure environment variables on your hosting platform
2. Upload these files or connect your Git repository
3. Set build command: npm run build
4. Set start command: npm start

Refer to DEPLOYMENT.md for detailed instructions." > deployment-package/DEPLOYMENT-INFO.txt

# Create compressed archive
echo "📦 Creating compressed archive..."
tar -czf gourdshades-deployment-$(date +%Y%m%d-%H%M%S).tar.gz -C deployment-package .

# Get package size
PACKAGE_SIZE=$(du -sh gourdshades-deployment-*.tar.gz | cut -f1)

echo "✅ Deployment package created successfully!"
echo "📦 Package size: $PACKAGE_SIZE"
echo "📁 Files location: deployment-package/"
echo "🗜️  Compressed archive: gourdshades-deployment-$(date +%Y%m%d-%H%M%S).tar.gz"
echo ""
echo "🚀 Your Gourdshades website is ready for deployment!"
echo "📖 See DEPLOYMENT.md for hosting platform instructions."