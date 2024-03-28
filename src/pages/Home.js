import React, { useState } from "react";
import NotionLogin from '../components/NotionLogin';


export default function Home() {
  return (
    <main>
      <h1>Grupp 5 tidsrapportering</h1>
      <p>Startsida</p>
      {<NotionLogin/> }
    </main>
  );
}