# Overview

Gem Assist Enterprise is a professional security and trust services platform combining cybersecurity expertise with real estate services through a partnership with Alliance Trust Realty LLC. The platform offers digital threat monitoring, asset recovery, legal documentation, Telegram bot automation, and client access portals. Built with Flask and deployed via Gunicorn on Replit Autoscale.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Template Engine**: Jinja2 with Flask, using base template inheritance pattern
- **CSS Framework**: Bootstrap 5.3.0 for responsive design
- **Icon Systems**: Font Awesome 6.4.0 + Lucide Icons (via CDN)
- **Utility CSS**: Tailwind CSS (CDN, configured with custom GEM color tokens)
- **Theme**: Dark fintech theme using CSS variables and Tailwind classes
- **Layout**: `base.html` with extending child templates per service page

## Backend Architecture
- **Web Framework**: Flask (single `app` instance in `app.py`)
- **Entry Point**: `main.py` (dev) / `wsgi.py` (Vercel/WSGI)
- **Session Management**: Flask session with `SESSION_SECRET` env var
- **Logging**: Python logging at INFO level
- **Route Structure**: RESTful URL patterns per service area
- **Error Handling**: Custom 404/500 handlers returning index.html

## Key Files
- `app.py` — Single Flask app instance, all routes, all API endpoints
- `main.py` — Dev server entry point
- `wsgi.py` — WSGI/Vercel entry point
- `models.py` — SQLAlchemy database models
- `templates/base.html` — Base layout with nav, footer, Lucide icons
- `static/css/style.css` — Main stylesheet
- `static/js/main.js` — Core JS (scroll nav, forms, animations)
- `vercel.json` — Vercel deployment configuration
- `static/cache/notion_content.json` — Notion content cache fallback

## Database
- PostgreSQL via `DATABASE_URL` env var (optional — app runs without it)
- Models: Testimonial, ContactSubmission, NewsletterSubscriber, VIPBoardMember, BoardMember, Membership, User, OAuth

# External Dependencies

## Frontend
- Bootstrap 5.3.0 (CDN)
- Font Awesome 6.4.0 (CDN)
- Tailwind CSS (CDN with custom config)
- Lucide Icons (unpkg CDN)
- Google Fonts (Inter + fallbacks)

## Backend
- Flask, Flask-SQLAlchemy, Flask-Mail, Werkzeug
- Gunicorn (production server)
- notion-client (CMS, optional)
- openai (AI assistant, optional)
- psycopg2-binary (PostgreSQL)
- python-dotenv, requests, feedparser

## Service Integrations
- **Notion CMS**: Dynamic content (services, news, testimonials) via `NOTION_INTEGRATION_SECRET` + `NOTION_DATABASE_ID`
- **OpenAI**: AI cybersecurity assistant via `OPENAI_API_KEY`
- **Flask-Mail**: Contact/assessment/newsletter emails via SMTP env vars
- **GitHub OAuth**: Optional login via `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET`
- **Replit Auth**: Blueprint-based authentication when database is available

# Deployment

## Replit (Current)
- Autoscale deployment target
- Run: `gunicorn --bind=0.0.0.0:5000 --reuse-port main:app`
- Port 5000 → External port 80

## Vercel
- Config: `vercel.json` at repo root
- Uses `@vercel/python` builder on Python 3.11
- Entry: `main.py`

## GitHub Repository
- Remote: `https://github.com/support371/MymainEmterpriseWebsite.git`
- Clone URL: `https://github.com/support371/MymainEmterpriseWebsite.git`
- VSCode/Codex clone: `git clone https://github.com/support371/MymainEmterpriseWebsite.git`

# Performance (Measured)
- Home page: ~12ms
- Health check: ~4ms
- Most service pages: 4–25ms
- Teams page: ~12ms (fast-fails if Notion not configured)

# Bug Fixes Applied (March 2026)
- Removed duplicate `app = Flask(__name__)` creation (was causing config overwrite)
- Removed duplicate `/about-us` route (was causing Flask AssertionError on startup)
- Fixed `replit_auth` import order (was used before import)
- Added Notion timeout (3000ms) to prevent Teams page from hanging
- Created `static/cache/notion_content.json` fallback for cached content API
- Port 5000 conflict resolved by killing zombie process before workflow start
