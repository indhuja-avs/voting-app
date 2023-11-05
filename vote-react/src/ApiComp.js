// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
    
      if (lastName.length > 0) {
        data.append("userName", lastName);
      data.append("option", 'b');
      } else {
        data.append("userName", firstName);
        data.append("option", 'a');
      }
      const response = await fetch('http://localhost:80/vote', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log('Data sent successfully');
        console.log(response.json());
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;


