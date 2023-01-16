import React from "react";
import { useEffect, useState } from 'react';

import "./App.css";

import TimeAndFetchButton from "./RefreshButton";

function App() {
  const [data, setData] = React.useState(null);
  const [timestampData, setTimestampData] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/time-and-fetch");
      const json = await response.json();
      setData(json.message);
      setTimestampData(json.timestamp);
    }
    fetchData();
    // call fetchData every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // cleanup function to stop the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{!data ? "Loading..." : "Seuraavaan ratikkaan " + data + " minuuttia"}</h1>
        <p>{!timestampData ? "Loading..." : "Päivitetty: " + timestampData.slice(11, 19)}</p>
      </header>
    </div>
  );
}

export default App;
/*  React.useEffect(() => {
    fetch("/time-and-fetch")
      .then((res) => res.json())
      .then(({ message, timestamp }) => {
        setData(message);
        setTimestampData(timestamp);
      });
  }, []); */