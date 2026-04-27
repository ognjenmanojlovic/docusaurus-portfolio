# Juice Shop Practice Challenges

| Item | Detail |
|---|---|
| Project | OWASP Juice Shop Practice |
| Purpose | Hands-on challenge walkthroughs for learning offensive and defensive web security concepts |
| Platform | OWASP Juice Shop |
| Focus Areas | Web Exploitation, Burp Suite, Authentication, Access Control, Input Validation |
| Difficulty Levels | 1-Star, 2-Star, 3-Star |
| Status | In Progress / Continuously Expanded |

---

## Overview

This section contains additional **practice challenges** completed in OWASP Juice Shop beyond the main graded project scope.

The goal is to improve practical penetration testing skills by solving real-world inspired vulnerabilities and documenting:

- exploitation steps  
- tools used  
- security impact  
- root cause analysis  
- mitigation strategies  

Each write-up is structured for fast review and reproducible learning.

---

## Challenge Categories

### ⭐ One-Star Challenges

Introductory tasks focused on quick wins and common weaknesses.

Included topics:

- Input Validation  
- DOM XSS  
- Hidden Functionality  
- Metrics Exposure  
- Redirect Logic  

---

### ⭐⭐ Two-Star Challenges

Intermediate tasks requiring chaining steps, hidden routes, or stronger understanding of APIs.

Included topics:

- Broken Access Control  
- Weak Authentication  
- Security Misconfiguration  
- Password Attacks  
- Sensitive Data Exposure  

---

### ⭐⭐⭐ Three-Star Challenges

Advanced tasks involving privilege escalation, business logic abuse, automation bypasses, and deeper request manipulation.

Included topics:

- Admin Privilege Escalation  
- CAPTCHA Bypass  
- Forged Requests  
- Fraudulent Premium Access  
- OSINT-Based Account Takeover  

---

## Tools Used

Common tools used throughout this practice lab:

- Burp Suite (Proxy / Repeater / Intruder)  
- Browser DevTools  
- EXIF Metadata Tools  
- Wordlists / OSINT Sources  
- Manual API Testing  

---

## Why This Matters

These exercises simulate real security issues that appear in production systems:

- insecure authentication flows  
- missing authorization checks  
- weak anti-automation controls  
- trust in client-side data  
- exposed sensitive information  

Understanding how these flaws are exploited helps design stronger defenses.

---

## Navigation

Use the sidebar to browse challenges by difficulty:

- **one-star-challenges**  
- **two-star-challenges**  
- **three-star-challenges**

---

## Disclaimer

This documentation is intended **strictly for educational purposes**.

All activities were performed in a controlled environment using the intentionally vulnerable OWASP Juice Shop application.

Do not use these techniques against systems you do not own or do not have permission to test.