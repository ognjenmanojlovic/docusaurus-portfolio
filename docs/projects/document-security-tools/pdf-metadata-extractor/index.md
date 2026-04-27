# PDF Metadata Extractor

## Overview

This document explains the development of a custom **Python-based PDF Metadata Extractor** created for educational purposes and authorized document analysis.

The goal of this project was to build a command-line application capable of automatically extracting embedded metadata from PDF files and exporting the results into a structured CSV file.

Many PDF documents contain hidden metadata that is not directly visible when reading the file. This information may reveal authorship, software used, creation dates, modification timestamps, internal workflow details, and other useful intelligence.

The script was designed to support both:

- single PDF file analysis
- bulk scanning of directories containing multiple PDF files

The project demonstrates how Python can be used for practical metadata intelligence gathering, forensic triage, privacy reviews, and automated document auditing.

---

## Objectives

The main goals of this project were:

- develop a custom PDF metadata extraction tool in Python
- support single-file and multi-file analysis
- combine multiple PDF libraries for improved accuracy
- export structured results to CSV format
- normalize inconsistent metadata values
- convert raw PDF timestamps into readable dates
- improve terminal usability and output design
- understand metadata analysis in cybersecurity workflows

---

## Why Build a Custom Tool?

Although commercial forensic suites and professional document tools exist, building the logic manually in Python provides major learning benefits:

- deeper understanding of PDF internals
- hands-on Python scripting experience
- metadata field handling
- file automation workflows
- CSV reporting skills
- command-line interface development
- investigative methodology

Creating the tool manually also helps explain how automated forensic and OSINT utilities work behind the scenes.

---

## Why Metadata Matters

Metadata can expose valuable hidden information.

Examples include:

- author names
- usernames
- company departments
- document titles
- internal software versions
- printers or PDF generators
- creation timestamps
- modification history
- keywords and tags

This makes metadata highly relevant for:

- OSINT investigations
- digital forensics
- privacy audits
- leak analysis
- internal security reviews
- red team reconnaissance

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| Python 3 | Main programming language |
| PyPDF2 | Primary PDF metadata extraction |
| pdfminer.six | Secondary / fallback metadata parsing |
| csv | Export data into spreadsheet format |
| argparse | Command-line argument parsing |
| pathlib | Modern file path handling |

---

## Why Two Libraries Were Used

Different PDF files store metadata in inconsistent ways.

Some files are handled well by **PyPDF2**, while others reveal additional fields through **pdfminer.six**.

Using both libraries increases coverage.

| Library | Strength |
|--------|----------|
| PyPDF2 | Fast, simple, reliable for common PDFs |
| pdfminer.six | Better fallback for unusual structures |

This dual-parser approach improves extraction quality.

---

## Program Features

| Feature | Description |
|--------|-------------|
| Single File Mode | Analyze one PDF document |
| Directory Mode | Scan multiple PDFs automatically |
| CSV Export | Save all findings to CSV |
| Metadata Cleanup | Remove broken whitespace / control chars |
| Timestamp Conversion | Convert raw PDF dates |
| Page Counter | Detect number of pages |
| PDF Version Detection | Extract PDF standard version |
| Styled CLI Output | Professional terminal workflow |

---

## Supported Metadata Fields

| Field | Description |
|------|-------------|
| Filename | Name of PDF file |
| Filepath | Full location of file |
| Title | Embedded document title |
| Author | Author name |
| Creator | Application that created file |
| Created | Creation timestamp |
| Modified | Last modification time |
| Subject | Subject field |
| Keywords | Search tags |
| Description | Reserved field |
| Producer | PDF producing engine |
| PDF Version | File standard version |
| Pages | Total page count |

---

## How the Program Works

The workflow of the script is:

1. Read command-line arguments
2. Choose single-file or directory mode
3. Open PDF file(s)
4. Extract metadata using PyPDF2
5. Fill missing values using pdfminer.six
6. Normalize extracted values
7. Convert PDF date strings
8. Store results in memory
9. Export findings to CSV file

This reproduces the logic of many document intelligence tools.

---

## Installation

A Python virtual environment can be used.

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install PyPDF2==3.0.1 pdfminer.six==20221105
```

---

## Command Line Usage

General syntax:

```bash
python pdf_metadata_extractor.py [mode] [target] -n output.csv
```

---

## Parameters

| Parameter | Meaning |
|----------|---------|
| `-f` | Analyze one PDF file |
| `-d` | Analyze directory of PDFs |
| `-n` | Name of CSV output file |

---

## Example Commands

### Single PDF

```bash
python pdf_metadata_extractor.py -f document.pdf -n metadata.csv
```

### Multiple PDFs

```bash
python pdf_metadata_extractor.py -d ./pdfs -n all_metadata.csv
```

### Default Output Name

```bash
python pdf_metadata_extractor.py -f report.pdf
```

Creates:

```text
pdf_metadata.csv
```

---

## Example CSV Output

| Filename | Author | Title | Created | Pages |
|---------|--------|------|--------|------|
| report.pdf | John Doe | Quarterly Report | 2024-03-11 09:22:00 | 12 |

---

## Why This Tool Is Valuable

This project combines several practical cybersecurity skills:

- Python development
- file automation
- metadata intelligence gathering
- CSV reporting
- document analysis
- command-line tool creation
- forensic triage methodology

It is therefore a strong beginner/intermediate security portfolio project.

---

## Security Lessons Learned

### Hidden Information Exists in Documents

Even harmless PDFs may reveal sensitive internal data.

### Metadata Can Leak Identities

Author names, usernames, and software names may expose internal users.

### Bulk Analysis Saves Time

Scanning many PDFs manually would be slow and inefficient.

### Automation Is Powerful

Simple scripts can transform repetitive manual work into fast intelligence gathering.

---

## Use Cases

| Scenario | Benefit |
|---------|---------|
| OSINT | Collect public document intelligence |
| Forensics | Review origins of files |
| Corporate Audit | Detect metadata leaks |
| Privacy Review | Identify removable sensitive data |
| Red Team | Passive reconnaissance |

---

## Conclusion

The custom Python PDF Metadata Extractor successfully demonstrates how hidden metadata can be collected automatically from PDF files.

It supports:

- single or bulk analysis
- dual-library extraction
- CSV reporting
- readable timestamps
- clean CLI workflow

This project provided valuable insight into metadata-based intelligence gathering and practical document security analysis.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Only analyze files you own or are explicitly authorized to inspect.
