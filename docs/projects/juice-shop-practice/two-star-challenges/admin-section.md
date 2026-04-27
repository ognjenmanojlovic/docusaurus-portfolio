# Admin Section Challenge

| Item | Detail |
|---|---|
| Category | Broken Access Control |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Admin Section` |
| Tools Used | Browser DevTools / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

The administration section exists at a hidden route:

```text
/#/administration
```

However, the application does not properly enforce access control on the client-side routing.

Any authenticated user can access this page by simply navigating to the URL, even without visible admin navigation links.

The challenge requires first logging in as the administrator and then accessing the hidden administration page.

---

## 2. Security Impact

- Unauthorized access to admin functionality  
- Ability to view or manage users, orders, and products  
- Complete compromise of management features  
- Demonstrates broken access control on client-side routes  

---

## 3. Step-by-Step Exploitation

### Step 1: Log in as admin (prerequisite)

Use SQL Injection to bypass the login page.

- Configure browser to use Burp Suite proxy  
- Navigate to login page (`/#/login`)  
- Turn **Intercept ON** in Burp Suite  
- Enter any credentials  
- Intercept the `POST /rest/user/login` request  

Send the request to **Repeater** (`Ctrl + R`) and modify the payload:

```json
{"email":"admin@juice-sh.op'--","password":"anything"}
```

- Click **Send**  
- You receive a valid administrator token  

### Step 2: Find the admin section route

- Open Browser DevTools (`F12`)  
- Go to **Sources** tab  
- Search for:

```text
administration
```

You will find the route registered in the AngularJS routing configuration.

### Step 3: Access the admin section

Navigate directly to:

```text
http://localhost:3000/#/administration
```

### Step 4: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The AngularJS route `/administration` exists in the client-side application but is not properly protected by authorization checks.

Even if backend API endpoints may have restrictions, the page itself is accessible when the route is known.

This demonstrates that hiding functionality in the frontend is not a security control.

---

## 5. Mitigation

- Enforce access control on both client and server side  
- Implement route guards that verify user roles before rendering pages  
- Never rely on hidden navigation links to protect sensitive routes  

---

## 6. Key Takeaways

- Hidden routes are not protected routes  
- Always inspect JavaScript source files for undisclosed endpoints  
- Admin access combined with hidden routes can lead to privilege escalation  
- Browser DevTools search is highly useful for discovering hidden paths  