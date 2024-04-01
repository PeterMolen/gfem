import React, { useState, useEffect } from 'react';
import NotionTableRow from '../components/projectFetch'; // glöm inte att sätta samma namn som patch och get filen
import ProjectAdder from '../components/ProjectAdder'; // hämtar Post filen

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/notion')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSave = (pageId, updatedProperties) => {
    console.log('saving data ...')
    fetch('http://localhost:3001/api/edit-notion-entry', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify({ pageId, updatedProperties })
    })
    .then(response => response.json())
    .then(data => {
      alert('saved successfully!');
      console.log('Entry updated:', data);
      window.location.reload();
      
    })
    .catch(error => {
      console.error('Error updating entry:', error);
    });
  };
  

  return (
    
    <div>
        <h2>Lägg till projekt</h2>
      <ProjectAdder/>
      <br/>
      <h2>Redigera projekt</h2>
      <div className="table-container">
    <table>
    <tr>
          <th>Projektnamn</th>
          <th>Status</th>
          <th>Totalt antal timmar</th>
          <th>Arbetade timmar</th>
          <th>Återstående timmar</th>
          <th>Startdatum - Slutdatum</th>
        </tr>
      <tbody>
        {data.map(item => (
          <NotionTableRow key={item.id} item={item} onSave={handleSave} />
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}

export default App;