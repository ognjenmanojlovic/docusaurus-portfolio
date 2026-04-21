# PDF Metadata Cleaner

## Overview

This document explains the development of a custom **Python-based PDF Metadata Cleaner** created for educational purposes and authorized document privacy analysis.

The goal of this project was to build a command-line application capable of removing embedded metadata from PDF files by automating external command-line tools and combining them into one clean workflow.

The script was designed to use:

- **ExifTool** for metadata removal
- **QPDF** for PDF rebuilding and linearization

The tool supports:

- cleaning a single PDF file
- cleaning multiple PDF files in a directory
- recursive processing of subdirectories
- metadata verification after cleaning
- custom output file names
- batch processing of multiple documents

This project demonstrates how Python can be used as an automation layer for real-world privacy and document sanitization tasks.

---

## Objectives

The main goals of this project were:

- develop a custom PDF metadata cleaning tool in Python
- automate the use of ExifTool and QPDF
- remove sensitive metadata from PDF files
- verify whether important metadata fields still remain
- support single-file and batch processing
- improve terminal output and usability
- understand document sanitization workflows in cybersecurity and privacy contexts

---

## Why Build a Custom Tool?

Professional tools already exist for metadata removal and document rewriting.  
However, building a custom workflow in Python provides several important benefits:

- practical automation experience
- understanding of how PDF cleaning works internally
- command-line tool orchestration with `subprocess`
- file handling and temporary file management
- security-focused workflow design
- batch-processing experience
- creation of a reusable privacy utility

Instead of manually running several commands for every file, the Python script turns the process into a repeatable one-command tool.

---

## Why PDF Metadata Needs to Be Removed

PDF files often contain information that is not visible when reading the document normally.

Examples include:

- author name
- creator application
- producer application
- title
- subject
- keywords
- creation date
- modification date
- document workflow artifacts

This information may expose internal business details, user identities, software used, or editing history.

That makes metadata cleaning important for:

- privacy protection
- safe document sharing
- public portfolio uploads
- internal company document hygiene
- red team / blue team exercises
- forensic awareness

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| Python 3 | Main programming language |
| `subprocess` | Run external system tools |
| `argparse` | Command-line parameter handling |
| `tempfile` | Temporary PDF processing files |
| `shutil` | Copy cleaned output files |
| ExifTool | Remove embedded metadata |
| QPDF | Rebuild / linearize PDF structure |

---

## Why ExifTool and QPDF Were Combined

The project intentionally uses two tools instead of only one.

### ExifTool

**ExifTool** is excellent for reading and removing metadata fields.

It is used to strip information such as:

- Author
- Title
- Subject
- Keywords
- Creator
- Producer
- CreationDate
- ModDate
- Trapped
- other standard metadata fields

### QPDF

**QPDF** is used afterward to rebuild and linearize the PDF structure.

This improves:

- compatibility
- structure cleanup
- stream handling
- web optimization
- removal of unnecessary or unreferenced resources

### Combined benefit

| Tool | Main Role |
|------|-----------|
| ExifTool | Remove metadata fields |
| QPDF | Rebuild / optimize the PDF structure |

Using both produces a more complete cleaning workflow than using only one tool alone.

---

## Program Features

| Feature | Description |
|--------|-------------|
| Single File Mode | Clean one PDF file |
| Batch Mode | Clean all PDFs in a directory |
| Recursive Search | Process PDFs in subdirectories |
| Metadata Check Mode | Verify metadata without modifying file |
| Verification Step | Detect remaining critical metadata |
| Automatic Output Naming | Creates `_cleaned.pdf` version |
| Custom Output Path | User can define output file |
| Styled CLI Output | Professional terminal workflow |

---

## Supported Cleaning Workflow

The script follows this sequence:

1. Check whether ExifTool and QPDF are installed
2. Read command-line arguments
3. Determine single-file mode or directory mode
4. Create temporary working paths
5. Remove metadata using ExifTool
6. Rebuild / linearize the result using QPDF
7. Save the cleaned PDF
8. Verify whether critical metadata still exists
9. Print final status summary

---

## Dependency Handling

Unlike earlier Python tools that depended mainly on pip packages, this project relies on **system binaries**.

### Important distinction

| Component | Installed with |
|----------|----------------|
| Python script | Python 3 |
| ExifTool | system package manager |
| QPDF | system package manager |

This means a Python virtual environment can still be used, but it does **not** install ExifTool or QPDF automatically.

---

## Virtual Environment Usage

A Python virtual environment may still be used to run the script:

```bash
python3 -m venv venv
source venv/bin/activate
python pdf-metadata-cleaner.py document.pdf
```

