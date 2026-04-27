---
sidebar_label: Source Code
---

# Integrity Checker Source Code

```python
#!/usr/bin/env python3
"""
File Integrity Checker v2

Features
--------
- Create a baseline of file hashes for a file or directory
- Compare current state against the saved baseline
- Detect added, modified, and deleted files
- Recursive directory scanning
- Supports multiple hash algorithms
- Optional colored CLI output
- CSV report export
- HTML report export
- Include / exclude glob patterns
- Exclude common noise like .git, __pycache__, .DS_Store
- Optional watch mode with polling

Examples
--------
Create baseline:
    python integrity_checker_v2.py baseline /path/to/folder --output baseline.json

Check integrity:
    python integrity_checker_v2.py check /path/to/folder --baseline baseline.json

Check with HTML and CSV reports:
    python integrity_checker_v2.py check /path/to/folder --baseline baseline.json --html-report report.html --csv-report report.csv

Use include / exclude patterns:
    python integrity_checker_v2.py baseline /path/to/folder --include "*.py" --exclude "*.log" --exclude ".git/*"

Watch mode:
    python integrity_checker_v2.py watch /path/to/folder --baseline baseline.json --interval 10
"""

from __future__ import annotations

import argparse
import csv
import fnmatch
import hashlib
import html
import json
import os
import sys
import time
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Tuple

SUPPORTED_ALGORITHMS = {"md5", "sha1", "sha256", "sha512"}

DEFAULT_EXCLUDES = [
    ".git/*",
    ".git",
    "__pycache__/*",
    "__pycache__",
    ".DS_Store",
    "*.pyc",
    "*.pyo",
    "*.swp",
    "*.tmp",
    "*.temp",
]

try:
    from colorama import Fore, Style, init as colorama_init

    colorama_init(autoreset=True)
    COLOR_ENABLED = True
except Exception:
    COLOR_ENABLED = False

    class Dummy:
        RED = GREEN = YELLOW = CYAN = MAGENTA = WHITE = RESET_ALL = ""

    Fore = Style = Dummy()


@dataclass
class FileRecord:
    path: str
    hash: str
    size: int
    modified_time: float


@dataclass
class ScanResult:
    added: List[str]
    deleted: List[str]
    modified: List[str]
    unchanged: List[str]
    errors: List[str]
    algorithm: str
    root_path: str
    checked_at: str


def color_text(text: str, color: str) -> str:
    if not COLOR_ENABLED:
        return text
    return f"{color}{text}{Style.RESET_ALL}"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_path_for_matching(path: str) -> str:
    return path.replace(os.sep, "/")


def matches_any_pattern(relative_path: str, patterns: Sequence[str]) -> bool:
    normalized = normalize_path_for_matching(relative_path)
    return any(fnmatch.fnmatch(normalized, pattern) for pattern in patterns)


def compute_file_hash(file_path: Path, algorithm: str = "sha256", chunk_size: int = 8192) -> str:
    if algorithm not in SUPPORTED_ALGORITHMS:
        raise ValueError(f"Unsupported algorithm: {algorithm}")

    hasher = hashlib.new(algorithm)
    with file_path.open("rb") as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()


def collect_files(root_path: Path) -> List[Path]:
    if not root_path.exists():
        raise FileNotFoundError(f"Path does not exist: {root_path}")

    if root_path.is_file():
        return [root_path]

    return sorted([p for p in root_path.rglob("*") if p.is_file()])


def should_include_file(relative_path: str, include_patterns: Sequence[str], exclude_patterns: Sequence[str]) -> bool:
    normalized = normalize_path_for_matching(relative_path)

    if exclude_patterns and matches_any_pattern(normalized, exclude_patterns):
        return False

    if include_patterns:
        return matches_any_pattern(normalized, include_patterns)

    return True


def create_records(
    root_path: Path,
    algorithm: str,
    include_patterns: Sequence[str],
    exclude_patterns: Sequence[str],
) -> Tuple[Dict[str, FileRecord], List[str]]:
    files = collect_files(root_path)
    records: Dict[str, FileRecord] = {}
    errors: List[str] = []

    for file_path in files:
        try:
            if root_path.is_file():
                relative_path = file_path.name
            else:
                relative_path = str(file_path.relative_to(root_path))

            if not should_include_file(relative_path, include_patterns, exclude_patterns):
                continue

            stat = file_path.stat()
            file_hash = compute_file_hash(file_path, algorithm)

            records[relative_path] = FileRecord(
                path=relative_path,
                hash=file_hash,
                size=stat.st_size,
                modified_time=stat.st_mtime,
            )
        except Exception as exc:
            errors.append(f"{file_path}: {exc}")

    return records, errors


def load_baseline(baseline_file: Path) -> dict:
    if not baseline_file.exists():
        raise FileNotFoundError(f"Baseline file not found: {baseline_file}")

    try:
        return json.loads(baseline_file.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid baseline JSON: {exc}") from exc


def save_baseline(
    root_path: Path,
    output_file: Path,
    algorithm: str,
    include_patterns: Sequence[str],
    exclude_patterns: Sequence[str],
) -> None:
    records, errors = create_records(root_path, algorithm, include_patterns, exclude_patterns)

    baseline = {
        "created_at": utc_now_iso(),
        "algorithm": algorithm,
        "root_path": str(root_path.resolve()),
        "include_patterns": list(include_patterns),
        "exclude_patterns": list(exclude_patterns),
        "files": {path: asdict(record) for path, record in records.items()},
    }

    output_file.write_text(json.dumps(baseline, indent=2), encoding="utf-8")

    print(color_text(f"[+] Baseline created: {output_file}", Fore.GREEN))
    print(color_text(f"[+] Files indexed: {len(records)}", Fore.GREEN))

    if include_patterns:
        print(color_text(f"[i] Include patterns: {', '.join(include_patterns)}", Fore.CYAN))
    if exclude_patterns:
        print(color_text(f"[i] Exclude patterns: {', '.join(exclude_patterns)}", Fore.CYAN))

    if errors:
        print(color_text(f"[!] Files with errors: {len(errors)}", Fore.YELLOW))
        for err in errors:
            print(color_text(f"    - {err}", Fore.YELLOW))


def compare_baseline(current_records: Dict[str, FileRecord], baseline_data: dict, errors: List[str]) -> ScanResult:
    baseline_files_raw = baseline_data.get("files", {})
    baseline_files: Dict[str, FileRecord] = {
        path: FileRecord(**record_data) for path, record_data in baseline_files_raw.items()
    }

    current_paths = set(current_records.keys())
    baseline_paths = set(baseline_files.keys())

    added = sorted(current_paths - baseline_paths)
    deleted = sorted(baseline_paths - current_paths)

    modified: List[str] = []
    unchanged: List[str] = []

    for path in sorted(current_paths & baseline_paths):
        if current_records[path].hash != baseline_files[path].hash:
            modified.append(path)
        else:
            unchanged.append(path)

    return ScanResult(
        added=added,
        deleted=deleted,
        modified=modified,
        unchanged=unchanged,
        errors=errors,
        algorithm=baseline_data.get("algorithm", "sha256"),
        root_path=baseline_data.get("root_path", ""),
        checked_at=utc_now_iso(),
    )


def print_report(results: ScanResult) -> None:
    print(color_text("\n=== Integrity Check Report ===", Fore.CYAN))
    print(f"Checked at      : {results.checked_at}")
    print(f"Algorithm       : {results.algorithm}")
    print(f"Root path       : {results.root_path}")
    print(color_text(f"Added files     : {len(results.added)}", Fore.GREEN if results.added else Fore.WHITE))
    print(color_text(f"Deleted files   : {len(results.deleted)}", Fore.YELLOW if results.deleted else Fore.WHITE))
    print(color_text(f"Modified files  : {len(results.modified)}", Fore.RED if results.modified else Fore.WHITE))
    print(f"Unchanged files : {len(results.unchanged)}")
    print(color_text(f"Errors          : {len(results.errors)}", Fore.MAGENTA if results.errors else Fore.WHITE))

    if results.added:
        print(color_text("\n[+] Added", Fore.GREEN))
        for path in results.added:
            print(color_text(f"    - {path}", Fore.GREEN))

    if results.deleted:
        print(color_text("\n[-] Deleted", Fore.YELLOW))
        for path in results.deleted:
            print(color_text(f"    - {path}", Fore.YELLOW))

    if results.modified:
        print(color_text("\n[!] Modified", Fore.RED))
        for path in results.modified:
            print(color_text(f"    - {path}", Fore.RED))

    if results.errors:
        print(color_text("\n[!] Errors", Fore.MAGENTA))
        for err in results.errors:
            print(color_text(f"    - {err}", Fore.MAGENTA))

    if not (results.added or results.deleted or results.modified or results.errors):
        print(color_text("\n[+] Integrity check passed. No changes detected.", Fore.GREEN))


def export_csv_report(results: ScanResult, output_file: Path) -> None:
    rows = []

    for path in results.added:
        rows.append({"status": "added", "path": path})
    for path in results.deleted:
        rows.append({"status": "deleted", "path": path})
    for path in results.modified:
        rows.append({"status": "modified", "path": path})
    for path in results.unchanged:
        rows.append({"status": "unchanged", "path": path})
    for err in results.errors:
        rows.append({"status": "error", "path": err})

    with output_file.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["status", "path"])
        writer.writeheader()
        writer.writerows(rows)

    print(color_text(f"[+] CSV report saved: {output_file}", Fore.GREEN))


def render_list_items(items: Sequence[str], css_class: str) -> str:
    if not items:
        return '<li class="empty">None</li>'
    return "\n".join(f'<li class="{css_class}">{html.escape(item)}</li>' for item in items)


def export_html_report(results: ScanResult, output_file: Path) -> None:
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Integrity Checker Report</title>
  <style>
    body {{
      font-family: Arial, sans-serif;
      margin: 2rem;
      background: #0f172a;
      color: #e2e8f0;
    }}
    h1, h2 {{
      color: #f8fafc;
    }}
    .card {{
      background: #1e293b;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      margin-bottom: 1rem;
      box-shadow: 0 6px 24px rgba(0,0,0,0.25);
    }}
    .stats {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
    }}
    .stat {{
      background: #334155;
      border-radius: 10px;
      padding: 1rem;
    }}
    .added {{ color: #22c55e; }}
    .deleted {{ color: #facc15; }}
    .modified {{ color: #ef4444; }}
    .error {{ color: #d946ef; }}
    .empty {{ color: #94a3b8; }}
    ul {{
      line-height: 1.7;
    }}
    code {{
      background: #0b1220;
      padding: 0.15rem 0.35rem;
      border-radius: 6px;
    }}
  </style>
</head>
<body>
  <h1>File Integrity Checker Report</h1>

  <div class="card">
    <p><strong>Checked at:</strong> {html.escape(results.checked_at)}</p>
    <p><strong>Algorithm:</strong> <code>{html.escape(results.algorithm)}</code></p>
    <p><strong>Root path:</strong> <code>{html.escape(results.root_path)}</code></p>
  </div>

  <div class="card stats">
    <div class="stat"><strong>Added</strong><br>{len(results.added)}</div>
    <div class="stat"><strong>Deleted</strong><br>{len(results.deleted)}</div>
    <div class="stat"><strong>Modified</strong><br>{len(results.modified)}</div>
    <div class="stat"><strong>Unchanged</strong><br>{len(results.unchanged)}</div>
    <div class="stat"><strong>Errors</strong><br>{len(results.errors)}</div>
  </div>

  <div class="card">
    <h2>Added Files</h2>
    <ul>
      {render_list_items(results.added, "added")}
    </ul>
  </div>

  <div class="card">
    <h2>Deleted Files</h2>
    <ul>
      {render_list_items(results.deleted, "deleted")}
    </ul>
  </div>

  <div class="card">
    <h2>Modified Files</h2>
    <ul>
      {render_list_items(results.modified, "modified")}
    </ul>
  </div>

  <div class="card">
    <h2>Errors</h2>
    <ul>
      {render_list_items(results.errors, "error")}
    </ul>
  </div>
</body>
</html>
"""
    output_file.write_text(html_content, encoding="utf-8")
    print(color_text(f"[+] HTML report saved: {output_file}", Fore.GREEN))


def generate_reports(results: ScanResult, html_report: Optional[Path], csv_report: Optional[Path]) -> None:
    if html_report:
        export_html_report(results, html_report)
    if csv_report:
        export_csv_report(results, csv_report)


def run_check(
    root_path: Path,
    baseline_file: Path,
    html_report: Optional[Path],
    csv_report: Optional[Path],
    include_patterns_override: Optional[Sequence[str]] = None,
    exclude_patterns_override: Optional[Sequence[str]] = None,
) -> Tuple[int, ScanResult]:
    baseline_data = load_baseline(baseline_file)
    algorithm = baseline_data.get("algorithm", "sha256")

    if algorithm not in SUPPORTED_ALGORITHMS:
        raise ValueError(f"Baseline uses unsupported algorithm: {algorithm}")

    include_patterns = list(include_patterns_override) if include_patterns_override is not None else list(baseline_data.get("include_patterns", []))
    exclude_patterns = list(exclude_patterns_override) if exclude_patterns_override is not None else list(baseline_data.get("exclude_patterns", DEFAULT_EXCLUDES))

    current_records, errors = create_records(root_path, algorithm, include_patterns, exclude_patterns)
    results = compare_baseline(current_records, baseline_data, errors)
    print_report(results)
    generate_reports(results, html_report, csv_report)

    exit_code = 1 if (results.added or results.deleted or results.modified or results.errors) else 0
    return exit_code, results


def run_watch(
    root_path: Path,
    baseline_file: Path,
    interval: int,
    html_report: Optional[Path],
    csv_report: Optional[Path],
    include_patterns_override: Optional[Sequence[str]] = None,
    exclude_patterns_override: Optional[Sequence[str]] = None,
) -> int:
    print(color_text(f"[i] Watch mode started. Checking every {interval} seconds. Press Ctrl+C to stop.", Fore.CYAN))

    previous_signature = None

    while True:
        _, results = run_check(
            root_path=root_path,
            baseline_file=baseline_file,
            html_report=html_report,
            csv_report=csv_report,
            include_patterns_override=include_patterns_override,
            exclude_patterns_override=exclude_patterns_override,
        )

        signature = (
            tuple(results.added),
            tuple(results.deleted),
            tuple(results.modified),
            tuple(results.errors),
        )

        if signature != previous_signature:
            if results.added or results.deleted or results.modified or results.errors:
                print(color_text("\n[ALERT] Integrity change detected.", Fore.RED))
            else:
                print(color_text("\n[OK] No changes detected.", Fore.GREEN))
            previous_signature = signature

        time.sleep(interval)


def parse_patterns(patterns: Optional[Sequence[str]]) -> List[str]:
    if not patterns:
        return []
    clean = []
    for pattern in patterns:
        stripped = pattern.strip()
        if stripped:
            clean.append(stripped)
    return clean


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="File Integrity Checker v2")
    subparsers = parser.add_subparsers(dest="command", required=True)

    baseline_parser = subparsers.add_parser("baseline", help="Create a new baseline")
    baseline_parser.add_argument("path", type=Path, help="File or directory to scan")
    baseline_parser.add_argument("--output", type=Path, default=Path("baseline.json"), help="Output baseline JSON file")
    baseline_parser.add_argument("--algorithm", choices=sorted(SUPPORTED_ALGORITHMS), default="sha256", help="Hash algorithm")
    baseline_parser.add_argument("--include", action="append", help="Include glob pattern (can be used multiple times)")
    baseline_parser.add_argument("--exclude", action="append", help="Exclude glob pattern (can be used multiple times)")
    baseline_parser.add_argument("--no-default-excludes", action="store_true", help="Disable default excludes like .git and __pycache__")

    check_parser = subparsers.add_parser("check", help="Check current files against baseline")
    check_parser.add_argument("path", type=Path, help="File or directory to scan")
    check_parser.add_argument("--baseline", type=Path, default=Path("baseline.json"), help="Baseline JSON file")
    check_parser.add_argument("--html-report", type=Path, help="Optional HTML report output file")
    check_parser.add_argument("--csv-report", type=Path, help="Optional CSV report output file")
    check_parser.add_argument("--include", action="append", help="Override include glob pattern (can be used multiple times)")
    check_parser.add_argument("--exclude", action="append", help="Override exclude glob pattern (can be used multiple times)")
    check_parser.add_argument("--no-default-excludes", action="store_true", help="Disable default excludes if no custom excludes are provided")

    watch_parser = subparsers.add_parser("watch", help="Watch files continuously against baseline")
    watch_parser.add_argument("path", type=Path, help="File or directory to scan")
    watch_parser.add_argument("--baseline", type=Path, default=Path("baseline.json"), help="Baseline JSON file")
    watch_parser.add_argument("--interval", type=int, default=10, help="Polling interval in seconds")
    watch_parser.add_argument("--html-report", type=Path, help="Optional HTML report output file")
    watch_parser.add_argument("--csv-report", type=Path, help="Optional CSV report output file")
    watch_parser.add_argument("--include", action="append", help="Override include glob pattern (can be used multiple times)")
    watch_parser.add_argument("--exclude", action="append", help="Override exclude glob pattern (can be used multiple times)")
    watch_parser.add_argument("--no-default-excludes", action="store_true", help="Disable default excludes if no custom excludes are provided")

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    try:
        include_patterns = parse_patterns(getattr(args, "include", None))
        exclude_patterns = parse_patterns(getattr(args, "exclude", None))

        if not exclude_patterns and not getattr(args, "no_default_excludes", False):
            exclude_patterns = list(DEFAULT_EXCLUDES)

        if args.command == "baseline":
            save_baseline(
                root_path=args.path,
                output_file=args.output,
                algorithm=args.algorithm,
                include_patterns=include_patterns,
                exclude_patterns=exclude_patterns,
            )
            return 0

        if args.command == "check":
            exit_code, _ = run_check(
                root_path=args.path,
                baseline_file=args.baseline,
                html_report=args.html_report,
                csv_report=args.csv_report,
                include_patterns_override=include_patterns if include_patterns else None,
                exclude_patterns_override=exclude_patterns if (exclude_patterns or args.no_default_excludes) else None,
            )
            return exit_code

        if args.command == "watch":
            return run_watch(
                root_path=args.path,
                baseline_file=args.baseline,
                interval=args.interval,
                html_report=args.html_report,
                csv_report=args.csv_report,
                include_patterns_override=include_patterns if include_patterns else None,
                exclude_patterns_override=exclude_patterns if (exclude_patterns or args.no_default_excludes) else None,
            )

        parser.print_help()
        return 2

    except KeyboardInterrupt:
        print(color_text("\n[!] Operation cancelled by user.", Fore.YELLOW))
        return 130
    except Exception as exc:
        print(color_text(f"[ERROR] {exc}", Fore.RED))
        return 2


if __name__ == "__main__":
    sys.exit(main())
```