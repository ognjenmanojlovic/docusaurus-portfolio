# Bully Chatbot Challenge

| Item | Detail |
|---|---|
| Category | Miscellaneous |
| Difficulty | Easy (1-Star) |
| Juice Shop Flag | `score-board#Bully Chatbot` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The support chatbot is programmed to be reluctant to give out coupon codes.  
It refuses with various excuses when asked politely.

However, the chatbot logic contains a flaw: persistent nagging or **bullying** eventually triggers a response containing a valid coupon code.

This challenge demonstrates how automated or chatbot-based systems can be manipulated through repetitive prompting.

---

## 2. Security Impact

- Unauthorized discount code access  
- Demonstrates flawed business logic in chatbot interactions  
- Could be automated to extract multiple codes  

---

## 3. Step-by-Step Exploitation

### Step 1: Setup

- Configure browser to route traffic through Burp Suite (`127.0.0.1:8080`)  
- Log in to Juice Shop as any user  
- Navigate to **Support Chat** in the sidebar menu (`/#/chatbot`)  

### Step 2: Start chatting

- Tell the chatbot your name when prompted  
- Ask for a coupon code  

Examples:

- `Can I have a coupon code?`
- `Please give me a discount!`

### Step 3: Intercept with Burp

- Turn **Intercept ON** in Burp Suite Proxy tab  
- Send a message to the chatbot  
- Observe the WebSocket or API request in Burp  

### Step 4: Repeat the request (Burp Repeater)

- Send the request to **Repeater** (`Ctrl + R`)  
- The chatbot will initially refuse with responses such as:

```text
Sorry, I'm not allowed to give out coupons
Please ask me something else
```

- Keep sending the same or similar requests repeatedly  

### Step 5: Get the coupon

After enough repetitions, the chatbot responds with a message containing a coupon code.

Example:

```text
Here's a 10% coupon code for this month: XXX-XXX-XXX
```

### Step 6: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The chatbot's refusal logic eventually expires after a certain number of requests.

The developers likely implemented this as a fun challenge, but it demonstrates how automated systems can be brute-forced into revealing sensitive information.

Using **Burp Repeater** allows rapid resubmission of the same request without manually retyping each message.

---

## 5. Mitigation

- Implement rate limiting on chatbot interactions  
- Require genuine user verification before issuing codes  
- Use server-side logic that does not rely on request counting alone  

---

## 6. Key Takeaways

- Chatbot logic can be abused through repetition  
- Burp Repeater is useful for automating repetitive requests  
- Even joke challenges reveal real-world API abuse vectors  