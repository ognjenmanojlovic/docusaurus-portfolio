# Word Document Cracking

## Overview

This document explains how a password-protected Microsoft Word document (`geheim.docx`) was successfully cracked in a lab environment.

The task objective was to:

- extract the password hash from the protected `.docx` file
- identify the Microsoft Office version / hash format
- choose the correct Hashcat mode
- recover the password using a dictionary attack
- open the protected document
- verify the recovered password

This challenge showed that weak passwords can still make strongly encrypted Office documents vulnerable to offline password recovery attacks.

---

## Objective

The main goals of this exercise were:

- analyze a protected Word file
- extract the internal Office password hash
- understand the Office hash format
- use Hashcat with the correct mode
- recover the password from a wordlist
- validate the result
- document the full workflow clearly

---

## Why `.docx` Files Can Be Cracked

Modern Microsoft Office files such as:

- `.docx`
- `.pptx`
- `.xlsx`

use the Office Open XML format and may contain password-based encryption.

Although these files are structured as ZIP-based containers internally, password protection is handled through Microsoft Office encryption mechanisms.

This means:

- the document is encrypted using Office-specific protection
- the password can be attacked offline after extracting the hash
- cracking success depends mainly on password strength and wordlist quality

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `office2john.py` | Extract Office password hash |
| `Hashcat` | Crack the extracted hash |
| `rockyou.txt` | Password wordlist |
| LibreOffice / Microsoft Word | Open file after password recovery |

---

## Step 1 – Extract the Hash

The Word document hash was extracted into a text file:

```bash
office2john.py geheim.docx > dochash.txt
```

The extracted output was:

```text
geheim.docx:$office$*2013*100000*256*16*ce7974e77e86cc64510f83145de782d3*46e48ec1194d1bc5626e49d71a562c95*0e120d09713dcba5a07e97f5382ec7078b9370109ba3ffa6cf83d3278d29f384
```

---

## Why the Filename Prefix Was Removed

The extracted line began with:

```text
geheim.docx:
```

This prefix only identifies the original file name.

For Hashcat, only the actual Office hash is needed.  
Therefore, the filename prefix was removed so that the hash file contained only the Office hash itself:

```text
$office$*2013*100000*256*16*ce7974e77e86cc64510f83145de782d3*46e48ec1194d1bc5626e49d71a562c95*0e120d09713dcba5a07e97f5382ec7078b9370109ba3ffa6cf83d3278d29f384
```

---

## Hash Structure Analysis

The hash revealed multiple important technical details.

| Segment | Meaning |
|--------|---------|
| `$office$` | Microsoft Office file |
| `2013` | Office 2013 format |
| `100000` | Iteration count |
| `256` | AES-256 encryption |
| Remaining values | Salt and encrypted verification data |

This immediately showed that the document used **Microsoft Office 2013 encryption**.

---

## Why Hashcat Mode `9600` Was Correct

The selected Hashcat mode was:

```text
9600
```

### Office mode mapping

| Mode | Office Version |
|------|----------------|
| `9400` | Office 2007 |
| `9500` | Office 2010 |
| `9600` | Office 2013 |

Because the extracted hash explicitly contained:

```text
2013
```

the correct Hashcat mode was:

```text
9600
```

This was based directly on the extracted hash format, not on guessing.

---

## Step 2 – Cracking Command

The Word document was cracked using the following command:

```bash
hashcat -m 9600 -a 0 dochash.txt rockyou.txt --potfile-path=doc.potfile
```

---

## Command Breakdown

| Parameter | Meaning |
|----------|---------|
| `-m 9600` | Office 2013 hash mode |
| `-a 0` | Straight dictionary attack |
| `dochash.txt` | File containing target hash |
| `rockyou.txt` | Password wordlist |
| `--potfile-path=doc.potfile` | Custom potfile location |

---

## Why Attack Mode `0` Was Used

Hashcat attack mode:

```text
-a 0
```

means a **straight dictionary attack**.

This tells Hashcat to test each password candidate from the wordlist exactly as written.

This works especially well when the target password is weak or commonly used.

Examples of typical weak passwords found in public wordlists include:

- `123456`
- `password`
- `secret`
- `abc123`

---

## Step 3 – Result in Potfile

After the attack completed successfully, the custom potfile contained:

```text
$office$*2013*100000*256*16*ce7974e77e86cc64510f83145de782d3*46e48ec1194d1bc5626e49d71a562c95*0e120d09713dcba5a07e97f5382ec7078b9370109ba3ffa6cf83d3278d29f384:secret
```

---

## Recovered Password

The recovered password was:

```text
secret
```

---

## Why the Password Was Cracked Quickly

The password:

```text
secret
```

is considered weak because it is:

- short
- common
- predictable
- included in many standard password wordlists

Since `rockyou.txt` contains many commonly used passwords, Hashcat was able to recover it efficiently.

---

## Step 4 – Open the Word Document

After recovering the password, the protected Word document could be opened successfully in a document editor such as:

- LibreOffice Writer
- Microsoft Word

This confirmed that:

- the password was correct
- the cracking process worked
- the task was solved successfully

---

## Full Workflow Summary

| Step | Action | Result |
|------|--------|--------|
| 1 | Download `geheim.docx` | File obtained |
| 2 | Extract hash with `office2john.py` | Office hash generated |
| 3 | Remove filename prefix | Clean hash prepared |
| 4 | Identify Office 2013 format | Correct mode selected |
| 5 | Run Hashcat `-m 9600` | Password attack started |
| 6 | Potfile stores result | Password found |
| 7 | Open document | Success verified |

---

## Important Commands

## Extract hash

```bash
office2john.py geheim.docx > dochash.txt
```

## Crack password

```bash
hashcat -m 9600 -a 0 dochash.txt rockyou.txt --potfile-path=doc.potfile
```

## Show cracked result

```bash
hashcat --show -m 9600 dochash.txt
```

## Read potfile

```bash
cat doc.potfile
```

---

## Security Lessons Learned

### Weak Passwords Undermine Strong Encryption

Even when Office uses AES-based encryption and a high iteration count, a weak password can still be recovered.

### Dictionary Attacks Are Highly Effective

Attackers often begin with common password lists instead of brute force because weak passwords are still extremely common.

### Extracted Metadata Helps Attackers

The Office hash already revealed useful information such as:

- Office version
- iteration count
- encryption strength

This makes it easier to choose the correct cracking strategy.

### Password Quality Is Critical

A longer and more complex password would be far more resistant to dictionary-based attacks.

---

## Why This Exercise Was Valuable

This challenge provided practical experience in:

- Office document password auditing
- hash extraction from encrypted files
- choosing the correct Hashcat mode
- running dictionary attacks
- analyzing password weakness
- verifying successful password recovery
- documenting an offensive security workflow

---

## Conclusion

The protected Word document was successfully cracked by extracting the Office hash, identifying it as an **Office 2013** format, and selecting the correct Hashcat mode:

```text
9600
```

Using a dictionary attack with `rockyou.txt`, the password:

```text
secret
```

was recovered successfully.

The document could then be opened, confirming that the challenge had been solved.

This task clearly demonstrated that strong encryption cannot compensate for weak passwords.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Password recovery techniques may only be used on systems or files you own or are explicitly authorized to test.
