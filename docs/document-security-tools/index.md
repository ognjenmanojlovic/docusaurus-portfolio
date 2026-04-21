# Document Security Tools

## Overview

This section contains practical **document security and privacy projects** focused on analyzing and sanitizing PDF files.

The goal of these projects is to demonstrate how hidden document information can be **identified, extracted, reviewed, and reduced** using custom Python tools together with established command-line utilities.

Modern documents often contain far more information than what is visible on the page itself.  
In many cases, files include hidden metadata such as:

- author names
- creator applications
- producer tools
- timestamps
- document titles
- internal workflow traces
- other privacy-relevant attributes

From a cybersecurity and privacy perspective, this matters because metadata can reveal sensitive operational details even when the visible document content appears harmless.

This project area therefore focuses on two practical workflows:

1. **extracting metadata from PDF files**
2. **cleaning or reducing metadata before sharing documents**

---

## What This Project Area Demonstrates

These tools were created to show practical skills in:

- Python scripting
- document analysis
- privacy-aware file handling
- metadata intelligence gathering
- CSV export and structured reporting
- external tool integration
- PDF sanitization workflows
- command-line tool development

Together, these projects form a small but realistic document security toolkit.

---

## Why Document Security Matters

Files are often shared publicly without checking what hidden information they contain.

This can lead to accidental disclosure of:

- personal identities
- internal usernames
- software versions
- document creation history
- company workflow information
- editing traces

That is why document security is relevant in areas such as:

- privacy audits
- OSINT investigations
- secure document publishing
- portfolio / resume sharing
- internal company hygiene
- forensic triage
- reconnaissance awareness

---

## Included Projects

## 1. PDF Metadata Extractor

The **PDF Metadata Extractor** is a custom Python-based tool designed to automatically read metadata embedded inside PDF files and export the results into a CSV file.

It supports:

- single PDF analysis
- bulk directory scanning
- structured CSV export
- metadata cleanup / normalization
- readable timestamp conversion
- page counting
- extraction with multiple PDF libraries for better coverage

This project focuses on the **identification and analysis** side of document security.

### Key learning areas

- hidden document intelligence
- metadata-based investigations
- automation of repetitive analysis tasks
- CSV reporting and structured output
- Python CLI workflow design

[Open PDF Metadata Extractor](./pdf-metadata-extractor/)

---

## 2. PDF Metadata Cleaner

The **PDF Metadata Cleaner** is a custom Python-based tool that automates PDF sanitization by combining **ExifTool** and **QPDF** in one workflow.

It supports:

- cleaning single PDF files
- batch-cleaning directories
- recursive processing
- output file generation
- verification of remaining metadata
- PDF rebuilding / linearization

This project focuses on the **privacy protection and sanitization** side of document security.

### Key learning areas

- document sanitization workflows
- privacy engineering
- metadata removal strategies
- external binary orchestration with Python
- verification-driven security tooling

[Open PDF Metadata Cleaner](./pdf-metadata-cleaner/)

---

## Comparison of the Included Tools

| Project | Main Purpose | Output |
|--------|--------------|--------|
| PDF Metadata Extractor | Identify and export embedded metadata | CSV report |
| PDF Metadata Cleaner | Remove / reduce metadata before sharing | Cleaned PDF |

---

## Typical Workflow

These two projects can also be used as part of one combined document security workflow:

1. inspect a PDF file for embedded metadata
2. review what sensitive fields are present
3. clean the document before sharing it publicly
4. verify whether critical metadata still remains

This mirrors a realistic privacy-oriented process that can be useful in both personal and professional security contexts.

---

## Skills Demonstrated Across This Section

| Skill Area | Demonstrated Through |
|-----------|----------------------|
| Python Development | Custom CLI tools |
| Metadata Analysis | PDF Metadata Extractor |
| Privacy Engineering | PDF Metadata Cleaner |
| File Automation | Batch / directory processing |
| Security Awareness | Hidden data and leakage risks |
| Tool Integration | Python + ExifTool + QPDF |
| Reporting | CSV export and structured output |

---

## Why These Projects Are Valuable

These projects are valuable because they go beyond simply reading or editing files.

They show an understanding of:

- how hidden data can affect privacy
- how documents can leak information unintentionally
- how to automate security-related workflows
- how to combine analysis and remediation in practice

This makes the section especially relevant for roles related to:

- cybersecurity
- privacy
- digital forensics
- OSINT
- secure automation
- security engineering

---

## Recommended Reading Order

If you want to follow the full workflow, the best order is:

1. **PDF Metadata Extractor**  
2. **PDF Metadata Cleaner**

This makes it easier to first understand what metadata exists and then how it can be removed or reduced.

---

## Project Navigation

- [PDF Metadata Extractor](./pdf-metadata-extractor/)
- [PDF Metadata Cleaner](./pdf-metadata-cleaner/)

---

## Conclusion

The **Document Security Tools** section demonstrates practical work in PDF metadata analysis and sanitization.

It combines Python scripting, privacy-aware workflows, automation, and security thinking in a focused project area centered around hidden document information.

Together, these projects show both sides of document security:

- **analysis**
- **cleanup**

and provide a strong foundation for demonstrating privacy-focused technical skills in a portfolio environment.