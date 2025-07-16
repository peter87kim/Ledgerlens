from typing import Dict, Any
import pandas as pd

def generate_forecast(
    data: pd.DataFrame,
    periods: int = 3
) -> Dict[str, Any]:
    """
    Generate a rolling forecast for the next `periods` months based on historical data.
    
    Args:
        data (pd.DataFrame): Historical revenue & expense data with a DateTimeIndex.
        periods (int): Number of future periods (months) to forecast.
    
    Returns:
        Dict[str, Any]: {
            'forecast': List[float],   # Forecasted values
            'history': List[float],    # Historical values aligned to plot
            'periods': int             # Number of forecast periods
        }
    """
    # TODO: implement Prophet or Exponential Smoothing here
    return {
        'forecast': [],
        'history': data['value'].tolist(),
        'periods': periods
    }
