# n8n-nodes-smskub  
Official SMSKUB Node for n8n  
Send SMS, Request OTP, and Verify OTP with SMSKUB API.

<p align="center">
  <img src="https://raw.githubusercontent.com/thanalucks-smskub/n8n-nodes-smskub/main/nodes/Smskub/smskub.svg" width="100" />

</p>

---

## 📌 Features

This n8n node provides seamless access to **SMSKUB SMS & OTP API**, supporting:

- 📤 Send Quick SMS Message  
- 🔐 Request OTP  
- ✅ Verify OTP  
- 🔄 Dynamic Sender List (loadOptions)  
- 🔑 Credential Testing (built-in)  

This node is fully compatible with **n8n v1.120+** and **n8n Cloud**.

---

## 🚀 Installation

### Community Node (Self-hosted n8n)
Run:

```bash
npm install n8n-nodes-smskub
```

Then restart n8n.

### Verified Node (n8n Cloud)
Once approved by n8n, this node will appear in:

```
Settings → Community Nodes → Search “SMSKUB”
```

---

## 🔑 Credentials Setup

Go to:

```
n8n → Credentials → New → SMSKUB API
```

Enter your:

- **API Key**

Then click **"Test"**.  
You should see:

```
✓ Connection successful!
```

---

## 📤 Example: Send SMS

1. Add **SMSKUB** node  
2. Select:

```
Action → Send Quick Message
```

3. Fill:

- **Phone Number:** `66812345678`  
- **Sender Name:** (loaded automatically)  
- **Message:** `"Your OTP is 123456"`  

Example workflow JSON:

```json
{
  "nodes": [
    {
      "parameters": {
        "operation": "sendMessage",
        "msgPhone": "66812345678",
        "msgFrom": "SENDER",
        "msgText": "Hello from SMSKUB"
      },
      "id": "SMSKUB1",
      "name": "SMSKUB",
      "type": "n8n-nodes-smskub.smskub",
      "typeVersion": 1,
      "position": [500, 300]
    }
  ]
}
```

---

## 🔐 Example: Request OTP

1. Add **SMSKUB node**  
2. Select:

```
Action → Request OTP
```

Fill:

- **Phone Number**
- **Project ID**
- **OTP Message** (optional)

---

## 🔎 Example: Verify OTP

```
Action → Verify OTP
```

Fill:

- OTP Code  
- Project ID  
- Phone Number  

---

## 📚 API Documentation

Full API reference:  
https://documenter.getpostman.com/view/9887776/2sAYXCjyAF

---

## 🧩 Node Files Included

| File | Description |
|------|-------------|
| `Smskub.node.ts` | Main node logic |
| `SmskubApi.credentials.ts` | Credential type + automatic test |
| `smskub.svg` | Node icon |
| `package.json` | Node metadata |
| `gulpfile.js` | Icon build pipeline |

---

## 📄 License

MIT License (Same as n8n community nodes)

---

## ❤️ Support

For help with API usage:  
https://sms-kub.com  
Or contact SMSKUB support team.

