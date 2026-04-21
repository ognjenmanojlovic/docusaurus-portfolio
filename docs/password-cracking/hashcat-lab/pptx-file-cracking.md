# PowerPoint Presentation Cracking

## Overview

This document explains how a password-protected Microsoft PowerPoint presentation (`geheim.pptx`) was successfully cracked in a lab environment.

The task objective was to:

- extract the password hash from the protected `.pptx` file
- identify the Microsoft Office version / hash format
- choose the correct Hashcat mode
- recover the password using a dictionary attack
- open the protected presentation
- verify the recovered password

This challenge demonstrated how Office password protection can be audited when weak passwords are used.

---

## Objective

The main goals of this exercise were:

- analyze a protected PowerPoint file
- extract the internal Office password hash
- understand Office hash formatting
- use Hashcat correctly
- recover the password from a wordlist
- validate the result
- document the full workflow

---

## Why `.pptx` Files Can Be Cracked

Modern Microsoft Office files such as:

- `.docx`
- `.xlsx`
- `.pptx`

are ZIP-based container files that may include password-based encryption.

When a password is set, the file stores encrypted verification data that can be converted into a hash format usable by password recovery tools.

That means:

- the file itself is not “broken”
- the password is tested offline
- cracking speed depends on algorithm strength and password complexity

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `office2john.py` | Extract Office password hash |
| `Hashcat` | Crack the extracted hash |
| `rockyou.txt` | Password wordlist |
| LibreOffice / PowerPoint | Open file after recovery |

---

## Step 1 – Extract the Hash

The PowerPoint file was saved in Kali Linux and the hash was extracted into a text file:

```bash
office2john.py geheim.pptx > ppthash.txt
```

The output inside the file was:

```text
geheim.pptx:$office$*2013*100000*256*16*d5e55987a520b7c9fbe7baa21a208b6a*045fcce59f914aae5f226ba432e8b8e3*eb78d3cbe62387635c949d7edf40807ca61d1b24cee98a7626cd6d8674e13553
```

---

## Why the Filename Prefix Was Removed

The beginning contained:

```text
geheim.pptx:
```

This is only a label added by extraction tools to indicate which file the hash belongs to.

For Hashcat, only the actual Office hash was needed.

So the cleaned file contained only:

```text
$office$*2013*100000*256*16*...
```

---

## Hash Structure Analysis

The extracted hash already revealed important information.

| Segment | Meaning |
|--------|---------|
| `$office$` | Microsoft Office file |
| `2013` | Office 2013 format |
| `100000` | Iteration count |
| `256` | AES-256 encryption |
| Remaining values | Salt / encrypted verifier data |

This showed clearly that the file used **Microsoft Office 2013 encryption**.

---

## Why Hashcat Mode `9600` Was Correct

Hashcat mode used:

```text
9600
```

### Explanation

| Mode | Office Version |
|------|----------------|
| `9400` | Office 2007 |
| `9500` | Office 2010 |
| `9600` | Office 2013 |
| `25300+` | Newer Office variants depending on format |

Because the hash explicitly contained:

```text
2013
```

the correct choice was:

```text
9600
```

This was not guessed randomly.  
It was selected directly from the extracted hash metadata.

---

## Step 2 – Cracking Command

The successful command used was:

```bash
hashcat -m 9600 -a 0 ppthash.txt rockyou.txt --potfile-path=ppt.potfile
```

---

## Command Breakdown

| Parameter | Meaning |
|----------|---------|
| `-m 9600` | Office 2013 hash mode |
| `-a 0` | Straight dictionary attack |
| `ppthash.txt` | File containing target hash |
| `rockyou.txt` | Password wordlist |
| `--potfile-path=ppt.potfile` | Custom potfile location |

---

## Why Attack Mode `0` Was Used

Hashcat mode:

```text
-a 0
```

means:

**straight dictionary attack**

This tells Hashcat to test each word from the wordlist exactly as written.

Example:

- password
- abc123
- qwerty
- admin123

This is very effective when weak passwords are used.

---

## Step 3 – Result in Potfile

After successful cracking, the custom potfile contained:

```text
$office$*2013*100000*256*16*d5e55987a520b7c9fbe7baa21a208b6a*045fcce59f914aae5f226ba432e8b8e3*eb78d3cbe62387635c949d7edf40807ca61d1b24cee98a7626cd6d8674e13553:abc123
```

---

## Recovered Password

The password was:

```text
abc123
```

---

## Why It Was Cracked Quickly

The password:

```text
abc123
```

is considered very weak because it is:

- short
- predictable
- common pattern
- often included in public wordlists

Therefore, `rockyou.txt` contained it and Hashcat recovered it quickly.

---

## Step 4 – Open the Presentation

After recovering the password, the PowerPoint file was opened successfully.

The presentation contained the message:

```text
Das war ein einfaches Passwort 🙂
```

This confirmed both:

- the password was correct
- the challenge was solved successfully

---

## Full Workflow Summary

| Step | Action | Result |
|------|--------|--------|
| 1 | Download `geheim.pptx` | File obtained |
| 2 | Extract hash with `office2john.py` | Office hash generated |
| 3 | Remove filename prefix | Clean hash prepared |
| 4 | Identify Office 2013 format | Correct mode selected |
| 5 | Run Hashcat `-m 9600` | Password attack started |
| 6 | Potfile stores result | Password found |
| 7 | Open presentation | Success verified |

---

## Important Commands

## Extract hash

```bash
office2john.py geheim.pptx > ppthash.txt
```

## Crack password

```bash
hashcat -m 9600 -a 0 ppthash.txt rockyou.txt --potfile-path=ppt.potfile
```

## Show cracked result

```bash
hashcat --show -m 9600 ppthash.txt
```

## Read potfile

```bash
cat ppt.potfile
```

---

## Security Lessons Learned

### Weak Passwords Defeat Strong Encryption

Even AES-based Office encryption becomes useless when the password is weak.

### Dictionary Attacks Are Powerful

Attackers often do not brute-force everything.  
They first test common passwords.

### Metadata Helps Attackers

The extracted hash already revealed:

- Office version
- algorithm strength
- iteration count

This helps choose the right cracking strategy.

### Password Complexity Matters

A stronger password with:

- uppercase letters
- lowercase letters
- symbols
- longer length

would be significantly harder to recover.

---

## Why This Exercise Was Valuable

This task provided practical experience in:

- password auditing
- Office file hash extraction
- Hashcat usage
- choosing correct cracking modes
- dictionary attack methodology
- verifying recovered credentials
- security awareness regarding weak passwords

---

## Conclusion

The protected PowerPoint presentation was successfully cracked by extracting the Office 2013 hash and selecting the correct Hashcat mode:

```text
9600
```

Using a dictionary attack with `rockyou.txt`, the password:

```text
abc123
```

was recovered.

The file opened successfully and confirmed the challenge result.

This task clearly demonstrated that even strong encryption cannot protect weak passwords.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Password recovery techniques may only be used on systems or files you own or are explicitly authorized to test.
