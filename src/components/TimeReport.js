import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
// Komponenten AddTimereport låter användare skapa nya tidrapporter.
const AddTimereport = () => {
  // State-hanterare för olika delar av formuläret och projektlistan.
  const [projects, setProjects] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  
 
  // useEffect hämtar projektlistan en gång när komponenten laddas.
  useEffect(() => {
    // Axios används för att göra en GET-förfrågan till servern för att hämta projekt.
    axios.get('http://localhost:3001/projects')
      .then(response => {
        // Sätter projects-state med data hämtad från servern.
        setProjects(response.data || []);
      })
      .catch(error => console.error('Kunde inte hämta projekt:', error));
      
      axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data || []);
      })
      .catch(error => console.error('Kunde inte hämta användare:', error));
  }, []);

 

  // handleSubmit körs när formuläret skickas.
  const handleSubmit = (event) => {
    event.preventDefault(); // Förhindrar standardbeteendet för formulärskick (sidomladdning).
   
    
    // Hämtar PrivateId från localStorage.
    // const privateId = localStorage.getItem("PrivateId");
    const person = localStorage.getItem("PersonID")

    // Skickar datan till servern för att skapa en ny tidrapport.
    axios.post('http://localhost:3001/timereports', {
      projectId: selectedProject, // ID för valt projekt.
      hours: parseFloat(hours), // Konverterar string till float för timmar.
      date, // Datum för tidrapporten.
      note, // Anmärkningar/noteringar till tidrapporten.
    //   privateId, // Skickar med PrivateId hämtat från localStorage.
      person // PersonID
    })
    .then(response => alert('Tidrapport tillagd!')) // Visar bekräftelsemeddelande.
    .catch(error => alert('Ett fel uppstod när tidrapporten skulle läggas till.')); // Visar felmeddelande.
  };
 
  // Renderar formuläret med inputfält och dropdown för att skapa en ny tidraport.
  return (
    <div>
    <h1>Rapportera in tid</h1>
    <div className="timereport-container">
    <form onSubmit={handleSubmit} className="timereport-box">
      <div>
        <label>Projekt </label>
        <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
          <option value="">Välj ett projekt</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {/* Loopar genom projektlistan och visar projektnamn i dropdown. */}
              {project.properties.Projectname.title[0].plain_text}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Timmar </label>
        <input type="number" value={hours} onChange={e => setHours(e.target.value)} />
      </div>
      <div>
        <label>Datum </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Anteckning </label>
        <textarea value={note} onChange={e => setNote(e.target.value)}></textarea>
      </div>
      <button type="submit">Lägg till Tidrapport</button>
    </form>
    </div>
    </div>
  );
};
 
export default AddTimereport;