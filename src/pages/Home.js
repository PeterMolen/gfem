import React, { useState } from "react";

import NotionLogin from "../components/NotionLogin";
//import NotionLogin2 from "../components/NotionLogin2";

export default function Home() {
  return (
    <main>
      <h1>Grupp 5 tidsrapportering</h1>
      <p>Startsida</p>
      {<NotionLogin/> }
      
    </main>
  );
}