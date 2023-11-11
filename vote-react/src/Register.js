import React, { useState } from 'react';
import Vote from './Vote';

const Register = () => {
  const [userName, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [shouldVote, setShouldVote] = useState(false);

  const handleRegister = () => {

    const endpoint = 'http://ec2-3-82-19-144.compute-1.amazonaws.com:80/register';

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
      console.log(result);
      if(result.shouldVote){
        setErrorMessage('success');
      }
      else{
        setErrorMessage('error!!');
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
  };

  if (errorMessage === 'success') {
    return <Vote userName={userName} firstName={firstName} lastName={lastName}/>;
  }

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

  // if (registrationSuccess) {
  //   setRegistrationSuccess(false)
  //   console.log(shouldVote);
  //   // If registration is successful, render the Vote component
  //   if(shouldVote){
  //     return <Vote userName={userName}/>;
  //   }
  //   else{
  //     setErrorMessage('error!!');
  //     return;
  //   }
  // }

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
