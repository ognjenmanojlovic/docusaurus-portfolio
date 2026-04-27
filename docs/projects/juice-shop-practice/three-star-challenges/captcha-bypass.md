# CAPTCHA Bypass Challenge

| Item | Detail |
|---|---|
| Category | Broken Anti-Automation |
| Difficulty | Hard (3-Star) |
| Juice Shop Flag | `score-board#CAPTCHA Bypass` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Customer Feedback form includes a CAPTCHA intended to stop automated submissions.

However, the implementation is fundamentally broken: the server sends both the CAPTCHA identifier and the plaintext answer back to the client.

An attacker can simply reuse the same valid CAPTCHA answer repeatedly without solving a new challenge.

The task requires submitting **10 or more feedback entries within 20 seconds**, which is difficult manually but trivial with automation.

---

## 2. Security Impact

- Complete bypass of anti-bot protections  
- Ability to spam feedback or ratings at scale  
- CAPTCHA becomes ineffective security theater  
- Can be combined with rating manipulation attacks  

---

## 3. Step-by-Step Exploitation

### Step 1: Intercept a feedback submission

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Navigate to:

```text
/#/contact
```

- Turn **Intercept ON** in Burp Proxy tab  
- Fill out the feedback form  
- Solve the CAPTCHA normally once  
- Click **Submit**

Captured request:

```http
POST /api/Feedbacks HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"captchaId":42,"captcha":"1234","comment":"Test","rating":3}
```

### Step 2: Identify the flaw

Notice that the request contains:

- `captchaId`
- the correct CAPTCHA value:

```text
1234
```

The server trusts the client-supplied answer and does not require a fresh challenge for each request.

### Step 3: Send to Repeater

- Right-click the intercepted request  
- Select **Send to Repeater** (`Ctrl + R`)  

### Step 4: Rapidly send 10+ requests

- Click **Send** repeatedly as fast as possible  
- Reuse the exact same request 10+ times within 20 seconds  

Each request uses the same CAPTCHA values, and the server accepts them.

### Step 5: Verify success

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The CAPTCHA system reveals the answer to the client instead of keeping validation fully server-side.

### Vulnerable flow

```text
Client requests GET /rest/captcha/
Server responds with captchaId + answer
Client submits POST /api/Feedbacks with same answer
Server accepts reused CAPTCHA repeatedly
```

A secure implementation would:

- store the answer only server-side  
- validate once per session/request  
- invalidate used CAPTCHA tokens immediately  

---

## 5. Mitigation

- Never expose CAPTCHA answers to the client  
- Store answers server-side and tie them to session/token  
- Invalidate CAPTCHA after single use  
- Add rate limiting to feedback submissions  
- Use mature CAPTCHA providers (reCAPTCHA / hCaptcha)  

---

## 6. Key Takeaways

- CAPTCHA answers should never leave the server  
- Burp Repeater can quickly replay requests many times  
- Reusable CAPTCHA tokens defeat the purpose of bot protection  
- This challenge combines well with feedback/rating abuse scenarios 