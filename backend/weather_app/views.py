from django.shortcuts import render
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date as dt_date


@api_view(['GET'])
def get_weather(request):

    place = request.GET.get('place')
    date = request.GET.get('date', str(dt_date.today()))

    if not place:
        return Response({
            "error": "Place is required"
        })

    try:

        geo_url = (
            f"https://geocoding-api.open-meteo.com/v1/search?"
            f"name={place}&count=1"
        )

        geo_res = requests.get(geo_url).json()

        if "results" not in geo_res:
            return Response({
                "error": "Place not found"
            })

        lat = geo_res["results"][0]["latitude"]
        lon = geo_res["results"][0]["longitude"]

        weather_url = (
            f"https://api.open-meteo.com/v1/forecast?"
            f"latitude={lat}"
            f"&longitude={lon}"
            f"&hourly="
            f"temperature_2m,"
            f"precipitation,"
            f"windspeed_10m,"
            f"relativehumidity_2m"
            f"&forecast_days=7"
        )

        weather_res = requests.get(weather_url).json()

        # Debug response
        if "hourly" not in weather_res:
            return Response({
                "error": "Weather data not available",
                "api_response": weather_res
            })

        hourly = weather_res["hourly"]

        result = []

        temps = []
        rains = []
        winds = []
        humidity = []

        for i in range(len(hourly["time"])):

            t = hourly["temperature_2m"][i]
            r = hourly["precipitation"][i]
            w = hourly["windspeed_10m"][i]
            h = hourly["relativehumidity_2m"][i]

            temps.append(t)
            rains.append(r)
            winds.append(w)
            humidity.append(h)

            result.append({
                "time": hourly["time"][i],
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
        return Response({
            "place": place,
            "date": date,
            "summary": summary,
            "hourly_forecast": result
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })