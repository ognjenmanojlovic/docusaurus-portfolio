# Password Strength Challenge

| Item | Detail |
|---|---|
| Category | Broken Authentication |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Password Strength` |
| Tools Used | Burp Suite (Proxy / Intruder) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The administrator account:

```text
admin@juice-sh.op
```

uses a weak and guessable password.

This challenge explicitly prohibits using SQL Injection (used in the **Login Admin** challenge) and instead requires logging in with the actual credentials.

The password can be discovered through a brute-force attack using a common password wordlist.

---

## 2. Security Impact

- Weak administrator passwords violate security best practices  
- Enables account takeover without exploiting application code  
- Demonstrates why password strength policies are critical  
- Admin compromise can lead to full system compromise  

---

## 3. Step-by-Step Exploitation

### Step 1: Identify the target account

From previous challenges, the admin email is:

```text
admin@juice-sh.op
```

### Step 2: Setup Burp Intruder

- Configure browser to route traffic through Burp Suite (`127.0.0.1:8080`)  
- Navigate to the login page:

```text
/#/login
```

### Step 3: Capture the login request

- Turn **Intercept ON** in Burp Proxy tab  
- Enter any credentials  

Example:

```text
admin@juice-sh.op / test
```

- Click **Log In**  
- Send the captured request to **Intruder** (`Ctrl + I`)  

### Step 4: Configure Intruder for brute force

Captured request:

```http
POST /rest/user/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"admin@juice-sh.op","password":"test"}
```

Configuration:

- Clear all default payload positions  
- Highlight the value:

```text
test
```

- Click **Add §** to mark the password field as attack position  
- Payloads tab → Load a password wordlist  

Examples:

```text
rockyou.txt
best1050.txt
SecLists common passwords
```

- Keep attack type as **Sniper**

### Step 5: Run the attack

- Click **Start Attack**

### Step 6: Identify the correct password

Sort the results by **Length** or **Status**:

- Failed attempts return:

```text
401 Unauthorized
```

- Successful login returns:

```text
200 OK
```

with an authentication token.

The correct password is:

```text
admin123
```

### Step 7: Verify

Log in manually with:

```text
Email: admin@juice-sh.op
Password: admin123
```

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The application has no effective rate limiting on the login endpoint.

Burp Intruder can rapidly test many password guesses.  
The password:

```text
admin123
```

is weak and commonly appears in dictionary lists.

This represents **Broken Authentication** because:

- No account lockout after repeated failures  
- No effective rate limiting  
- Weak password allowed for a privileged account  

---

## 5. Mitigation

- Enforce strong password policies for all users  
- Implement rate limiting on login attempts  
- Lock accounts after repeated failed logins  
- Block common passwords such as `admin123`  
- Require MFA for privileged accounts  

---

## 6. Key Takeaways

- 2-star challenges often require methodology, not only payloads  
- Burp Intruder is ideal for password brute-force testing  
- Common password lists are useful in security assessments  
- SQL Injection bypass does not reveal the real password  
- Weak passwords remain a major real-world risk  