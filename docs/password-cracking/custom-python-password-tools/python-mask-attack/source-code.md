---
sidebar_label: Source Code
---

# Mask Attack With Python

```python
#!/usr/bin/env python3
"""
Mask Attack Tool
Made by Ogisha
"""

import argparse
import hashlib
import itertools
import random
import sys
import time

# Colors
RED = "\033[91m"
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
MAGENTA = "\033[95m"
WHITE = "\033[97m"
RESET = "\033[0m"

# Supported hash algorithms
SUPPORTED_HASHES = {
    "md5": {"length": 32, "func": hashlib.md5},
    "sha1": {"length": 40, "func": hashlib.sha1},
    "sha256": {"length": 64, "func": hashlib.sha256},
    "sha512": {"length": 128, "func": hashlib.sha512},
}

# Character sets for mask patterns
CHAR_SETS = {
    "?d": "0123456789",
    "?l": "abcdefghijklmnopqrstuvwxyz",
    "?u": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "?a": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "?s": "!@#$%^&*()_+-=[]{};:,.<>?~",
}


def banner():
    print(
        CYAN
        + """
╔══════════════════════════════════════════════════════╗
║                HASH MASK ATTACK TOOL                 ║
║                                                      ║
║                   MADE BY OGISHA                     ║
╚══════════════════════════════════════════════════════╝
"""
        + RESET
    )


def detect_hash_algorithm(hash_value: str) -> str:
    """Guess hash algorithm based on hash length."""
    hash_length = len(hash_value)
    possible_algorithms = []

    for algo, info in SUPPORTED_HASHES.items():
        if info["length"] == hash_length:
            possible_algorithms.append(algo)

    if not possible_algorithms:
        raise ValueError(f"No supported algorithm found for length {hash_length}")

    if len(possible_algorithms) > 1:
        chosen = random.choice(possible_algorithms)
        print(f"{YELLOW}[!] Multiple algorithms possible: {', '.join(possible_algorithms)}{RESET}")
        print(f"{YELLOW}[!] Randomly selected: {chosen.upper()}{RESET}")
        return chosen

    return possible_algorithms[0]


def parse_mask(mask: str):
    """
    Parse mask string into a list of character set patterns.
    Example: "?d?l?u" -> ['?d', '?l', '?u']
    """
    patterns = []
    i = 0
    while i < len(mask):
        if mask[i] == "?" and i + 1 < len(mask):
            pattern = mask[i : i + 2]
            if pattern in CHAR_SETS:
                patterns.append(pattern)
                i += 2
            else:
                raise ValueError(f"Unknown pattern: {pattern}")
        else:
            patterns.append(mask[i])
            i += 1
    return patterns


def generate_passwords(patterns):
    """
    Generate all possible passwords based on the mask patterns.
    """
    char_sets = []
    for pattern in patterns:
        if pattern in CHAR_SETS:
            char_sets.append(CHAR_SETS[pattern])
        else:
            char_sets.append(pattern)

    for combination in itertools.product(*char_sets):
        yield "".join(combination)


def compute_hash(word: str, algorithm: str) -> str:
    """Calculate hash of a word using the specified algorithm."""
    word_encoded = word.encode("utf-8")

    if algorithm == "md5":
        return hashlib.md5(word_encoded).hexdigest()
    elif algorithm == "sha1":
        return hashlib.sha1(word_encoded).hexdigest()
    elif algorithm == "sha256":
        return hashlib.sha256(word_encoded).hexdigest()
    elif algorithm == "sha512":
        return hashlib.sha512(word_encoded).hexdigest()
    else:
        raise ValueError(f"Unsupported algorithm: {algorithm}")


def mask_attack(hash_value: str, mask: str, algorithm: str = None):
    """
    Perform mask attack to crack the hash.
    Returns the plaintext password if found, None otherwise.
    """
    hash_value = hash_value.lower()

    if algorithm is None:
        algorithm = detect_hash_algorithm(hash_value)
    else:
        algorithm = algorithm.lower()
        if algorithm not in SUPPORTED_HASHES:
            raise ValueError(
                f"Algorithm {algorithm} not supported. Use: {', '.join(SUPPORTED_HASHES.keys())}"
            )

    try:
        patterns = parse_mask(mask)
    except ValueError as e:
        print(f"{RED}[✗] Invalid mask: {e}{RESET}")
        return None

    total_combinations = 1
    for pattern in patterns:
        if pattern in CHAR_SETS:
            total_combinations *= len(CHAR_SETS[pattern])

    print(f"{WHITE}[•] Target Hash : {hash_value}{RESET}")
    print(f"{WHITE}[•] Algorithm  : {algorithm.upper()}{RESET}")
    print(f"{WHITE}[•] Mask       : {mask}{RESET}")
    print(f"{WHITE}[•] Length     : {len(patterns)} characters{RESET}")
    print(f"{WHITE}[•] Searchspace: {total_combinations:,} combinations{RESET}")
    print(f"{CYAN}\n[⚡] Starting mask attack...\n{RESET}")

    attempt = 0
    start = time.time()

    try:
        for password in generate_passwords(patterns):
            attempt += 1

            if attempt % 100000 == 0:
                progress = (attempt / total_combinations) * 100 if total_combinations else 0
                print(
                    f"{MAGENTA}[•] Tried {attempt:,} / {total_combinations:,} "
                    f"({progress:.2f}%){RESET}"
                )

            password_hash = compute_hash(password, algorithm)

            if password_hash == hash_value:
                duration = round(time.time() - start, 2)
                print(f"{GREEN}\n[✓] PASSWORD FOUND!\n{RESET}")
                print("┌─────────────────────────────────────┐")
                print(f"│ Password : {password:<24} │")
                print(f"│ Attempts : {attempt:<24,} │")
                print(f"│ Time     : {duration:<24} │")
                print("└─────────────────────────────────────┘")
                return password

    except KeyboardInterrupt:
        duration = round(time.time() - start, 2)
        print(f"{YELLOW}\n[!] Attack interrupted by user.{RESET}")
        print("┌─────────────────────────────────────┐")
        print(f"│ Attempts : {attempt:<24,} │")
        print(f"│ Time     : {duration:<24} │")
        print("└─────────────────────────────────────┘")
        return None

    print(f"{RED}\n[✗] Password not found with given mask.{RESET}")
    print(f"{WHITE}[•] Tried all {total_combinations:,} combinations.{RESET}")
    return None


def main():
    parser = argparse.ArgumentParser(
        description="Styled Mask Attack Tool for Hash Cracking",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Mask patterns:
  ?d - digit (0-9)
  ?l - lowercase letter (a-z)
  ?u - uppercase letter (A-Z)
  ?a - alphanumeric (a-z, A-Z, 0-9)
  ?s - special characters (!@#$%%^&*()_+-=[]{};:,.<>?~)

Examples:
  python mask_attack_styled_by_ogisha.py -t 5f4dcc3b5aa765d61d8327deb882cf99 -x "?l?l?l?l?l?l?l?l"
  python mask_attack_styled_by_ogisha.py -t 5f4dcc3b5aa765d61d8327deb882cf99 -x "password?d?d" -m md5
  python mask_attack_styled_by_ogisha.py -t cad899d7ad5a4bfdc281fbf1060d8f70 -x "?u?u?l?l?l?l?l?d?d?l?d?d?l?l?l?d?s" -m md5
        """,
    )

    parser.add_argument("-t", "--target", required=True, help="Target hash to crack")
    parser.add_argument("-x", "--mask", required=True, help='Mask pattern (e.g., "?u?l?l?d?d")')
    parser.add_argument("-m", "--method", help="Hash algorithm (md5, sha1, sha256, sha512)")

    args = parser.parse_args()

    if len(args.target) not in [info["length"] for info in SUPPORTED_HASHES.values()]:
        print(f"{YELLOW}[!] Warning: hash length {len(args.target)} doesn't match supported algorithms.{RESET}")
        print(
            f"{YELLOW}[!] Supported lengths: "
            + ", ".join(str(info["length"]) for info in SUPPORTED_HASHES.values())
            + RESET
        )

    banner()

    result = mask_attack(args.target, args.mask, args.method)

    sys.exit(0 if result else 1)


if __name__ == "__main__":
    main()
```