import style from "./App.module.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);

  return (
      <div className={style.App}>
        <Header/>
        <p className={`${style.counterP}`}>Count: {count}</p>
        <p className={`${style.counterP}`}>Calculation: {calculation}</p>
        <button
          type="button"
          className={`${style.counterBtn}`}
          onClick={(event) => {
            setCount((c) => c + 1);
          }}
        >
          Click me!
        </button>
      </div>
  );
}

export default App;
