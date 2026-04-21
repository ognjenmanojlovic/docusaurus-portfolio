# Mask Attack with Hashcat

## Overview

This document explains how a **mask attack** was performed with **Hashcat** in a controlled lab environment.

The purpose of this exercise was to recover passwords more efficiently by using **partial knowledge about the password structure**. Instead of testing every possible combination as in a pure brute force attack, a mask attack uses known characters and positions to reduce the search space significantly.

This makes the attack much faster when parts of the password are already known.

This documentation is intended for **educational purposes and authorized security testing only**.

---

## Objectives

The main goals of this exercise were:

- understand how a mask attack works
- use known password patterns to reduce the search space
- identify the correct hash algorithm before starting the attack
- apply Hashcat masks correctly
- recover passwords more efficiently than with brute force
- store all recovered results in a custom potfile
- document the full workflow in a reproducible way

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Hashcat | Used to perform the mask attacks |
| Haiti | Used to help identify the likely hash type |
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
| Potfile Name | `hashcat_mask.potfile` |

---

## Why Hash Identification Matters

Before running a mask attack, the correct hash algorithm must be identified.

Hashcat requires the correct **hash mode** (`-m`) in order to process the target hash correctly. If the wrong mode is selected, the attack may run without producing any valid result.

For that reason, the first step was to estimate the likely hash type based on the hash format and length.

---

## Hash Identification with Haiti

The tool **Haiti** can be used to analyze a hash value and suggest likely algorithms.

Example:

```bash
haiti HASHVALUE
```

In this exercise, the hash types were identified mainly by:

- hash length
- hexadecimal format
- Haiti verification

### Common Hashcat Modes Used in This Exercise

| Hash Type | Hashcat Mode |
|-----------|--------------|
| MD5 | `-m 0` |
| SHA1 | `-m 100` |

---

## What a Mask Attack Is

A **mask attack** is a targeted cracking method where known parts of a password are kept fixed and only the unknown characters are tested.

This makes the attack much more efficient than a brute force attack because Hashcat does not need to try all possible character combinations for the full password length.

For example:

- known prefix: `a`
- known substring: `123`
- unknown positions: replaced with mask placeholders such as `?a`, `?l`, or `?d`

### Common Hashcat Mask Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `?a` | All printable characters |
| `?l` | Lowercase letters |
| `?u` | Uppercase letters |
| `?d` | Digits |
| `?s` | Special characters |

In this exercise, `?a` was used for the unknown positions.

---

## Mask Attack Strategy

For this task, a **mask attack** was executed with Hashcat using attack mode `-a 3`.

General command structure:

```bash
hashcat -m <mode> -a 3 HASH 'MASK' --potfile-path=hashcat_mask.potfile
```

### Explanation of the Parameters

| Parameter | Meaning |
|-----------|---------|
| `-m` | Defines the hash type / algorithm mode |
| `-a 3` | Starts a mask attack |
| `HASH` | The target hash value |
| `'MASK'` | Pattern containing known and unknown password positions |
| `--potfile-path=hashcat_mask.potfile` | Writes cracked results to a custom potfile |

A custom potfile was used so that all recovered passwords would be stored in a dedicated file for this exercise.

---

## Why Quotes Were Used Around the Mask

The work was performed in **zsh** on macOS.

Because the shell may interpret special characters such as `?`, the mask was wrapped in single quotes:

```bash
'12?a?a?a?a12?a?a1'
```

This ensures that Hashcat receives the mask exactly as intended.

---

## Target Hashes and Known Password Patterns

The following hashes were provided together with partial password information. The `*` symbol meant that the character at that position was unknown.

| # | Hash | Known Pattern |
|---|------|---------------|
| 1 | `41dc93d37c5615bb724b14968d0f5b04` | `a***123*` |
| 2 | `be767ea64275dea215316e61eceb650e67182b4e` | `12****12**1` |
| 3 | `c004b7c5149a6a536c5004de8d59e399bdd4b6a7` | `87623674523645276542675***` |

---

## Recovered Hashes and Passwords

The following hashes were successfully recovered during the exercise:

| # | Hash Type | Hash | Recovered Password |
|---|-----------|------|--------------------|
| 1 | MD5 | `41dc93d37c5615bb724b14968d0f5b04` | `axXx123X` |
| 2 | SHA1 | `be767ea64275dea215316e61eceb650e67182b4e` | `120!__12901` |
| 3 | SHA1 | `c004b7c5149a6a536c5004de8d59e399bdd4b6a7` | `87623674523645276542675!!!` |

---

## Attack Walkthrough

### 1. Identify the Hash Type

Each target hash was first examined to estimate the correct algorithm.

- Hash 1 had **32 hexadecimal characters** → likely **MD5**
- Hashes 2 and 3 had **40 hexadecimal characters** → likely **SHA1**

