# Five-Star Feedback Challenge

| Item | Detail |
|---|---|
| Category | Broken Access Control |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Five-Star Feedback` |
| Tools Used | Burp Suite (Proxy / Repeater) |
| Status | Solved |

---

## 1. Vulnerability Explanation

The administration section:

```text
/#/administration
```

displays a table of all customer feedback, including a red trash can icon next to each entry for deletion.

However, the application does not properly enforce access control on the DELETE endpoint.  
Any authenticated user can delete any feedback entry by sending a crafted request directly to the API.

This is a **horizontal privilege escalation** issue: a normal user can delete feedback created by other users, including positive 5-star reviews.

---

## 2. Security Impact

- Removal of legitimate positive feedback  
- Manipulation of product reputation  
- Undermines trust in review authenticity  
- Demonstrates broken access control on API endpoints  

---

## 3. Step-by-Step Exploitation

### Step 1: Prerequisites

You need access to the administration section first.

Solve the **Admin Section** challenge:

- Log in as admin using SQL Injection:

```text
admin@juice-sh.op'--
```

- Navigate to:

```text
/#/administration
```

### Step 2: Identify the feedback IDs

On the administration page:

- Locate the **Customer Feedback** table  
- Each entry has a red trash can icon  
- Right-click → **Inspect** to locate the feedback ID  
- Or observe the DELETE request in Burp Suite  

### Step 3: Intercept the delete request

- Configure browser to use Burp Suite proxy (`127.0.0.1:8080`)  
- Turn **Intercept ON** in Burp Proxy tab  
- Click the red trash can icon next to a 5-star review  

Burp captures:

```http
DELETE /api/Feedbacks/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Repeat for all 5-star reviews

- Send each DELETE request to **Repeater** (`Ctrl + R`)  
- Click **Send** to remove all 5-star feedback entries  

### Step 5: Verify

- Once all 5-star reviews are deleted, check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The endpoint:

```text
/api/Feedbacks/{id}
```

accepts DELETE requests from any authenticated user.

The backend does not verify whether the requesting user owns the feedback entry being deleted.

This is a classic **missing function-level access control** vulnerability.

The **Admin Section** challenge is useful because it reveals all feedback entries and IDs, making exploitation easier.

---

## 5. Mitigation

- Implement ownership checks so users can delete only their own feedback  
- Use role-based access control (RBAC) for administrative actions  
- Never rely on hidden frontend controls for security  

---

## 6. Key Takeaways

- API endpoints must be secured just like webpages  
- Deleting data requires authorization checks  
- Admin panels often reveal hidden IDs and internal objects  
- 2-star challenges often require chaining multiple vulnerabilities  