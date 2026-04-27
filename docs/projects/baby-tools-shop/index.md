# Baby Tools Shop

A simple Django-based web application for browsing baby product categories and products.

This project is part of a DevSecOps course and demonstrates how to run the application inside a Docker container and deploy it to a Linux server.

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [Run with Docker](#run-with-docker)
- [Usage](#usage)
  - [Admin Panel](#admin-panel)
  - [Creating Categories and Products](#creating-categories-and-products)
  - [Static and Media Files](#static-and-media-files)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Testing Checklist](#testing-checklist)
- [Security Notes](#security-notes)
- [Skills Demonstrated](#skills-demonstrated)
- [Author](#author)

---

## Description

The **Baby Tools Shop** is a lightweight demo webshop built with **Django**.

Users can browse product categories and products, while administrators can manage content through the Django admin interface.

This project demonstrates:

- Django project structure
- server-side rendered web applications
- Docker containerization
- environment-based configuration
- deployment to a remote server
- secure secret handling with `.env`

The project was built as a practical DevSecOps exercise.

---

## Tech Stack

- **Python:** 3.9
- **Framework:** Django 4.0.2
- **Database:** SQLite
- **Containerization:** Docker
- **Web Server:** Django development / Gunicorn-ready setup
- **Configuration:** Environment Variables

---

## Project Structure

```text
baby-tools-shop/
├─ babyshop_app/
│  ├─ babyshop/
│  ├─ products/
│  ├─ templates/
│  ├─ static/
│  └─ manage.py
├─ .gitignore
├─ Checklist_Baby_Tools_Shop
├─ Dockerfile
├─ example.env
├─ requirements.txt
└─ README.md
```

---

## Quickstart

### Prerequisites

Required tools:

- Docker installed
- Git installed

---

### Run with Docker

### 1. Clone the repository

```bash
git clone https://github.com/ognjenmanojlovic/baby-tools-shop.git
cd baby-tools-shop
```

### 2. Create your environment file

```bash
cp example.env .env
```

Open `.env` and adjust the values to your environment.

### 3. Build the Docker image

```bash
docker build -t baby-tools-shop .
```

### 4. Run the container

```bash
docker run --rm --env-file .env -p 8025:8025 baby-tools-shop
```

### 5. Open in browser

```text
http://127.0.0.1:8025
```

---

## Usage

## Admin Panel

To access the Django admin interface:

```text
http://127.0.0.1:8025/admin
```

Create an admin user:

```bash
docker exec -it baby-tools-shop python babyshop_app/manage.py createsuperuser
```

---

## Creating Categories and Products

Inside the Django admin panel:

- create categories
- create products
- assign prices
- upload product images
- manage descriptions

---

## Static and Media Files

- Static files are served by Django
- Uploaded product images are stored inside `media/`
- Media files are excluded from Git

---

## Configuration

### Environment Variables

The project uses environment variables for configurable and sensitive settings:

```text
DJANGO_SECRET_KEY
DJANGO_DEBUG
DJANGO_ALLOWED_HOSTS
```

Values should be stored inside `.env` and never committed publicly.

---

## Deployment

### Deploying to a Server

### 1. Install Docker

```bash
sudo apt update
sudo apt install -y docker.io
```

### 2. Clone the repository

```bash
git clone https://github.com/ognjenmanojlovic/baby-tools-shop.git
cd baby-tools-shop
git checkout development
```

### 3. Prepare environment file

```bash
cp example.env .env
```

Edit `.env` and configure:

- secure `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS=<your-server-ip>`

### 4. Build image

```bash
sudo docker build -t baby-tools-shop .
```

### 5. Run container

```bash
sudo docker run -d --restart unless-stopped --env-file .env -p 8025:8025 --name baby-tools-shop baby-tools-shop
```

### 6. Open in browser

```text
http://<your-server-ip>:8025
```

---

## Testing Checklist

- [x] Application runs successfully inside Docker
- [x] Server deployment completed
- [x] Public access works on port `8025`
- [x] Environment variables loaded correctly
- [x] Django admin accessible
- [x] Product management works

---

## Security Notes

- No passwords or secrets committed
- `.env` excluded via `.gitignore`
- Use strong secret keys
- Restrict `ALLOWED_HOSTS`
- Keep Docker host updated
- Use reverse proxy / HTTPS in production

---

## Skills Demonstrated

This project demonstrates practical skills in:

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Python Development | Django application |
| Web Development | Categories / products |
| Containerization | Docker workflow |
| Deployment | Linux server hosting |
| Security Awareness | Secret handling |
| Configuration Management | `.env` setup |
| DevSecOps Foundations | App + container + deployment |

---

## Conclusion

The **Baby Tools Shop** project demonstrates how to package a Django application into Docker and deploy it securely to a remote Linux server.

It combines backend development, containerization, configuration management, and deployment fundamentals in one practical beginner-friendly DevSecOps project.

---

## Author

**Ognjen Manojlovic**

- [Instagram](https://instagram.com/0gisha)
- [LinkedIn](https://www.linkedin.com/in/ognjen-manojlovic-299a2b2a0)
