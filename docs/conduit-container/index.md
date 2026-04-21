# Conduit Container

The **Conduit Container Project** showcases how to containerize and **automatically deploy** a full-stack application (**Conduit RealWorld App**) using Docker, Docker Compose, **GitHub Actions**, and **GitHub Container Registry (GHCR)**.

This repository builds upon the existing Conduit Container setup and enhances it with a fully automated CI/CD pipeline for container image delivery and deployment.

This setup includes:

- A Django backend (REST API)
- An Angular frontend served via Nginx
- An SQLite database stored inside a persistent Docker volume
- Automated image build & deployment via GitHub Actions

All configuration values are stored in environment variables and can be easily adjusted before deployment.

This project demonstrates:

- Containerization of frontend + backend
- Multi-stage Docker builds
- Automated backend startup via `entrypoint.sh`
- Persistent SQLite database volume (`db-data`)
- Deployment to a remote Linux server
- **CI/CD pipeline with GitHub Actions**
- **Image distribution via GitHub Container Registry (GHCR)**

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
- [Deployment (Server)](#deployment-server)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing Checklist](#testing-checklist)
- [Security Notes](#security-notes)
- [Author](#author)

---

## Tech Stack

- **Frontend:** Angular + Node.js + Nginx
- **Backend:** Django REST Framework + Gunicorn
- **Database:** SQLite (persisted in `/data/db.sqlite3` inside Docker volume)
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Container Registry:** GitHub Container Registry (GHCR)

---

## Project Structure

```text
conduit-container/
├─ backend/                    # Django API (Git submodule)
│  ├─ Dockerfile
│  ├─ entrypoint.sh
│  ├─ requirements.txt
│  └─ ...
├─ frontend/                   # Angular Application (Git submodule)
│  ├─ Dockerfile
│  ├─ .dockerignore
│  └─ ...
├─ .github/
│  └─ workflows/
│     └─ deployment.yaml       # GitHub Actions CI/CD pipeline
├─ docs/
│  ├─ images/
│  │  └─ homepage.png
│  ├─ Conduit_Container_Checkliste
│  └─ Conduit_Deployment_Checkliste
├─ docker-compose.yaml
├─ example.env
├─ .gitignore
└─ README.md
```

---

## CI/CD Pipeline

The CI/CD pipeline is implemented using **GitHub Actions** and extends the original container project with fully automated deployment.

### Pipeline Workflow

1. A GitHub Actions workflow is triggered on repository updates
2. The repository and its submodules are checked out
3. Backend and frontend Docker images are built
4. Images are pushed to GitHub Container Registry (GHCR)
5. The target server is accessed securely via SSH
6. The latest container images are pulled on the server
7. The application is deployed using Docker Compose

Containers are only recreated if images or configuration have changed.

No manual interaction with the server is required after the initial setup.

---

## Quickstart

### Prerequisites

Check Docker:

```bash
docker --version
```

Check Docker Compose:

```bash
docker compose version
```

Check Git:

```bash
git --version
```

---

## Deployment (Server)

> **Note:** Manual deployment steps are only required for the initial setup. All future deployments are handled automatically by GitHub Actions.

### 1. Connect to your server

```bash
ssh <username>@<server-ip>
```

### 2. Clone and enter the repository

```bash
git clone --recursive https://github.com/ognjenmanojlovic/conduit-container.git
cd conduit-container
```

### 3. Prepare environment variables

```bash
cp example.env .env
```

Edit `.env` and configure:

- Backend port
- Frontend port
- **Django allowed hosts (your server IP must be included!)**
- Django superuser values
- SQLite DB path (default: `/data/db.sqlite3`)

### 4. Initial startup

```bash
docker compose pull
docker compose up -d
```

After the initial setup, **all future deployments are performed automatically** via GitHub Actions.

---

## Configuration

All configuration is done via `.env`.

### Environment Variables

```env
# Ports
FRONTEND_PORT=8282
BACKEND_PORT=8000

# Django allowed hosts
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,<your.server.ip>

# SQLite DB Path
DJANGO_DB_PATH=/data/db.sqlite3

# Django Superuser
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=change_me_admin_pass
```

---

## Usage

### Start stack

```bash
docker compose up -d
```

### Stop stack

```bash
docker compose down
```

### Backend logs

```bash
docker compose logs backend
```

### Frontend logs

```bash
docker compose logs frontend
```

### Access Django admin panel

```text
http://<server-ip>:8000/admin/
```

---

## Testing Checklist

- [x] Frontend container builds successfully
- [x] Backend container builds successfully
- [x] SQLite database stored in persistent Docker volume
- [x] Backend reachable via `<server-ip>:8000/api/...`
- [x] Frontend reachable via `<server-ip>:8282`
- [x] Django admin login works
- [x] Environment variables loaded correctly
- [x] Application persists data across restarts
- [x] `.env` excluded from Git
- [x] GitHub Actions pipeline runs successfully
- [x] Images pushed to GHCR
- [x] Automated deployment via SSH works

---

## Security Notes

- `.env` must **never** be committed
- Secrets are managed via **GitHub Actions Secrets**
- SSH authentication uses key-based login only
- Docker images are pulled from a trusted registry (GHCR)
- No credentials are hardcoded in the repository

---

## Author

**Ognjen Manojlovic**

- Instagram: https://instagram.com/0gisha
- LinkedIn: https://www.linkedin.com/in/ognjen-manojlovic
