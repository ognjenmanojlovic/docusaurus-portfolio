# Juice Shop Master Challenges

> ⚠️ Disclaimer:  
> This repository is intended strictly for educational purposes.  
> All activities demonstrated here were conducted in a controlled environment on intentionally vulnerable applications.  
> Do not use these techniques against systems you do not own or have explicit permission to test.

---

## 📘 Table of Contents

- [Project Overview](#project-overview)
- [Challenges Completed](#challenges-completed)

---

<a id="project-overview"></a>
## 📋 Project Overview

This repository documents selected OWASP Juice Shop challenges solved as part of a DevSecOps learning project.

The focus of this project is to:
- demonstrate practical exploitation of real-world web vulnerabilities
- provide clear, step-by-step reproduction guides
- explain the impact and security risks of each vulnerability

Each challenge includes:
- a detailed technical write-up
- reproducible attack steps
- risk and impact explanation
- recommended mitigation strategies

---

<a id="challenges-completed"></a>
## ✅ Challenges Completed

The following challenges are included in this repository:

### 1. Forged Review
- **Category:** Broken Access Control → Horizontal Privilege Escalation
- **Flag:** `score-board#Forged Review`
- **Summary:** Submits a product review on behalf of another user by manipulating request data.
- 📄 [Read Full Report](./forged-review)
- 🎥 [Watch Video Demo](https://somup.com/cOfDVmVcPJ3)

---

### 2. Change Bender's Password
- **Category:** Broken Authentication
- **Flag:** `score-board#Change Bender's Password`
- **Summary:** Resets another user's password without proper authorization.
- 📄 [Read Full Report](./change-benders-password)
- 🎥 [Watch Video Demo](https://somup.com/cOfDVHVcPJO)

---

### 3. User Credentials
- **Category:** Injection
- **Flag:** `score-board#User Credentials`
- **Summary:** Extracts sensitive user login data through an injection vulnerability.
- 📄 [Read Full Report](./user-credentials)
- 🎥 [Watch Video Demo](https://somup.com/cOfDVJVcPJy)

---

### 4. Poison Null Byte
- **Category:** Improper Input Validation
- **Flag:** `score-board#Poison Null Byte`
- **Summary:** Bypasses file type validation using a null byte injection technique.
- 📄 [Read Full Report](./poison-null-byte)
- 🎥 [Watch Video Demo](https://somup.com/cOfDVdVcPJA)