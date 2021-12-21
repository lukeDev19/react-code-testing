export const getWeatherIcon = (weather: any): string => {
  if (weather?.weather) {
    return (
      `http://openweathermap.org/img/wn/${weather.weather[0]?.icon}.png` || ""
    );
  }
  return "";
};
