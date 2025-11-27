# ⚡ Quick Start - Get Running in 2 Minutes

## Step 1: Configure Backend (30 seconds)

Edit `.env.local` and add your backend token:

```bash
BACKEND_API_TOKEN=your_actual_token_here
```

**Where to find your token:**
- Go to your Railway deployment of Job Board Aggregator
- Look for `API_AUTH_HASH` environment variable
- Copy the value

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 3: Test the App (60 seconds)

1. **Upload your resume**
   - Drag & drop `Ajay Kumar Reddy Nelavetla Resume.pdf` from parent directory
   - OR click "Browse Files" and select any PDF/DOCX resume

2. **Add filters** (optional)
   - Location: "Remote, San Francisco"
   - Keywords: "Python, Machine Learning"

3. **Click "Find Matching Jobs"**
   - Wait 10-15 seconds for AI processing
   - See your matched jobs!

4. **Try Quick Apply**
   - Click any job card
   - Click "Quick Apply"
   - Application tracked in history

5. **View History**
   - Click "History" in header
   - See all your applications

## That's It! 🎉

You're now running a production-ready job application bot!

---

## Next Steps

### Deploy to Production (5 minutes)

**Option 1: Vercel (Easiest)**
```bash
npm install -g vercel
vercel
```

**Option 2: Push to GitHub**
```bash
git push origin quirky-chatelet
```
Then connect to Vercel/Netlify from their dashboards.

---

## Troubleshooting

### "Failed to fetch jobs"
- Check `.env.local` has correct `BACKEND_API_TOKEN`
- Verify backend is running: `curl https://jobboardaggregator-production.up.railway.app/health`

### "File upload failed"
- Ensure file is PDF, DOCX, or TXT
- Check file is under 15MB

### Build errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

---

## Documentation

- **Quick Start**: You're here! ✓
- **Full Guide**: `GETTING_STARTED.md`
- **Deployment**: `DEPLOYMENT.md`
- **Project Overview**: `PROJECT_SUMMARY.md`
- **API Docs**: `README.md`

---

**Need help?** Check the docs above or open a GitHub issue.

Happy job hunting! 🚀
