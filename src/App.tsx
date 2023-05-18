import { ChangeEvent, useState } from "react";
import { optionType } from "./types";

const App = (): JSX.Element => {
  const [location, setLocation] = useState<string>("");
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

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value.trim();
    setLocation(value);

    if (value === "") return;
    getSearchOptions(value);
  };

  const onOptionsSelect = async (option: optionType) => {
    console.log(option);
    console.log(option.name);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <main className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          <span className=" font-black">Weather</span> App
        </h1>
        <p className=" text-sm mt-2">
          Start to typing name of the place you want to know the weather and
          select the one.
        </p>
        <div className=" flex mt-10 md:mt-4 relative">
          <input
            type="text"
            value={location}
            className="px-2 py-1 border-2 border-white rounded-l-md"
            onChange={handleChangeInput}
          />
          <ul className=" absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className=" text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionsSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
          <button className=" rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 curosor-pointer">
            search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
