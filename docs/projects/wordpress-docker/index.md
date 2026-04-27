# DevSecOps WordPress Lab

A minimal DevSecOps-themed **WordPress environment** deployed entirely with Docker and Docker Compose.

This project demonstrates how to containerize a **WordPress + MariaDB** setup, manage configuration through environment variables, and deploy the application to a remote Linux server.

It was created as part of a DevSecOps learning environment and focuses on practical container deployment workflows.

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
- [Deployment (Server)](#deployment-server)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing Checklist](#testing-checklist)
- [Security Notes](#security-notes)
- [Skills Demonstrated](#skills-demonstrated)
- [Author](#author)

---

## Description

The **DevSecOps WordPress Lab** is a lightweight WordPress deployment running inside Docker containers.

The setup includes:

- a WordPress application container
- a MariaDB database container
- persistent Docker volumes
- environment-based configuration
- server deployment workflow

This project demonstrates:

- WordPress containerization using Docker
- multi-container orchestration with Docker Compose
- secure configuration using environment variables
- persistent data storage with volumes
- deployment to a remote Linux server
- practical DevSecOps fundamentals

---

## Tech Stack

- **Application:** WordPress
- **Database:** MariaDB
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Configuration:** `.env` environment variables
- **Deployment Target:** Linux Server

---

## Project Structure

```text
wordpress-docker/
├─ docker-compose.yaml
├─ example.env
├─ .gitignore
├─ README.md
└─ docs/
   ├─ Wordpress_Checklist.pdf
   └─ project-images/
      ├─ homepage.png
      └─ admin-dashboard.png
```

---

## Quickstart

### Prerequisites

Required tools:

- Docker installed
- Docker Compose plugin installed
- Git installed

---

## Deployment (Server)

### 1. Connect to your server

```bash
ssh <username>@<server-ip>
```

### 2. Verify Docker installation

```bash
docker --version
docker compose version
```

### 3. Clone the repository

```bash
git clone https://github.com/ognjenmanojlovic/wordpress-docker.git
cd wordpress-docker
```

### 4. Prepare environment variables

```bash
cp example.env .env
```

Edit `.env` and adjust:

- database name
- database username
- database password
- WordPress database settings

### 5. Start the application

```bash
docker compose up -d
```

### 6. Open in browser

```text
http://<server-ip>:8080
```

### 7. Persistence Test

Create a page inside WordPress, then restart:

```bash
docker compose down
docker compose up -d
```

The page should still exist afterward.

---

## Configuration

All configuration is managed through `.env`.

Create it from the template:

```bash
cp example.env .env
```

### Environment Variables

```env
MYSQL_DATABASE=wordpress
MYSQL_USER=wp_user
MYSQL_PASSWORD=change_me_db_password
MYSQL_ROOT_PASSWORD=change_me_root_password

WORDPRESS_DB_HOST=db:3306
WORDPRESS_DB_NAME=wordpress
WORDPRESS_DB_USER=wp_user
WORDPRESS_DB_PASSWORD=change_me_db_password
WORDPRESS_TABLE_PREFIX=wp_
```

All values should be customized before production use.

---

## Usage

Once the stack is running, WordPress is managed through the browser.

### Access Website

```text
http://<server-ip>:8080
```

### Complete Initial Installation

You will be prompted to configure:

- site title
- admin username
- admin password
- email address

### Admin Dashboard

```text
http://<server-ip>:8080/wp-admin
```

From the dashboard you can:

- create and edit pages
- publish blog posts
- change themes
- install plugins
- manage menus
- update settings

No further command-line interaction is required after setup.

---

## Testing Checklist

- [x] WordPress runs inside Docker
- [x] Application deployed on server
- [x] Persistent volumes survive restart
- [x] Accessible via port `8080`
- [x] MariaDB connection works
- [x] Environment variables applied correctly
- [x] WordPress admin accessible

---

## Security Notes

- `.env` must **never** be committed
- Change all default passwords before deployment
- Use strong admin credentials
- Avoid exposing server IP publicly
- No secrets stored in Git
- Use HTTPS / reverse proxy in production
- Keep WordPress and plugins updated

---

## Skills Demonstrated

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Containerization | Dockerized WordPress stack |
| Multi-Service Orchestration | Docker Compose |
| Database Deployment | MariaDB integration |
| Configuration Management | `.env` workflow |
| Linux Deployment | Remote server hosting |
| Security Awareness | Secret handling |
| DevSecOps Foundations | App + DB + deployment |

---

## Conclusion

The **DevSecOps WordPress Lab** demonstrates how to deploy a production-style content management system using Docker and Docker Compose.

It combines containerization, database management, persistent storage, server deployment, and secure configuration practices in one practical project.

This makes it a strong portfolio example for DevOps, DevSecOps, and infrastructure-focused roles.

---

## Author

**Ognjen Manojlovic**

- Instagram: https://instagram.com/0gisha
- LinkedIn: https://www.linkedin.com/in/ognjen-manojlovic-299a2b2a0
