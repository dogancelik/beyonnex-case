import { useCallback, useEffect, useState } from "react";
import { TemperatureSlider } from "./components/common";
import SvgLogo from "./assets/beyonnex.svg";
import style from "./App.module.css";

function App() {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    console.log('Temperature is changed:', temperature);
  }, [temperature]);

  const onChange = useCallback(function (newTemp: number) {
    setTemperature(() => newTemp);
  }, []);

  return (
    <div className={style.root}>
      <header>
        <h1>Test Case for <img className={style.logo} src={SvgLogo} height={40} alt="Beyonnex Logo" /></h1>
      </header>
      <main className={style.content}>
        <TemperatureSlider
          temperature={temperature}
          minTemperature={0}
          maxTemperature={40}
          onChange={onChange}
        />
      </main>
    </div>
  );
}

export default App;
