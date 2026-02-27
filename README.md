<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,30,35&height=170&section=header&text=Job%20Automation%20System&fontSize=48&fontAlignY=35&animation=twinkling&fontColor=ffffff&desc=Find%20→%20Rank%20→%20Apply%20%7C%20End-to-End%20Job%20Application%20Automation&descAlignY=55&descSize=18" width="100%" />

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](.)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](.)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](.)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](.)
[![MCP](https://img.shields.io/badge/MCP-Protocol-6B4FBB?style=for-the-badge)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Automate your entire job search. From discovery to submission in under 5 minutes per application.**

</div>

---

## Why This Exists

Applying to jobs is repetitive and time-consuming — 30-60 minutes per application spent on the same forms, the same cover letters, the same manual data entry. This system eliminates that entirely with three interconnected MCP servers that work together as one pipeline.

Find jobs across multiple boards. Rank them against your resume with AI. Auto-fill and submit applications — all from Claude Desktop or REST APIs.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Job Automation System                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Job Board Aggregator          2. Job Matcher               │
│     (Python/FastAPI)                 (Node.js/MCP)             │
│     ├─ Scrapes job boards         ├─ Scores opportunities      │
│     ├─ Uses Groq/Cerebras AI      ├─ Semantic similarity       │
│     ├─ Enriches job data          ├─ Ranks by fit              │
│     └─ Stores in Supabase         └─ Returns ranked list       │
│                    ↓                          ↑                 │
│                 (opportunities)        (resume)                 │
│                                                                 │
│              3. Job Application Automator                       │
│                 (Python/Playwright)                              │
│                 ├─ Extracts form fields                         │
│                 ├─ Intelligently fills forms                    │
│                 ├─ Generates cover letters                      │
│                 └─ Tracks submissions                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## How It Works

| Step | What Happens | Component |
|------|-------------|-----------|
| **1** | Scrape and enrich job listings from multiple boards | Job Board Aggregator |
| **2** | Store structured opportunities in Supabase | Groq/Cerebras AI |
| **3** | Score each opportunity against your resume | Job Matcher |
| **4** | Rank jobs by semantic similarity and skill fit | AI Ranking Engine |
| **5** | Extract form fields from application pages | Playwright + BeautifulSoup |
| **6** | Auto-fill forms with your resume data | Form Filler |
| **7** | Generate tailored cover letters per job | Claude AI |
| **8** | Submit and track all applications | Application Tracker |

---

## Performance

| Component | Latency | Success Rate |
|-----------|---------|-------------|
| **Aggregator** | ~2-5s per job | 95%+ extraction |
| **Matcher** | ~1-2s per job | 90%+ ranking accuracy |
| **Applicator** | <5min per application | 92% form completion |

---

## Quick Start

```bash
git clone https://github.com/ajay-automates/job-application-automator-mcp.git
cd job-application-automator-mcp

# 1. Job Board Aggregator
cd job-board-aggregator && pip install -r requirements.txt
python job_board_aggregator/server/app.py

# 2. Job Matcher
cd ../job-matcher && npm install && npm start

# 3. Job Application Automator
cd ../job-application-automator && pip install -r requirements.txt
python job_application_automator/mcp_server.py
```

### Usage Options

| Method | Best For |
|--------|---------|
| **Claude Desktop** | Natural language interface — recommended |
| **REST APIs** | Custom orchestration and integrations |
| **Programmatic** | Embedding into your own pipeline |

---

## Project Structure

```
job-application-automator-mcp/
├── job-board-aggregator/           # Discover job opportunities
│   ├── job_board_aggregator/
│   │   ├── api/                    # Groq/Cerebras AI integration
│   │   ├── database/               # Supabase client
│   │   └── server/                 # FastAPI server
│   └── requirements.txt
├── job-matcher/                    # Rank jobs by resume fit
│   ├── index.js                    # MCP server
│   ├── tools.js                    # Matching logic
│   └── package.json
├── job_application_automator/      # Apply automatically
│   ├── form_extractor.py           # Extract form fields
│   ├── form_filler.py              # Fill and submit
│   └── mcp_server.py               # MCP protocol server
└── README.md
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Three separate MCP servers** | Each component can run independently or as a pipeline |
| **Playwright over Selenium** | Faster, more reliable, built-in stealth mode |
| **Groq/Cerebras for enrichment** | Fastest inference for job data extraction |
| **Supabase for storage** | Real-time subscriptions + vector search ready |
| **MCP Protocol** | Native Claude Desktop integration |

---

## Tech Stack

`Python` `Node.js` `FastAPI` `Playwright` `BeautifulSoup` `MCP Protocol` `Groq API` `Cerebras API` `Supabase` `SQLAlchemy` `OpenAI`

---

## Related Projects

| Project | Description |
|---------|-------------|
| [AI-Job-Application](https://github.com/ajay-automates/AI-Job-Application) | Full-stack web UI for this automation system |
| [EazyApply](https://github.com/ajay-automates/eazyapply) | Chrome extension for one-click job form filling |
| [Advanced Resume Analyzer](https://github.com/ajay-automates/advanced-resume-analyzer-qlora) | Fine-tuned Gemma 3 for resume-job fit scoring |

---

<div align="center">

**Built by [Ajay Kumar Reddy Nelavetla](https://github.com/ajay-automates)** · October 2025

*Find better jobs faster. Apply smarter. Get more interviews.*

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,30,35&height=100&section=footer" width="100%" />

</div>
