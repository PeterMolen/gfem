
import React, { useEffect, useState } from 'react';

const Work = () => {
  const [timereports, setTimereports] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [personNames, setPersonNames] = useState([]);

  useEffect(() => {
    const fetchTimereports = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/get-timereports');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTimereports(data);
      } catch (error) {
        console.error('Error fetching timereports:', error);
      }
    };

    fetchTimereports();
  }, []);

  
  const fetchProjectData = async (projectId) => {
    try {
      const projectResponse = await fetch(`http://localhost:3001/api/get-project/${projectId}`);
      if (!projectResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const projectData = await projectResponse.json();
      return projectData.title.name; // är det här rätt?
    } catch (error) {
      console.error('Error fetching project data:', error);
      return;
    }
  };

  const fetchPersonData = async (personId) => {
    try {
      const personResponse = await fetch(`http://localhost:3001/api/get-people/${personId}`);
      if (!personResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const personData = await personResponse.json();
      return personData.title.name; // det är säkert den här
    } catch (error) {
      console.error('Error fetching person data:', error);
      return ; 
    }
  };

  useEffect(() => {
    // Fetch project names for all timereports
    const fetchProjectNames = async () => {
      const names = await Promise.all(
        timereports.map(report => fetchProjectData(report.properties.Project.relation[0].id))
      );
      setProjectNames(names);
    };

    // Fetch person names for all timereports
    const fetchPersonNames = async () => {
      const names = await Promise.all(
        timereports.map(report => fetchPersonData(report.properties.Person.relation[0].id))
      );
      setPersonNames(names);
    };

    fetchProjectNames();
    fetchPersonNames();
  }, [timereports]);

  return (
    <div>
      <h2>Timereports</h2>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Person</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {timereports.map((report, index) => (
            <tr key={report.id}>
              <td>{projectNames[index]}</td>
              <td>{personNames[index]}</td>
              <td>{report.properties.Hours.number ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Work;
