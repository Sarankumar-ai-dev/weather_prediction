from django.shortcuts import render
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date as dt_date
from django.core.cache import cache


@api_view(['GET'])
def get_weather(request):

    place = request.GET.get('place')
    date = request.GET.get('date', str(dt_date.today()))

    if not place:
        return Response({
            "error": "Place is required"
        })

    cache_key = f"weather_{place}_{date}"

    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    try:

        API_KEY = "cd271f231eac4499a2b120941261105"

        weather_url = (
            f"http://api.weatherapi.com/v1/forecast.json?"
            f"key={API_KEY}"
            f"&q={place}"
            f"&days=7"
            f"&aqi=no"
            f"&alerts=no"
        )

        weather_res = requests.get(
            weather_url,
            timeout=10
        ).json()

        print(weather_res)

        if "forecast" not in weather_res:

            return Response({
                "error": "Weather data not available",
                "api_response": weather_res
            })

        forecast_days = weather_res["forecast"]["forecastday"]

        result = []

        temps = []
        rains = []
        winds = []
        humidity = []

        for day in forecast_days:

            for hour in day["hour"]:

                t = hour["temp_c"]
                r = hour["precip_mm"]
                w = hour["wind_kph"]
                h = hour["humidity"]

                temps.append(t)
                rains.append(r)
                winds.append(w)
                humidity.append(h)

                # IMPORTANT FORMAT
                result.append({
                    "time": hour["time"],  
                    "temperature": t,
                    "rain": r,
                    "wind": w,
                    "humidity": h
                })

        summary = {
            "avg_temp": round(sum(temps) / len(temps), 1),
            "max_temp": max(temps),
            "min_temp": min(temps),
            "total_rain": round(sum(rains), 2),
            "max_wind": max(winds),
            "avg_humidity": round(sum(humidity) / len(humidity), 1)
        }

        # SAME RESPONSE STRUCTURE
        final_data = {
            "place": place,
            "date": date,
            "summary": summary,
            "hourly_forecast": result
        }

        cache.set(
            cache_key,
            final_data,
            timeout=3600
        )

        return Response(final_data)

    except Exception as e:

        return Response({
            "error": str(e)
        })