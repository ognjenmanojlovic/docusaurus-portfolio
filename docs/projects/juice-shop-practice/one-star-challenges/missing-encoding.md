# Missing Encoding Challenge

| Item | Detail |
|---|---|
| Category | Improper Input Validation |
| Difficulty | Easy (1-Star) |
| Juice Shop Flag | `score-board#Missing Encoding` |
| Tools Used | Browser DevTools (Network / Elements) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Photo Wall contains a broken image of **Bjoern's cat in melee combat-mode**.  
The image fails to load because the filename contains special characters (specifically `#` symbols) that are not properly URL-encoded.

In URLs, the `#` character denotes a **fragment identifier**.  
The browser stops reading the URL at the first `#`, so the full file path never reaches the server.

---

## 2. Security Impact

- Broken image resources due to improper encoding  
- Demonstrates how special characters must be encoded in URLs  
- Affects application functionality and user experience  

---

## 3. Step-by-Step Exploitation

### Step 1: Navigate to Photo Wall

- Click the hamburger menu  
- Select **Photo Wall**

### Step 2: Find the broken image

- Look for an image that fails to load  
- The cat emoji image appears broken  

### Step 3: Inspect the image source

- Right-click the broken image → **Inspect**  
- Or press **F12** → **Elements** tab

The image source URL looks like this:

```text
assets/public/images/uploads/😼-#zatschi-#whoneedsfourlegs-1572600969477.jpg
```

### Step 4: Encode the special characters

The `#` symbols need to be encoded as `%23`.

Original:

```text
😼-#zatschi-#whoneedsfourlegs-1572600969477.jpg
```

Encoded:

```text
😼-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg
```

### Step 5: Access the encoded URL

Paste the full encoded URL into your browser:

```text
http://localhost:3000/assets/public/images/uploads/😼-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg
```

### Step 6: Verify

- The cat photo loads successfully  
- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The browser interprets `#` as a fragment identifier and truncates the URL at that point.  
The server never receives the complete filename.

Encoding `#` as `%23` tells the browser to treat it as a literal character rather than a special delimiter.

---

## 5. Mitigation

Always encode special characters in URLs.  
Use `encodeURIComponent()` in JavaScript when generating URLs dynamically.

---

## 6. Key Takeaways

- Special characters (`#`, `&`, `?`, etc.) must be URL-encoded  
- Browser DevTools helps identify broken resource paths  
- Even emojis in filenames require proper encoding  