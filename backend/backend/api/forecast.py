import json
import pandas as pd
from forecast_engine import generate_forecast

def handler(request, response):
    """
    Serverless function to generate financial forecasts.
    Expects JSON body with:
      { "data": [ { "ds": "YYYY-MM-DD", "y": number }, ... ], "periods": 3 }
    """
    payload = request.json()
    df = pd.DataFrame(payload.get("data", []))
    periods = payload.get("periods", 3)

    # Run forecast
    result = generate_forecast(
        data=df.set_index('ds'),  # ensure DateTimeIndex
        periods=periods
    )

    # Respond with JSON
    response.set_header("Content-Type", "application/json")
    response.status_code = 200
    response.write(json.dumps(result))
