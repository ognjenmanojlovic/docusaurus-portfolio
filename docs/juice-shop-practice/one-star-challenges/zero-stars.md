# Zero Stars Challenge

| Item | Detail |
|---|---|
| Category | Improper Input Validation |
| Difficulty | Medium (1-Star) |
| Juice Shop Flag | `score-board#Zero Stars` |
| Tools Used | Burp Suite (Proxy & Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The UI only allows ratings between 1–5 stars, but the backend fails to validate the rating value.  
An attacker can send `0` directly to the API, and the server accepts it.

---

## 2. Security Impact

- Attackers can artificially deflate product reputations  
- Demonstrates broken trust boundary between client and server  

---

## 3. Step-by-Step Exploitation

### Step 1: Intercept the request

- Configure browser to use Burp Suite proxy  
- Navigate to **Contact Us** page  
- Turn **Intercept ON** in Burp  

### Step 2: Submit normal feedback

- Enter a comment and select **1 star**  
- Click **Submit**  

### Step 3: Modify the request

Burp captures this request:

```http
POST /api/Feedbacks HTTP/1.1
Host: localhost:3000

{"message":"Test","rating":1}
```

Change rating from `1` to `0`:

```json
{"message":"Zero stars!","rating":0}
```

### Step 4: Forward

- Click **Forward** in Burp  

### Step 5: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**  

---

## 4. Why This Works

The server trusts client-side input. Since there is no validation such as:

```python
if rating < 1:
    return error
```

the backend accepts the value `0`.

---

## 5. Mitigation

Always validate input on the **server side**.  
Reject any rating outside the **1–5 range**.

---

## 6. Key Takeaways

- UI restrictions are for usability, not security  
- Use Burp Suite to inspect what the browser really sends  
- Never trust client-side validation alone  
