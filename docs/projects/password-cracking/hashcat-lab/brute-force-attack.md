# Brute Force Attack with Hashcat

## Overview

This document explains how a brute force attack was performed with **Hashcat** in a controlled lab environment.  
The purpose of the exercise was to identify hash algorithms, choose the correct Hashcat mode, execute brute force attacks, and verify the recovered passwords inside a custom potfile.

The task was completed on macOS in the terminal.  
In addition to Hashcat, the tool **Haiti** was used to help identify the hash types before starting the attacks.

This documentation is intended for **educational purposes and authorized security testing only**.

---

## Objectives

The main goals of this exercise were:

- understand how password hashes can be identified
- learn how Hashcat uses hash modes
- perform brute force attacks against different hash types
- store recovered passwords in a custom potfile
- observe the difference between weaker and stronger hashing algorithms
- document the complete workflow in a reproducible way

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Hashcat | Used to perform the brute force attacks |
| Haiti | Used to identify the likely hash type |
| macOS Terminal | Used to run all commands |
| Custom Potfile | Used to store recovered hashes and passwords |

---

## Environment

| Component | Value |
|----------|-------|
| Operating System | macOS |
| Shell | zsh |
| Main Tool | Hashcat |
| Hash Identification Tool | Haiti |
| Potfile Name | `hashcat_brute.potfile` |

---

## Why Hash Identification Matters

Before using Hashcat, it is important to identify the algorithm of each hash.  
Hashcat requires the correct **hash mode** (`-m`) in order to process the input correctly. If the wrong mode is selected, the attack may run for a long time without producing any valid result.

For that reason, the first step was not the attack itself, but the identification of the hash type.

---

## Hash Identification with Haiti

The tool **Haiti** can be used to analyze a given hash value and suggest possible algorithms.

Example usage:

```bash
haiti HASHVALUE
```

This was used to estimate whether a hash was likely:

- MD5
- SHA1
- SHA256

This step is very important because Hashcat does not automatically guess the algorithm.  
Instead, the user must provide the correct mode manually.

### Common Hashcat Modes Used in This Exercise

| Hash Type | Hashcat Mode |
|-----------|--------------|
| MD5 | `-m 0` |
| SHA1 | `-m 100` |
| SHA256 | `-m 1400` |

---

## Brute Force Attack Strategy

For this task, a **brute force attack** was executed with Hashcat using attack mode `-a 3`.

General command structure:

```bash
hashcat -m <mode> -a 3 HASH --potfile-path=hashcat_brute.potfile
```

### Explanation of the Parameters

| Parameter | Meaning |
|-----------|---------|
| `-m` | Defines the hash type / algorithm mode |
| `-a 3` | Starts a brute force attack |
| `HASH` | The target hash value |
| `--potfile-path=hashcat_brute.potfile` | Writes cracked results to a custom potfile |

A custom potfile was used so that all recovered passwords would be stored in a dedicated file for this exercise instead of relying on the default potfile location.

---

## Important Note About the Shell Environment

The work was performed in **zsh** on macOS.

During testing, it became clear that zsh interprets certain characters such as `?` differently than expected.  
This is relevant when working with masks in Hashcat. In this exercise, the documented attack approach was kept simple and consistent with the assignment requirements, while using a custom potfile to store results clearly.

---

## Recovered Hashes and Passwords

The following hashes were successfully recovered during the exercise:

| # | Hash Type | Hash | Recovered Password |
|---|-----------|------|--------------------|
| 1 | MD5 | `e99a18c428cb38d5f260853678922e03` | `abc123` |
| 2 | MD5 | `8fa32f326ed79d19b8bcfec9f519db95` | `ogisha` |
| 3 | SHA1 | `89cc6a8748d5bce88ab200cebd416bab82ed3f30` | `dejan1` |
| 4 | SHA1 | `fdd06e0ddb321ffa8ba0abd2b5cd8a62d8e3d74e` | `dani80` |
| 5 | SHA256 | `8d6c794a9c37c23700f04200a86eedab4d9599cfef5ebd00aa350a576943a81e` | `amggt53` |

These results show that even different algorithms can still be vulnerable if the underlying passwords are weak or predictable.

---

## Attack Walkthrough

### 1. Identify the Hash Type

Each hash was first checked with Haiti in order to estimate the correct algorithm.

