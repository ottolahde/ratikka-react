import React from "react";

import "./App.css";

import TimeAndFetchButton from "./RefreshButton";

function App() {
  const [data, setData] = React.useState(null);
  const [timestampData, setTimestampData] = React.useState(null);

  React.useEffect(() => {
    fetch("/time-and-fetch")
      .then((res) => res.json())
      .then(({ message, timestamp }) => {
        setData(message);
        setTimestampData(timestamp);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{!data ? "Loading..." : "Seuraavaan ratikkaan " + data + " minuuttia"}</h1>
        <p>{!timestampData ? "Loading..." : "Päivitetty: " + timestampData.slice(11, 19)}</p>
        <TimeAndFetchButton onFetch={(data) => setData(data)} />
      </header>
    </div>
  );
}

export default App;
