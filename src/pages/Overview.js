import React, {useEffect, useState} from "react";
import EditProjects from "../components/EditProjects"


const Overview = () => {
  const [rollValue, setRollValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const rollValueFromStorage = localStorage.getItem('Roll');
    setRollValue(rollValueFromStorage);
  
    const userName = localStorage.getItem('UserName');
    const privateId = localStorage.getItem('PrivateId');
    if (userName && privateId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        rollValue === 'Chef' || rollValue === 'Produktägare' ? (
          <EditProjects />
        ) : (
          <div>
          <h2>Åtkomst nekad.</h2>
          <h3>Endast chef och produktägare har tillgång till denna sida</h3>
          </div>
        )
      ) : (
        <h2>Vänligen logga in för att se denna sida</h2>
      )}
    </div>
  );
};

export default Overview;
