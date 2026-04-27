# Python Dictionary Attack Tool

## Overview

This document explains the development of a custom **Python-based Dictionary Attack Tool** created for educational purposes and authorized password security testing.

The goal of this project was to build a command-line application that can recover weak passwords from hashes by comparing dictionary entries against a target hash value.

Instead of relying on external cracking tools such as Hashcat, this project demonstrates how a dictionary attack can be implemented directly in Python using standard libraries and modular code design.

The script was named:

```text
dictionary-attack.py
```

It was designed to be lightweight, easy to understand, and suitable for learning practical password recovery concepts.

---

## Objectives

The main goals of this project were:

- develop a custom dictionary attack tool in Python
- support multiple hashing algorithms
- allow command-line interaction
- automatically detect hash algorithms based on hash length
- recover weak passwords from a wordlist
- improve terminal output and usability
- understand how password cracking tools work internally

---

## Why Build a Custom Tool?

Although tools like Hashcat are faster and more advanced, creating a custom Python implementation provides several benefits:

- better understanding of hashing concepts
- hands-on experience with brute force / dictionary logic
- practice with Python file handling
- command-line argument parsing with `argparse`
- modular software development
- experience with third-party libraries

Building the tool manually also helps explain how professional password recovery tools operate behind the scenes.

---

## Supported Hash Algorithms

The tool supports the following algorithms:

| Algorithm | Hash Length |
|-----------|------------|
| MD5 | 32 |
| RIPEMD-128 | 32 |
| SHA1 | 40 |
| SHA256 | 64 |
| SHA512 | 128 |

---

## Why RIPEMD-128 Required Additional Work

Python's built-in `hashlib` supports common algorithms such as:

- MD5
- SHA1
- SHA256
- SHA512

However, **RIPEMD-128** is not included by default.

To support this requirement, an external package was used:

```bash
pip install hashbase
```

This allowed the tool to generate RIPEMD-128 hashes and complete the assignment requirements successfully.

---

## Program Features

The finished script includes the following functionality:

| Feature | Description |
|--------|-------------|
| Command-line interface | Fully terminal based |
| Required target hash | `-t` parameter |
| Required dictionary path | `-d` parameter |
| Optional hash method | `-m` parameter |
| Auto detection | Chooses algorithm by hash length |
| Random selection | If multiple algorithms share same length |
| Progress updates | Shows attempts during runtime |
| Styled interface | Colored terminal output |
| Success box | Displays password, attempts, time |

---

## Command Line Usage

General syntax:

```bash
python dictionary-attack.py -t HASH -d passwords.txt -m md5
```

### Parameters

| Parameter | Meaning |
|----------|---------|
| `-t` | Target hash |
| `-d` | Dictionary / wordlist path |
| `-m` | Hash method (optional) |

If `-m` is omitted, the program attempts to detect the algorithm automatically based on the hash length.

---

## Example Commands

### MD5 Example

```bash
python dictionary-attack.py -t 5f4dcc3b5aa765d61d8327deb882cf99 -d passwords.txt -m md5
```

### SHA1 Example

```bash
python dictionary-attack.py -t 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 -d passwords.txt -m sha1
```

### RIPEMD-128 Example

```bash
python dictionary-attack.py -t d6d56cab46e0f3af2c756289f2b447e0 -d passwords.txt -m ripemd128
```

---

## How the Program Works

The workflow of the script is simple and effective:

1. Read command-line arguments
2. Validate inputs
3. Detect or select hash algorithm
4. Open the dictionary file
5. Read one password candidate per line
6. Hash each candidate using the selected algorithm
7. Compare the result to the target hash
8. Stop when a match is found
9. Print the recovered password

This reproduces the basic logic of many professional password recovery tools.

---

## Output Design

The tool was intentionally improved visually to create a more professional and user-friendly terminal experience.

Features include:

- startup banner
- author signature
- colored status messages
- progress indicators
- clear success notifications
- statistics display

Example:

```text
PASSWORD FOUND
Password : secret123
Attempts : 2481
Time     : 0.82s
```

This makes the tool more suitable for demonstrations and video presentations.

---

## Security Lessons Learned

This project demonstrates several important security principles:

### Weak Passwords Are Dangerous

If a password appears inside a wordlist, it can often be recovered quickly.

### Hashing Alone Is Not Enough

Even strong algorithms cannot protect weak passwords.

### Dictionary Attacks Are Efficient

Trying common passwords is often faster than brute force attacks.

### Custom Tool Development Builds Understanding

Writing the logic manually helps understand attack methods and defensive strategies.

---

## Why This Project Is Valuable

This project combines multiple practical cybersecurity skills:

- Python development
- Hashing knowledge
- CLI tool creation
- Password auditing concepts
- Problem solving
- Dependency management
- Security testing methodology

It is therefore a strong beginner/intermediate security portfolio project.

---

## Conclusion

The custom Python Dictionary Attack Tool successfully demonstrates how password recovery can be implemented without relying on external cracking frameworks.

It supports multiple algorithms, automatic detection, clean terminal output, and real-world wordlists.

This project provided valuable insight into both offensive password testing techniques and defensive password security principles.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Use password recovery tools only on systems, files, or accounts you own or are explicitly authorized to test.
