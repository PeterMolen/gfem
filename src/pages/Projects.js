import React from "react";
import UserProjects from "../components/UserProjects"
export default function Home() {
  return (
    <main>
      <h1>Grupp 5 tidsrapportering</h1>
      <p>Startsida</p>
      { <UserProjects /> }
      
    </main>
  );
}
