import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types";
import Search from "./components/Search";

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = async (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value.trim();
    setTerm(value);

    if (value === "") return;
    getSearchOptions(value);
  };

  const getForecast = async (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const onOptionSelect = async (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return (
    <main className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vh] w-full">
      <Search
        term={term}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
      />
    </main>
  );
};

export default App;
