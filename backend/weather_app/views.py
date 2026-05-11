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

        # DIRECT WEATHER API
        weather_url = f"https://wttr.in/{place}?format=j1"

        weather_res = requests.get(
            weather_url,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        ).json()

        print(weather_res)

        if "weather" not in weather_res:

            return Response({
                "error": "Weather data not available",
                "api_response": weather_res
            })

        result = []

        temps = []
        rains = []
        winds = []
        humidity = []

        weather_days = weather_res["weather"]

        for day in weather_days:

            hourly_data = day["hourly"]

            for hour in hourly_data:

                t = float(hour["tempC"])
                r = float(hour["precipMM"])
                w = float(hour["windspeedKmph"])
                h = float(hour["humidity"])

                temps.append(t)
                rains.append(r)
                winds.append(w)
                humidity.append(h)

                result.append({
                    "time": hour["time"],
                    "temperature": t,
                    "rain": r,
                    "wind": w,
                    "humidity": h
                })

        if not result:

            return Response({
                "error": "No weather data available"
            })

        summary = {
            "avg_temp": round(sum(temps) / len(temps), 1),
            "max_temp": max(temps),
            "min_temp": min(temps),
            "total_rain": round(sum(rains), 2),
            "max_wind": max(winds),
            "avg_humidity": round(sum(humidity) / len(humidity), 1)
        }

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