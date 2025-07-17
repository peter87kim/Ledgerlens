import json
import pandas as pd
from forecast_engine import generate_forecast

def handler(request, response):
    # 1. CORS preflight handling
    response.set_header("Access-Control-Allow-Origin", "*")
    response.set_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.set_header("Access-Control-Allow-Headers", "Content-Type")
    if request.method == "OPTIONS":
        # Preflight request—no body needed
        response.status_code = 204
        return

    # 2. Only accept POST
    if request.method != 'POST':
        response.status_code = 405
        response.write(json.dumps({ "error": "Method not allowed" }))
        return

    # 3. Parse payload
    payload = request.json()
    df = pd.DataFrame(payload.get("data", []))
    periods = payload.get("periods", 3)

    # 4. Generate forecast
    result = generate_forecast(
        data=df.set_index('ds'),
        periods=periods
    )

    # 5. Return JSON with CORS headers
    response.set_header("Content-Type", "application/json")
    response.write(json.dumps(result))
