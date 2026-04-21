# Dictionary Attack with Hashcat

## Overview

This document explains how a dictionary attack was performed with **Hashcat** in a controlled lab environment using the **rockyou.txt** wordlist.

The purpose of this exercise was to identify the correct hash algorithm for each target hash, select the appropriate Hashcat mode, execute a dictionary attack, and store all recovered results in a custom potfile.

Unlike a brute force attack, a dictionary attack does not try every possible character combination.  
Instead, it tests passwords from a predefined wordlist. This makes the attack much faster when weak or common passwords are used.

This documentation is intended for **educational purposes and authorized security testing only**.

---

## Objectives

The main goals of this exercise were:

- understand how a dictionary attack works
- use `rockyou.txt` with Hashcat
- identify the correct hash mode before running the attack
- recover weak passwords from a wordlist
- store all recovered results in a custom potfile
- compare the efficiency of dictionary attacks with brute force attacks

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Hashcat | Used to perform the dictionary attacks |
| Haiti | Used to identify the likely hash type |
| rockyou.txt | Wordlist used for the dictionary attack |
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
| Wordlist | `rockyou.txt` |
| Potfile Name | `hashcat_dict.potfile` |

---

## Why Hash Identification Matters

Before running a dictionary attack, it is important to determine which hashing algorithm was used.

Hashcat requires the correct **hash mode** (`-m`) to interpret a hash properly.  
If the wrong mode is selected, Hashcat may run without producing any valid result, even if the correct password exists inside the wordlist.

For that reason, the first step was to identify the likely hash type before starting the attack.

---

## Hash Identification with Haiti

The tool **Haiti** can be used to analyze a hash value and suggest possible algorithms.

Example:

```bash
haiti HASHVALUE
```

This helps determine whether a hash is likely:

- MD5
- SHA1
- SHA256

Based on the output and the length/format of the hashes, the following Hashcat modes were used in this exercise.

### Common Hashcat Modes Used in This Exercise

| Hash Type | Hashcat Mode |
|-----------|--------------|
| MD5 | `-m 0` |
| SHA1 | `-m 100` |
| SHA256 | `-m 1400` |

---

## Dictionary Attack Strategy

For this task, a **dictionary attack** was executed with Hashcat using attack mode `-a 0`.

General command structure:

```bash
hashcat -m <mode> -a 0 HASH rockyou.txt --potfile-path=hashcat_dict.potfile
```

### Explanation of the Parameters

| Parameter | Meaning |
|-----------|---------|
| `-m` | Defines the hash type / algorithm mode |
| `-a 0` | Starts a dictionary attack |
| `HASH` | The target hash value |
| `rockyou.txt` | Wordlist containing password candidates |
| `--potfile-path=hashcat_dict.potfile` | Writes cracked results to a custom potfile |

A custom potfile was used so that all recovered passwords would be stored in a dedicated file for this exercise.

---

## Why rockyou.txt Was Used

`rockyou.txt` is one of the most well-known password wordlists in security training and password auditing.

It contains millions of real-world leaked passwords and is very effective against:

- weak passwords
- common passwords
- reused passwords
- predictable personal passwords

This makes it an excellent choice for demonstrating how dangerous poor password hygiene can be.

---

## Recovered Hashes and Passwords

The following hashes were successfully recovered during the exercise:

| # | Hash Type | Hash | Recovered Password |
|---|-----------|------|--------------------|
| 1 | MD5 | `74d738020dca22a731e30058ac7242ee` | `loveme` |
| 2 | MD5 | `ac3665f6acae8bd267ed92a71a71313b` | `princesa` |
| 3 | SHA1 | `cdd59c8b28641e95ba47dea9c6f5141f7836b662` | `sdn1011` |
| 4 | SHA1 | `acdf54d71f49b9c27a26301bef6ab7ff2ce4f5fd` | `vitara2002\\\\\\\\` |
| 5 | SHA256 | `9fcd030bda738f09f6a66d6e45e3e284232f513b6214dcda3285a4edef7934e9` | `riptracey` |

All hashes were recovered successfully, and in this case the attack completed very quickly because the passwords were already present in the wordlist.

---

## Attack Walkthrough

### 1. Identify the Hash Type

Each hash was first analyzed with Haiti to estimate the correct algorithm.

Example:

```bash
haiti 74d738020dca22a731e30058ac7242ee
```

This step was important because the correct Hashcat mode had to be selected manually before starting the dictionary attack.

---

### 2. Run Hashcat with rockyou.txt

