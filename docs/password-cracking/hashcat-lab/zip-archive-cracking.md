# ZIP Archive Cracking

## Overview

This document explains how the **ZIP archive cracking task** was solved in a practical lab setup.

The goal was to recover the password of a protected ZIP archive by identifying the correct archive hash format and then using **Hashcat** with the correct cracking mode.

During the process, an important issue appeared: the attack did **not** work immediately with the first assumptions. The key step was correctly identifying the ZIP hash type and then selecting the right Hashcat mode.

This documentation describes the full reasoning, the commands used, the error source, the final working solution, and the most important lessons learned.

---

## Objective

The main objective of this task was:

- extract the hash of a password-protected ZIP archive
- identify the correct archive type
- choose the correct Hashcat mode
- crack the password using a wordlist attack
- understand why the first attempt failed
- verify the result
- document the full workflow clearly

---

## Why ZIP Cracking Can Be Confusing

ZIP archives are not all handled the same way.

Different ZIP files may use different internal formats and protection methods, for example:

- legacy PKZIP encryption
- WinZip / AES-based ZIP encryption
- single-file archives
- multi-file archives
- compressed or stored entries

Because of this, **not every ZIP hash belongs to the same Hashcat mode**.

That is exactly why ZIP cracking often fails at first: the archive may look like a normal `.zip` file, but internally the hash type may require a very specific mode.

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `zip2john` | Extract hash information from the ZIP archive |
| `Hashcat` | Crack the extracted hash |
| `rockyou.txt` or another wordlist | Provide password candidates |
| `unzip` | Verify the recovered password by opening the archive |

---

## Step 1 – Extract the ZIP Hash

The first important step was to extract the hash from the password-protected ZIP archive.

A common tool for that is:

```bash
zip2john archive.zip > zip.hash
```

This command reads the ZIP archive structure and converts the protection data into a format that cracking tools can use.

The resulting output looked like a **PKZIP-style hash**, for example beginning with something similar to:

```text
$pkzip$...
```

This prefix was extremely important because it already showed that the archive belonged to the **PKZIP family**.

---

## Why the `$pkzip$` Prefix Matters

The extracted hash started with:

```text
$pkzip$
```

That means the archive was not a generic “unknown ZIP password hash”, but specifically a **PKZIP-formatted archive hash**.

This is the reason why the cracking mode had to be chosen from Hashcat's ZIP / PKZIP related modes instead of simply guessing.

### What this tells us

| Observation | Meaning |
|-------------|---------|
| Hash starts with `$pkzip$` | Archive belongs to PKZIP-style format |
| Not all ZIP hashes use the same mode | Need to select correct ZIP-specific mode |
| Wrong mode causes failure | Correct mode identification is essential |

---

## Step 2 – Initial Problem

At first, the cracking attempt failed.

This usually happens for one of the following reasons:

| Possible Cause | Explanation |
|---------------|-------------|
| Wrong Hashcat mode | The archive format does not match the selected mode |
| Damaged hash file | The extracted hash is incomplete or malformed |
| Unsupported archive format | The selected tool mode does not support the given variant |
| Password not in wordlist | The chosen wordlist does not contain the correct password |

In this case, the most important issue was the **wrong mode assumption**.

The ZIP file was valid, the hash extraction worked, but the chosen cracking mode was not the correct one for the extracted hash format.

---

## Step 3 – Why Mode `17210` Was Used

The correct Hashcat mode turned out to be:

```text
17210
```

### Why exactly `17210`?

Because the extracted hash had the **`$pkzip$`** structure and matched the format used by **PKZIP compressed multi-file archives**.

So the reasoning was:

1. The extracted hash was not random text.
2. It clearly used the `$pkzip$` format.
3. Hashcat provides different ZIP-related modes.
4. The working one for this archive type was mode `17210`.

### Summary table

| Hashcat Mode | Archive Type |
|-------------|--------------|
| `17200` | PKZIP compressed |
| `17210` | PKZIP compressed multi-file |
| `17220` | PKZIP compressed multi-file checksum-only |
| `13600` | WinZip |
| `23001` and related ZIP modes | Other archive / ZIP variants depending on encryption type |

### Practical answer to “Where did `17210` come from?”

It came from the **hash structure itself**.

The `$pkzip$` output showed that the archive belonged to the PKZIP family, and after matching the archive behavior and testing the correct PKZIP mode, `17210` was the one that worked for this case.

So the answer is:

- **not guessed**
- **not random**
- chosen because the extracted hash format pointed to **PKZIP**
- confirmed because that mode successfully processed the hash

---

## Step 4 – Successful Hashcat Command

The working command was:

```bash
hashcat -m 17210 zip.hash rockyou.txt
```

### Command breakdown

| Part | Meaning |
|------|---------|
| `hashcat` | Start Hashcat |
| `-m 17210` | Use PKZIP compressed multi-file mode |
| `zip.hash` | Input file containing the extracted ZIP hash |
| `rockyou.txt` | Wordlist with candidate passwords |

