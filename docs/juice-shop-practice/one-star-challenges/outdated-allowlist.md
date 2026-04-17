# Outdated Allowlist Challenge

| Item | Detail |
|---|---|
| Category | Unvalidated Redirects |
| Difficulty | Easy (1-Star) |
| Juice Shop Flag | `score-board#Outdated Allowlist` |
| Tools Used | Browser DevTools / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Juice Shop previously accepted cryptocurrency donations (**Bitcoin, Dash, Ether**) but later removed these options when no donations were received.

However, the developers did not fully clean up the code. The old redirect URLs still remain inside the frontend JavaScript redirect allowlist.

Visiting these cryptocurrency URLs directly does **not** solve the challenge.  
The challenge requires being redirected to them through the application's own redirect mechanism.

---

## 2. Security Impact

- Outdated allowlist entries expose old, unmaintained URLs  
- Demonstrates poor code cleanup practices  
- Can be abused for phishing or redirect abuse  
- Shows that removed features may still leave traces in production code  

---

## 3. Step-by-Step Exploitation

### Step 1: Find the redirect allowlist

- Open Browser DevTools (`F12`)  
- Go to **Sources** tab  
- Search for `redirectAllowlist`

You will find something similar to:

```javascript
const redirectAllowlist = new Set([
  'https://github.com/bkimminich/juice-shop',
  'https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm',
  'https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW',
  'https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6'
])
```

Outdated crypto addresses:

- Bitcoin: `https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm`
- Dash: `https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW`
- Ether: `https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6`

### Step 2: Intercept with Burp Suite

- Configure browser to route traffic through Burp Suite (`127.0.0.1:8080`)  
- Turn **Intercept ON** in the Proxy tab  

### Step 3: Trigger a redirect

Navigate to any page using redirects (for example the GitHub link).

The request looks like:

```text
GET /redirect?to=https://github.com/bkimminich/juice-shop
```

### Step 4: Modify the redirect target

Change the `to` parameter to one of the outdated crypto URLs.

Example:

```text
GET /redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm
```

### Step 5: Forward the request

- Click **Forward** in Burp Suite  

### Step 6: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The `isRedirectAllowed()` function uses:

```javascript
url.includes(allowedUrl)
```

to validate redirect targets.

This means any URL containing one of the allowlisted strings can pass validation, including these outdated cryptocurrency URLs.

The challenge only triggers when the redirect occurs through the `/redirect` endpoint, not by directly visiting the URLs.

---

## 5. Mitigation

- Remove outdated allowlist entries completely  
- Use exact URL matching instead of `includes()`  
- Apply proper code cleanup when deprecating features  

---

## 6. Key Takeaways

- Old code often leaves traces after features are removed  
- Search JavaScript files for hidden allowlists and URLs  
- Burp Suite is useful for modifying redirect parameters on the fly  
- `includes()` can be dangerous for URL validation  
