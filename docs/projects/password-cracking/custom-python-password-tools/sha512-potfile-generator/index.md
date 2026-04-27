# SHA-512 Potfile Generator

## Overview

This document explains the development of a custom **Python-based SHA-512 Potfile Generator** created for educational purposes and authorized password security testing.

The purpose of this project was to process the well-known `rockyou.txt` wordlist and generate a precomputed lookup file containing SHA-512 hashes for every password entry.

The generated output follows the format:

```text
SHA512(password):password
```

Example:

```text
ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413:123456
```

This type of file can be used as a fast reference database for hash lookups.

The script was named:

```text
generate_sha512_potfile.py
```

---

## Objectives

The main goals of this project were:

- read all passwords from `rockyou.txt`
- generate a SHA-512 hash for every password
- store results in potfile format
- improve processing speed and usability
- display progress information
- build a professional terminal tool
- understand precomputed hash databases

---

## Why This Project Matters

Hash calculations for large password lists can take time if repeated many times.

Instead of recalculating the same hashes repeatedly, it is more efficient to compute them once and store them in a lookup file.

This concept is useful for:

- password auditing
- offline testing
- security education
- hash demonstrations
- understanding rainbow-table style logic

---

## What Is a Potfile?

A **potfile** is a text file containing hashes and their recovered plaintext passwords.

Typical format:

```text
hash:password
```

For this task, the required format was:

```text
SHA512(password):password
```

This means the hash is stored first, followed by the original password.

---

## Why SHA-512 Was Used

SHA-512 is part of the SHA-2 family and produces a **512-bit hash value**.

Characteristics:

| Property | Value |
|----------|------|
| Output Length | 512 bit |
| Hex Length | 128 characters |
| Family | SHA-2 |
| Built into Python | Yes |

SHA-512 is available directly in Python through `hashlib`, making it ideal for this project.

---

## Why rockyou.txt Was Used

`rockyou.txt` is one of the most famous password wordlists in cybersecurity training.

It contains millions of real-world leaked passwords and is commonly used for:

- dictionary attacks
- password auditing
- security demonstrations
- tool testing

Using `rockyou.txt` made this project realistic and relevant.

---

## Program Features

| Feature | Description |
|--------|-------------|
| Reads rockyou.txt | Processes all passwords |
| SHA-512 hashing | Uses Python hashlib |
| Potfile output | Stores hash:password pairs |
| Progress display | Shows live progress |
| Speed counter | Passwords per second |
| ETA display | Estimated completion time |
| Styled interface | Professional terminal output |
| Custom input/output | Optional file arguments |

---

## Command Line Usage

Default usage:

```bash
python3 generate_sha512_potfile.py
```

This uses:

```text
Input : rockyou.txt
Output: rockyou_sha512.potfile
```

### Custom Files

```bash
python3 generate_sha512_potfile.py mylist.txt output.potfile
```

---

## How the Program Works

The workflow of the script is:

1. Display startup banner
2. Validate that the input file exists
3. Count total lines in the wordlist
4. Open input and output files
5. Read one password per line
6. Remove line breaks
7. Generate SHA-512 hash using `hashlib`
8. Write `hash:password` into the potfile
9. Show progress every 100,000 entries
10. Print final statistics

---

## Core Hashing Logic

The following Python logic was used:

```python
hash_value = hashlib.sha512(password.encode("utf-8")).hexdigest()
outfile.write(f"{hash_value}:{password}\n")
```

This converts each password into a SHA-512 hash and stores it in the required output format.

---

## Why Encoding Was Important

The `rockyou.txt` file may contain special characters and international characters.

For this reason, the input file was opened using:

```python
encoding="latin-1"
errors="ignore"
```

This helps prevent crashes caused by problematic characters.

---

## Output Design

The tool was visually enhanced for better usability and demonstrations.

Features include:

- startup banner
- MADE BY OGISHA branding
- progress updates
- percentage complete
- hashes per second
- ETA timer
- success summary box

Example:

```text
POTFILE CREATED SUCCESSFULLY
Lines Read  : 14,344,391
Hashes Saved: 14,344,391
Time        : 2m 11s
Speed       : 109,000/s
```

---

## Performance Considerations

Large files such as `rockyou.txt` require efficient processing.

Important optimizations:

- line-by-line reading instead of loading all data into memory
- direct writing to output file
- lightweight hashing via hashlib
- periodic progress updates

This keeps memory usage low and performance high.

---

## Why This Tool Is Valuable

This project combines multiple practical skills:

- Python scripting
- file processing
- hashing algorithms
- terminal tool development
- performance optimization
- progress tracking
- cybersecurity methodology

It is a strong portfolio project because it combines coding and security concepts.

---

## Security Lessons Learned

### Precomputed Hashes Can Save Time

If hashes are already generated, lookup operations become very fast.

### Weak Password Lists Remain Dangerous

Common passwords remain vulnerable if attackers build lookup databases.

### Fast Hash Functions Have Risks

Fast hashing algorithms are easier to use in bulk processing.

### Strong Password Policies Matter

Even precomputed databases are ineffective against strong, unique passwords.

---

## Conclusion

The custom Python SHA-512 Potfile Generator successfully demonstrated how to create a precomputed password hash database from a large real-world wordlist.

It supports efficient file processing, progress monitoring, and clean output formatting.

This project provided valuable insight into password auditing workflows, lookup optimization, and large-scale hashing operations.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Use password lists and hash tools only on systems, files, or accounts you own or are explicitly authorized to test.