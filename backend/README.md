# Backend: Meta Lead Ads Webhook Receiver

Minimal FastAPI webhook receiver for Meta Lead Ads (Day-1 scope: receive, verify, and log).

---

## 1. Setup

### 1.1 Create and Activate a Virtual Environment

**On Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**On macOS / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 1.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 1.3 Configure Environment Variables

Create your `.env` file from the example:
```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `VERIFY_TOKEN`: A secret string you choose for webhook verification handshake in Meta App Dashboard.
- `APP_SECRET`: Your Meta App Secret from **Meta App Dashboard -> App Settings -> Basic**.
- `SKIP_SIGNATURE_CHECK`: Set to `false` for production/Meta, or `true` for quick local testing without HMAC signatures.

---

## 2. Running the Server

Start the development server with Uvicorn on port 8000:

```bash
uvicorn main:app --reload --port 8000
```

The server will be available at:
- Webhook URL: `http://localhost:8000/webhook`
- Health Check: `http://localhost:8000/health`
- Swagger API Docs: `http://localhost:8000/docs`

---

## 3. Testing Webhooks Locally

### 3.1 Health Check
```bash
curl http://localhost:8000/health
```
Response:
```json
{"status": "ok"}
```

---

### 3.2 Verification Handshake (GET /webhook)
Simulate Meta's verification handshake:
```bash
curl "http://localhost:8000/webhook?hub.mode=subscribe&hub.verify_token=your_verify_token_here&hub.challenge=test_challenge_12345"
```
Response:
```text
test_challenge_12345
```

---

### 3.3 Receiving Leadgen Webhook Events (POST /webhook)

#### Option A: Debug Mode (`SKIP_SIGNATURE_CHECK=true`)
In `.env`, set `SKIP_SIGNATURE_CHECK=true` and send a test payload:

```bash
curl -X POST http://localhost:8000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "page",
    "entry": [
      {
        "id": "100123456789",
        "time": 1720000000,
        "changes": [
          {
            "field": "leadgen",
            "value": {
              "leadgen_id": "999888777666",
              "page_id": "100123456789",
              "form_id": "555444333222",
              "created_time": 1720000000
            }
          }
        ]
      }
    ]
  }'
```

#### Option B: Verified Signature Mode (`SKIP_SIGNATURE_CHECK=false`)
Meta sends an `X-Hub-Signature-256` header calculated as `sha256=HMAC_SHA256(raw_body, APP_SECRET)`.
If signature validation fails or header is missing, the endpoint rejects with `403 Forbidden`.
