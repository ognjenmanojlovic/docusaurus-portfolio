# Truck Signs API

This repository contains the Dockerized backend (**Django REST API**) of the Truck Signs project, with a strong focus on containerization, deployment, and backend infrastructure.

For the original project description, business context, and API specifications, refer to the official upstream documentation:

Truck Signs API – Original Project README

This repository intentionally contains **backend infrastructure only**.

The frontend is not part of this project and is expected to consume the API externally.

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Scope](#project-scope)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing Checklist](#testing-checklist)
- [Security Notes](#security-notes)
- [Skills Demonstrated](#skills-demonstrated)
- [Author](#author)

---

## Description

The **Truck Signs API** project focuses on building and deploying a production-style backend service using Django and PostgreSQL inside Docker containers.

It demonstrates how to package a REST API for reliable deployment while keeping secrets and runtime settings externalized through environment variables.

This project includes:

- Django REST API backend
- PostgreSQL database container
- automated migrations
- automated superuser creation
- Gunicorn application server
- Dockerized deployment workflow
- persistent database storage

---

## Tech Stack

- **Backend:** Django 2.2 + Django REST Framework
- **Application Server:** Gunicorn
- **Database:** PostgreSQL 14
- **Containerization:** Docker
- **Environment Management:** `.env`
- **Automation:** Bash entrypoint script
- **Deployment Target:** Linux server

---

## Project Scope

This repository contains **backend services only**.

### Included

- REST API endpoints for products, categories, orders, comments, and related resources
- Django Admin panel
- automated database migrations
- automated superuser creation via environment variables
- production-ready Docker image

### Not Included

- frontend / UI application
- reverse proxy (NGINX, Traefik, etc.)
- HTTPS termination layer

The API is designed to be consumed by a separate frontend.

---

## Project Structure

```text
truck_signs_api/
├─ backend/
├─ templates/
├─ truck_signs_designs/
│  ├─ settings/
│  │  ├─ base.py
│  │  ├─ dev.py
│  │  ├─ production.py
│  │  └─ test_docker.py
│  ├─ urls.py
│  └─ wsgi.py
├─ Dockerfile
├─ entrypoint.sh
├─ requirements.txt
├─ manage.py
├─ example.env
├─ README.md
├─ Truck_Signs_API_Checkliste.pdf
└─ .gitignore
```

---

## Prerequisites

Ensure the following tools are installed:

```bash
docker --version
git --version
```

---

## Quickstart

### 1. Connect to your server

```bash
ssh <username>@<server-ip>
```

### 2. Clone repository

```bash
git clone git@github.com:ognjenmanojlovic/truck_signs_api.git
cd truck_signs_api
```

### 3. Prepare environment variables

```bash
cp example.env .env
```

Edit `.env` and configure:

- Django secret key
- allowed hosts
- database credentials
- admin credentials

### 4. Create Docker network

```bash
docker network create trucksigns-net
```

### 5. Create database volume

```bash
docker volume create trucksigns-db
```

### 6. Start PostgreSQL database

```bash
docker run -d \
  --name db \
  --network trucksigns-net \
  -e POSTGRES_DB=<db_name> \
  -e POSTGRES_USER=<db_user> \
  -e POSTGRES_PASSWORD=<db_password> \
  -v trucksigns-db:/var/lib/postgresql/data \
  postgres:14
```

### 7. Build backend image

```bash
docker build -t truck-signs-api:latest .
```

### 8. Start backend container

```bash
docker run -d \
  --name truck-signs-api \
  --network trucksigns-net \
  --env-file .env \
  -p 8020:8020 \
  truck-signs-api:latest
```

---

## Configuration

All configuration is handled through environment variables.

On container startup, the application automatically:

- waits for PostgreSQL
- runs migrations
- collects static files
- creates superuser (if configured)
- starts Gunicorn on port `8020`

---

## Environment Variables

```env
DEBUG=0
SECRET_KEY=<your_secret_key>

ALLOWED_HOSTS=localhost,127.0.0.1,<your.server.ip>

DB_NAME=<db_name>
DB_USER=<db_user>
DB_PASSWORD=<db_password>
DB_HOST=db
DB_PORT=5432

DJANGO_SUPERUSER_USERNAME=<admin_user>
DJANGO_SUPERUSER_EMAIL=<admin_email>
DJANGO_SUPERUSER_PASSWORD=<admin_password>
```

---

## Usage

### API Endpoint Example

```text
http://<server-ip>:8020/truck-signs/products/
```

### Django Admin

```text
http://<server-ip>:8020/admin/
```

---

## Testing Checklist

- [x] API container builds successfully
- [x] PostgreSQL container runs correctly
- [x] Migrations execute automatically
- [x] Superuser created automatically
- [x] Admin login works
- [x] API returns JSON responses
- [x] Data persists after restart
- [x] `.env` not committed

---

## Security Notes

- Never commit `.env`
- Use strong passwords
- Restrict exposed ports
- Set `DEBUG=0`
- Configure `ALLOWED_HOSTS` correctly
- Keep dependencies updated
- Use reverse proxy / HTTPS in production

---

## Skills Demonstrated

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Backend Development | Django REST API |
| Database Operations | PostgreSQL container |
| Deployment | Linux server hosting |
| Containerization | Dockerized backend |
| Configuration Management | `.env` runtime settings |
| Automation | Entrypoint startup tasks |
| Security Awareness | Secret handling / hardened config |

---

## Conclusion

The **Truck Signs API** project demonstrates how to deploy a containerized backend service using Django and PostgreSQL in a structured production-style workflow.

It combines API development, database management, automation, and secure deployment practices in one practical infrastructure-focused project.

This makes it a strong portfolio example for backend, DevOps, and DevSecOps roles.

---

## Author

**Ognjen Manojlovic**

- GitHub: https://github.com/ognjenmanojlovic
- LinkedIn: https://www.linkedin.com/in/ognjen-manojlovic
- Instagram: https://instagram.com/0gisha
