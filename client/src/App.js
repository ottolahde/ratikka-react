import React from "react";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import "./App.css";

import "leaflet/dist/leaflet.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
//import TimeAndFetchButton from "./RefreshButton";

const center = [23.845415115356445, 61.458133697509766];

function App() {
  const [data, setData] = React.useState(null);
  const [timestampData, setTimestampData] = React.useState(null);
  const [lon, setLon] = React.useState(0);
  const [lat, setLat] = React.useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/time-and-fetch");
      const json = await response.json();
      setData(json.message);
      setTimestampData(json.timestamp);
      setLon(json.lon);
      setLat(json.lat);
    }
    fetchData();
    // call fetchData every 10 seconds json.location
    const intervalId = setInterval(fetchData, 10000);

    // cleanup function to stop the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      
      <header className="App-header">
        <MapContainer center={[61.49 , 23.82]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=rxdyrWJpviBPEUuWTmOw"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Marker position={[lat, lon]}/>

        </MapContainer>
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
  }, []); 
  
  
            <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
  */