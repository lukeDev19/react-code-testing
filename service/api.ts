import { API_KEY } from "../config";

export const getWeatherInfo = async (city: string): Promise<any> => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((r) => r.json())
    .then((result) => {
      return result;
    })
    .catch((e) => {
      return null;
    });
};