This launched a **dictionary attack**, meaning Hashcat tested one password candidate after another from the wordlist until a match was found.

---

## Step 5 – What a Dictionary Attack Does

A dictionary attack does not try every possible character combination.

Instead, it uses a file containing common passwords such as:

- `123456`
- `password`
- `qwerty`
- `secret123`

This is much faster than brute force when the target password is weak or commonly used.

### Comparison

| Attack Type | How it works | Strength |
|------------|--------------|----------|
| Dictionary attack | Tries passwords from a wordlist | Fast for weak/common passwords |
| Brute force attack | Tries all possible combinations | Slower but more complete |
| Rule-based attack | Modifies wordlist entries | Good balance between speed and coverage |

For this task, a **dictionary attack** was enough.

---

## Step 6 – Crack Result and Potfile

After the password was found, Hashcat stored the result in a **potfile**.

Example command:

```bash
cat zip.potfile
```

The content looked like this style:

```text
$pkzip$...:recovered_password
```

### What is the potfile?

The potfile is Hashcat's memory of already cracked hashes.

That means:

- Hashcat stores successful results automatically
- previously cracked hashes do not need to be cracked again
- the file links a hash to its recovered plaintext password

### Potfile purpose

| Benefit | Explanation |
|--------|-------------|
| Saves progress | Hashcat remembers previous successes |
| Prevents duplicate work | Already solved hashes can be shown instantly |
| Useful for verification | You can confirm which password belongs to which hash |

---

## Step 7 – Show the Recovered Password Again

If the result was already stored, Hashcat could display it again using:

```bash
hashcat --show -m 17210 zip.hash
```

This is useful when:

- the terminal session was closed
- you want a clean output of the recovered password
- the potfile already contains the solution

---

## Step 8 – Verify the Password

After cracking the password, the result should always be verified by trying to open the ZIP archive.

Example:

```bash
unzip archive.zip
```

The recovered password can then be entered to confirm that the file opens successfully.

### Why verification matters

| Reason | Explanation |
|--------|-------------|
| Confirms the crack | Ensures the recovered password is correct |
| Detects mistakes | Prevents documenting a false positive |
| Completes the workflow | Shows the attack succeeded end-to-end |

---

## Full Workflow Summary

| Step | Action | Result |
|------|--------|--------|
| 1 | Extract hash with `zip2john` | ZIP hash obtained |
| 2 | Inspect prefix | `$pkzip$` identified |
| 3 | Select matching Hashcat mode | Mode `17210` chosen |
| 4 | Run dictionary attack | Password candidates tested |
| 5 | Crack succeeds | Password recovered |
| 6 | Read potfile / use `--show` | Result confirmed |
| 7 | Open archive | Password verified |

---

## Important Commands

## Extract ZIP hash

```bash
zip2john archive.zip > zip.hash
```

## Run Hashcat with the correct mode

```bash
hashcat -m 17210 zip.hash rockyou.txt
```

## Show previously cracked result

```bash
hashcat --show -m 17210 zip.hash
```

## View the potfile directly

```bash
cat zip.potfile
```

## Verify by opening the archive

```bash
unzip archive.zip
```

---

## Security Lessons Learned

This task showed several important practical lessons.

### 1. Correct format identification is critical

Cracking does not begin with raw power.  
It begins with correctly understanding the target format.

### 2. Small technical details matter

A prefix such as:

```text
$pkzip$
```

may look minor, but it completely changes which cracking mode should be used.

### 3. Wrong assumptions waste time

If the wrong Hashcat mode is chosen, the attack may fail even though:

- the hash is valid
- the password exists in the wordlist
- the tool itself works correctly

### 4. Potfiles are useful

The potfile is not just a side effect.  
It is an important part of Hashcat workflow because it stores previous successes and helps with result verification.

---

## Why This Task Was Valuable

This exercise was useful because it combined multiple important cybersecurity skills:

- archive hash extraction
- hash format identification
- practical Hashcat usage
- dictionary attack workflow
- troubleshooting failed cracking attempts
- verification of recovered credentials
- documentation of an offensive security process

It also demonstrated an important real-world lesson:  
**the tool alone is not enough — correct interpretation of the target is what makes the attack work.**

---

## Conclusion

The ZIP archive was successfully cracked after identifying the hash as a **PKZIP-style hash** and selecting the correct Hashcat mode:

```text
17210
```

The most important part of the solution was not just running Hashcat, but understanding **why** that mode was the correct one.

The workflow was:

1. extract the hash
2. recognize the `$pkzip$` format
3. choose mode `17210`
4. run the dictionary attack
5. recover the password
6. verify the result

This task clearly showed how important archive-type recognition is in password cracking workflows.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Password recovery and cracking techniques may only be used on systems, files, or archives that you own or are explicitly authorized to test.