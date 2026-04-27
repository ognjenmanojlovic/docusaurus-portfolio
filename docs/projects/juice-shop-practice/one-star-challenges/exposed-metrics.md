# Exposed Metrics Challenge

| Item | Detail |
|---|---|
| Category | Observability Failures |
| Difficulty | Easy (1-Star) |
| Juice Shop Flag | `score-board#Exposed Metrics` |
| Tools Used | Browser / Burp Suite |
| Status | Solved |

---

## 1. Vulnerability Explanation

The Juice Shop server exposes internal metrics on a publicly accessible endpoint.  
These metrics are intended to be scraped by **Prometheus**, a popular open-source monitoring system.

However, the endpoint has no authentication, allowing anyone to view sensitive operational data.

---

## 2. Security Impact

Exposed metrics can reveal:

- Number of orders placed  
- Number of registered users  
- Challenge solve counts  
- System performance data (CPU, memory, heap)  
- Node.js version information  

This information helps attackers understand the application's internals and user activity.

---

## 3. Step-by-Step Exploitation

### Step 1: Navigate to the metrics endpoint

Open your browser and go to:

```text
http://localhost:3000/metrics
```

Or use Burp Suite:

- Configure browser to use Burp proxy  
- Visit `http://localhost:3000/metrics`  
- Observe the response in Burp  

### Step 2: View the exposed data

The server returns Prometheus-formatted metrics:

```text
# HELP juice_shop_orders_placed_total Number of orders placed
# TYPE juice_shop_orders_placed_total gauge
juice_shop_orders_placed_total{app="juice-shop"} 2

# HELP juice_shop_users_registered_total Number of users registered
# TYPE juice_shop_users_registered_total gauge
juice_shop_users_registered_total{app="juice-shop"} 16

# HELP nodejs_version_info Node.js version info
nodejs_version_info{version="v10.15.3",major="10",minor="15",patch="3"} 1
```

### Step 3: Verify

- Check the **Score Board**  
- Challenge is marked as **Solved**

---

## 4. Why This Works

Prometheus commonly expects a `/metrics` endpoint.  
The Juice Shop developers implemented this for monitoring purposes but left it publicly accessible without authentication.

Requests from Prometheus itself do not trigger challenge completion — only direct browser access counts.

---

## 5. Mitigation

- Restrict `/metrics` endpoint to internal networks only  
- Add authentication (e.g. HTTP Basic Auth) for metrics access  
- Configure reverse proxy to block external access  

---

## 6. Key Takeaways

- Monitoring endpoints are often forgotten and left exposed  
- Always check common paths like `/metrics`, `/health`, `/status`  
- Even read-only metrics can leak sensitive business data  
