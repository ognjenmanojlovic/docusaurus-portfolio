# Bjoern's Favorite Pet Challenge

| Item | Detail |
|---|---|
| Category | Broken Authentication |
| Difficulty | Hard (3-Star) |
| Juice Shop Flag | `score-board#Bjoern's Favorite Pet` |
| Tools Used | Browser / OSINT / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

This challenge involves resetting the password for Bjoern's OWASP account:

```text
bjoern@owasp.org
```

by answering his security question:

```text
What's your favorite pet?
```

The challenge is not based on a software exploit, but on weak account recovery design.

Bjoern selected a pet name as his security answer — information that can be discovered through **OSINT (Open Source Intelligence)** using publicly available sources.

This challenge is rated **3 stars** because:

- It requires external research  
- The answer is not found directly inside the application  
- Success depends on combining OSINT with the password reset flow  

---

## 2. Security Impact

- Weak security questions undermine password recovery mechanisms  
- Personal information is often publicly discoverable online  
- Attackers can reset accounts without exploiting application code  
- Demonstrates poor authentication recovery design  

---

## 3. Step-by-Step Exploitation

### Step 1: Identify the target account

From previous challenges or the administration section:

```text
bjoern@owasp.org
```

### Step 2: Research Bjoern online (OSINT)

The challenge hint suggests Bjoern may have publicly revealed the answer.

Searching for **Bjoern Kimminich** may lead to:

- GitHub profile  
- Social media accounts  
- Conference talks  
- Interviews or presentations  

In one public source, he mentions his cat's name:

```text
Zaya
```

### Step 3: Verify the Forgot Password flow

Navigate to:

```text
/#/forgot-password
```

Enter:

```text
bjoern@owasp.org
```

The security question appears.

### Step 4: Reset the password using Burp Suite

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Turn **Intercept ON** in Burp Proxy tab  

Enter:

```text
Email: bjoern@owasp.org
Security Answer: Zaya
New Password: hacked123
Repeat Password: hacked123
```

Burp captures:

```http
POST /rest/user/reset-password HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"bjoern@owasp.org","answer":"Zaya","new":"hacked123","repeat":"hacked123"}
```

### Step 5: Send the request

- Click **Forward**

If correct, the server responds with:

```text
200 OK
```

### Step 6: Verify

- Log in using:

```text
bjoern@owasp.org / hacked123
```

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

Security questions are only as secure as the information they rely on.

Pet names are weak answers because they are often:

- Publicly shared online  
- Easy to guess or research  
- Not confidential  

Bjoern publicly mentioned the pet name:

```text
Zaya
```

allowing attackers to use that information for account recovery.

---

## 5. Mitigation

- Avoid security questions based on publicly discoverable information  
- Use MFA instead of knowledge-based questions  
- Prefer secure password reset via verified email links  
- If questions must exist, allow users to set random custom answers  

---

## 6. Key Takeaways

- 3-star challenges often require OSINT rather than technical exploitation  
- Security questions based on personal life are inherently weak  
- Publicly shared information can be weaponized  
- Always investigate external sources during pentests  
- Burp Suite helps with the reset request, but the real attack is intelligence gathering 