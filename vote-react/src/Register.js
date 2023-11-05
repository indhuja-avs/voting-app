import React, { useState } from 'react';
import Vote from './Vote';

const Register = ({ onRegister }) => {
  const [userName, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldVote, setShouldVote] = useState(false);

  const handleRegister = () => {

    const endpoint = 'http://localhost:80/register';

    // Assuming the server expects JSON data in the request body
    const data = new FormData();
    data.append("userName", userName);
    data.append("firstName", firstName);
    data.append("lastName", lastName);

    fetch(endpoint, {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server as needed
      console.log(result);
      setShouldVote(result.shouldVote);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });

    // Call the onSubmit function passed from the parent component (Login)
    console.log('Registering user:', { userName, firstName, lastName });
    setRegistrationSuccess(true);
    setErrorMessage('');

    // Call the onRegister function passed from the parent component
    onRegister();
  };

  const handleUsernameChange = (e) => {
    // Handle username change if needed
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    // Handle first name change if needed
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    // Handle last name change if needed
    setLastName(e.target.value);
  };

  if (registrationSuccess) {
    // If registration is successful, render the Vote component
    if(shouldVote){
      return <Vote userName={userName}/>;
    }
    else{
      setErrorMessage('error!!');
      return;
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={handleUsernameChange}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
