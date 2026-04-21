#!/usr/bin/env python3
"""
Simple Port Scanner similar to nmap
Made by Ogisha
"""

import socket
import sys
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import ipaddress
import time

# ANSI colors
RESET = "\033[0m"
BOLD = "\033[1m"
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
MAGENTA = "\033[95m"
BLUE = "\033[94m"
WHITE = "\033[97m"
DIM = "\033[2m"

# Dictionary for known ports and their services
KNOWN_PORTS = {
    1: "TCP Port Service Multiplexer",
    7: "Echo",
    20: "FTP Data",
    21: "FTP Control",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    67: "DHCP Server",
    68: "DHCP Client",
    69: "TFTP",
    80: "HTTP",
    88: "Kerberos",
    110: "POP3",
    111: "RPC",
    119: "NNTP",
    123: "NTP",
    135: "MS RPC",
    137: "NetBIOS Name Service",
    138: "NetBIOS Datagram Service",
    139: "NetBIOS Session Service",
    143: "IMAP",
    161: "SNMP",
    162: "SNMP Trap",
    179: "BGP",
    194: "IRC",
    389: "LDAP",
    443: "HTTPS",
    445: "Microsoft-DS",
    465: "SMTPS",
    514: "Syslog",
    515: "LPD/LPR",
    587: "SMTP Submission",
    631: "IPP",
    636: "LDAPS",
    993: "IMAPS",
    995: "POP3S",
}


def print_banner():
    banner = f"""
{CYAN}{BOLD}
╔══════════════════════════════════════════════════════════════╗
║                      SIMPLE PORT SCANNER                     ║
║                        Made by Ogisha                        ║
╚══════════════════════════════════════════════════════════════╝
{RESET}
"""
    print(banner)


def print_info(label, value):
    print(f"{BOLD}{BLUE}[INFO]{RESET} {WHITE}{label}:{RESET} {value}")


def print_success(message):
    print(f"{BOLD}{GREEN}[OPEN]{RESET} {message}")


def print_warning(message):
    print(f"{BOLD}{YELLOW}[WARN]{RESET} {message}")


def print_error(message):
    print(f"{BOLD}{RED}[ERROR]{RESET} {message}")


def print_section(title):
    print(f"\n{MAGENTA}{BOLD}{'=' * 62}")
    print(f"{title.center(62)}")
    print(f"{'=' * 62}{RESET}")


def resolve_host(hostname):
    """Resolve DNS name to IP address"""
    try:
        ipaddress.ip_address(hostname)
        return hostname
    except ValueError:
        try:
            return socket.gethostbyname(hostname)
        except socket.gaierror:
            print_error(f"Hostname '{hostname}' could not be resolved.")
            sys.exit(1)


def scan_port(target, port):
    """Scan a single port"""
    sock = None
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)

        result = sock.connect_ex((target, port))

        if result == 0:
            service = KNOWN_PORTS.get(port, "")
            return port, "open", service

        return port, "closed", ""

    except socket.timeout:
        return port, "timeout", ""
    except Exception as e:
        return port, f"error: {e}", ""
    finally:
        if sock is not None:
            try:
                sock.close()
            except OSError:
                pass


def scan_ports(target, start_port, end_port, max_threads=100):
    """Scan a range of ports"""
    print_section("SCAN STARTED")
    print_info("Target", target)
    print_info("Port range", f"{start_port}-{end_port}")
    print_info("Threads", max_threads)
    print(f"{DIM}{'-' * 62}{RESET}")

    open_ports = []
    scanned_count = 0
    total_ports = end_port - start_port + 1

    with ThreadPoolExecutor(max_workers=max_threads) as executor:
        future_to_port = {
            executor.submit(scan_port, target, port): port
            for port in range(start_port, end_port + 1)
        }

        for future in as_completed(future_to_port):
            scanned_count += 1
            port, status, service = future.result()

            if status == "open":
                if service:
                    print_success(f"Port {port:<5} -> {service}")
                else:
                    print_success(f"Port {port:<5} -> Unknown service")
                open_ports.append((port, service))
            elif port <= 100 and status == "closed":
                print(f"{DIM}[CLOSED]{RESET} Port {port}")
            elif status == "timeout":
                print_warning(f"Port {port} timed out")

            if scanned_count % 100 == 0 or scanned_count == total_ports:
                print(
                    f"{BOLD}{CYAN}[PROGRESS]{RESET} "
                    f"{scanned_count}/{total_ports} ports scanned"
                )

    return sorted(open_ports, key=lambda x: x[0])


def main():
    parser = argparse.ArgumentParser(
        description="Simple port scanner similar to nmap",
        epilog="Example: python port_scanner.py 10.0.2.17 -p 10-100"
    )

    parser.add_argument(
        "target",
        help="Target IP or DNS name (e.g., 10.0.2.17 or example.com)"
    )

    parser.add_argument(
        "-p",
        "--ports",
        required=True,
        help="Port range (e.g., 10-100) or '-' for all ports (1-65535)"
    )

    parser.add_argument(
        "-t",
        "--threads",
        type=int,
        default=100,
        help="Maximum number of concurrent threads (default: 100)"
    )

    args = parser.parse_args()

    print_banner()

    target_ip = resolve_host(args.target)

    print_info("Target input", args.target)
    print_info("Resolved IP", target_ip)

    if args.ports == "-":
        start_port = 1
        end_port = 65535
    else:
        try:
            port_range = args.ports.split("-")

            if len(port_range) == 2:
                start_port = int(port_range[0])
                end_port = int(port_range[1])
            else:
                start_port = int(port_range[0])
                end_port = int(port_range[0])

            if not (1 <= start_port <= 65535 and 1 <= end_port <= 65535):
                print_error("Ports must be between 1 and 65535.")
                sys.exit(1)

            if start_port > end_port:
                print_error("Start port must be less than or equal to end port.")
                sys.exit(1)

        except ValueError:
            print_error("Invalid port range. Use format 'min-max' or a single port.")
            sys.exit(1)

    if args.threads < 1:
        print_error("Thread count must be at least 1.")
        sys.exit(1)

    start_time = time.time()
    open_ports = scan_ports(target_ip, start_port, end_port, args.threads)
    elapsed = time.time() - start_time

    print_section("SCAN SUMMARY")
    print_info("Scanned ports", f"{start_port}-{end_port}")
    print_info("Open ports found", str(len(open_ports)))
    print_info("Scan duration", f"{elapsed:.2f} seconds")

    if open_ports:
        print(f"\n{BOLD}{GREEN}Open Ports:{RESET}")
        for port, service in open_ports:
            if service:
                print(f"  {GREEN}•{RESET} Port {port:<5} {DIM}- {service}{RESET}")
            else:
                print(f"  {GREEN}•{RESET} Port {port}")
    else:
        print(f"\n{YELLOW}No open ports found in the selected range.{RESET}")

    print(f"\n{CYAN}{BOLD}Scan completed successfully.{RESET}\n")


if __name__ == "__main__":
    main()