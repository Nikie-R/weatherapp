import React, { useState, useEffect } from "react";
import SearchComponent from "./components/SearchComponent";
import DisplayWeather from "./components/DisplayWeather";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [locationData, setLocationData] = useState(null);
  const [WeatherData, setWeatherData] = useState(null);

  const handleSearch = ({ lat, lon }) => {
    // Set the location data in the state
    setLocationData({ lat, lon });
  };

  useEffect(() => {
    // Check if locationData exists before calling getWeather
    if (locationData) {
      getWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData]);

  //Get weather from openweather API
  const getWeather = () => {
    const apiKey = process.env.REACT_APP_OPENWEATHERAPI_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&units=Metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  };

  return (
    <div>
      <Header />
      <SearchComponent onSearch={handleSearch} />
      {WeatherData && <DisplayWeather WeatherData={WeatherData} />}
      <Footer />
    </div>
  );
}

export default App;
