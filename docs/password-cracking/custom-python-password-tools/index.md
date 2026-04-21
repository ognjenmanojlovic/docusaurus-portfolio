# Custom Python Password Tools

## Overview

This section contains custom **Python-based password auditing and password recovery tools** developed for educational purposes and authorized security testing.

Unlike traditional password-cracking workflows that rely entirely on external tools, these projects focus on building the core logic manually in Python.

That makes this category especially valuable because it demonstrates not only cybersecurity interest, but also the ability to engineer practical tools from scratch.

The projects in this section are designed to simulate common password recovery techniques in a controlled and transparent way.

They focus on:

- hash comparison workflows
- candidate generation logic
- structured attacks
- automation
- command-line usability
- learning how password tools work internally

---

## What This Project Area Demonstrates

These projects were created to show practical skills in:

- Python programming
- hashing fundamentals
- password auditing methodology
- attack simulation logic
- CLI tool development
- performance-aware scripting
- algorithm handling
- candidate generation strategies
- cybersecurity problem solving

Instead of only running existing tools, this section demonstrates how those techniques can be recreated and understood at code level.

---

## Why Build Custom Password Tools?

Professional tools such as **Hashcat** and **John the Ripper** are extremely powerful.

However, manually building simplified versions in Python provides major learning benefits:

- understanding how attacks function internally
- deeper knowledge of hashing algorithms
- generator logic and search spaces
- argument parsing and tool design
- debugging complex workflows
- appreciation for optimization challenges

Building tools personally transforms theory into hands-on technical understanding.

---

## Included Projects

## 1. Python Dictionary Attack

The **Python Dictionary Attack Tool** simulates one of the most common password recovery techniques.

A wordlist is read line-by-line, each candidate is hashed, and the result is compared against a target hash.

It supports:

- multiple hashing algorithms
- optional algorithm selection
- automatic hash detection
- dictionary-based recovery
- progress output
- styled terminal summaries

### Key learning areas

- hash comparisons
- file handling
- CLI parameters
- common password weaknesses
- dictionary attack methodology

[Open Python Dictionary Attack](./python-dictionary-attack/)

---

## 2. Python Mask Attack

The **Python Mask Attack Tool** demonstrates structure-based password recovery.

Instead of blindly trying every possible combination, the tool uses known password patterns such as prefixes, digits, uppercase characters, or symbols.

This greatly reduces the search space when partial knowledge exists.

It supports:

- custom masks
- token parsing
- dynamic candidate generation
- multiple algorithms
- structured attack logic
- progress reporting

### Key learning areas

- combinatorics
- targeted attacks
- efficient candidate generation
- predictable password patterns
- search-space reduction

[Open Python Mask Attack](./python-mask-attack/)

---

## 3. SHA512 Potfile Generator

The **SHA512 Potfile Generator** is a helper utility designed to create Hashcat-style potfile entries or prepare SHA512 password/hash combinations for testing and lab workflows.

It supports:

- SHA512 hash generation
- password-to-hash conversion
- test data preparation
- workflow automation
- reusable lab data generation

### Key learning areas

- SHA512 hashing
- workflow scripting
- automation support tools
- password lab preparation

[Open SHA512 Potfile Generator](./sha512-potfile-generator/)

---

## Comparison of Included Tools

| Project | Main Purpose | Output |
|--------|--------------|--------|
| Python Dictionary Attack | Recover weak passwords using wordlists | Found password / stats |
| Python Mask Attack | Recover passwords using patterns | Found password / stats |
| SHA512 Potfile Generator | Generate test hashes / potfile data | Hash entries |

---

## Typical Workflow

A practical learning workflow across these projects may look like this:

1. generate test hashes
2. attempt dictionary recovery
3. attempt mask-based recovery
4. compare methods
5. analyze password weaknesses
6. improve password policy understanding

This creates a realistic password auditing lab environment.

---

## Skills Demonstrated Across This Section

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Python Development | Custom CLI tools |
| Hashing Knowledge | SHA512 + multiple algorithms |
| Attack Logic | Dictionary / Mask workflows |
| Automation | Candidate generation |
| Problem Solving | Matching hashes to candidates |
| Security Awareness | Weak password detection |
| Engineering Mindset | Rebuilding tool concepts manually |

---

## Why These Projects Are Valuable

This category is valuable because it shows the ability to:

- understand password attack mechanics
- build original security tools
- apply Python to cybersecurity problems
- explain offensive methods responsibly
- convert concepts into usable software

That is relevant for areas such as:

- cybersecurity engineering
- security operations
- DevSecOps
- internal security tooling
- penetration testing foundations
- security research

---

## Important Security Perspective

These projects are intended for:

- education
- self-learning
- lab environments
- authorized password testing
- awareness training

They also reinforce an important lesson:

**Strong hashing alone is not enough if passwords are weak or predictable.**

---

## Recommended Reading Order

1. **SHA512 Potfile Generator**  
2. **Python Dictionary Attack**  
3. **Python Mask Attack**

This order helps understand hashes first, then simple attacks, then more advanced structured recovery.

---

## Project Navigation

- [Python Dictionary Attack](./python-dictionary-attack/)
- [Python Mask Attack](./python-mask-attack/)
- [SHA512 Potfile Generator](./sha512-potfile-generator/)

---

## Future Expansion Ideas

This section can later grow with additional custom tools such as:

- rule-based attacks
- hybrid attacks
- hash identifier tools
- password strength analyzers
- salted hash labs
- benchmark utilities

---

## Conclusion

The **Custom Python Password Tools** section demonstrates practical password security concepts through self-built Python utilities.

Rather than depending only on external software, these projects recreate core attack logic manually and help build a deeper understanding of password recovery methods, hashing workflows, and defensive password policy design.

This makes the section a strong portfolio category combining cybersecurity knowledge with hands-on software development.
