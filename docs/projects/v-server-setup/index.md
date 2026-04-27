# V-Server Setup and Deployment

This repository documents the step-by-step setup of a Linux **V-Server** for a Developer Akademie project.

It includes:

- secure SSH configuration
- NGINX web server installation
- Git and GitHub SSH integration
- server hardening basics
- deployment preparation

The project demonstrates how to prepare a Linux server for secure remote administration and future application hosting.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Server Configuration](#server-configuration)
3. [GitHub Integration](#github-integration)
4. [Testing and Validation](#testing-and-validation)
5. [Repository Structure](#repository-structure)
6. [Checklist](#checklist)
7. [Security Highlights](#security-highlights)
8. [Author](#author)

---

## Project Overview

The goal of this project was to configure a secure Linux V-Server, install and customize the **NGINX** web server, and establish a secure connection to **GitHub** for version control and deployment workflows.

This setup forms the foundation for hosting future applications, reverse proxies, containerized services, or CI/CD deployments.

Key focus areas:

- secure remote access
- web server setup
- SSH key authentication
- removal of insecure login methods
- GitHub connectivity
- clean server administration workflow

---

## Server Configuration

The complete setup and configuration steps are documented in:

[`docs/server-setup.md`](./docs/server-setup)

This includes:

- SSH key generation
- secure server login
- password authentication deactivation
- NGINX installation
- custom NGINX configuration
- shell aliases for faster workflows
- SSH config shortcuts for easier connections

---

## GitHub Integration

The guide also covers secure GitHub integration for server-side workflows.

Included steps:

- configuring Git username and email
- generating a dedicated SSH key for GitHub
- adding the public key to GitHub
- verifying SSH authentication
- cloning repositories securely via SSH

This setup is especially useful for automated deployments and private repository access.

---

## Testing and Validation

After setup, the following tests were completed successfully:

- SSH access via key-based authentication works
- password login is disabled
- NGINX serves a custom HTML page on port `8081`
- GitHub SSH authentication confirms successful key registration
- Git is configured correctly
- server reachable remotely

---

## Security Highlights

This project intentionally focuses on secure defaults.

### Implemented Measures

| Security Measure | Benefit |
|-----------------|---------|
| SSH key login only | Stronger authentication |
| Password login disabled | Reduces brute-force risk |
| Dedicated GitHub SSH key | Better key separation |
| NGINX installed | Controlled web exposure |
| Config aliases | Safer repeatable workflows |

### Why It Matters

Many insecure servers fail because of weak initial setup.  
Hardening the environment early creates a stronger foundation for all later deployments.

---

## Repository Structure

```text
v-server-setup/
│
├── docs/
│   ├── server-setup.md
│   └── Checklist-V-Server.pdf
├── .gitignore
└── README.md
```

---

## Checklist

The official **Developer Akademie Checklist (PDF)** is included inside the `docs/` directory.

It was used to validate that all required setup steps were completed correctly.

---

## Practical Use Cases

After completion, this server can be used for:

- hosting web applications
- reverse proxy setups
- Docker deployments
- CI/CD runners
- GitHub pull-based deployments
- security labs
- staging environments

---

## Skills Demonstrated

This project demonstrates practical knowledge in:

- Linux administration
- SSH hardening
- web server management
- Git workflows
- deployment preparation
- infrastructure security
- remote operations

---

## Conclusion

The **V-Server Setup and Deployment** project demonstrates how to prepare a Linux server securely for professional development and hosting use cases.

It combines system administration, web server configuration, secure access control, and GitHub integration into one practical infrastructure project.

This makes it a strong foundational portfolio project for DevOps, DevSecOps, and cybersecurity-related roles.

---

## Author

**Ognjen Manojlovic**

© 2025
