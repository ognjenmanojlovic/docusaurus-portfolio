# Python Port Scanner

## Overview

This project is a custom **Python-based Port Scanner** designed for educational purposes and authorized network security testing.

The script was created to simulate the basic functionality of professional tools such as **Nmap** by checking whether TCP ports on a target system are open or closed.

It supports:

- IP addresses and hostnames
- single ports
- custom port ranges
- full port scans
- multi-threaded scanning
- service name detection for common ports
- clean terminal output

The goal of this project was to better understand how port scanning works internally while improving Python development and networking skills.

---

## Objectives

The main goals of this project were:

- build a custom port scanner in Python
- understand TCP socket communication
- perform port status detection
- support hostname resolution
- implement multi-threaded scanning
- identify common network services
- create a professional command-line interface
- improve terminal design and usability

---

## Why Build a Custom Port Scanner?

Although tools like **Nmap** are more advanced, building a scanner manually provides valuable learning benefits.

### Advantages of Building It Yourself

- deeper understanding of TCP connections
- practical socket programming experience
- concurrency with threads
- DNS resolution concepts
- port/service mapping knowledge
- command-line argument handling
- custom tool development experience

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| Python 3 | Main programming language |
| socket | TCP network connections |
| argparse | Command-line parameters |
| ThreadPoolExecutor | Multi-threaded scanning |
| ipaddress | IP validation |
| ANSI Colors | Styled terminal output |

---

## Main Features

| Feature | Description |
|--------|-------------|
| Target IP / Hostname | Supports both |
| Single Port Scan | Example: 80 |
| Port Range Scan | Example: 20-100 |
| Full Scan | Ports 1-65535 |
| Multi-threading | Faster scanning |
| Service Detection | Common port names shown |
| Progress Output | Live scan progress |
| Colored UI | Professional terminal design |
| Summary Section | Results after completion |

---

## How the Scanner Works

1. Read command-line arguments
2. Validate target input
3. Resolve hostname to IP
4. Parse selected port range
5. Create worker threads
6. Attempt TCP connection to each port
7. Detect open / closed status
8. Print live results
9. Show final summary

---

## Example Commands

```bash
python port_scanner.py 192.168.1.1 -p 1-100
python port_scanner.py example.com -p 80-443
python port_scanner.py 10.0.0.5 -p 22
python port_scanner.py 192.168.1.10 -p -
python port_scanner.py 192.168.1.1 -p 1-1000 -t 200
```

---

## Security Lessons Learned

- Open ports reveal attack surface
- Port scanning is reconnaissance
- Useful for firewall audits
- Helps identify unnecessary exposed services

---

## Conclusion

The custom Python Port Scanner successfully demonstrates how TCP port scanning works without relying on external tools.

It supports custom ranges, threading, hostname resolution, service detection, and clean terminal output.

This project provided valuable insight into both offensive and defensive network security practices.

---

## Legal Disclaimer

This documentation is for educational purposes only.

Only scan systems, devices, or networks you own or are explicitly authorized to test.