# 📘 BeyondChats Blog Automation Project

This repository contains a **two-phase backend system** that demonstrates real-world engineering skills including **web scraping, database modeling, REST API development, third-party API integration, and LLM-powered content generation**.

The project is intentionally split into two phases with increasing complexity.

This project simulates a real-world content automation workflow used by media and SaaS companies.
It demonstrates how legacy content can be programmatically analyzed, enhanced using AI, and republished
through a scalable, API-driven architecture.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Axios**
- **Cheerio**
- **Google Custom Search API**
- **OpenAI API**

---

## 🔹 Phase 1: Blog Scraping & CRUD APIs

**Difficulty:** Moderate

### 🎯 Objective

- Scrape the **oldest blog articles** from the BeyondChats blog
- Store them in a PostgreSQL database
- Expose **CRUD APIs** to manage these articles

---

### 🧩 Phase 1 Features

#### ✅ Blog Scraping

- Scrapes articles from the **last page** of the BeyondChats blog
- If the last page contains **fewer than 5 articles**, the scraper automatically moves **backward page by page** until 5 articles are collected
- Extracted fields:
  - Title
  - URL
  - Excerpt
  - Published Date

  The scraper reverses article order on each page to ensure the absolute oldest articles
  are fetched first, not just the last page’s newest entries.


#### ✅ Database

- PostgreSQL database
- Prisma ORM for schema management and queries
- Duplicate articles are prevented using Prisma `upsert`

#### ✅ CRUD APIs

REST APIs built using Express.js:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | Fetch all articles |
| GET | `/articles/:id` | Fetch article by ID |
| POST | `/articles` | Create a new article |
| PUT | `/articles/:id` | Update an article |
| DELETE | `/articles/:id` | Delete an article |

---

### 📂 Phase 1 Folder Structure

```

Phase-1/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── node_modules/
├── prisma/
    ├── schema.prisma
    └── migrations/
    └── src/
        ├── app.js
        ├── server.js
        ├── config/
        ├── controllers/
        ├── routes/
        ├── scraper/
        └── services/


---

### How to Run Phase 1

```bash
cd phase-1
npm install
npx prisma migrate dev
npm run scrape
npm run dev
```

API will be available at: `http://localhost:3000/articles`

---

### Phase 1 Summary

In Phase 1, the system scrapes the oldest BeyondChats blog articles, stores them using Prisma with PostgreSQL, and exposes RESTful CRUD APIs using Express.js.

---

## 🔹 Phase 2: Automated Article Enhancement Pipeline

**Difficulty:** Very Difficult

### Objective

Build an end-to-end Node.js pipeline that:

1. Fetches articles from Phase-1 APIs
2. Searches article titles on Google
3. Fetches top-ranking competitor blog articles
4. Scrapes their main content
5. Uses an LLM to enhance the original article
6. Adds citations
7. Publishes the enhanced article using Phase-1 CRUD APIs

---

### Phase 2 Features

#### Fetch Articles from Phase-1 API

- Uses Phase-1 REST APIs
- No direct database access in Phase-2

#### Google Search Integration

- Uses Google Custom Search API
- Fetches the top 2 competitor blog/article links
- Avoids Google HTML scraping (legal and stable)

#### Competitor Content Scraping

- Scrapes only the main article content
- Ignores ads, headers, footers, and navigation
- Uses priority selectors with fallbacks
- Limits content size to ensure LLM safety

#### LLM-Powered Article Enhancement

  The LLM prompt explicitly enforces originality, prohibits sentence-level copying,
  and focuses on structure, tone, and clarity rather than content duplication.

- Uses OpenAI API
- Improves:
  - Formatting
  - Readability
  - Structure
  - SEO
- Ensures original content
- Explicitly prevents plagiarism

#### Citations

- Adds a References section at the bottom of the enhanced article
- Clearly cites competitor articles used as references

#### Publish Enhanced Article

- Publishes enhanced content via Phase-1 POST `/articles`
- Enhanced articles are stored as new records

---

### Phase 2 Folder Structure

```
phase-2/
├── services/
│   ├── articleFetcher.js
│   ├── googleSearch.js
│   ├── contentScraper.js
│   ├── llmService.js
│   └── publisher.js
├── utils/
│   └── extractText.js
├── index.js
├── package.json
└── .env
```

---

### Environment Variables (Phase 2)

```env
PHASE1_API_URL=http://localhost:3000/articles
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_search_engine_id
OPENAI_API_KEY=your_openai_key
```

---

### How to Run Phase 2

```bash
cd phase-2
npm install
npm run dev
```

---

### Phase 2 Summary

Phase 2 implements a content intelligence pipeline that fetches existing articles, analyzes top-ranking competitor content via Google Search, scrapes reference articles, enhances the original article using an LLM, adds citations, and republishes the improved article using existing APIs.

---

#### Failure Handling
- Gracefully skips Google results that are not articles
- Ignores empty or paywalled pages
- Caps scraped content length to prevent LLM token overflow


## 🔹 Phase 3: Frontend Development

The third phase introduces a frontend application built with **Vite** and **React**. This phase focuses on creating a user-friendly interface for interacting with the backend services.

### Key Features:
- **Responsive Design**: Ensures usability across devices.
- **Component-Based Architecture**: Utilizes React components for modular development.
- **API Integration**: Connects to the backend services for data retrieval and manipulation.

### Tech Stack:
- **Vite**
- **React**
- **CSS**
- **JavaScript**

---

## Notes

- Ensure Phase-1 is running before starting Phase-2
- Use `.env` files to manage sensitive configuration
- Follow the step-by-step guides above for setup and execution

## Submission Guidelines

### Local Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/aditya3012singh/BeyondChats.git
   cd BeyondChats
   ```
2. Install dependencies for each phase:
   - For Phase 1:
     ```bash
     cd Phase-1
     npm install
     ```
   - For Phase 2:
     ```bash
     cd Phase-2
     npm install
     ```
   - For Phase 3:
     ```bash
     cd phase-3-frontend
     npm install
     ```
3. Run the applications:
   - For Phase 1:
     ```bash
     npm run dev
     ```
   - For Phase 2:
     ```bash
     node index.js
     ```
   - For Phase 3:
     ```bash
     npm run dev
     ```

### Data Flow Diagram / Architecture Diagram
- [Insert your diagram here]

### Live Link
- [Insert the live link for your frontend project here]

---

## Architectural Decisions

- Phase-1 exposes clean REST APIs to decouple data storage from processing
- Phase-2 consumes APIs instead of accessing the database directly, ensuring loose coupling
- Phase-3 remains frontend-only and unaware of internal business logic
- This separation allows independent scaling of scraping, AI processing, and UI layers

# Architecture Diagram (Simple Is Enough)

You do not need anything fancy.
Use this ASCII diagram if you want to keep it simple:

User
 ↓
React Frontend (Phase 3)
 ↓
Articles API (Phase 1)
 ↓
PostgreSQL (Prisma)
 ↑
AI Pipeline (Phase 2)
 ├─ Google Search API
 ├─ Competitor Scraper
 └─ OpenAI API

## Intentional Non-Features

- No Google HTML scraping (used Google Custom Search API for stability & compliance)
- No direct database access in Phase-2 (API-driven design)
- No authentication (out of scope for task)
- No over-scraping to respect external sites

