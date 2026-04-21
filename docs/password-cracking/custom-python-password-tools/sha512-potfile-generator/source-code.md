---
sidebar_label: Source Code
---

# SHA512 Potfile Generator With Python

```python
#!/usr/bin/env python3
"""
SHA-512 Potfile Generator
Made by Ogisha

Creates a potfile from rockyou.txt in the format:
SHA512(password):password
"""

import hashlib
import sys
import time
from pathlib import Path

# Colors
RED = "\033[91m"
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
MAGENTA = "\033[95m"
WHITE = "\033[97m"
RESET = "\033[0m"

INPUT_FILE = "rockyou.txt"
OUTPUT_FILE = "rockyou_sha512.potfile"


def banner():
    print(
        CYAN
        + r"""
╔════════════════════════════════════════════════════════════╗
║                 SHA-512 POTFILE GENERATOR                  ║
║                                                            ║
║                       MADE BY OGISHA                       ║
╚════════════════════════════════════════════════════════════╝
"""
        + RESET
    )


def count_lines(filepath: Path) -> int:
    count = 0
    with filepath.open("r", encoding="latin-1", errors="ignore") as f:
        for _ in f:
            count += 1
    return count


def fmt_duration(seconds: float) -> str:
    seconds = int(seconds)
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h}h {m}m {s}s"
    if m:
        return f"{m}m {s}s"
    return f"{s}s"


def generate_potfile(input_path: Path, output_path: Path) -> None:
    if not input_path.exists():
        print(f"{RED}[✗] Input file not found: {input_path}{RESET}")
        sys.exit(1)

    print(f"{WHITE}[•] Input File : {input_path}{RESET}")
    print(f"{WHITE}[•] Output File: {output_path}{RESET}")
    print(f"{CYAN}[⚡] Counting passwords...{RESET}")

    total_lines = count_lines(input_path)
    print(f"{WHITE}[•] Total Lines : {total_lines:,}{RESET}")
    print(f"{CYAN}\n[⚡] Generating SHA-512 potfile...\n{RESET}")

    start = time.time()
    processed = 0
    written = 0

    with input_path.open("r", encoding="latin-1", errors="ignore") as infile, \
         output_path.open("w", encoding="utf-8") as outfile:

        for line in infile:
            processed += 1
            password = line.rstrip("\r\n")

            if not password:
                continue

            hash_value = hashlib.sha512(password.encode("utf-8")).hexdigest()
            outfile.write(f"{hash_value}:{password}\n")
            written += 1

            if processed % 100000 == 0:
                elapsed = time.time() - start
                speed = processed / elapsed if elapsed > 0 else 0
                percent = (processed / total_lines) * 100 if total_lines else 0
                remaining = total_lines - processed
                eta = remaining / speed if speed > 0 else 0

                print(
                    f"{MAGENTA}[•] Processed {processed:,}/{total_lines:,} "
                    f"({percent:.2f}%) | Speed: {speed:,.0f}/s | ETA: {fmt_duration(eta)}{RESET}"
                )

    elapsed = time.time() - start
    speed = processed / elapsed if elapsed > 0 else 0

    print(f"{GREEN}\n[✓] POTFILE CREATED SUCCESSFULLY!\n{RESET}")
    print("┌────────────────────────────────────────────────────┐")
    print(f"│ Output File : {str(output_path):<37} │")
    print(f"│ Lines Read  : {processed:<37,} │")
    print(f"│ Hashes Saved: {written:<37,} │")
    print(f"│ Time        : {fmt_duration(elapsed):<37} │")
    print(f"│ Speed       : {round(speed):<37,}/ │")
    print("└────────────────────────────────────────────────────┘")

    print(f"\n{YELLOW}[i] Output format: SHA512(password):password{RESET}")


def main():
    banner()

    input_path = Path(INPUT_FILE)
    output_path = Path(OUTPUT_FILE)

    if len(sys.argv) > 1:
        input_path = Path(sys.argv[1])
    if len(sys.argv) > 2:
        output_path = Path(sys.argv[2])

    generate_potfile(input_path, output_path)


if __name__ == "__main__":
    main()
```