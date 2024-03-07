import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotionDataReader = () => {
  const [data, setData] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState('');

  const fetchDataFromNotion = () => {
    const payload = {
      // Lägg till payload-data om det behövs.
    };

    axios.post('http://localhost:3001/api/notion', payload)
      .then(response => {
        setData(response.data);
        console.log('Data hämtad från Notion:', response.data);
      })
      .catch(error => {
        console.error('Fel vid hämtning från Notion:', error);
        // Visa ett felmeddelande för användaren om anropet misslyckas.
        // Du kan använda en annan state-variabel för att hålla reda på felstatus.
      });
  };

  useEffect(() => {
    fetchDataFromNotion();
  }, []);

  const handleProjectNameChange = (e, projectId) => {
    const newData = data.results.map(page => {
      if (page.id === projectId) {
        return {
          ...page,
          properties: {
            ...page.properties,
            Projectname: { title: [{ plain_text: e.target.value }] }
          }
        };
      }
      return page;
    });
    setData({ ...data, results: newData });
  };

  const handleProjectStatusChange = (e, projectId) => {
    const newData = data.results.map(page => {
      if (page.id === projectId) {
        return {
          ...page,
          properties: {
            ...page.properties,
            Status: { select: { name: e.target.value } }
          }
        };
      }
      return page;
    });
    setData({ ...data, results: newData });
  };

  const addNewProject = async () => {
    try {
      const payload = {
        projectName: newProjectName,
        projectStatus: newProjectStatus
      };
      await axios.post('https://api.notion.com/v1/databases/fd1181aaffe949c8805924b83b0604e6/query', payload);
      console.log('Nytt projekt tillagt:', newProjectName);
      // Uppdatera listan med projekt efter att det nya projektet har lagts till
      fetchDataFromNotion();
    } catch (error) {
      console.error('Fel vid tillägg av nytt projekt:', error);
    }
  };

  if (!data || !Array.isArray(data?.results)) {
    return <p>Laddar data eller ingen data att visa...</p>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Ange projektnamn"
        />
        <select value={newProjectStatus} onChange={(e) => setNewProjectStatus(e.target.value)}>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
          <option value="On hold">On hold</option>
        </select>
        <button onClick={addNewProject}>Lägg till projekt</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Projektnamn</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((page, index) => (
            <tr key={page.id}>
              <td>
                <input
                  type="text"
                  value={page.properties.Projectname.title[0]?.plain_text}
                  onChange={(e) => handleProjectNameChange(e, page.id)}
                />
              </td>
              <td>
                <select
                  value={page.properties.Status.select.name}
                  onChange={(e) => handleProjectStatusChange(e, page.id)}
                >
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On hold">On hold</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotionDataReader;
