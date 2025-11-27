# Getting Started with Job Application Bot Mobile App

Welcome! This guide will help you get your mobile job application bot up and running in minutes.

## What You Built

A beautiful, mobile-first web application that:
- 📱 Works perfectly on phones, tablets, and desktop
- 🤖 Uses AI to match your resume with jobs (70%+ accuracy)
- ⚡ One-click job applications
- 📊 Tracks all your applications
- 🔄 Works offline (application history)
- 📲 Can be installed as an app on your phone (PWA)

## Quick Start (5 Minutes)

### Step 1: Install Backend API Token

You need to get your backend API token from your Job Board Aggregator deployment.

**Find your token:**
1. Go to your Railway deployment of Job Board Aggregator
2. Look for `API_AUTH_HASH` environment variable
3. Copy the value

**Set it in your mobile app:**
```bash
# Edit .env.local
BACKEND_API_TOKEN=your_token_here
```

### Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Test the App

1. **Upload a resume** (use the one in your parent directory: `Ajay Kumar Reddy Nelavetla Resume.pdf`)
2. **Click "Find Matching Jobs"**
3. **Browse results** and click on jobs
4. **Try "Quick Apply"** to see the application flow
5. **Visit `/history`** to see your application history

That's it! You're running. 🎉

## How It Works

### Architecture Overview

```
Mobile App (Next.js)
    ↓ HTTP Request
API Routes (/api/*)
    ↓ Proxy Request
Job Board Aggregator Backend (Railway)
    ↓ Process
├─ Parse Resume (PDF/DOCX/TXT)
├─ Enhance with Groq LLM
├─ Vector Search (Pinecone)
├─ Filter & Rank Jobs
└─ AI Validate (Cerebras 2-model)
    ↓ Response
Mobile App Shows Results
```

### Data Flow Example

**User Action**: Upload resume and search

1. **Frontend** (`app/page.tsx`):
   - User uploads `resume.pdf`
   - User clicks "Find Matching Jobs"

2. **API Route** (`app/api/resume/match/route.ts`):
   - Receives file upload
   - Forwards to backend: `POST /server/match-resume-upload`
   - Returns results

3. **Backend Processing**:
   - Parses PDF → extracts text
   - Enhances resume with Groq LLM
   - Searches Pinecone vector DB
   - Validates with Cerebras AI
   - Returns 25 matching jobs

4. **Frontend Display**:
   - Shows job cards with similarity scores
   - Allows filtering, viewing details
   - One-click apply to jobs

## File Structure

```
job-app-mobile/
├── app/
│   ├── page.tsx              # Home page (resume upload + results)
│   ├── history/page.tsx      # Application history dashboard
│   ├── layout.tsx            # Root layout
│   └── api/                  # API routes (proxy to backend)
│       ├── resume/match/     # Resume matching endpoint
│       ├── resume/parse/     # Resume parsing endpoint
│       ├── jobs/stats/       # Job statistics
│       └── health/           # Health check
│
├── components/
│   ├── ResumeUpload.tsx      # Drag & drop resume upload
│   ├── JobFilters.tsx        # Search filters (location, keywords)
│   ├── JobCard.tsx           # Individual job display
│   ├── JobList.tsx           # Job listing container
│   ├── JobDetailModal.tsx    # Full job details modal
│   ├── ApplyModal.tsx        # Application confirmation modal
│   └── ui/                   # Reusable UI components
│
├── lib/
│   ├── api/
│   │   ├── client.ts         # Axios client setup
│   │   └── jobs.ts           # Job API functions
│   ├── storage.ts            # LocalStorage helpers
│   └── utils.ts              # Utility functions
│
├── types/
│   └── index.ts              # TypeScript types
│
└── public/
    └── manifest.json          # PWA configuration
```

## Key Features Explained

### 1. Resume Upload (`components/ResumeUpload.tsx`)

**Features:**
- Drag & drop interface
- File validation (PDF, DOCX, TXT only)
- 15MB size limit
- Beautiful UI with upload progress

**Usage:**
```tsx
<ResumeUpload
  onFileSelect={(file) => setSelectedFile(file)}
  selectedFile={selectedFile}
  onRemove={() => setSelectedFile(null)}
/>
```

### 2. Job Matching (`lib/api/jobs.ts`)

**Function:**
```typescript
uploadResumeAndMatch(file: File, filters?: JobFilters): Promise<MatchResponse>
```

**Filters:**
- Keywords (e.g., "Python, Machine Learning")
- Location (e.g., "Remote, San Francisco")
- Date range (posted in last 7/30/90 days)
- Sort by similarity or date

**Response:**
```typescript
{
  matches: JobMatch[],           // Matched jobs
  total_matches: number,          // Total count
  resume_processing: {
    filename: string,
    enhancement_used: boolean,
    parsing_method: string
  },
  extracted_skills: string[],     // AI-extracted skills
  user_experience: number,        // Years of experience
  validation_info: {
    models_used: string[],        // AI models for validation
    false_positives_removed: number
  }
}
```

