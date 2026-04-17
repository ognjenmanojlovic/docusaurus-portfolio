# Poison Null Byte

| Item | Detail |
|---|---|
| Category | Improper Input Validation → File Access Bypass |
| Difficulty | Hard (4-Star) |
| Juice Shop Flag | `score-board#Poison Null Byte` |
| Tools Used | Browser (Address Bar / DevTools) |
| Status | Solved |
| Video Demo | [Click Here](https://somup.com/cOfDVdVcPJA) |

---

## 1. Vulnerability Overview

The application exposes a public directory:

```
/ftp
```

Users can download files from this directory, but access is restricted to certain file types (e.g., `.md`, `.pdf`).

When trying to access a blocked file like:

```
/ftp/package.json.bak
```

the server returns **403 Forbidden**.

The vulnerability exists because the application performs **incorrect input validation** on file names.

By injecting a **Null Byte (%00)**, an attacker can bypass the file extension check and access restricted files.

---

## 2. How the Attack Works

The server checks if a file ends with an allowed extension (e.g., `.md`).

However:

- The validation reads the full string  
- The filesystem stops reading at the NULL byte  

Example:

```
package.json.bak%00.md
```

- Validation sees → `.md` → allowed  
- Filesystem reads → `package.json.bak`  

👉 Result: restricted file is returned

---

## 3. Step-by-Step Exploitation

### 1. Discover the FTP directory

Open:

```
http://localhost:3000/ftp
```

You will see files like:

- legal.md  
- acquisitions.md  
- package.json.bak  

---

### 2. Test restricted file

Try:

```
http://localhost:3000/ftp/package.json.bak
```

👉 Result: **403 Forbidden**

---

### 3. Craft the payload

Use a **Null Byte injection** with double encoding:

```
%2500
```

Final payload:

```
http://localhost:3000/ftp/package.json.bak%2500.md
```

---

### 4. Execute the attack

- Enter the URL in the browser  
- Press Enter  

👉 The file downloads successfully  

---

### 5. Result

- The restricted file is accessed  
- Validation is bypassed  
- Challenge is solved  

---

## 4. Why This Works

The vulnerability is caused by a mismatch between:

- input validation  
- file system processing  

Key issues:

- File extension check is performed **before decoding is complete**  
- NULL byte (`%00`) terminates the string at filesystem level  
- Double encoding (`%2500`) bypasses the validation step  

---

## 5. Security Impact

- Access to sensitive files  
- Exposure of configuration and source code  
- Information disclosure for further attacks  

---

## 6. Mitigation

- Reject NULL bytes explicitly (`%00`)  
- Validate file paths strictly (not just extensions)  
- Use safe file handling functions  
- Avoid exposing internal directories  

---

## 7. Key Takeaways

- Input validation must be strict and complete  
- File extension checks alone are not secure  
- Encoding tricks can bypass filters  
- Improper validation can lead to sensitive data exposure  