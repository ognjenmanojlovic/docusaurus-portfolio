# Forged Review Challenge

| Item | Detail |
|---|---|
| Category | Broken Access Control → Horizontal Privilege Escalation |
| Difficulty | Medium (3-Star) |
| Juice Shop Flag | `score-board#Forged Review` |
| Tools Used | Browser DevTools (Network / Console) |
| Status | Solved |
| Video Demo | [Click Here](https://somup.com/cOfDVmVcPJ3) |

---

## 1. Vulnerability Explanation

The application allows users to submit product reviews through the endpoint:

```
POST /api/ProductReviews
```

However, the backend does not properly verify the identity of the user submitting the review.

Instead of using the authenticated session, the application trusts user-controlled input such as:

- `author`
- `UserId`

This means an attacker can impersonate another user by modifying the request payload.

### How to Identify Target Users

To successfully impersonate another user, we first need a valid identifier such as an email address.

In OWASP Juice Shop, user email addresses can be discovered in multiple ways:

- During login attempts (error messages may reveal valid users)
- Through previously known default accounts (e.g., admin)
- By analyzing application behavior and public information

For example, the following admin account is commonly known in Juice Shop:

```
admin@juice-sh.op
```

This email can be used to demonstrate how the application allows impersonation due to missing access control validation.

---

## 2. Security Impact

This vulnerability leads to **horizontal privilege escalation**, where an attacker can act on behalf of another user.

### Possible consequences:

- Fake reviews under trusted accounts (e.g., admin)
- Manipulation of product reputation
- Loss of trust in the platform
- No accountability for malicious actions

---

## 3. Step-by-Step Exploitation

### 1. Setup

- Launch OWASP Juice Shop locally
- Log in with any user account
- Navigate to any product page

---

### 2. Submit a normal review

- Write a review
- Submit it normally

---

### 3. Intercept the request

- Open DevTools → Network tab
- Find the request:

```
POST /api/ProductReviews
```

- Right-click → **Copy as fetch**

---

### 4. Modify the request

Paste the request into the browser console and modify the body.

Original:

```json
{
  "message": "Nice product",
  "rating": 3
}
```

Modified:

```json
{
  "message": "Hacked review 😏",
  "rating": 5,
  "author": "admin@juice-sh.op"
}
```

---

### 5. Send the forged request

Execute the modified request in the console.

---

### 6. Result

- The server accepts the request
- The review appears as if it was written by another user (e.g., admin)

---

## 4. Why This Works

The server does not enforce proper access control.

Instead of extracting the user identity from the authenticated session or token, it relies on user input.

This allows attackers to:

- control identity fields
- impersonate other users
- bypass ownership checks

---

## 5. Mitigation

To fix this vulnerability:

- Do not trust client-side identity fields (`author`, `UserId`)
- Always derive the user identity from the authenticated session or JWT
- Validate that the request belongs to the logged-in user
- Implement proper authorization checks on the server side

---

## 6. Key Takeaways

- Never trust user-controlled input for identity
- Always enforce access control on the backend
- Broken Access Control is one of the most critical web vulnerabilities
- Small mistakes in validation can lead to serious abuse