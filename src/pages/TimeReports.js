import React, { useEffect, useState } from "react";
import Timereport from '../components/TimeReport';

const TimeReports = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kontrollera om användaren är inloggad
    const userName = localStorage.getItem('UserName');
    const privateId = localStorage.getItem('PrivateId');
    if (userName && privateId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Timereport />
      ) : (
        <h2>Vänligen logga in för att se denna sida</h2>
      )}
    </div>
  );
};

export default TimeReports;