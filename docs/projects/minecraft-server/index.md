# Minecraft Java Server

A fully containerized deployment of a **Minecraft Java Edition Server**, built using Docker and Docker Compose.

This setup transforms the traditional standalone Minecraft server into an isolated, reproducible, and easily deployable containerized service.

The **Minecraft Server Project** demonstrates how to package a game server inside a Docker image, control its behavior through environment variables, and operate it securely on a remote VM with persistent storage.

All configuration, data handling, and startup logic are structured according to DevSecOps best practices.

This setup includes:

- **A custom-built Minecraft Java server image** based on Java 21
- **Persistent world storage** using a Docker volume, ensuring game progress is retained across restarts
- **Environment-driven configuration**, such as EULA acceptance and JVM memory allocation
- **Manual download and upload of the official `server.jar`**, which is excluded from Git due to licensing restrictions
- **Port forwarding (`8888 -> 25565`)**, making the server accessible externally while running internally on the default Minecraft port
- **An automated startup script (`start.sh`)** that prepares required files and ensures consistent, reliable server startup

---

## Table of Contents

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

## Tech Stack

- **Java 21:** Eclipse Temurin base image
- **Application:** Minecraft Java Edition Server
- **Containerization:** Docker and Docker Compose
- **Persistence:** Docker volumes
- **Automation:** `start.sh` startup script
- **Deployment Target:** Remote Linux VM / server

---

## Project Structure

```text
minecraft-server/
├─ docs/
│  └─ Minecraft_Server_Checkliste
├─ docker-compose.yaml
├─ Dockerfile
├─ example.env
├─ start.sh
├─ server.jar                # Added manually, never committed to Git
├─ .gitignore
└─ README.md
```

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

### 1. Download the official Minecraft Server JAR

You must download the official **Minecraft Java Edition Server JAR** manually.

Download from the official Minecraft website and save the file as:

```text
server.jar
```

### 2. Connect to your server

```bash
ssh <username>@<server-ip>
```

### 3. Clone your repository

```bash
git clone https://github.com/ognjenmanojlovic/minecraft-server.git
cd minecraft-server
```

### 4. Copy environment template

```bash
cp example.env .env
```

Edit `.env` if needed, for example:

- EULA acceptance
- RAM allocation

### 5. Upload the Minecraft server JAR to your VM

From your **local machine**:

```bash
scp /path/to/server.jar <username>@<server-ip>:~/minecraft-server/server.jar
```

### 6. Build the Docker image

```bash
docker compose build
```

### 7. Start the Minecraft server

```bash
docker compose up -d
```

### 8. View server logs

```bash
docker compose logs -f mc-server
```

### 9. Connect via Minecraft Java Edition

Open Multiplayer and enter:

```text
<server-ip>:8888
```

---

## Configuration

All configuration is done via `.env`.

### Environment Variables

```env
EULA=TRUE
MC_MEMORY=1024M
```

These values can be adjusted depending on your server resources and testing needs.

---

## Usage

### Start server

```bash
docker compose up -d
```

### Stop server

```bash
docker compose down
```

### View logs

```bash
docker compose logs -f mc-server
```

### Rebuild image

```bash
docker compose build
```

---

## Testing Checklist

- [x] Docker image builds successfully
- [x] Server starts without errors
- [x] World data persists across restarts
- [x] Server reachable at `<server-ip>:8888`
- [x] `mcstatus` returns a valid server status
- [x] `.env` excluded from Git
- [x] `server.jar` not committed to the repository

---

## Security Notes

- Do not commit `server.jar`
- `.env` must stay private
- Avoid exposing unnecessary ports
- Use SSH keys for deployment
- Keep the Minecraft server updated
- Restrict server access to authorized users only

---

## Skills Demonstrated

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Containerization | Dockerized Java game server |
| Deployment | Remote VM hosting |
| Configuration Management | `.env`-based setup |
| Persistence | Docker volume for world data |
| Automation | `start.sh` startup handling |
| Security Awareness | Secret / binary exclusion from Git |
| DevSecOps Foundations | Reproducible service deployment |

---

## Conclusion

The **Minecraft Java Server** project demonstrates how to package and deploy a stateful game server using Docker and Docker Compose.

It combines Java-based application hosting, persistent storage, environment-driven configuration, and secure server deployment practices in one practical project.

This makes it a strong portfolio example for DevOps, DevSecOps, and infrastructure-focused roles.

---

## Author

**Ognjen Manojlovic**

- Instagram: https://instagram.com/0gisha
- LinkedIn: https://www.linkedin.com/in/ognjen-manojlovic
