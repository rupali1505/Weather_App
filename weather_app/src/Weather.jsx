import { useEffect, useState } from "react";
import "./Weather.css";

export default function Weather() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const key = "4b61d5aa02644b2a9c1120724252311";

  useEffect(() => {
    if (cityName) {
      setLoading(true);
      const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cityName}`;
      fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
          if (json.error) {
            throw new Error(json.error.message);
          }
          setData(json);
        })
        .catch(() => {
          alert("Failed to fetch weather data");
        })
        .finally(() => setLoading(false));
    }
  }, [cityName]);

  const handleChange = (e) => {
    const city = e.target.value;
    setData(null);
    if (!city) {
      setInputValue("");
      return;
    }
    const cityValue = city[0].toUpperCase() + city.slice(1).toLowerCase();

    setInputValue(cityValue);
  };

  const handleClick = () => {
    setCityName(inputValue);
    setLoading(true);
  };

  return (
    <div
      style={{
        paddingTop: "200px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Enter City Name"
        onChange={(e) => handleChange(e)}
        style={{
          width: "250px",
          height: "25px",
          fontSize: "18px",
          padding: "5px 10px",
          border: "none",
        }}
      />
      <button
        style={{
          width: "120px",
          height: "40px",
          fontSize: "18px",
          backgroundColor: "rgba(22, 113, 22, 1)",
          cursor: "pointer",
          border: "none",
          color: "white",
        }}
        onClick={handleClick}
      >
        Search
      </button>
      {loading && <p>Loading Data...</p>}

      {data && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "80px",
          }}
        >
          <div className="weather-cards">
            <p>Temperature </p>
            <p>{data.current.temp_c}</p>
          </div>
          <div className="weather-cards">
            <p>Humidity</p>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-cards ">
            <p>Condition</p>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-cards">
            <p>Wind Speed</p>
            <p>{data.current.wind_kph}kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