This resulted in the following modes:

- MD5 → `-m 0`
- SHA1 → `-m 100`

---

### 2. Convert the Known Password Pattern into a Hashcat Mask

The provided patterns used `*` to represent unknown characters.

These were converted into Hashcat placeholders using `?a`.

#### Hash 1

Pattern:

```text
a***123*
```

Converted mask:

```text
a?a?a?a123?a
```

#### Hash 2

Pattern:

```text
12****12**1
```

Converted mask:

```text
12?a?a?a?a12?a?a1
```

#### Hash 3

Pattern:

```text
87623674523645276542675***
```

Converted mask:

```text
87623674523645276542675?a?a?a
```

---

### 3. Run Hashcat with the Correct Mask

#### Example: MD5

```bash
hashcat -m 0 -a 3 41dc93d37c5615bb724b14968d0f5b04 'a?a?a?a123?a' --potfile-path=hashcat_mask.potfile
```

#### Example: SHA1

```bash
hashcat -m 100 -a 3 be767ea64275dea215316e61eceb650e67182b4e '12?a?a?a?a12?a?a1' --potfile-path=hashcat_mask.potfile
```

#### Example: SHA1 with long known prefix

```bash
hashcat -m 100 -a 3 c004b7c5149a6a536c5004de8d59e399bdd4b6a7 '87623674523645276542675?a?a?a' --potfile-path=hashcat_mask.potfile
```

The attack was very efficient because most of the password structure was already known.

---

### 4. Store Recovered Passwords in a Custom Potfile

Hashcat stores successfully recovered passwords in a potfile.  
For this exercise, the following custom file was used:

```text
hashcat_mask.potfile
```

This made the results easy to review and ready for submission.

To display the contents of the potfile:

```bash
cat hashcat_mask.potfile
```

Example output:

```text
41dc93d37c5615bb724b14968d0f5b04:axXx123X
be767ea64275dea215316e61eceb650e67182b4e:120!__12901
c004b7c5149a6a536c5004de8d59e399bdd4b6a7:87623674523645276542675!!!
```

---

## Observations During the Exercise

Several practical observations were made during the attacks:

- All three hashes were recovered successfully.
- The attack was much faster than a pure brute force attack.
- Even a small amount of known password structure reduced the search space dramatically.
- Long known prefixes were especially helpful.
- Mask attacks are highly efficient when partial password information is available.

This demonstrates why leaked password hints, patterns, and predictable user behavior can be dangerous.

---

## Mask Attack vs. Brute Force Attack

This exercise made the difference between mask attacks and brute force attacks very clear.

| Attack Type | Method | Strength | Weakness |
|-------------|--------|----------|----------|
| Brute Force | Tries all combinations for the full length | Can eventually find unknown passwords | Can be very slow |
| Mask Attack | Uses known password positions and tests only unknown characters | Much faster when partial structure is known | Requires prior knowledge about the password |

In this task, the mask attack was the best choice because parts of the passwords were already known.

---

## Security Analysis

This exercise demonstrates several important security lessons.

### Partial Password Information Can Be Dangerous

If an attacker knows even a few characters, prefixes, suffixes, or repeated patterns, the number of possible combinations can shrink dramatically.

### Predictable Password Construction Weakens Security

Patterns such as:

- fixed prefixes
- repeated number blocks
- common suffixes like `123`
- long known numeric sequences

make passwords much easier to recover.

### Stronger Hashing Does Not Eliminate Weak Password Design

Even when SHA1 was used, the passwords were still recoverable because the unknown part of the password was small.

### Password Hints and Leaks Matter

Any leaked or guessed structural information about a password can make targeted attacks much more practical.

---

## Lessons Learned

This exercise helped reinforce the following points:

- Hash identification should always come first.
- Hashcat requires the correct `-m` mode.
- Mask attacks are extremely efficient when part of the password is known.
- Correctly translating a known pattern into a Hashcat mask is essential.
- Custom potfiles make verification and submission easier.
- Password predictability creates serious security risks.

---

## Conclusion

The mask attack with Hashcat successfully demonstrated a complete targeted password recovery workflow:

1. identify the hash type  
2. choose the correct Hashcat mode  
3. convert the known password pattern into a Hashcat mask  
4. run the mask attack with Hashcat  
5. store recovered results in a custom potfile  
6. review and document the recovered credentials  

All target hashes were recovered successfully.

This exercise clearly showed that mask attacks can be significantly more efficient than brute force attacks when partial password information is already known.

---

## Legal Disclaimer

This documentation is provided for **educational purposes only**.

Hashcat and similar tools must only be used on systems, files, accounts, or datasets that you own or are explicitly authorized to test. Unauthorized password cracking or security testing may be illegal and unethical.