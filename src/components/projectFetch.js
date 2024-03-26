
  // NotionTableRow.js
  import React, { useState } from 'react';

  const NotionTableRow = ({ item, onSave }) => {
    const [projectName, setProjectName] = useState(item.properties.Projectname.title[0]?.plain_text ?? '');
    const [status, setStatus] = useState(item.properties['Status']?.select?.name ?? '');
    const [hours, setHours] = useState(item.properties['Hours']?.number ?? 0);
    const workedHours = item.properties['Worked hours']?.rollup?.number ?? 0;
    const hoursLeft = item.properties['Hours left']?.formula?.number ?? 0;
    const [timespan, setTimespan] = useState({
      start: item.properties.Timespan.date.start,
      end: item.properties.Timespan.date.end,
    });
  
  
  
    const handleRowSave = () => {
      const showProperties = {
        'Worked hours':{
          rollup:{
            number: workedHours
          }
        },
        'Hours left':{
          formula:{
            number: hoursLeft
          }
        }
      }
      const updatedProperties = {
        Projectname: {
          title: [
            {
              text: {
                content: projectName,
              },
            },
          ],
        },
        Status: {
          select: {
            name: status,
          },
        },
        Hours: {
          number: parseFloat(hours), 
        },
        Timespan: {
          date: {
            start: timespan.start,
            end: timespan.end,
          },
        },
      
      };
      console.log('Request Body:', JSON.stringify(updatedProperties, showProperties));
      onSave(item.id, updatedProperties, showProperties);
    };
    
  
  console.log('worked hours:',workedHours)
  console.log('Item object:', item);
  
    return (
      <tr>
        <td><input value={projectName} onChange={(e) => setProjectName(e.target.value)} /></td>
        <td>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
              <option value="On hold">On hold</option>
          </select>
        </td>
        <td><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} /></td>
        <td><input type="text" value={workedHours} readOnly /></td> 
        <td><input type="text" value={hoursLeft} readOnly /></td>
        <td>
          <input type="date" value={timespan.start} onChange={(e) => setTimespan({ ...timespan, start: e.target.value })} />
          -
          <input type="date" value={timespan.end} onChange={(e) => setTimespan({ ...timespan, end: e.target.value })} />
        </td>
        <td><button onClick={handleRowSave}>Save</button></td>
      </tr>
    );
  };
  
  export default NotionTableRow;