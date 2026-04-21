#!/usr/bin/env python3
"""
Dictionary Attack Tool - Crack password hashes using a wordlist
Usage: python dictionary_attack.py -t <hash> -d <dictionary_file> [-m <algorithm>]
"""

import argparse
import hashlib
import random
import sys
from typing import Optional

# RIPEMD-128 support via hashbase
try:
    from hashbase import RIPEMD128
    RIPEMD128_AVAILABLE = True
except ImportError:
    RIPEMD128_AVAILABLE = False


SUPPORTED_HASHES = {
    "md5": {"length": 32},
    "ripemd128": {"length": 32},
    "sha1": {"length": 40},
    "sha256": {"length": 64},
    "sha512": {"length": 128},
}


def detect_hash_algorithm(hash_value: str) -> str:
    """Guess hash algorithm by length, random if multiple match."""
    hash_length = len(hash_value)
    possible_algorithms = []

    for algo, info in SUPPORTED_HASHES.items():
        if info["length"] == hash_length:
            possible_algorithms.append(algo)

    if not possible_algorithms:
        raise ValueError(f"No supported algorithm found for length {hash_length}")

    if len(possible_algorithms) > 1:
        chosen = random.choice(possible_algorithms)
        print(f"[INFO] Multiple algorithms possible: {', '.join(possible_algorithms)}")
        print(f"[INFO] Randomly selected: {chosen.upper()}")
        return chosen

    return possible_algorithms[0]


def compute_hash(word: str, algorithm: str) -> str:
    """Calculate hash of a word using the specified algorithm."""
    word_encoded = word.encode("utf-8")

    if algorithm == "md5":
        return hashlib.md5(word_encoded).hexdigest()
    elif algorithm == "ripemd128":
        if not RIPEMD128_AVAILABLE:
            print("[ERROR] RIPEMD-128 support is missing.")
            print("[INFO] Install it with: pip install hashbase")
            sys.exit(1)
        return RIPEMD128().generate_hash(word)
    elif algorithm == "sha1":
        return hashlib.sha1(word_encoded).hexdigest()
    elif algorithm == "sha256":
        return hashlib.sha256(word_encoded).hexdigest()
    elif algorithm == "sha512":
        return hashlib.sha512(word_encoded).hexdigest()
    else:
        raise ValueError(f"Unsupported algorithm: {algorithm}")


def dictionary_attack(hash_value: str, dictionary_path: str, algorithm: Optional[str] = None) -> Optional[str]:
    """Main attack function."""
    hash_value = hash_value.lower()

    if algorithm is None:
        algorithm = detect_hash_algorithm(hash_value)
    else:
        algorithm = algorithm.lower()
        if algorithm not in SUPPORTED_HASHES:
            raise ValueError(
                f"Algorithm {algorithm} not supported. Use: {', '.join(SUPPORTED_HASHES.keys())}"
            )

    print(f"[INFO] Using hash algorithm: {algorithm.upper()}")
    print(f"[INFO] Opening dictionary: {dictionary_path}")
    print(f"[INFO] Target hash: {hash_value}")
    print("[INFO] Starting dictionary attack...")

    try:
        with open(dictionary_path, "r", encoding="utf-8", errors="ignore") as file:
            for line_num, line in enumerate(file, 1):
                word = line.rstrip("\r\n")

                if not word:
                    continue

                if line_num % 10000 == 0:
                    print(f"[INFO] Attempted {line_num} passwords...")

                word_hash = compute_hash(word, algorithm).lower()

                if word_hash == hash_value:
                    print("\n[SUCCESS] Password found!")
                    print(f"[SUCCESS] Password: {word}")
                    print(f"[SUCCESS] After {line_num} attempts")
                    return word

    except FileNotFoundError:
        print(f"[ERROR] Dictionary file not found: {dictionary_path}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Error reading dictionary: {e}")
        sys.exit(1)

    print("\n[FAILED] Password not found in dictionary.")
    return None


def main():
    parser = argparse.ArgumentParser(
        description="Dictionary Attack Tool for Hash Cracking"
    )

    parser.add_argument("-t", "--target", required=True, help="Target hash to crack")
    parser.add_argument("-d", "--dictionary", required=True, help="Path to dictionary / wordlist file")
    parser.add_argument(
        "-m",
        "--method",
        help="Hash algorithm (md5, ripemd128, sha1, sha256, sha512)",
    )

    args = parser.parse_args()

    result = dictionary_attack(args.target, args.dictionary, args.method)

    sys.exit(0 if result else 1)


if __name__ == "__main__":
    main()