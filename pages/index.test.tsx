import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import "isomorphic-unfetch";

import App from "./index";
import { CityWeather } from "../components/city-weather-refactor";

const fakeResponse = {
  weather: [
    {
      description: "clear sky",
      main: "Clear",
      icon: "01n"
    }
  ],
  main: {
    // temp in Kelvin
    temp: 295.372
  },
  cod: 200
};

const errorResponse = {
  cod: "404",
  message: "city not found"
};

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(ctx.json(fakeResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows weather inputs", async () => {
  render(<App />);
  // todo: write some assertions
  const weatherInput = screen.getByTestId("weather-input");
  const weatherButton = screen.getByTestId("weather-button");
  fireEvent.change(weatherInput, { target: { value: "New York" } });
  expect(weatherInput.value).toBe("New York");
  fireEvent.click(weatherButton);
  await waitFor(() =>
    // getByTestId throws an error if it cannot find an element
    screen.getByTestId("weather-results")
  );
});

test("it shows weather results", async () => {
  render(<CityWeather city="New York" />);
  // todo: write some assertions
  await waitFor(() => screen.getByTestId("weather-results-loading"));
  await waitForElementToBeRemoved(() =>
    screen.getByTestId("weather-results-loading")
  );
  await waitFor(() => screen.getByTestId("weather-results"));
  expect(window.sessionStorage.getItem("weatherInfo")).toEqual(
    JSON.stringify(fakeResponse)
  );
});

// todo: add more tests, maybe error handling?
test("it shows error", async () => {
  server.use(
    rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
      return res(ctx.json(errorResponse));
    })
  );
  render(<CityWeather city="abd" />);
  // todo: write some assertions
  await waitFor(() => screen.getByTestId("weather-results-loading"));
  await waitForElementToBeRemoved(() =>
    screen.getByTestId("weather-results-loading")
  );
  await waitFor(() => screen.getByTestId("weather-results-error"));
  expect(window.sessionStorage.getItem("weatherInfo")).toEqual(
    JSON.stringify(errorResponse)
  );
});
