# Deployment Guide

This guide covers deploying your Job Application Bot mobile app to various platforms.

## Prerequisites

- Git repository with your code
- Backend API URL (Job Board Aggregator)
- Backend API token

## Option 1: Vercel (Recommended)

### Why Vercel?
- Zero configuration for Next.js
- Automatic HTTPS
- Global CDN
- Free tier available
- Easy environment variables

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables:
     - `BACKEND_API_URL`: Your Job Board Aggregator URL
     - `BACKEND_API_TOKEN`: Your API authentication token
   - Click "Deploy"

3. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Option 2: Netlify

### Steps

1. **Build your app**
```bash
npm run build
```

2. **Deploy with Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

3. **Configure Environment Variables**
   - Go to Netlify dashboard
   - Site Settings > Build & Deploy > Environment
   - Add:
     - `BACKEND_API_URL`
     - `BACKEND_API_TOKEN`

### Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave empty)

## Option 3: Railway

### Steps

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and Deploy**
```bash
railway login
railway init
railway up
```

3. **Add Environment Variables**
```bash
railway variables set BACKEND_API_URL=https://your-backend-url.com
railway variables set BACKEND_API_TOKEN=your-token
```

4. **Custom Domain**
```bash
railway domain
```

## Option 4: Docker + Any Platform

### Build Docker Image

```bash
docker build -t job-app-mobile .
```

### Run Locally

```bash
docker run -p 3000:3000 \
  -e BACKEND_API_URL=https://your-backend.com \
  -e BACKEND_API_TOKEN=your-token \
  job-app-mobile
```

### Deploy to Cloud Platforms

#### AWS ECS/Fargate

1. Push to ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag job-app-mobile:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/job-app-mobile:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/job-app-mobile:latest
```

2. Create ECS task definition
3. Create ECS service
4. Configure load balancer

#### Google Cloud Run

```bash
gcloud run deploy job-app-mobile \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars BACKEND_API_URL=https://your-backend.com,BACKEND_API_TOKEN=your-token
```

#### Azure Container Apps

```bash
az containerapp up \
  --name job-app-mobile \
  --resource-group myResourceGroup \
  --location eastus \
  --source . \
  --env-vars BACKEND_API_URL=https://your-backend.com BACKEND_API_TOKEN=your-token
```

## Option 5: Traditional VPS (Ubuntu)

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install PM2

```bash
sudo npm install -g pm2
```

### Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd job-app-mobile

# Install dependencies
npm install

# Create .env.local
nano .env.local
# Add your environment variables

# Build
npm run build

# Start with PM2
pm2 start npm --name "job-app-mobile" -- start
pm2 save
pm2 startup
```

### Setup Nginx Reverse Proxy

```bash
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/job-app-mobile
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

```bash
sudo ln -s /etc/nginx/sites-available/job-app-mobile /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `BACKEND_API_URL` | Job Board Aggregator API URL | `https://jobboardaggregator-production.up.railway.app` |
| `BACKEND_API_TOKEN` | API authentication token | `your_secure_token_here` |
| `NEXT_PUBLIC_APP_NAME` | App name (optional) | `Job Application Bot` |
| `NEXT_PUBLIC_APP_URL` | Public app URL (optional) | `https://jobapp.com` |

## Post-Deployment Checklist

- [ ] Test resume upload
- [ ] Test job matching
- [ ] Test job application
- [ ] Test application history
- [ ] Verify PWA installation works
- [ ] Check mobile responsiveness
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Configure custom domain (if needed)
- [ ] Setup analytics (optional)
- [ ] Setup error monitoring (optional)

## Monitoring & Analytics

### Vercel Analytics

Already included in Vercel deployments. Enable in dashboard.

### Google Analytics

Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

// In head
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Sentry Error Tracking

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## Troubleshooting

### Build Failures

**Issue**: TypeScript errors during build

**Solution**: Run `npm run lint` locally and fix errors

**Issue**: Out of memory

**Solution**: Increase Node memory
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**Issue**: API requests failing

**Solution**: Check environment variables are set correctly

**Issue**: CORS errors

**Solution**: Ensure backend allows your domain in CORS settings

### Performance Issues

**Issue**: Slow initial load

**Solution**: Enable Next.js output: 'standalone' in next.config.js

**Issue**: Large bundle size

**Solution**: Use dynamic imports for heavy components

## Scaling

### Horizontal Scaling

- Vercel: Automatic
- Railway: Scale up replicas in dashboard
- Docker: Use orchestration (Kubernetes, Docker Swarm)

### Caching

Configure Next.js caching in `next.config.js`:

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=600' },
        ],
      },
    ]
  },
}
```

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Backup

Regular backups are not needed as application state is stored:
- Locally (LocalStorage for application history)
- In your backend (job data)

### Rolling Updates

Vercel/Netlify: Automatic with zero downtime
Railway: Configure health checks
Docker: Use blue-green deployment

---

**Need Help?** Open an issue on GitHub or contact support.
