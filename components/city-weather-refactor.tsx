import React, { useState, useEffect } from "react";
import { getWeatherInfo } from "../service/api";
import { getWeatherIcon } from "../utils";

interface CityWeatherProps {
  city: string;
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export const CityWeather: React.FC<CityWeatherProps> = ({ city }) => {
  const [weatherResult, setWeatherResult] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("Please wait for a while");

  useEffect(() => {
    if (city) {
      (async () => {
        setLoading(true);
        const weatherInfo = await getWeatherInfo(city);
        if (weatherInfo) {
          window.sessionStorage.setItem(
            "weatherInfo",
            JSON.stringify(weatherInfo)
          ); // for testing
          if (weatherInfo.cod !== "404") {
            setWeatherResult(weatherInfo);
            setError("");
          } else {
            setError(weatherInfo.message || "Something went wrong!");
          }
        } else {
          setError("Something went wrong!");
        }
        setLoading(false);
      })();
    }
  }, [city]);

  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center w-max self-center rounded-md p-3 drop-shadow-md bg-white"
        data-testid="weather-results-loading"
      >
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div data-testid="weather-results-error">
        <h1>{isError}</h1>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-max self-center rounded-md p-3 drop-shadow-md bg-white"
      data-testid="weather-results"
    >
      <h1 className="text-2xl font-bold text-darkGray">{city.toUpperCase()}</h1>
      <img
        src={getWeatherIcon(weatherResult)}
        alt="Weather Status"
        className="w-20"
      />
      <p className="text-gray text-xl">{weatherResult.weather[0].main}</p>
      <div className="text-xs text-gray">
        Temperature:
        <b className="text-2xl text-black/80 ml-2">
          {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </b>
      </div>
    </div>
  );
};
