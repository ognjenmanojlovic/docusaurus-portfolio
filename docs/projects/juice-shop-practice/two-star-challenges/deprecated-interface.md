# Deprecated Interface Challenge

| Item | Detail |
|---|---|
| Category | Security Misconfiguration |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Deprecated Interface` |
| Tools Used | Browser / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

Juice Shop originally had a dedicated **B2B (Business-to-Business)** interface for enterprise customers to upload bulk orders via XML files.

This interface was later replaced, but parts of the legacy functionality were not fully removed from the code base.

The deprecated interface remains accessible through the complaint page:

```text
/#/complain
```

where users can upload files, including XML files that were part of the former B2B workflow.

No exploit is required. Simply using the deprecated functionality solves the challenge.

---

## 2. Security Impact

- Deprecated but still accessible features create hidden attack surfaces  
- Legacy interfaces often lack proper security controls  
- Demonstrates poor lifecycle and code cleanup management  
- Unexpected functionality may remain exposed in production  

---

## 3. Step-by-Step Exploitation

### Step 1: Navigate to the Complaint page

Open Juice Shop and go to:

```text
/#/complain
```

using the sidebar menu.

### Step 2: Inspect the file upload

The page allows uploading an invoice file.

By default, the file picker may show only:

```text
.pdf
```

files, but the backend accepts additional file types.

### Step 3: Create a dummy XML file

Create a simple XML file named:

```text
test.xml
```

Example content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<test></test>
```

### Step 4: Upload the XML file

- Click **Browse** on the Complaint page  
- Change file filter from **Custom Files** to **All Files**  
- Select `test.xml`  
- Click **Upload**

### Step 5: Intercept with Burp Suite (Optional)

To inspect the request:

- Configure browser to use Burp Suite proxy  
- Turn **Intercept ON**  
- Upload the XML file  

Observe a request similar to:

```http
POST /api/Complaints
```

with the XML file attached.

### Step 6: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

The complaint page still contains remnants of the old B2B upload interface.

XML was previously used for bulk enterprise orders, and this functionality was not fully removed.

The server may even return:

```text
410 Gone
```

but the challenge still completes because the deprecated feature was reached.

This is considered **Security Misconfiguration** because:

- Deprecated functionality remained accessible  
- Old interfaces were not properly retired  
- File restrictions were weak or incomplete  

---

## 5. Mitigation

- Completely remove deprecated code and unused endpoints from production  
- Restrict access to legacy interfaces  
- Use `410 Gone` only after fully disabling functionality  
- Perform regular cleanup during feature deprecation cycles  

---

## 6. Key Takeaways

- Deprecated does not always mean removed  
- Always verify that old interfaces are truly inaccessible  
- Complaint or support pages often contain overlooked features  
- Sometimes simply reaching old functionality is enough to create risk 