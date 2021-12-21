import { useState, useRef } from "react";
// import { CityWeather } from "../components/city-weather";
import { CityWeather } from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  const textInputRef = useRef<any>(null);

  const onSearchFocus = () => {
    textInputRef.current.focus();
  };
  return (
    <div className="w-screen h-screen bg-primary">
      <div className="py-2">
        <form
          className="flex items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            const formdata = new FormData(e.currentTarget);
            setCity(formdata.get("city").toString());
          }}
        >
          <span className="cursor-pointer" onClick={onSearchFocus}>
            Weather Search:
          </span>{" "}
          <input
            data-testid="weather-input"
            className="ml-2 border rounded-l-lg px-2 py-1 border-gray/50 focus:outline-none h-10"
            type="text"
            name="city"
            ref={textInputRef}
          />
          <button
            className="text-sm  rounded-r-lg p-2 bg-blue h-10"
            type="submit"
            data-testid="weather-button"
          >
            Submit
          </button>
        </form>

        {city && (
          <div className="mt-16 flex items-center justify-center">
            <CityWeather city={city} />
          </div>
        )}
      </div>
    </div>
  );
}