However, the required external binaries must first be installed on the operating system.

### macOS

```bash
brew install exiftool qpdf
```

### Ubuntu / Debian

```bash
sudo apt-get update
sudo apt-get install -y libimage-exiftool-perl qpdf
```

---

## Command Line Usage

General syntax:

```bash
python pdf-metadata-cleaner.py [input.pdf] [options]
```

---

## Parameters

| Parameter | Meaning |
|----------|---------|
| `input` | Input PDF file |
| `-o`, `--output` | Custom output PDF file |
| `-d`, `--directory` | Directory containing PDF files |
| `-r`, `--recursive` | Search subdirectories recursively |
| `-c`, `--check` | Check metadata only, do not clean |

---

## Example Commands

### Clean a Single PDF

```bash
python pdf-metadata-cleaner.py document.pdf
```

### Clean a Single PDF with Custom Output Name

```bash
python pdf-metadata-cleaner.py document.pdf -o clean.pdf
```

### Check Metadata Only

```bash
python pdf-metadata-cleaner.py document.pdf -c
```

### Clean All PDFs in a Directory

```bash
python pdf-metadata-cleaner.py -d ./pdfs
```

### Clean All PDFs Recursively

```bash
python pdf-metadata-cleaner.py -d ./pdfs -r
```

---

## Output Naming Logic

If no output name is provided, the tool automatically creates a cleaned version using the original filename.

Example:

| Original File | Output File |
|--------------|-------------|
| `report.pdf` | `report_cleaned.pdf` |
| `resume.pdf` | `resume_cleaned.pdf` |

This keeps the original file untouched and creates a separate sanitized version.

---

## Verification Logic

After cleaning, the script runs a verification step using **ExifTool** again.

It checks whether important metadata fields still remain, such as:

- Author
- Creator
- Producer
- Creation Date
- Modify Date
- Title
- Subject
- Keywords
- Trapped

### Verification outcome

| Result | Meaning |
|--------|---------|
| No critical metadata found | Cleaning successful |
| Remaining metadata found | Some fields still exist |
| Verification error | Validation process failed |

---

## Important Practical Observation

During testing, the script successfully created cleaned PDF files, but verification sometimes still reported fields such as:

- Creator
- Producer
- Title

This is an important real-world lesson.

Some PDF files contain metadata in more than one place, for example:

- standard document info dictionary
- XMP metadata blocks
- application-generated structures
- embedded workflow artifacts

This means that metadata cleaning is often **improved significantly**, but not always absolutely perfect on the first pass.

That does **not** mean the script failed.  
It means PDF sanitization can be complex depending on how the original file was created.

---

## Temporary File Handling

The script uses temporary PDF paths during intermediate processing.

This allows the workflow to:

- avoid modifying the source file directly
- separate ExifTool and QPDF steps cleanly
- store intermediate versions safely

The temporary files are removed automatically at the end of the run.

That is why they are not visible afterward.

---

## Why This Project Is Valuable

This project combines several practical cybersecurity and privacy skills:

- Python scripting
- secure automation workflows
- file sanitization concepts
- document privacy awareness
- external tool integration
- batch processing
- verification logic
- CLI tool development

It is a strong portfolio project because it shows not only Python programming, but also privacy-focused workflow design.

---

## Security Lessons Learned

### Metadata Can Leak Sensitive Information

A PDF may look harmless while still exposing creator tools, user names, or editing history.

### Sanitization Is Not Always Trivial

Removing visible content is easy; removing hidden metadata completely can be more difficult.

### Automation Improves Consistency

Running ExifTool and QPDF manually each time would be repetitive and error-prone.

### Verification Is Important

A tool should not assume success without checking the result afterward.

---

## Use Cases

| Scenario | Benefit |
|---------|---------|
| Resume / CV sharing | Reduce accidental metadata leakage |
| Public portfolio uploads | Improve privacy before publishing |
| Internal document hygiene | Standardize document sanitization |
| Security training | Demonstrate metadata cleaning workflows |
| Privacy audits | Detect and reduce hidden PDF information |

---

## Conclusion

The custom Python PDF Metadata Cleaner successfully demonstrates how document sanitization can be automated using Python together with external privacy-focused tools.

It supports:

- single-file cleaning
- batch cleaning
- recursive directory scanning
- custom output names
- verification mode
- automatic output generation

By combining **ExifTool** and **QPDF**, the script provides a practical workflow for removing or reducing sensitive PDF metadata before documents are shared.

This project provided valuable insight into privacy engineering, file sanitization, and metadata-aware security practices.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Only clean, inspect, or modify files you own or are explicitly authorized to handle.
