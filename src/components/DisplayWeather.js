import React, { useState, useEffect } from "react";
import WeatherModal from "./WeatherModal";

const DisplayWeather = ({ WeatherData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Open the modal once WeatherData is loaded
    if (WeatherData) {
      setIsModalOpen(true);
    }
  }, [WeatherData]);

  return (
    <div>
      <WeatherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weatherData={WeatherData}
      />
    </div>
  );
};

export default DisplayWeather;
