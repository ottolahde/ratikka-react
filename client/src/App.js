import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';
import TimeAndFetchButton from "./RefreshButton";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/time-and-fetch")
      .then((res) => res.json())
      .then((data) => setData(data.minutes));
      //.then((data) => setData(data.responseTimestamp));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : "Seuraavaan ratikkaan " + data + " minuuttia"}</p>
       
        <TimeAndFetchButton onFetch={(data) => setData(data)} />
      </header>
    </div>
  );
}

export default App;
//<button onClick={fetchXml}>Fetch XML file</button>