# Meta Geo Stalking Challenge

| Item | Detail |
|---|---|
| Category | Sensitive Data Exposure → OSINT |
| Difficulty | Medium (2-Star) |
| Juice Shop Flag | `score-board#Meta Geo Stalking` |
| Tools Used | Browser / EXIF Metadata Viewer / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Photo Wall contains a photo of a refreshing glass of juice.

This image includes embedded **EXIF metadata**, including GPS coordinates showing where the photo was taken.

The challenge is to use this geolocation data to determine the answer to John's security question:

```text
What's your favorite place to go hiking?
```

This is primarily an **OSINT (Open Source Intelligence)** challenge.  
No direct exploitation is required at first — instead, publicly exposed metadata is abused.

---

## 2. Security Impact

- Sensitive information leakage through image metadata  
- Attackers can infer personal habits and locations  
- Security questions become guessable using public data  
- Demonstrates weak account recovery mechanisms  

---

## 3. Step-by-Step Exploitation

### Step 1: Find the image on Photo Wall

Navigate to:

```text
/#/photo-wall
```

Look for the image of a glass of juice.

### Step 2: Download the image

- Right-click the image  
- Select **Save Image As...**  
- Save it locally  

### Step 3: Extract EXIF metadata

Use an EXIF metadata viewer.

Recommended tools:

- Jeffrey's Image Metadata Viewer  
- `exiftool` (command line)

The metadata reveals GPS coordinates embedded in the image.

### Step 4: Locate the coordinates

- Copy the GPS coordinates  
- Paste them into Google Maps or another map provider  

The coordinates point to a hiking trail or natural area.

### Step 5: Identify the security answer

John's security question asks for his favorite hiking location.

By inspecting the map area, identify the nearby trail or park name.

Depending on Juice Shop version, answers may vary, for example:

```text
Scuttlehole Trailhead
```

or a nearby named hiking location.

### Step 6: Reset John's password

- Configure browser to use Burp Suite proxy  
- Navigate to:

```text
/#/forgot-password
```

- Enter John's email:

```text
john@juice-sh.op
```

- Turn **Intercept ON** in Burp Suite  
- Enter the discovered hiking location as answer  
- Enter a new password  
- Submit the form  

Burp captures:

```http
POST /rest/user/reset-password HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"john@juice-sh.op","answer":"[hiking location]","new":"newpassword","repeat":"newpassword"}
```

### Step 7: Send the request

- Click **Forward**

If the answer is correct, the server returns:

```text
200 OK
```

and the password is changed.

### Step 8: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

Uploaded images retain their original EXIF metadata, including GPS coordinates.

The application does not strip sensitive metadata before making files public.

An attacker can extract the coordinates, infer personal information, and use it to answer security questions.

This is classified as **Sensitive Data Exposure**.

---

## 5. Mitigation

- Strip EXIF metadata from uploaded images before publishing  
- Use image processing pipelines that remove GPS coordinates  
- Avoid weak security questions based on personal preferences  
- Use safer password recovery methods such as email reset links or MFA  

---

## 6. Key Takeaways

- Images often contain hidden metadata (GPS, camera model, timestamps)  
- OSINT skills are valuable in penetration testing  
- Publicly available information can defeat security questions  
- Always sanitize user uploads before exposing them publicly  
- Burp Suite is useful for testing the password reset workflow  