Example:

```bash
haiti e99a18c428cb38d5f260853678922e03
```

Based on the output and the known characteristics of common hashes, the corresponding Hashcat mode was selected.

---

### 2. Run Hashcat with the Correct Mode

After identifying the hash type, Hashcat was executed using attack mode `-a 3`.

#### Example: MD5

```bash
hashcat -m 0 -a 3 e99a18c428cb38d5f260853678922e03 --potfile-path=hashcat_brute.potfile
```

#### Example: SHA1

```bash
hashcat -m 100 -a 3 89cc6a8748d5bce88ab200cebd416bab82ed3f30 --potfile-path=hashcat_brute.potfile
```

#### Example: SHA256

```bash
hashcat -m 1400 -a 3 8d6c794a9c37c23700f04200a86eedab4d9599cfef5ebd00aa350a576943a81e --potfile-path=hashcat_brute.potfile
```

The only value that changed between attacks was the **hash mode** and the **target hash**.

---

### 3. Store Recovered Passwords in a Custom Potfile

Hashcat stores successfully recovered passwords in a potfile.  
For this exercise, the following custom file was used:

```text
hashcat_brute.potfile
```

This made it easier to keep the exercise results separated and ready for submission.

To display the contents of the potfile:

```bash
cat hashcat_brute.potfile
```

Example output:

```text
e99a18c428cb38d5f260853678922e03:abc123
8fa32f326ed79d19b8bcfec9f519db95:ogisha
89cc6a8748d5bce88ab200cebd416bab82ed3f30:dejan1
fdd06e0ddb321ffa8ba0abd2b5cd8a62d8e3d74e:dani80
8d6c794a9c37c23700f04200a86eedab4d9599cfef5ebd00aa350a576943a81e:amggt53
```

---

## Observations During the Exercise

Several practical observations were made during the attacks:

- **MD5 hashes** were generally easier and faster to recover.
- **SHA1 hashes** also remained recoverable when weak passwords were used.
- **SHA256** is stronger as a hashing algorithm, but a weak password can still be recovered.
- The overall success of brute force depends not only on the hash algorithm, but also on the complexity of the original password.
- Long-running attacks can put noticeable load on the system, especially on a laptop.

This highlights an important security lesson:  
a stronger algorithm alone is not enough if the password itself is weak.

---

## Security Analysis

This exercise demonstrates several important security principles.

### Weak Passwords Remain a Major Risk

Even when a stronger algorithm is used, weak passwords can still be guessed or recovered.  
Passwords such as short names, simple number combinations, or common strings create a large security risk.

### Legacy Hash Algorithms Should Not Be Used for Password Storage

Algorithms such as **MD5** and **SHA1** are no longer considered suitable for password storage.  
They are too fast and therefore highly attractive for brute force and dictionary-based attacks.

### Password Complexity Matters

The recovered passwords in this exercise were relatively simple and predictable.  
This is exactly why they could be recovered successfully.

### Secure Password Storage Requires More Than Hashing

Modern password security should include:

- strong and unique passwords
- salting
- slow password hashing functions
- algorithms specifically designed for password storage, such as bcrypt, scrypt, or Argon2

---

## Lessons Learned

This exercise helped reinforce the following points:

- Identifying the hash type first is essential.
- Hashcat only works correctly when the correct hash mode is selected.
- Weak passwords are vulnerable across multiple algorithms.
- Potfiles are useful for recording and verifying recovered credentials.
- Practical cracking exercises make it easier to understand why password policy and secure storage matter.

---

## Conclusion

The brute force exercise with Hashcat successfully demonstrated a complete password recovery workflow:

1. identify the hash type with Haiti  
2. choose the correct Hashcat mode  
3. run a brute force attack with Hashcat  
4. store recovered results in a custom potfile  
5. review and document the recovered credentials  

The recovered examples clearly show that weak passwords remain a security problem regardless of whether MD5, SHA1, or SHA256 is used.

This makes brute force testing a valuable learning exercise for understanding password security, attack feasibility, and the importance of secure password storage practices.

---

## Legal Disclaimer

This documentation is provided for **educational purposes only**.

Hashcat and similar tools must only be used on systems, files, accounts, or datasets that you own or are explicitly authorized to test. Unauthorized password cracking or security testing may be illegal and unethical.