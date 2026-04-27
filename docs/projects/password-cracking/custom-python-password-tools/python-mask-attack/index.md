# Python Mask Attack Tool

## Overview

This document explains the development of a custom **Python-based Mask Attack Tool** created for educational purposes and authorized password security testing.

The goal of this project was to build a command-line application capable of recovering passwords from hashes by using a predefined password structure, also known as a **mask**.

Instead of trying all possible combinations blindly, the tool uses known character positions and character classes to reduce the search space significantly.

The script was named:

```text
mask-attack.py
```

It was designed to be lightweight, educational, and practical for learning how targeted password recovery works internally.

---

## Objectives

The main goals of this project were:

- develop a custom mask attack tool in Python
- support multiple hashing algorithms
- allow command-line interaction
- automatically detect hash algorithms by hash length
- parse custom mask patterns
- generate password candidates dynamically
- recover passwords efficiently
- improve terminal output and usability
- understand how mask attacks work internally

---

## Why Build a Custom Tool?

Professional tools such as Hashcat already support advanced mask attacks.  
However, implementing the logic manually in Python provides important learning benefits:

- deeper understanding of password cracking methods
- hands-on practice with Python
- command-line argument handling
- custom generator logic with `itertools`
- algorithm selection logic
- performance awareness
- practical cybersecurity development skills

Building such a tool manually also helps understand how enterprise password recovery tools function behind the scenes.

---

## Supported Hash Algorithms

The tool supports the following algorithms:

| Algorithm | Hash Length |
|-----------|------------|
| MD5 | 32 |
| SHA1 | 40 |
| SHA256 | 64 |
| SHA512 | 128 |

---

## What Is a Mask Attack?

A **mask attack** is a targeted password cracking technique where parts of the password structure are already known.

Instead of trying all combinations for the full password length, only the unknown positions are generated.

Example:

```text
AdX?luuik?d1?d878?d!?s
```

This means:

- `AdX` = fixed known prefix
- `?l` = lowercase letter
- `?d` = digit
- `?s` = special character

This makes the attack dramatically faster than brute force.

---

## Supported Mask Tokens

The script uses mask tokens similar to Hashcat:

| Token | Meaning |
|------|---------|
| `?d` | Digit (0-9) |
| `?l` | Lowercase letter |
| `?u` | Uppercase letter |
| `?a` | Alphanumeric character |
| `?s` | Special character |

These tokens can be combined with fixed characters to create complex masks.

---

## Program Features

| Feature | Description |
|--------|-------------|
| Command-line interface | Fully terminal based |
| Required target hash | `-t` parameter |
| Required mask | `-x` parameter |
| Optional method | `-m` parameter |
| Auto detection | Chooses algorithm by hash length |
| Random selection | If multiple algorithms match |
| Dynamic generator | Creates candidates from mask |
| Progress display | Shows runtime attempts |
| Styled interface | Colored terminal output |
| Success box | Displays password, attempts, time |

---

## Command Line Usage

General syntax:

```bash
python mask-attack.py -t HASH -x MASK -m md5
```

### Parameters

| Parameter | Meaning |
|----------|---------|
| `-t` | Target hash |
| `-x` | Password mask |
| `-m` | Hash method (optional) |

If `-m` is omitted, the tool attempts to detect the correct algorithm automatically.

---

## Example Commands

### Simple Example

```bash
python mask-attack.py -t e99a18c428cb38d5f260853678922e03 -x '?l?l?l?d?d?d' -m md5
```

This cracks:

```text
abc123
```

---

### Advanced Example

```bash
python mask-attack.py -t cad899d7ad5a4bfdc281fbf1060d8f70 -x 'AdX?luuik?d1?d878?d!?s' -m md5
```

---

## Important macOS / zsh Note

When special characters such as `!` are used in a mask, the shell may interpret them.

Therefore masks should be wrapped in **single quotes**:

```bash
-x 'AdX?luuik?d1?d878?d!?s'
```

This prevents shell expansion issues.

---

## How the Program Works

The workflow of the script is:

1. Read command-line arguments
2. Validate the hash and mask
3. Detect or select algorithm
4. Parse mask tokens
5. Build character sets for each position
6. Generate combinations using `itertools.product()`
7. Hash each candidate
8. Compare against target hash
9. Stop when match is found

This reproduces the core logic of professional mask attack tools.

---

## Candidate Generation Logic

Example:

Mask:

```text
?a?a?d
```

Will generate:

```text
aa0
aa1
aa2
...
ZZ9
```

Each generated password is hashed and compared to the target.

---

## Output Design

The script was visually enhanced to improve demonstrations and usability.

Features include:

- startup banner
- MADE BY OGISHA branding
- colored terminal output
- progress updates
- percentage display
- success box
- interrupt summary

Example:

```text
PASSWORD FOUND
Password : abc123
Attempts : 73124
Time     : 0.48s
```

---

## Why This Tool Is Valuable

This project combines several practical cybersecurity skills:

- Python programming
- Password auditing concepts
- Hashing algorithms
- CLI development
- Pattern-based attacks
- Search space optimization
- Problem solving
- Security methodology

This makes it a strong portfolio project.

---

## Security Lessons Learned

### Partial Knowledge Is Powerful

Knowing only parts of a password can dramatically reduce attack time.

### Password Patterns Are Risky

Many users choose predictable structures:

- names + numbers
- fixed prefixes
- birth years
- repeated symbols

### Mask Attacks Are Efficient

Mask attacks are often much faster than brute force when structure is known.

### Strong Hashes Need Strong Passwords

Even modern algorithms cannot protect weak or predictable passwords.

---

## Conclusion

The custom Python Mask Attack Tool successfully demonstrates how structured password recovery can be implemented without external frameworks.

It supports multiple algorithms, dynamic mask parsing, candidate generation, styled terminal output, and efficient password recovery methods.

This project provided valuable insight into offensive password testing techniques and defensive password design weaknesses.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Use password recovery tools only on systems, files, or accounts you own or are explicitly authorized to test.