After identifying the hash type, Hashcat was executed in dictionary mode.

#### Example: MD5

```bash
hashcat -m 0 -a 0 74d738020dca22a731e30058ac7242ee rockyou.txt --potfile-path=hashcat_dict.potfile
```

#### Example: SHA1

```bash
hashcat -m 100 -a 0 cdd59c8b28641e95ba47dea9c6f5141f7836b662 rockyou.txt --potfile-path=hashcat_dict.potfile
```

#### Example: SHA256

```bash
hashcat -m 1400 -a 0 9fcd030bda738f09f6a66d6e45e3e284232f513b6214dcda3285a4edef7934e9 rockyou.txt --potfile-path=hashcat_dict.potfile
```

The only values that changed between attacks were the **hash mode** and the **target hash**.

---

### 3. Store Recovered Passwords in a Custom Potfile

Hashcat stores successfully recovered passwords in a potfile.  
For this exercise, the following custom file was used:

```text
hashcat_dict.potfile
```

This made the results easier to review and ready for submission.

To display the contents of the potfile:

```bash
cat hashcat_dict.potfile
```

Example output:

```text
74d738020dca22a731e30058ac7242ee:loveme
ac3665f6acae8bd267ed92a71a71313b:princesa
cdd59c8b28641e95ba47dea9c6f5141f7836b662:sdn1011
acdf54d71f49b9c27a26301bef6ab7ff2ce4f5fd:vitara2002\\\\\\\\
9fcd030bda738f09f6a66d6e45e3e284232f513b6214dcda3285a4edef7934e9:riptracey
```

---

## Observations During the Exercise

Several practical observations were made during the attacks:

- All hashes were cracked very quickly.
- The attack was significantly faster than a brute force attack.
- The success of the attack depended on the fact that the passwords were already included in `rockyou.txt`.
- Even a stronger algorithm such as SHA256 does not protect weak passwords if those passwords are present in common wordlists.
- Dictionary attacks are extremely efficient against real-world weak passwords.

This demonstrates why common or leaked passwords remain a major security problem.

---

## Dictionary Attack vs. Brute Force Attack

This exercise also made the difference between dictionary attacks and brute force attacks very clear.

| Attack Type | Method | Strength | Weakness |
|-------------|--------|----------|----------|
| Brute Force | Tries combinations systematically | Can eventually find unknown passwords | Can take a very long time |
| Dictionary Attack | Tests passwords from a wordlist | Very fast against common passwords | Fails if the password is not in the list |

In this task, the dictionary attack was the more efficient approach because the passwords were already present in the selected wordlist.

---

## Security Analysis

This exercise demonstrates several important security lessons.

### Weak Passwords Are Highly Vulnerable to Wordlists

Passwords that are common, leaked, reused, or personally predictable can often be found in public wordlists such as `rockyou.txt`.

### Stronger Hashing Alone Is Not Enough

Even when SHA256 is used, the password itself can still be recovered quickly if it is weak and appears in a dictionary.

### Password Selection Matters as Much as Hashing

A poor password combined with an old or fast hash algorithm makes attacks even easier.  
However, even a more modern algorithm cannot compensate for a weak password choice.

### Organizations Should Prevent Common Password Usage

Good password policies, password managers, and banned-password lists are important defenses against dictionary attacks.

---

## Lessons Learned

This exercise helped reinforce the following points:

- Hash identification should always come first.
- Hashcat requires the correct `-m` mode.
- `rockyou.txt` is very effective against weak passwords.
- Dictionary attacks can be dramatically faster than brute force attacks.
- A custom potfile makes the results easier to verify and submit.
- Weak passwords remain a problem regardless of the chosen hash algorithm.

---

## Conclusion

The dictionary attack with Hashcat successfully demonstrated a complete password recovery workflow:

1. identify the hash type with Haiti  
2. choose the correct Hashcat mode  
3. use `rockyou.txt` in dictionary mode  
4. store recovered results in a custom potfile  
5. review and document the recovered credentials  

All target hashes were recovered successfully.  
This shows how dangerous weak and commonly used passwords can be, especially when they already exist in public password wordlists.

The exercise also showed that dictionary attacks are often far more practical and efficient than brute force attacks when the target password is weak or reused.

---

## Legal Disclaimer

This documentation is provided for **educational purposes only**.

Hashcat and similar tools must only be used on systems, files, accounts, or datasets that you own or are explicitly authorized to test. Unauthorized password cracking or security testing may be illegal and unethical.
