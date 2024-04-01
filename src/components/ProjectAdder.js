import React, { useState } from 'react';

function ProjectAdd() {
  const [data, setData] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newHours, setNewHours] = useState(0);
  const [newTimespanStart, setNewTimespanStart] = useState('');
  const [newTimespanEnd, setNewTimespanEnd] = useState('');

  const handleAddNewProject = () => {
    // felmedelas om ingen skrivs
    if (!newProjectName || !newStatus || !newHours || !newTimespanStart || !newTimespanEnd) {
      alert('Please fill in all fields.');
      return;
    }

    const newProjectData = {
      projectName: newProjectName,
      status: newStatus,
      hours: parseFloat(newHours),
      timespanStart: newTimespanStart,
      timespanEnd: newTimespanEnd,
    };

    // Set loading state here (if implemented)

    fetch('http://localhost:3001/api/add-notion-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProjectData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert('New project added successfully!');
      setData(prevData => [...prevData, data]);
      setNewProjectName('');
      setNewStatus('');
      setNewHours(0);
      setNewTimespanStart('');
      setNewTimespanEnd('');
      window.location.reload();
    })
    .catch(error => {
      alert('Error adding new project: ' + error.message);
    })
    .finally(() => {
      // Reset loading state here (if implemented)
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <select
        type="text"
        placeholder="Status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}>
          <option>Välj status</option>
          <option value="Next Up">Next Up</option>
          <option value="Active">Active</option>
          <option value="Done">Done</option>
        </select>
      <input
        type="number"
        placeholder="Hours"
        value={newHours}
        onChange={(e) => setNewHours(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={newTimespanStart}
        onChange={(e) => setNewTimespanStart(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={newTimespanEnd}
        onChange={(e) => setNewTimespanEnd(e.target.value)}
      />
      <button onClick={handleAddNewProject}>Add New Project</button>
    </div>
  );
}

export default ProjectAdd;
