#!/usr/bin/env python3
"""
PDF Metadata Cleaner
Made by Ogisha

Uses exiftool and qpdf to remove metadata from PDF files and linearize them.
Designed for educational purposes and authorized document privacy analysis.
"""

import os
import sys
import shutil
import argparse
import tempfile
import subprocess
from pathlib import Path

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
║                    PDF METADATA CLEANER                      ║
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


def run_command(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def check_dependencies():
    print_section("DEPENDENCY CHECK")

    dependencies = {
        "exiftool": {
            "macos": "brew install exiftool",
            "linux": "sudo apt-get install -y libimage-exiftool-perl",
        },
        "qpdf": {
            "macos": "brew install qpdf",
            "linux": "sudo apt-get install -y qpdf",
        },
    }

    all_ok = True

    for dep in dependencies:
        try:
            result = run_command([dep, "--version"])
            if result.returncode == 0:
                version_output = (result.stdout or result.stderr).strip().splitlines()
                version = version_output[0] if version_output else "installed"
                print_success(f"{dep} found ({version})")
            else:
                all_ok = False
                print_error(f"{dep} is installed but returned an error.")
        except FileNotFoundError:
            all_ok = False
            print_error(f"{dep} is not installed.")
            print(f"  {BOLD}Install on macOS:{RESET}  {dependencies[dep]['macos']}")
            print(f"  {BOLD}Install on Linux:{RESET}  {dependencies[dep]['linux']}")

    return all_ok


def remove_metadata_exiftool(input_pdf, output_pdf):
    print_section("STEP 1 - METADATA REMOVAL")
    print_info("Input PDF", input_pdf)
    print_info("Temporary output", output_pdf)

    try:
        cmd = [
            "exiftool",
            "-all=",
            "-TagsFromFile", "@",
            "-Author", "-Title", "-Subject", "-Keywords",
            "-Creator", "-Producer", "-CreationDate",
            "-ModDate", "-Trapped", "-Encrypt",
            "-o", output_pdf,
            input_pdf,
        ]

        result = run_command(cmd)

        if result.returncode == 0:
            print_success("Metadata successfully removed with exiftool.")
            return True

        print_error("Metadata removal failed.")
        if result.stderr.strip():
            print(result.stderr.strip())
        return False

    except Exception as e:
        print_error(f"Unexpected exiftool error: {e}")
        return False


def linearize_pdf_qpdf(input_pdf, output_pdf):
    print_section("STEP 2 - PDF LINEARIZATION")
    print_info("Input PDF", input_pdf)
    print_info("Temporary output", output_pdf)

    try:
        cmd = [
            "qpdf",
            "--linearize",
            "--object-streams=disable",
            "--remove-unreferenced-resources=yes",
            "--compress-streams=y",
            "--coalesce-contents",
            input_pdf,
            output_pdf,
        ]

        result = run_command(cmd)

        if result.returncode == 0:
            print_success("PDF successfully linearized with qpdf.")
            return True

        print_error("Linearization failed.")
        if result.stderr.strip():
            print(result.stderr.strip())
        return False

    except Exception as e:
        print_error(f"Unexpected qpdf error: {e}")
        return False


def verify_metadata_removal(pdf_path):
    print_section("STEP 3 - VERIFICATION")
    print_info("Checking file", pdf_path)

    try:
        result = run_command(["exiftool", pdf_path])

        if result.returncode != 0:
            print_error("Verification failed while running exiftool.")
            if result.stderr.strip():
                print(result.stderr.strip())
            return False

        output = result.stdout

        critical_metadata = [
            "Author",
            "Creator",
            "Producer",
            "Creation Date",
            "Modify Date",
            "Title",
            "Subject",
            "Keywords",
            "Trapped",
        ]

        found_metadata = [field for field in critical_metadata if field in output]

        if found_metadata:
            print_warning(f"Remaining metadata found: {', '.join(found_metadata)}")
            return False

        print_success("No critical metadata found.")
        return True

    except Exception as e:
        print_error(f"Verification error: {e}")
        return False


def clean_pdf(input_path, output_path=None):
    print_section("PDF CLEANING STARTED")

    if not os.path.exists(input_path):
        print_error(f"File not found: {input_path}")
        return False

    if output_path is None:
        input_dir = os.path.dirname(input_path)
        input_name = os.path.basename(input_path)
        name, ext = os.path.splitext(input_name)
        output_path = os.path.join(input_dir, f"{name}_cleaned{ext}")

    print_info("Source file", input_path)
    print_info("Output file", output_path)

    # Important: only reserve names, do not pre-create files
    fd1, tmp1_path = tempfile.mkstemp(suffix=".pdf")
    os.close(fd1)
    os.unlink(tmp1_path)

    fd2, tmp2_path = tempfile.mkstemp(suffix=".pdf")
    os.close(fd2)
    os.unlink(tmp2_path)

    try:
        if not remove_metadata_exiftool(input_path, tmp1_path):
            return False

        if not linearize_pdf_qpdf(tmp1_path, tmp2_path):
            return False

        shutil.copy2(tmp2_path, output_path)
        print_success(f"Cleaned PDF saved to: {output_path}")

        verified = verify_metadata_removal(output_path)

        print_section("FINAL RESULT")
        if verified:
            print_success("PDF successfully cleaned and verified.")
        else:
            print_warning("PDF cleaned, but verification found possible remaining metadata.")

        return True

    except Exception as e:
        print_error(f"Error during cleaning process: {e}")
        return False

    finally:
        for tmp_file in [tmp1_path, tmp2_path]:
            if os.path.exists(tmp_file):
                os.unlink(tmp_file)


def batch_clean_pdf(directory, recursive=False):
    print_section("BATCH MODE")

    directory = Path(directory)

    if not directory.exists():
        print_error(f"Directory not found: {directory}")
        return

    pattern = "**/*.pdf" if recursive else "*.pdf"
    pdf_files = list(directory.glob(pattern))

    if not pdf_files:
        print_warning("No PDF files found.")
        return

    print_info("Directory", directory)
    print_info("Recursive", recursive)
    print_info("PDF files found", len(pdf_files))

    success_count = 0
    processed_count = 0

    for pdf_file in pdf_files:
        if "_cleaned" in pdf_file.stem:
            print_warning(f"Skipping already cleaned file: {pdf_file.name}")
            continue

        processed_count += 1
        output_file = pdf_file.parent / f"{pdf_file.stem}_cleaned.pdf"

        print(f"\n{CYAN}{BOLD}--- Processing: {pdf_file.name} ---{RESET}")

        if clean_pdf(str(pdf_file), str(output_file)):
            success_count += 1

    print_section("BATCH SUMMARY")
    print_info("Eligible PDFs", processed_count)
    print_info("Successfully cleaned", success_count)
    print_info("Failed", processed_count - success_count)


def main():
    parser = argparse.ArgumentParser(
        description="Remove metadata from PDF files using exiftool and qpdf",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s document.pdf                    Clean a single file
  %(prog)s document.pdf -o clean.pdf       Specify output filename
  %(prog)s -d ./pdfs                       Clean all PDFs in directory
  %(prog)s -d ./pdfs -r                    Clean PDFs recursively
  %(prog)s document.pdf -c                 Check metadata only
        """
    )

    parser.add_argument("input", nargs="?", help="Input PDF file")
    parser.add_argument("-o", "--output", help="Output PDF file")
    parser.add_argument("-d", "--directory", help="Directory containing PDF files")
    parser.add_argument("-r", "--recursive", action="store_true",
                        help="Search subdirectories recursively")
    parser.add_argument("-c", "--check", action="store_true",
                        help="Only check metadata, do not remove")

    args = parser.parse_args()

    print_banner()

    if not check_dependencies():
        sys.exit(1)

    if args.check and args.input:
        print_section("CHECK MODE")
        print_info("Target file", args.input)
        verify_metadata_removal(args.input)
        sys.exit(0)

    if args.directory:
        batch_clean_pdf(args.directory, args.recursive)
    elif args.input:
        clean_pdf(args.input, args.output)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()