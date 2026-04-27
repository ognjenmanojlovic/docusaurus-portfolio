# XSS Bonus Payload Challenge

| Item | Detail |
|---|---|
| Category | DOM-Based XSS |
| Difficulty | Easy (1-Star) |
| Juice Shop Flag | `score-board#Bonus Payload` |
| Tools Used | Browser (Search Field) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Juice Shop search functionality is vulnerable to **DOM-based XSS**.  
The application takes user input from the search field and inserts it directly into the DOM without proper sanitization.

The **bonus payload** is a special SoundCloud iframe that plays the OWASP Juice Shop jingle when injected.

---

## 2. Security Impact

- Arbitrary HTML / iframe injection into the page  
- Ability to embed external content (audio, video, malicious sites)  
- Demonstrates why unsanitized user input is dangerous  

---

## 3. Step-by-Step Exploitation

### Step 1: Navigate to the search bar

- Open Juice Shop  
- Locate the search field at the top of the page  

### Step 2: Inject the bonus payload

Copy and paste this payload into the search field:

```html
<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
```

### Step 3: Press Enter

- Hit **Enter** to submit the search  

### Step 4: Observe the result

- A SoundCloud player appears on the page  
- The OWASP Juice Shop jingle starts playing automatically  

### Step 5: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**  

---

## 4. Why This Works

The search functionality reflects user input into the DOM without sanitization.  
The browser renders the iframe because the application does not strip or encode HTML tags from the search query.

---

## 5. Mitigation

- Never insert raw user input into the DOM  
- Use `textContent` instead of `innerHTML`  
- Implement a Content Security Policy (CSP)  

---

## 6. Key Takeaways

- DOM-based XSS occurs when client-side scripts handle user input unsafely  
- Search fields are common XSS injection points  
- Even "fun" payloads like this one reveal serious security flaws  
