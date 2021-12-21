import { Component } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "ed6fab2ca78a8953f9c5aef86233c7c7";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
  isLoading: boolean;
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props) {
    super(props);
    this.state = {
      weatherResult: null, // this should be the bug on the initial code
      isLoading: true
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => {
        console.info("result", result);
        this.setState({ weatherResult: result, isLoading: false });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
      });
  }

  public render() {
    const { city } = this.props;
    const { weatherResult, isLoading } = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult.weather[0].description}</div>
      </div>
    );
  }
}
