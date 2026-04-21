# Hashcat Lab

## Overview

This section contains practical **password recovery labs and cracking exercises** completed using **Hashcat** and related workflows in a controlled learning environment.

The purpose of these labs was to build hands-on understanding of how password recovery tools operate, how different file formats store protected data, and how weak passwords can be recovered through structured attack methods.

The included exercises focus on realistic scenarios such as:

- ZIP archive password recovery
- Microsoft Office file cracking
- KeePass vulnerability analysis
- brute-force attacks
- dictionary attacks
- mask attacks

This project area demonstrates both offensive security learning and defensive password awareness.

---

## What This Project Area Demonstrates

These labs were completed to strengthen practical skills in:

- Hashcat usage
- password auditing workflows
- hash extraction processes
- attack mode selection
- understanding Hashcat modes
- wordlist usage
- mask design
- cracking strategy selection
- command-line confidence
- interpreting recovered credentials responsibly

---

## Why Hashcat Was Used

**Hashcat** is one of the most respected password recovery tools in cybersecurity.

It supports:

- GPU acceleration
- many hash formats
- archive formats
- Office files
- encrypted containers
- rule-based attacks
- masks
- dictionaries
- benchmarking and optimization

Using Hashcat in a lab setting is an excellent way to understand real password risks and recovery mechanics.

---

## Included Labs

## 1. Brute Force Attack

This lab demonstrates how passwords can be recovered by systematically trying every possible combination within a defined character set and length range.

### Key learning areas

- brute-force methodology
- search-space growth
- password length impact
- time complexity awareness

[Open Brute Force Attack](./brute-force-attack)

---

## 2. Dictionary Attack

This lab demonstrates password recovery using common password lists such as **rockyou.txt**.

Instead of trying every combination, known weak passwords are tested first.

### Key learning areas

- weak password patterns
- wordlist strategy
- efficiency vs brute force
- common credential reuse

[Open Dictionary Attack](./dictionary-attack)

---

## 3. ZIP Archive Cracking

This lab demonstrates how password-protected ZIP archives can be attacked by first extracting the archive hash and then using Hashcat with the correct mode.

### Key learning areas

- archive hash extraction
- PKZIP formats
- selecting correct Hashcat mode
- password recovery workflow

[Open ZIP Archive Cracking](./zip-archive-cracking)

---

## 4. PowerPoint File Cracking

This lab demonstrates recovery of passwords protecting `.pptx` Microsoft Office files.

The file hash was extracted and attacked using the appropriate Office Hashcat mode.

### Key learning areas

- Office file protection formats
- hash extraction
- Office 2013+ attack modes
- metadata and password workflows

[Open PowerPoint File Cracking](./pptx-file-cracking)

---

## 5. Word File Cracking

This lab demonstrates recovery of passwords protecting `.docx` Microsoft Office files using the same Office family format logic.

### Key learning areas

- Office Open XML protection
- hash parsing
- shared format attack techniques

[Open Word File Cracking](./docx-file-cracking)

---

## 6. KeePass CVE-2023-32784

This lab focuses on a known KeePass-related issue and demonstrates awareness of password manager security research.

### Key learning areas

- software vulnerability awareness
- credential manager risk models
- defensive security lessons

[Open KeePass CVE-2023-32784](./keepass-cve-2023-32784)

---

## 7. Mask Attack

This lab demonstrates targeted password recovery when parts of a password structure are already known.

Example:

- prefix known
- digits expected at the end
- symbol at final position

### Key learning areas

- search-space reduction
- structured attacks
- efficient recovery methods

[Open Mask Attack](./mask-attack)

---

## Comparison of Included Labs

| Lab | Main Technique | Typical Use Case |
|----|----------------|-----------------|
| Brute Force | Full combination search | Unknown simple password |
| Dictionary | Wordlist attack | Weak/common password |
| ZIP Archive | File cracking | Protected archives |
| PowerPoint | Office cracking | Protected presentations |
| Word | Office cracking | Protected documents |
| Mask | Pattern attack | Partial password knowledge |
| KeePass CVE | Vulnerability awareness | Defensive learning |

---

## Typical Workflow

A common Hashcat workflow across these labs is:

1. identify the target type
2. extract the hash if required
3. determine the correct Hashcat mode
4. choose attack strategy
5. run the attack
6. review recovered result
7. document lessons learned

This mirrors practical password auditing methodology.

---

## Skills Demonstrated Across This Section

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Password Auditing | Recovery workflows |
| Hashcat Usage | Modes / attacks / syntax |
| File Analysis | ZIP / Office / KeePass |
| Strategy Selection | Brute force vs dictionary vs mask |
| Command-Line Skills | Practical lab execution |
| Security Awareness | Weak password risks |
| Documentation | Structured technical writeups |

---

## Why These Labs Are Valuable

These labs are valuable because they show practical understanding of how passwords fail in the real world.

They also reinforce important defensive lessons:

- short passwords are weak
- reused passwords are dangerous
- predictable patterns are risky
- document passwords can be attacked
- strong password policies matter

This makes the section relevant for:

- cybersecurity roles
- SOC / blue team awareness
- pentesting foundations
- DevSecOps security culture
- IAM / password policy discussions

---

## Important Ethical Perspective

These labs were performed in controlled environments for:

- education
- self-learning
- portfolio demonstration
- authorized practice
- password security awareness

Password recovery tools should only be used on systems or files you own or are explicitly authorized to test.

---

## Recommended Reading Order

1. Dictionary Attack  
2. Brute Force Attack  
3. Mask Attack  
4. ZIP Archive Cracking  
5. PowerPoint File Cracking  
6. Word File Cracking  
7. KeePass CVE-2023-32784

---

## Project Navigation

- [Brute Force Attack](./brute-force-attack)
- [Dictionary Attack](./dictionary-attack)
- [ZIP Archive Cracking](./zip-archive-cracking)
- [PowerPoint File Cracking](./pptx-file-cracking)
- [Word File Cracking](./docx-file-cracking)
- [Mask Attack](./mask-attack)
- [KeePass CVE-2023-32784](./keepass-cve-2023-32784)

---

## Conclusion

The **Hashcat Lab** section demonstrates hands-on password recovery and password security awareness through practical exercises using Hashcat.

These labs cover multiple attack methods, protected file formats, and strategic recovery approaches while reinforcing responsible and defensive cybersecurity thinking.

Together, they form a strong portfolio section combining technical execution, documentation quality, and real-world password security knowledge.