### 3. Job Cards (`components/JobCard.tsx`)

**Features:**
- Similarity score badge (color-coded)
- Company name & job title
- Location, experience, posted date
- Job description preview
- Quick Apply button
- View Details button
- External link to job

**Color Coding:**
- 🟢 80%+ match: Green
- 🔵 60-79% match: Blue
- 🟡 40-59% match: Yellow
- ⚪ <40% match: Gray

### 4. Application History (`app/history/page.tsx`)

**Features:**
- All applications in one place
- Status tracking (pending, applied, interviewing, rejected)
- Update status dropdown
- Delete applications
- Link to original job posting

**Storage:**
- Saved in LocalStorage
- Persists across sessions
- No server required

### 5. Progressive Web App (PWA)

**Installation:**
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Install App

**Benefits:**
- Launch from home screen like native app
- Full screen mode
- Offline application history
- Faster loading

## API Endpoints

| Endpoint | Method | Purpose | Request | Response |
|----------|--------|---------|---------|----------|
| `/api/resume/match` | POST | Match jobs to resume | FormData with file | MatchResponse |
| `/api/resume/parse` | POST | Parse resume only | FormData with file | ParsedResume |
| `/api/jobs/stats` | GET | Get job statistics | - | Stats object |
| `/api/health` | GET | Health check | - | Status object |

## Environment Variables

```env
# Required
BACKEND_API_URL=https://jobboardaggregator-production.up.railway.app
BACKEND_API_TOKEN=your_backend_token

# Optional
NEXT_PUBLIC_APP_NAME=Job Application Bot
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Common Tasks

### Update Backend URL

Edit `.env.local`:
```env
BACKEND_API_URL=https://your-new-backend.com
```

### Add New Filter

1. Add to `types/index.ts`:
```typescript
export interface JobFilters {
  // ... existing
  salary?: string;  // New filter
}
```

2. Update `components/JobFilters.tsx`:
```tsx
<input
  type="text"
  value={filters.salary || ''}
  onChange={(e) => onChange({ ...filters, salary: e.target.value })}
/>
```

3. Update API route to pass filter to backend

### Customize Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    // ...
  }
}
```

### Add Analytics

Add to `app/layout.tsx`:
```tsx
import Script from 'next/script'

// In <head>
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

## Troubleshooting

### Build Errors

**Issue**: `Module not found`
```bash
npm install
```

**Issue**: TypeScript errors
```bash
npm run lint
```

### Runtime Errors

**Issue**: "Failed to fetch jobs"
- Check `BACKEND_API_URL` in `.env.local`
- Verify backend is running: `curl https://your-backend.com/health`
- Check `BACKEND_API_TOKEN` is correct

**Issue**: "CORS error"
- Backend needs to allow your domain in CORS settings
- Check backend logs

**Issue**: Resume upload fails
- File must be PDF, DOCX, or TXT
- File must be under 15MB
- Check browser console for errors

### Mobile Issues

**Issue**: PWA won't install
- Must use HTTPS (not localhost)
- Check `manifest.json` is valid
- Ensure icons exist in `/public`

**Issue**: Touch interactions don't work
- Check for JavaScript errors
- Ensure touch events are enabled
- Test in mobile browser's responsive mode

## Next Steps

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

### Integrate with Your Backend

Your app already integrates with the Job Board Aggregator backend. No changes needed!

**Verify integration:**
1. Check health: `curl http://localhost:3000/api/health`
2. Upload test resume
3. Check backend logs for requests

### Add Features

**Ideas:**
- User authentication (NextAuth.js)
- Save favorite jobs
- Email notifications
- Calendar integration for interviews
- Cover letter generator
- Auto-apply automation (desktop only)

### Customize Branding

1. **Update name**: Edit `app/layout.tsx` metadata
2. **Change logo**: Replace icons in `/public`
3. **Update colors**: Edit `tailwind.config.ts`
4. **Update manifest**: Edit `public/manifest.json`

## Performance Tips

### Optimize Images
```bash
npm install sharp
```

Then use Next.js Image component:
```tsx
import Image from 'next/image'
<Image src="/logo.png" width={100} height={100} alt="Logo" />
```

### Enable Caching

Add to `next.config.js`:
```js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=60' },
      ],
    },
  ]
}
```

### Reduce Bundle Size

Use dynamic imports for heavy components:
```tsx
const JobDetailModal = dynamic(() => import('./JobDetailModal'))
```

## Support

- **GitHub Issues**: Open an issue for bugs
- **Documentation**: See README.md and DEPLOYMENT.md
- **Backend Issues**: Check Job Board Aggregator logs

## License

MIT

---

**Congratulations! You've built a professional job application mobile app.** 🎉

Start finding jobs at [http://localhost:3000](http://localhost:3000)
