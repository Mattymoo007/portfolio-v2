import React, { FC, useEffect, useState } from "react"
import {
  BsCloudy,
  BsCloudDrizzle,
  BsCloudFog,
  BsCloudSun,
  BsCloudMoon,
  BsSnow,
  BsCloudLightning,
  BsClouds,
  BsCloudRainHeavy,
  BsSun,
  BsMoon,
} from "react-icons/bs"

function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej)
  })
}

async function fetchWeather() {
  const position: any = await getPosition()

  if (position) {
    const { latitude, longitude } = position.coords
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0e8af7013fd64abdf935c349cc6a9eb2`
    )
    const data = await response.json()
    return data
  } else {
    return null
  }
}

const getWeatherIcon = (iconId: string) => {
  switch (iconId) {
    case "01d":
      return <BsSun />
    case "01n":
      return <BsMoon />
    case "02d":
      return <BsCloudSun />
    case "02n":
      return <BsCloudMoon />
    case "03d":
    case "03n":
      return <BsCloudy />
    case "04d":
    case "04n":
      return <BsClouds />
    case "09d":
    case "09n":
      return <BsCloudDrizzle />
    case "10d":
    case "10n":
      return <BsCloudRainHeavy />
    case "11d":
    case "11n":
      return <BsCloudLightning />
    case "13d":
    case "13n":
      return <BsSnow />
    case "50d":
    case "50n":
      return <BsCloudFog />
    default:
      return "unknown"
  }
}

const Weather: FC<{ className: string }> = ({ className }) => {
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    fetchWeather().then(res => setWeather(res))
  }, [])

  return (
    <>
      {weather ? (
        <div
          className={`font-lexend text-xs md:text-base uppercase h-[52px] flex items-center ${className}`}
        >
          <span>{Math.floor(weather.main.temp)}°C</span>
          <span className="flex items-center text-2xl mb-1 mx-3">
            {getWeatherIcon(weather.weather[0].icon)}
          </span>
          <span className="hidden md:block">{weather.name},&nbsp;</span>
          <span className="hidden md:block">{weather.sys.country}</span>
        </div>
      ) : (
        <div>Weather</div>
      )}
    </>
  )
}

export default Weather
