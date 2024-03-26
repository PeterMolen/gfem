import React, { useState, useEffect } from 'react';
import NotionTableRow from '../components/projectFetch'; // glöm inte att sätta samma namn som patch och get filen
import ProjectAdd from '../components/ProjectAdder'; // hämtar Post filen
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
      
    })
    .catch(error => {
      console.error('Error updating entry:', error);
    });
  };
  

  return (
    <div>
      <ProjectAdd/>
    <table>
      <thead>
      </thead>
      <tbody>
        {data.map(item => (
          <NotionTableRow key={item.id} item={item} onSave={handleSave} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default App;

