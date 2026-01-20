# StoreForge AI - Deployment Guide

Complete guide for deploying StoreForge AI to production.

## Prerequisites

- Node.js 18+ installed
- Git repository access
- Domain name (optional)
- Database setup (for production)
- Payment processor account (Stripe recommended)

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd storeforge-ai
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Scope? Select your account
- Link to existing project? **N**
- Project name? **storeforge-ai**
- Directory? **./
** (current directory)
- Want to override settings? **N**

#### Step 3: Configure Environment Variables
```bash
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY
vercel env add STRIPE_SECRET_KEY
# Add all required env vars
```

#### Step 4: Deploy to Production
```bash
vercel --prod
```

Your site is now live at: `https://storeforge-ai.vercel.app`

### Option 2: Docker Deployment

#### Step 1: Create Dockerfile
Already included in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Step 2: Build Docker Image
```bash
docker build -t storeforge-ai .
```

#### Step 3: Run Container
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e OPENAI_API_KEY="your_api_key" \
  storeforge-ai
```

#### Step 4: Docker Compose (Optional)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: storeforge
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

#### Step 1: Server Setup
```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 2: Clone and Setup
```bash
# Clone repository
git clone https://github.com/your-org/storeforge-ai.git
cd storeforge-ai

# Install dependencies
npm ci

# Build application
npm run build
```

#### Step 3: Configure Environment
```bash
# Create .env file
nano .env

# Add your environment variables
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_api_key
NEXTAUTH_SECRET=your_secret
# ... etc
```

#### Step 4: Start with PM2
```bash
# Start application
pm2 start npm --name "storeforge" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

#### Step 5: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/storeforge
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/storeforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

### Required Environment Variables

Create `.env.production`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/storeforge

# AI Services
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Payment
STRIPE_PUBLIC_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@your-domain.com

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUBDOMAIN_SUFFIX=.your-domain.com

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Database Setup

### PostgreSQL Setup

#### Step 1: Install PostgreSQL
```bash
# On Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Step 2: Create Database
```bash
sudo -u postgres psql

CREATE DATABASE storeforge;
CREATE USER storeforge_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE storeforge TO storeforge_user;
\q
```

#### Step 3: Run Migrations
```bash
# Install Prisma (if using)
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev
```

### MongoDB Setup (Alternative)

```bash
# Install MongoDB
sudo apt install mongodb

# Start service
sudo systemctl start mongodb

# Connection string
MONGODB_URL=mongodb://localhost:27017/storeforge
```

## Production Checklist

### Before Deploy

- [ ] Update environment variables
- [ ] Configure database connection
- [ ] Set up authentication
- [ ] Configure payment processor
- [ ] Set up email service
- [ ] Add SSL certificate
- [ ] Configure domain DNS
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
- [ ] Test all features locally

### Security

- [ ] Enable HTTPS
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable CSRF protection
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Set secure headers
- [ ] Implement proper authentication
- [ ] Set up backup system

### Performance

- [ ] Enable caching
- [ ] Configure CDN
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up database indexes
- [ ] Configure Redis (optional)
- [ ] Enable HTTP/2
- [ ] Set up monitoring

### Monitoring

- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up log aggregation
- [ ] Enable performance monitoring
- [ ] Configure alerts
- [ ] Set up backup monitoring

## Post-Deployment

### Verify Deployment

```bash
# Check application status
curl https://your-domain.com/api/health

# Check build info
curl https://your-domain.com/api/version

# Test API endpoints
curl -X POST https://your-domain.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"brandInfo":{"brandName":"Test"},"products":[{"name":"Product"}]}'
```

### Monitoring Setup

#### Sentry for Error Tracking
```bash
npm install @sentry/nextjs

# Run configuration
npx @sentry/wizard -i nextjs
```

#### Google Analytics
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Continuous Deployment

#### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Scaling Strategies

### Horizontal Scaling

**Load Balancer Setup**
```nginx
upstream storeforge_backend {
    least_conn;
    server app1.internal:3000;
    server app2.internal:3000;
    server app3.internal:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://storeforge_backend;
    }
}
```

### Database Scaling

**Read Replicas**
```typescript
// Primary for writes
const primaryDb = new Pool({
  connectionString: process.env.DATABASE_URL_PRIMARY
});

// Replica for reads
const replicaDb = new Pool({
  connectionString: process.env.DATABASE_URL_REPLICA
});
```

**Caching Layer**
```bash
# Install Redis
sudo apt install redis-server

# Configure Redis caching
redis-cli config set maxmemory 2gb
redis-cli config set maxmemory-policy allkeys-lru
```

### CDN Configuration

**Cloudflare Setup**
1. Sign up for Cloudflare
2. Add your domain
3. Update nameservers
4. Enable proxy (orange cloud)
5. Configure caching rules
6. Enable minification
7. Set up page rules

## Backup Strategy

### Database Backups

**PostgreSQL Automated Backups**
```bash
# Create backup script
cat > /usr/local/bin/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump storeforge | gzip > "$BACKUP_DIR/storeforge_$TIMESTAMP.sql.gz"
find $BACKUP_DIR -type f -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup-db.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh
```

### File Backups
```bash
# Backup uploads directory
rsync -avz /app/uploads/ backup-server:/backups/storeforge/uploads/

# Backup environment
cp .env /secure/backup/location/
```

## Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Database Connection Issues**
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

**Application Crashes**
```bash
# Check PM2 logs
pm2 logs storeforge

# Check system logs
sudo journalctl -u nginx -f
```

## Support Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com/)

### Monitoring Services
- Vercel Analytics
- Google Analytics
- Sentry
- DataDog
- New Relic

### Status Pages
- Create status page at status.your-domain.com
- Use services like StatusPage.io or Uptime Robot

---

**Deployment Complete!** 🚀

Your StoreForge AI platform is now live and ready to serve customers.

For issues or questions:
- Check logs first
- Review documentation
- Contact DevOps team
- Open support ticket
