# ForgeOps OmniCloud — Architecture Overview

## System Design

GEM Enterprises has been incrementally transformed into a full-stack SaaS platform with enterprise-grade backend services, multi-tenant support, and autonomous agent orchestration.

---

## Backend Architecture

### Core Services

**API Service** (Flask/Gunicorn)
- Primary application server
- Bound to `0.0.0.0:5000`
- Serves all HTTP endpoints and webhooks
- Health check: `GET /health`
- Status check: `GET /status`

**Worker Service** (Background Jobs)
- Async job processor
- Handles agent runs, long-lived operations
- Idempotent task execution
- Job queue via Redis
- **Status**: Scaffold prepared, ready for activation

**Database Layer**
- PostgreSQL (primary data store)
- Managed by SQLAlchemy ORM
- Models include:
  - Core entities (User, Organization, Project)
  - Business objects (Testimonial, BoardMember, Membership)
  - ForgeOps entities (AgentRun, AuditEvent, Task)

**Redis Queue**
- Background job queue
- Session storage
- Caching layer
- **Status**: Docker Compose ready

---

## Multi-Tenancy & RBAC

### Org Membership Model
- Users belong to Organizations (multi-tenant)
- Each membership has a role: Owner/Admin/Builder/Viewer
- Projects belong to Organizations
- Access enforcement at API boundary via `@require_role()` decorator

### Security Layers
1. **Session-based auth**: User ID + Org ID in session
2. **RBAC middleware**: `rbac.py` with `@require_role()` decorator
3. **Audit logging**: All meaningful actions logged to `AuditEvent`
4. **Rate limiting**: Built-in via Flask extensions

---

## Agent Orchestration Engine

### AgentRun Lifecycle
```
Intake → Plan → Execute → Verify → Deploy → Report
```

**Implementation** (`agent_run.py`):
- Phase-based state machine
- Task graph stored as JSON
- Deterministic execution flow
- Extensible for future real orchestration

**Current Status**: Skeleton ready, awaiting full integration

---

## Connectors & Integrations

### Implemented Connectors (Stubs)
All connector interfaces are defined in `connectors.py`:

- **GitHub** — Repository and workflow integration
- **Vercel** — Frontend deployment hooks
- **Cloudflare** — DNS and edge caching
- **OpenAI** — Chat and generation models
- **Gemini** — Google Vertex AI integration
- **Docker** — Container packaging
- **Cloud Providers** — AWS/GCP/Azure deployment adapters
- **Firebase** — Optional template support

**Activation Model**: Connectors auto-detect credentials from environment variables. If credentials missing, they log warnings but don't crash services.

---

## API Structure

### Health & Status Endpoints
- `GET /health` — Basic liveness probe (200 OK)
- `GET /status` — Detailed service status with metrics
- `GET /api/agent-runs` — Agent runs (requires RBAC: BUILDER+)
- `GET /api/audit-log` — Audit events (requires RBAC: ADMIN+)

### Existing GEM Routes
All original GEM Enterprises routes remain active:
- `GET /` — Home/dashboard
- `GET /about`, `/services`, `/leadership`, `/portfolio`
- `GET /contact` — Contact form
- `POST /apply-membership` — Membership applications
- `POST /submit-testimonial` — Testimonials
- Additional specialized routes (telegram, GitHub auth, etc.)

---

## Logging & Observability

### Structured Logging
- Service startup logs: version, environment, mode
- Per-request logging via Morgan middleware
- Structured JSON logging for machine parsing
- Audit events for all security-relevant actions

### Monitored Metrics
- Service uptime and availability
- Request count and latency
- Error rates and error types
- Agent run execution times
- Database connection pool status

---

## Deployment Targets

### Current (Replit)
- Running on `0.0.0.0:5000`
- Gunicorn with 4 workers + hot reload
- Development-friendly, production-capable

### Future (Multi-Cloud)
- Vercel (frontend deployment ready)
- AWS ECS/Fargate (adapter prepared)
- GCP Cloud Run (adapter prepared)
- Azure Container Apps (adapter prepared)
- Docker Compose (local parity environment)

---

## Data Persistence

### Database Tables
- **users** — System users
- **organizations** — Multi-tenant org containers
- **org_memberships** — User-Org relationships with roles
- **projects** — Projects within orgs
- **agent_runs** — Agent execution records
- **audit_events** — Immutable audit trail
- **testimonials**, **board_members**, **memberships** — GEM business data
- Additional tables for CMS, newsletter, VIP board

### Backup & Recovery
- Database backups via standard Postgres tools
- Audit log retention: append-only (no deletion)
- Point-in-time recovery support (Replit Postgres)

---

## Security Model

### Authentication
- Session-based (Flask sessions)
- GitHub OAuth available (optional integration)
- Password hashing via Werkzeug security

### Authorization (RBAC)
- Four-tier role model: Owner → Admin → Builder → Viewer
- Enforced at API boundary
- Per-organization scope

### Audit & Compliance
- Immutable audit events table
- All user actions logged with timestamp, IP, resource, action
- Exportable audit trail for compliance

### Input Safety
- All user input treated as untrusted
- Document uploads stored separately from user code
- SQL injection prevention via ORM

---

## Roadmap

### Current Phase ✓
- Foundation models and RBAC
- Agent run skeleton
- Connector interfaces
- Docker scaffolding
- CI pipeline
- Backend services active

### Next Phase
- Real connector implementations (if credentials available)
- Frontend deployment to Vercel
- Integration testing
- Performance optimization

### Future Phases
- Multi-region deployment
- Advanced observability (APM, tracing)
- Machine learning optimization
- Advanced security features (MFA, SSO)

---

## Summary

**Status**: Enterprise-grade backend foundation is ACTIVE and RUNNING

- ✓ Multi-tenant architecture
- ✓ RBAC enforcement
- ✓ Audit logging
- ✓ Agent orchestration skeleton
- ✓ Connector framework
- ✓ Health & status endpoints
- ✓ Production-safe configuration

**Ready for**: Frontend deployment, real integrations, and cloud scaling
