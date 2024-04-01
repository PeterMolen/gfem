import React from "react";
import timereport from "../images/timereport.png"
import "../App.css";

export default function Home() {
  return (
    <main>
      <h1>Grupp 5</h1>
      <h2>Tidsrapporteringssystem</h2>
      <img className="timereport-image" src={timereport} />
    </main>
  );
}