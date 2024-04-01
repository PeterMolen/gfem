import React, { useState, useEffect } from 'react';
import "./UserProject.css"

function VisaNotionDataID() {
  // State to store fetched data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState('All');
 
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3001/getdatabasebyid';
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: 'fd1181aaffe949c8805924b83b0604e6',
          creatorId: localStorage.getItem('PersonID'),
          status: selectedStatus // Pass selected status to the server
        }),
      };
      try {
        const response = await fetch(url, requestData);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchData();
  }, [selectedStatus]); // Fetch data whenever selectedStatus changes

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    console.log("Aktiv status: " + event.target.value)
  };

  if (isLoading) return <div>Laddar data...</div>;
  if (error) return <div>Ett fel uppstod: {error}</div>;
 
  return (
    <div>
      <h1>Mina projekt</h1>
      <label>
        Status:
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Done">Done</option>
          <option value="Next up">Next up</option>
        </select>
      </label>
      {data.length > 0 ? (
  <ul>
  {data.map((item) => {
  // Check if the selected status matches the item's status
  if (selectedStatus === "All" || item.properties.Status.select.name === selectedStatus) {
    return (
        <div className="project-box">
            <li className="projects" key={item.id}>  
                <strong>Projektnamn:</strong> {item.properties.Projectname.title[0].plain_text} <br />      
                <strong>Status:</strong> {item.properties.Status.select.name} <br />
                <strong>Timmar att lägga:</strong> {item.properties.Hours.number} timmar <br />
               <strong>Lagda timmar:</strong> {item.properties["Worked hours"].rollup.number} timmar <br />
               <strong>Återstående tid:</strong> {item.properties["Hours left"].formula.number} timmar <br />
               <strong>Startdatum:</strong> {item.properties.Timespan.date.start} <br />
               <strong>Slutdatum:</strong> {item.properties.Timespan.date.end}<br /><br/>
            </li>
      </div>
    );
  } else {
    // If the status doesn't match, return null to skip rendering
    return null;
  }
})}
</ul>
      ) : (
        <p>Inga data hittades.</p>
      )}
    </div>
  );
}
 
export default VisaNotionDataID;