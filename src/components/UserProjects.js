import React, { useState, useEffect } from 'react';
 
function VisaNotionDataID() {
  // State to store fetched data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3001/getdatabasebyid'; // URL to your Node.js server
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: 'fd1181aaffe949c8805924b83b0604e6', // Replace with your actual database ID
          creatorId: localStorage.getItem('PersonID'), // Replace with the actual creator ID
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
  }, []); // Dependency array remains empty to run only once at mount
  if (isLoading) return <div>Laddar data...</div>;
  if (error) return <div>Ett fel uppstod: {error}</div>;
 // Helper function for extracting property values
 const extractValue = (property) => {
  switch (property.type) {
    case 'number':
      return property.number;
    case 'select':
      return property.select.name;
    case 'rich_text':
      return property.rich_text.map(text => text.plain_text).join('');
    case 'date':
      return `${property.date.start} to ${property.date.end}`;
    case 'title':
      return property.title.map(text => text.plain_text).join('');
    case 'formula':
      // Assuming the formula always results in a number for "Hours left"
      // Adjust this logic if your formula can result in other types
      return property.formula.number;
    default:
      return 'N/A'; // Adjust based on your needs
  }
};
 
 
  return (
    <div>
      <h1>Mina projekt</h1>
      {data.length > 0 ? (
  <ul>
  {data.map((item) => (
    <li key={item.id}>
      <strong>Projektnamn:</strong> {item.properties.Projectname.title[0].plain_text} <br />      
      <strong>Status:</strong> {item.properties.Status.select.name} <br />
      <strong>Timmar att lägga:</strong> {item.properties.Hours.number} <br />
      <strong>Lagda timmar:</strong> {item.properties["Worked hours"].rollup.number} <br />
      <strong>Återstående tid:</strong> {item.properties['Hours left'].formula.number} <br />
      <strong>Startdatum:</strong> {item.properties.Timespan.date.start} <br />
      <strong>Slutdatum:</strong> {item.properties.Timespan.date.end}<br /><br/>

    </li>
  ))}
</ul>
      ) : (
        <p>Inga data hittades.</p>
      )}
    </div>
  );
}
 
export default VisaNotionDataID;