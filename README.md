# Job Application Bot - Mobile Web App

A modern, mobile-first web application for AI-powered job matching and application automation.

## Features

- **AI-Powered Job Matching**: Upload your resume and get personalized job recommendations using vector search and AI validation
- **Smart Resume Parsing**: Supports PDF, DOCX, and TXT formats with automatic skill extraction
- **Quick Apply**: One-click application process with automatic tracking
- **Application History**: Track all your job applications in one place
- **Mobile-First Design**: Responsive UI optimized for mobile devices
- **Progressive Web App**: Install on your phone's home screen
- **Offline Support**: Access your application history even offline

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Integration**: Axios, React Query
- **UI Components**: Custom components with Lucide icons
- **Backend Integration**: Job Board Aggregator API (FastAPI)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to Job Board Aggregator API

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd job-app-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your backend API URL and token:
```
BACKEND_API_URL=https://jobboardaggregator-production.up.railway.app
BACKEND_API_TOKEN=your_backend_api_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
job-app-mobile/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes (backend proxy)
│   │   ├── jobs/         # Job-related endpoints
│   │   └── resume/       # Resume upload & parsing
│   ├── history/          # Application history page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ResumeUpload.tsx  # Resume upload with drag-and-drop
│   ├── JobFilters.tsx    # Job filtering UI
│   ├── JobCard.tsx       # Individual job card
│   ├── JobList.tsx       # Job listing container
│   └── JobDetailModal.tsx # Job details modal
├── lib/                   # Utility libraries
│   ├── api/              # API client & functions
│   ├── storage.ts        # LocalStorage helpers
│   └── utils.ts          # Common utilities
├── types/                 # TypeScript type definitions
├── public/               # Static assets
└── package.json          # Dependencies
```

## Key Features Explained

### Resume Upload & Matching

1. Upload your resume (PDF, DOCX, or TXT)
2. Optionally filter by location, keywords, and date
3. AI processes your resume and extracts skills
4. Vector search finds matching jobs from database
5. AI validation (2-model consensus) removes false positives
6. Results ranked by similarity score

### Job Application Flow

1. Browse matched jobs sorted by relevance
2. View full job details in modal
3. Click "Quick Apply"
4. Application tracked in history
5. Job page opens for final submission

### Application History

- Track all applications in one place
- Update application status (pending, applied, interviewing, rejected)
- Delete old applications
- View application date and job details

## API Endpoints

The app proxies requests to your Job Board Aggregator backend:

- `POST /api/resume/match` - Upload resume and get job matches
- `POST /api/resume/parse` - Parse resume only
- `GET /api/jobs/stats` - Get job database statistics
- `GET /api/health` - Health check

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

### Docker

```bash
docker build -t job-app-mobile .
docker run -p 3000:3000 job-app-mobile
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BACKEND_API_URL` | Job Board Aggregator API URL | Yes |
| `BACKEND_API_TOKEN` | API authentication token | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_URL` | Public app URL | No |

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- iOS Safari 14+
- Android Chrome 90+

## PWA Installation

### iOS
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

### Android
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Tap "Install App" or "Add to Home Screen"

## Development

### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## Integration with Existing Backend

This app integrates with your existing Job Board Aggregator backend:

- **Job Matching**: `/server/match-resume-upload` endpoint
- **Resume Parsing**: `/server/parse-resume` endpoint
- **Statistics**: `/server/stats` endpoint

No changes needed to your backend - all endpoints work as-is!

## Future Enhancements

- [ ] User authentication
- [ ] Cover letter generation
- [ ] Auto-fill form automation (desktop only)
- [ ] Email notifications
- [ ] Calendar integration for interviews
- [ ] Chrome extension
- [ ] AI-powered resume builder

## License

MIT

## Support

For issues and questions, please open a GitHub issue or contact support.

---

**Built with Next.js 14 & TypeScript**
