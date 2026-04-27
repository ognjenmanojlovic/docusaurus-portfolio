---
sidebar_label: Source Code
---

# Log Analyzer Source Code

```python
#!/usr/bin/env python3
"""
log_analyzer.py

A polished CLI log analyzer for security-focused portfolio projects.
Features:
- Reads plain text log files
- Detects suspicious events using regex/keyword rules
- Summarizes findings in the terminal
- Highlights top suspicious IPs
- Exports results as JSON and/or CSV
- Supports adjustable brute-force threshold
- Uses colored terminal output when colorama is available

Example:
    python log_analyzer.py --file sample_logs/sample.log
    python log_analyzer.py --file sample_logs/sample.log --json
    python log_analyzer.py --file sample_logs/sample.log --csv
    python log_analyzer.py --file sample_logs/sample.log --json --csv --threshold 5
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Pattern, Tuple

# Optional color support
try:
    from colorama import Fore, Style, init as colorama_init
    colorama_init(autoreset=True)
    COLOR_ENABLED = True
except Exception:
    COLOR_ENABLED = False

    class _Dummy:
        def __getattr__(self, _: str) -> str:
            return ""

    Fore = _Dummy()
    Style = _Dummy()


ASCII_BANNER = r"""
██╗      ██████╗  ██████╗      █████╗ ███╗   ██╗ █████╗ ██╗  ██╗   ██╗███████╗███████╗██████╗
██║     ██╔═══██╗██╔════╝     ██╔══██╗████╗  ██║██╔══██╗██║  ╚██╗ ██╔╝╚══███╔╝██╔════╝██╔══██╗
██║     ██║   ██║██║  ███╗    ███████║██╔██╗ ██║███████║██║   ╚████╔╝   ███╔╝ █████╗  ██████╔╝
██║     ██║   ██║██║   ██║    ██╔══██║██║╚██╗██║██╔══██║██║    ╚██╔╝   ███╔╝  ██╔══╝  ██╔══██╗
███████╗╚██████╔╝╚██████╔╝    ██║  ██║██║ ╚████║██║  ██║███████╗██║   ███████╗███████╗██║  ██║
╚══════╝ ╚═════╝  ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝
"""


@dataclass
class EventRecord:
    line_number: int
    timestamp: Optional[str]
    source_ip: Optional[str]
    event_type: str
    severity: str
    raw_line: str


@dataclass
class DetectionRule:
    name: str
    severity: str
    pattern: Pattern[str]
    description: str


IP_REGEX = re.compile(
    r"\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}"
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b"
)

TIMESTAMP_PATTERNS = [
    re.compile(r"\b\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}\b"),
    re.compile(r"\b\d{4}-\d{2}-\d{2}\b"),
    re.compile(r"\b[A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\b"),
]

DETECTION_RULES: List[DetectionRule] = [
    DetectionRule(
        name="Failed Login",
        severity="medium",
        pattern=re.compile(
            r"(failed password|failed login|authentication failed|invalid password|login failed)",
            re.IGNORECASE,
        ),
        description="Authentication failure detected.",
    ),
    DetectionRule(
        name="Unauthorized Access",
        severity="high",
        pattern=re.compile(
            r"(unauthorized|forbidden|access denied|permission denied|status\s*403\b|\b403\b)",
            re.IGNORECASE,
        ),
        description="Unauthorized or forbidden access attempt detected.",
    ),
    DetectionRule(
        name="SQL Injection Pattern",
        severity="critical",
        pattern=re.compile(
            r"(\bunion\b\s+\bselect\b|\bor\s+1=1\b|'\s*or\s*'1'='1|--|/\*.*\*/|information_schema|sleep\(|benchmark\()",
            re.IGNORECASE,
        ),
        description="Possible SQL injection pattern detected.",
    ),
    DetectionRule(
        name="XSS Pattern",
        severity="high",
        pattern=re.compile(
            r"(<script\b|javascript:|onerror=|onload=|alert\s*\(|document\.cookie|<img\b[^>]*onerror=)",
            re.IGNORECASE,
        ),
        description="Possible cross-site scripting payload detected.",
    ),
    DetectionRule(
        name="Path Traversal Pattern",
        severity="high",
        pattern=re.compile(
            r"(\.\./|\.\.\\|/etc/passwd|boot\.ini|win\.ini|system32)",
            re.IGNORECASE,
        ),
        description="Possible path traversal attempt detected.",
    ),
    DetectionRule(
        name="Server Error",
        severity="medium",
        pattern=re.compile(
            r"(\b500\b|internal server error|stack trace|traceback)",
            re.IGNORECASE,
        ),
        description="Server-side error detected.",
    ),
    DetectionRule(
        name="Warning Entry",
        severity="low",
        pattern=re.compile(r"\bwarning\b", re.IGNORECASE),
        description="Warning entry detected.",
    ),
    DetectionRule(
        name="Error Entry",
        severity="medium",
        pattern=re.compile(r"\berror\b|\bcritical\b|\bfatal\b", re.IGNORECASE),
        description="General error or critical entry detected.",
    ),
]


SEVERITY_ORDER = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4,
}


def color(text: str, fg: str = "", bright: bool = False) -> str:
    if not COLOR_ENABLED:
        return text
    style = Style.BRIGHT if bright else ""
    return f"{style}{fg}{text}{Style.RESET_ALL}"


def severity_color(severity: str) -> str:
    severity = severity.lower()
    if severity == "critical":
        return Fore.RED
    if severity == "high":
        return Fore.LIGHTRED_EX
    if severity == "medium":
        return Fore.YELLOW
    return Fore.CYAN


def print_banner() -> None:
    print(color(ASCII_BANNER, Fore.GREEN, bright=True))
    print(color("Security CLI Log Analyzer", Fore.GREEN, bright=True))
    print(color("-" * 72, Fore.GREEN))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Analyze log files and detect suspicious or security-relevant events."
    )
    parser.add_argument(
        "--file",
        required=True,
        help="Path to the log file to analyze.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Export results as JSON.",
    )
    parser.add_argument(
        "--csv",
        action="store_true",
        help="Export detected events as CSV.",
    )
    parser.add_argument(
        "--output-dir",
        default="output",
        help="Directory where exported files will be written. Default: output",
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=5,
        help="Threshold for repeated failed logins from the same IP to trigger brute-force detection. Default: 5",
    )
    parser.add_argument(
        "--top",
        type=int,
        default=5,
        help="How many top IPs and event types to display. Default: 5",
    )
    return parser.parse_args()


def ensure_file_exists(file_path: Path) -> None:
    if not file_path.exists():
        print(color(f"[!] File not found: {file_path}", Fore.RED, bright=True))
        sys.exit(1)
    if not file_path.is_file():
        print(color(f"[!] Not a file: {file_path}", Fore.RED, bright=True))
        sys.exit(1)


def extract_ip(line: str) -> Optional[str]:
    match = IP_REGEX.search(line)
    return match.group(0) if match else None


def extract_timestamp(line: str) -> Optional[str]:
    for pattern in TIMESTAMP_PATTERNS:
        match = pattern.search(line)
        if match:
            return match.group(0)
    return None


def detect_rule_matches(line: str) -> List[Tuple[str, str]]:
    matches: List[Tuple[str, str]] = []
    for rule in DETECTION_RULES:
        if rule.pattern.search(line):
            matches.append((rule.name, rule.severity))
    return matches


def highest_severity(severities: Iterable[str]) -> str:
    highest = "low"
    highest_value = 0
    for sev in severities:
        sev_value = SEVERITY_ORDER.get(sev.lower(), 0)
        if sev_value > highest_value:
            highest = sev.lower()
            highest_value = sev_value
    return highest


def analyze_log(file_path: Path, brute_force_threshold: int) -> Dict[str, object]:
    events: List[EventRecord] = []
    lines_processed = 0

    events_by_type: Counter[str] = Counter()
    severity_breakdown: Counter[str] = Counter()
    suspicious_ips: Counter[str] = Counter()
    failed_login_ips: Counter[str] = Counter()
    raw_error_messages: Counter[str] = Counter()

    with file_path.open("r", encoding="utf-8", errors="replace") as f:
        for line_number, raw_line in enumerate(f, start=1):
            line = raw_line.rstrip("\n")
            lines_processed += 1

            ip = extract_ip(line)
            timestamp = extract_timestamp(line)
            rule_matches = detect_rule_matches(line)

            if not rule_matches:
                continue

            event_names = [name for name, _ in rule_matches]
            severities = [severity for _, severity in rule_matches]
            combined_severity = highest_severity(severities)

            # Create one event per matched rule for better downstream processing
            for event_name, severity in rule_matches:
                record = EventRecord(
                    line_number=line_number,
                    timestamp=timestamp,
                    source_ip=ip,
                    event_type=event_name,
                    severity=severity,
                    raw_line=line.strip(),
                )
                events.append(record)
                events_by_type[event_name] += 1
                severity_breakdown[severity] += 1

                if ip:
                    suspicious_ips[ip] += 1

                if event_name == "Failed Login" and ip:
                    failed_login_ips[ip] += 1

                if event_name in {"Error Entry", "Server Error"}:
                    raw_error_messages[line.strip()] += 1

    brute_force_events: List[EventRecord] = []
    for ip, count in failed_login_ips.items():
        if count >= brute_force_threshold:
            synthetic = EventRecord(
                line_number=0,
                timestamp=None,
                source_ip=ip,
                event_type="Brute Force Indicator",
                severity="high",
                raw_line=f"{count} failed login attempts detected from {ip}",
            )
            brute_force_events.append(synthetic)
            events.append(synthetic)
            events_by_type["Brute Force Indicator"] += 1
            severity_breakdown["high"] += 1
            suspicious_ips[ip] += 1

    total_suspicious_events = len(events)

    summary = {
        "file_analyzed": str(file_path),
        "analysis_time": datetime.now().isoformat(timespec="seconds"),
        "lines_processed": lines_processed,
        "total_suspicious_events": total_suspicious_events,
        "events_by_type": dict(events_by_type.most_common()),
        "severity_breakdown": dict(severity_breakdown.most_common()),
        "top_suspicious_ips": dict(suspicious_ips.most_common()),
        "top_error_messages": dict(raw_error_messages.most_common(10)),
        "brute_force_threshold": brute_force_threshold,
        "events": [asdict(event) for event in events],
    }
    return summary


def print_section(title: str) -> None:
    print()
    print(color(f"[ {title} ]", Fore.BLUE, bright=True))


def print_summary(summary: Dict[str, object], top_n: int) -> None:
    file_analyzed = summary["file_analyzed"]
    lines_processed = summary["lines_processed"]
    total_suspicious_events = summary["total_suspicious_events"]
    events_by_type = summary["events_by_type"]
    severity_breakdown = summary["severity_breakdown"]
    top_ips = summary["top_suspicious_ips"]
    top_errors = summary["top_error_messages"]

    print_section("Overview")
    print(f"{color('File:', Fore.WHITE, bright=True)} {file_analyzed}")
    print(f"{color('Lines processed:', Fore.WHITE, bright=True)} {lines_processed}")
    suspicious_color = Fore.RED if int(total_suspicious_events) > 0 else Fore.GREEN
    print(f"{color('Suspicious events:', suspicious_color, bright=True)} {total_suspicious_events}")

    print_section("Severity Breakdown")
    if severity_breakdown:
        for severity, count in list(severity_breakdown.items()):
            print(f"  - {color(severity.upper(), severity_color(severity), bright=True)}: {count}")
    else:
        print(color("  No suspicious events found.", Fore.GREEN))

    print_section("Top Event Types")
    if events_by_type:
        for event_type, count in list(events_by_type.items())[:top_n]:
            print(f"  - {event_type}: {count}")
    else:
        print(color("  No matched event types.", Fore.GREEN))

    print_section("Top Suspicious IPs")
    if top_ips:
        for ip, count in list(top_ips.items())[:top_n]:
            print(f"  - {color(ip, Fore.MAGENTA, bright=True)}: {count}")
    else:
        print("  No source IPs detected.")

    print_section("Top Error Messages")
    if top_errors:
        for message, count in list(top_errors.items())[:top_n]:
            trimmed = (message[:100] + "...") if len(message) > 100 else message
            print(f"  - [{count}] {trimmed}")
    else:
        print("  No recurring error messages detected.")


def write_json(summary: Dict[str, object], output_dir: Path, source_file: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{source_file.stem}_analysis.json"
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    return output_path


def write_csv(summary: Dict[str, object], output_dir: Path, source_file: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{source_file.stem}_events.csv"
    fieldnames = ["line_number", "timestamp", "source_ip", "event_type", "severity", "raw_line"]
    with output_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for event in summary["events"]:
            writer.writerow(event)
    return output_path


def main() -> None:
    args = parse_args()
    file_path = Path(args.file)
    output_dir = Path(args.output_dir)

    ensure_file_exists(file_path)
    print_banner()

    try:
        summary = analyze_log(file_path=file_path, brute_force_threshold=args.threshold)
        print_summary(summary, top_n=args.top)

        exported_paths: List[Path] = []
        if args.json:
            exported_paths.append(write_json(summary, output_dir, file_path))
        if args.csv:
            exported_paths.append(write_csv(summary, output_dir, file_path))

        print()
        if summary["total_suspicious_events"] == 0:
            print(color("[+] Analysis complete. No suspicious events detected.", Fore.GREEN, bright=True))
        else:
            print(color("[!] Analysis complete. Suspicious events were detected.", Fore.YELLOW, bright=True))

        if exported_paths:
            print(color("[+] Exported files:", Fore.GREEN, bright=True))
            for path in exported_paths:
                print(f"  - {path}")

    except KeyboardInterrupt:
        print()
        print(color("[!] Interrupted by user.", Fore.RED, bright=True))
        sys.exit(130)
    except Exception as exc:
        print(color(f"[!] Unexpected error: {exc}", Fore.RED, bright=True))
        sys.exit(1)


if __name__ == "__main__":
    main()
```