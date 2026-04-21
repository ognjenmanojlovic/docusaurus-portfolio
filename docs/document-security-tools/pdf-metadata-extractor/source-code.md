---
sidebar_label: Source Code
---

# PDF Metadata Extractor Source Code

```python
#!/usr/bin/env python3
"""
PDF Metadata Extractor - A tool for automated extraction of PDF metadata
Made by Ogisha
For learning purposes and WhiteHat development
"""

import os
import sys
import csv
import argparse
from pathlib import Path
import warnings

import PyPDF2
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfparser import PDFParser

# Suppress warnings for clean output
warnings.filterwarnings("ignore")

# ANSI colors
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
MAGENTA = "\033[95m"
CYAN = "\033[96m"
WHITE = "\033[97m"


def print_banner():
    banner = f"""
{CYAN}{BOLD}
╔══════════════════════════════════════════════════════════════╗
║                   PDF METADATA EXTRACTOR                     ║
║                        Made by Ogisha                        ║
╚══════════════════════════════════════════════════════════════╝
{RESET}
"""
    print(banner)


def print_info(label, value):
    print(f"{BOLD}{BLUE}[INFO]{RESET} {WHITE}{label}:{RESET} {value}")


def print_success(message):
    print(f"{BOLD}{GREEN}[OK]{RESET} {message}")


def print_warning(message):
    print(f"{BOLD}{YELLOW}[WARN]{RESET} {message}")


def print_error(message):
    print(f"{BOLD}{RED}[ERROR]{RESET} {message}")


def print_section(title):
    print(f"\n{MAGENTA}{BOLD}{'=' * 62}")
    print(f"{title.center(62)}")
    print(f"{'=' * 62}{RESET}")


def safe_clean_value(value):
    """Normalize metadata values for CSV/export/output."""
    if value is None:
        return ""
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="ignore")
    return " ".join(str(value).split())


def parse_pdf_date(pdf_date):
    """Parse PDF date string into a readable format."""
    try:
        pdf_date = str(pdf_date)

        if pdf_date.startswith("b'") and pdf_date.endswith("'"):
            pdf_date = pdf_date[2:-1]

        if pdf_date.startswith("D:"):
            date_str = pdf_date[2:]

            year = date_str[0:4]
            month = date_str[4:6] if len(date_str) >= 6 else "01"
            day = date_str[6:8] if len(date_str) >= 8 else "01"
            hour = date_str[8:10] if len(date_str) >= 10 else "00"
            minute = date_str[10:12] if len(date_str) >= 12 else "00"
            second = date_str[12:14] if len(date_str) >= 14 else "00"

            return f"{year}-{month}-{day} {hour}:{minute}:{second}"
    except Exception:
        pass

    return safe_clean_value(pdf_date)


def extract_metadata_pypdf2(pdf_path):
    """Extract metadata using PyPDF2."""
    metadata = {
        "Filename": os.path.basename(pdf_path),
        "Filepath": str(pdf_path),
        "Title": "",
        "Author": "",
        "Creator": "",
        "Created": "",
        "Modified": "",
        "Subject": "",
        "Keywords": "",
        "Description": "",
        "Producer": "",
        "PDF Version": "",
        "Pages": 0,
    }

    try:
        with open(pdf_path, "rb") as file:
            pdf_reader = PyPDF2.PdfReader(file)

            # PDF version
            metadata["PDF Version"] = safe_clean_value(
                getattr(pdf_reader, "pdf_header", "")
            )

            # Number of pages
            metadata["Pages"] = len(pdf_reader.pages)

            # Document metadata
            if pdf_reader.metadata:
                info = pdf_reader.metadata

                metadata["Title"] = safe_clean_value(info.get("/Title", ""))
                metadata["Author"] = safe_clean_value(info.get("/Author", ""))
                metadata["Creator"] = safe_clean_value(info.get("/Creator", ""))
                metadata["Subject"] = safe_clean_value(info.get("/Subject", ""))
                metadata["Keywords"] = safe_clean_value(info.get("/Keywords", ""))
                metadata["Producer"] = safe_clean_value(info.get("/Producer", ""))

                created = info.get("/CreationDate", "")
                if created:
                    metadata["Created"] = parse_pdf_date(created)

                modified = info.get("/ModDate", "")
                if modified:
                    metadata["Modified"] = parse_pdf_date(modified)

    except Exception as e:
        print_warning(f"PyPDF2 could not fully read '{os.path.basename(pdf_path)}': {e}")

    return metadata


def extract_metadata_pdfminer(pdf_path, metadata):
    """Extract additional metadata using pdfminer."""
    try:
        with open(pdf_path, "rb") as file:
            parser = PDFParser(file)
            doc = PDFDocument(parser)

            if doc.info:
                info = doc.info[0]

                if not metadata["Title"] and "Title" in info:
                    metadata["Title"] = safe_clean_value(info.get("Title", ""))

                if not metadata["Author"] and "Author" in info:
                    metadata["Author"] = safe_clean_value(info.get("Author", ""))

                if not metadata["Creator"] and "Creator" in info:
                    metadata["Creator"] = safe_clean_value(info.get("Creator", ""))

                if not metadata["Subject"] and "Subject" in info:
                    metadata["Subject"] = safe_clean_value(info.get("Subject", ""))

                if not metadata["Producer"] and "Producer" in info:
                    metadata["Producer"] = safe_clean_value(info.get("Producer", ""))

                if not metadata["Created"] and "CreationDate" in info:
                    created = info.get("CreationDate", "")
                    if created:
                        metadata["Created"] = parse_pdf_date(created)

                if not metadata["Modified"] and "ModDate" in info:
                    modified = info.get("ModDate", "")
                    if modified:
                        metadata["Modified"] = parse_pdf_date(modified)

    except Exception as e:
        print_warning(f"pdfminer could not fully read '{os.path.basename(pdf_path)}': {e}")

    return metadata


def extract_metadata_from_pdf(pdf_path):
    """Main function to extract metadata from a PDF file."""
    print_info("Processing", os.path.basename(pdf_path))

    metadata = extract_metadata_pypdf2(pdf_path)
    metadata = extract_metadata_pdfminer(pdf_path, metadata)

    for key in metadata:
        metadata[key] = safe_clean_value(metadata[key])

    print_success(f"Metadata extracted from {os.path.basename(pdf_path)}")
    return metadata


def save_to_csv(metadata_list, output_file):
    """Save metadata to a CSV file."""
    if not metadata_list:
        print_warning("No metadata found to save.")
        return

    fieldnames = [
        "Filename",
        "Filepath",
        "Title",
        "Author",
        "Creator",
        "Created",
        "Modified",
        "Subject",
        "Keywords",
        "Description",
        "Producer",
        "PDF Version",
        "Pages",
    ]

    try:
        with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter=";")
            writer.writeheader()
            writer.writerows(metadata_list)

        print_section("EXPORT COMPLETED")
        print_success(f"Metadata successfully saved to: {output_file}")
        print_info("Processed files", len(metadata_list))

    except Exception as e:
        print_error(f"Failed to save CSV file: {e}")
        sys.exit(1)


def main():
    """Main function of the program."""
    parser = argparse.ArgumentParser(
        description="Extract metadata from PDF files and save them to a CSV file.",
        epilog="Example: python pdf_metadata_extractor.py -f document.pdf -n metadata.csv",
    )

    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("-f", "--file", help="Path to a single PDF file")
    group.add_argument("-d", "--directory", help="Path to a directory containing PDF files")

    parser.add_argument(
        "-n",
        "--name",
        help="Name of the output file (default: pdf_metadata.csv)",
        default="pdf_metadata.csv",
    )

    args = parser.parse_args()

    try:
        import PyPDF2  # noqa: F401
        import pdfminer  # noqa: F401
    except ImportError:
        print_error("Missing dependencies.")
        print(f"{BOLD}Install them with:{RESET}")
        print("pip install PyPDF2==3.0.1 pdfminer.six==20221105")
        sys.exit(1)

    metadata_list = []

    print_banner()
    print_section("INITIALIZING")

    if args.file:
        pdf_path = Path(args.file)

        if not pdf_path.exists():
            print_error(f"File '{args.file}' not found.")
            sys.exit(1)

        if pdf_path.suffix.lower() != ".pdf":
            print_warning(f"File '{args.file}' does not have a .pdf extension.")

        print_info("Mode", "Single file")
        print_info("Target", pdf_path)

        metadata = extract_metadata_from_pdf(pdf_path)
        metadata_list.append(metadata)

    elif args.directory:
        dir_path = Path(args.directory)

        if not dir_path.exists() or not dir_path.is_dir():
            print_error(f"Directory '{args.directory}' not found.")
            sys.exit(1)

        print_info("Mode", "Directory")
        print_info("Target", dir_path)

        pdf_files = list(dir_path.glob("*.pdf")) + list(dir_path.glob("*.PDF"))

        if not pdf_files:
            print_warning("No PDF files found in the selected directory.")
            sys.exit(0)

        print_info("PDF files found", len(pdf_files))
        print_section("EXTRACTION STARTED")

        for pdf_file in pdf_files:
            metadata = extract_metadata_from_pdf(pdf_file)
            metadata_list.append(metadata)

    output_file = args.name
    if not output_file.endswith(".csv"):
        output_file += ".csv"

    save_to_csv(metadata_list, output_file)

    print(f"\n{CYAN}{BOLD}Done. PDF metadata extraction finished successfully.{RESET}\n")


if __name__ == "__main__":
    main()
```