# Sofa Website

A full-stack e-commerce application for browsing and purchasing sofas and furniture, built with modern web technologies.

## Tech Stack

- **Frontend:** React 18 (TypeScript) + TailwindCSS + Vite
- **Backend:** FastAPI (Python 3.11) + SQLAlchemy 2.0 (async)
- **Database:** PostgreSQL 15
- **Authentication:** JWT (access + refresh tokens)
- **Containerization:** Docker + Docker Compose

## Prerequisites

- Docker & Docker Compose (for containerized setup)
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sofa-website
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your own secrets
   ```

3. **Start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs (Swagger): http://localhost:8000/docs
   - API Docs (ReDoc): http://localhost:8000/redoc

## Environment Variables

See `.env.example` for all required environment variables with descriptions.

## Project Structure

```
sofa-website/
├── frontend/          # React TypeScript SPA
│   ├── src/
│   │   ├── api/       # API client and endpoint functions
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # React context providers
│   │   ├── hooks/     # Custom React hooks
│   │   ├── pages/     # Page components
│   │   ├── router/    # Route definitions
│   │   ├── types/     # TypeScript interfaces
│   │   └── utils/     # Utility functions
│   └── ...
├── backend/           # FastAPI Python API
│   ├── app/
│   │   ├── api/       # API route handlers
│   │   ├── core/      # Security, exceptions
│   │   ├── models/    # SQLAlchemy models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── services/  # Business logic
│   │   └── middleware/ # CORS, etc.
│   ├── alembic/       # Database migrations
│   └── tests/         # Pytest test suite
└── docker-compose.yml
```

## Development (without Docker)

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database Migrations
```bash
cd backend
alembic upgrade head        # Apply all migrations
alembic revision --autogenerate -m "description"  # Create new migration
```

## Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npx vitest run
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment

The project includes a GitHub Actions CI/CD pipeline (`.github/workflows/ci-cd.yml`) that:
1. Lints and tests both frontend and backend
2. Builds Docker images
3. Pushes to GitHub Container Registry (on main branch)

## License

MIT