# 🚂 Railway Deployment Guide - Job Board Aggregator Backend

## 📋 What Gets Deployed

You're deploying the **Job Board Aggregator FastAPI Backend** - the REST API server that:
- Matches resumes with jobs using AI
- Provides endpoints for job searching and matching
- Uses Pinecone vector database for semantic search
- Uses Groq LLM and Cerebras AI for intelligent matching
- Runs on port 8080

**Note:** The other two components (Job Application Automator MCP & Job Matcher MCP) run **locally** on your machine with Claude Desktop.

---

## ✅ Prerequisites

Before deploying, ensure you have these API keys ready:

1. **Pinecone** - Vector database
   - API Key
   - Environment (e.g., "us-east-1-aws")
   - Index Name (e.g., "jobs")

2. **Groq** - LLM for resume/job processing
   - API Key
   - Model name (e.g., "llama-3.3-70b-versatile")

3. **Cerebras** - AI validation
   - API Key

4. **Supabase** - PostgreSQL database
   - URL
   - Anonymous Key
   - Service Role Key

5. **Authentication**
   - API_AUTH_HASH - Bearer token for securing endpoints

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

The `railway.toml` file is already configured correctly. Commit and push:

```bash
git add railway.toml
git commit -m "Configure Railway deployment for FastAPI backend"
git push origin master
```

### Step 2: Configure Railway

1. **Create New Project** on Railway.com
2. **Connect GitHub Repository**
3. **Select this repository**

### Step 3: Set Environment Variables

In Railway dashboard, add these environment variables:

```env
# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=jobs

# Groq Configuration
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile

# Cerebras Configuration
CEREBRAS_API_KEY=your_cerebras_api_key

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
API_AUTH_HASH=your_secure_bearer_token

# Optional: Minimal Logging
MINIMAL_LOGGING=false
```

### Step 4: Deploy

Railway will automatically:
1. Detect `railway.toml`
2. Run build command: `pip install -r requirements.txt`
3. Start server: `python run_server.py`
4. Expose on port 8080
5. Health check on `/health` endpoint

---

## 🔍 Verify Deployment

### Check Health Endpoint

```bash
curl https://your-railway-url.up.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-27T...",
  "version": "1.0.0"
}
```

### Test API Endpoints

**Get Stats:**
```bash
curl https://your-railway-url.up.railway.app/server/stats \
  -H "Authorization: Bearer YOUR_API_AUTH_HASH"
```

**Match Resume (POST with file upload):**
```bash
curl -X POST https://your-railway-url.up.railway.app/server/match-resume-upload \
  -H "Authorization: Bearer YOUR_API_AUTH_HASH" \
  -F "resume=@your_resume.pdf" \
  -F "top_k=20"
```

---

## 📁 What's Being Deployed

```
job_board_aggregator-main/job_board_aggregator-main/
├── run_server.py                       # Entry point (what Railway runs)
├── requirements.txt                     # Python dependencies
├── job_board_aggregator/
│   ├── server/
│   │   ├── app.py                      # FastAPI application
│   │   ├── routes.py                   # API endpoints
│   │   └── models.py                   # Data models
│   ├── api/
│   │   ├── groq_client.py              # Groq LLM integration
│   │   └── cerebras/                   # Cerebras validation
│   ├── embeddings/                     # Pinecone vector operations
│   └── util/                           # Resume parsing, utilities
```

---

## 🔧 railway.toml Configuration

Your `railway.toml` file configures the deployment:

```toml
[build]
builder = "nixpacks"
buildCommand = "cd job_board_aggregator-main/job_board_aggregator-main && pip install -r requirements.txt"

[deploy]
startCommand = "cd job_board_aggregator-main/job_board_aggregator-main && python run_server.py"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[deploy.healthcheck]
path = "/health"
timeout = 100
```

---

## 📊 API Endpoints (Once Deployed)

### Public Endpoints
- `GET /health` - Health check (no auth required)
- `GET /` - API information

### Protected Endpoints (Require Authorization Header)
- `POST /server/match-resume-upload` - Upload resume & get matches
- `POST /server/parse-resume` - Parse resume without matching
- `POST /server/fetch` - Trigger job fetching
- `GET /server/stats` - Database statistics

---

## 🔐 Security

All protected endpoints require:
```
Authorization: Bearer YOUR_API_AUTH_HASH
```

Set `API_AUTH_HASH` in Railway environment variables.

---

## 🐛 Troubleshooting

### Deployment Fails

**Issue:** Build command fails
**Solution:** Check that `requirements.txt` exists in correct path
```bash
ls job_board_aggregator-main/job_board_aggregator-main/requirements.txt
```

**Issue:** Server won't start
**Solution:** Check Railway logs for missing environment variables

### Health Check Fails

**Issue:** `/health` endpoint returns 503
**Solution:**
1. Check if all environment variables are set
2. Verify Pinecone/Supabase connections
3. Check Railway logs for errors

### API Returns Errors

**Issue:** 401 Unauthorized
**Solution:** Include correct `Authorization: Bearer YOUR_API_AUTH_HASH` header

**Issue:** 500 Internal Server Error
**Solution:** Check Railway logs - usually missing API keys

---

## 📈 Monitoring

View logs in Railway dashboard:
1. Select your project
2. Click "Deployments"
3. View real-time logs

Key log messages:
- `🚀 Starting Job Board Aggregator Server...`
- `✅ Environment variables reloaded successfully`
- `📌 PINECONE_API_KEY: ...`
- `🤖 GROQ_API_KEY: ...`

---

## 🔄 Update Deployment

After making code changes:

```bash
git add .
git commit -m "Update backend API"
git push origin master
```

Railway will automatically detect changes and redeploy.

---

## 🎯 What Runs Where

| Component | Runs On | Purpose |
|-----------|---------|---------|
| **Job Board Aggregator** | ☁️ Railway Cloud | REST API backend for job matching |
| **Job Application Automator** | 💻 Local Machine | Browser automation for form filling |
| **Job Matcher MCP** | 💻 Local Machine | Bridge between Claude Desktop & API |
| **GitHub Actions** | ☁️ GitHub | Automated job fetching every 40 min |

---

## ✅ Success Checklist

- [ ] Railway project created and connected to GitHub
- [ ] All environment variables configured
- [ ] Deployment successful (check Railway dashboard)
- [ ] `/health` endpoint returns healthy
- [ ] `/server/stats` endpoint returns data
- [ ] Resume matching works with test file
- [ ] GitHub Actions workflow configured for job fetching

---

## 🔗 Next Steps After Deployment

1. **Update MCP Job Matcher Server** with your Railway URL:
   ```bash
   # In job_matcher_mcp-main/job_matcher_mcp-main/.env
   BACKEND_URL=https://your-railway-url.up.railway.app
   ```

2. **Test End-to-End Flow:**
   - Open Claude Desktop
   - Use MCP tools to match resume
   - Verify it connects to your Railway backend

3. **Configure GitHub Actions** for automated job fetching:
   - Add secrets to GitHub repository
   - Enable workflows in `.github/workflows/`

---

## 📞 Support

If you encounter issues:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Test endpoints manually with curl
4. Check Pinecone/Supabase/Groq dashboards for API issues

---

**🎉 Your FastAPI backend is now deployed and ready to power job matching!**
