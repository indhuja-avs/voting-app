import React, { useState } from 'react';
import Register from './Register';
import Vote from './Vote';
import "./styles.css";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [shouldVote, setShouldVote] = useState(null);


  const handleLogin = () => {

    // Replace 'your-api-endpoint' with the actual endpoint you want to send the username to
    const endpoint = 'http://ec2-54-87-150-40.compute-1.amazonaws.com:80/login';

    // Assuming the server expects JSON data in the request body
    const data = new FormData();
    data.append("userName", userName);

    fetch(endpoint, {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server as needed
      console.log(result);
      setShouldVote(result);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
  };
  
  return (
    <div id='content-container'>
      {shouldVote === null ? (
        <div id='content-form'>
          <h2>Welcome to the Voting App!</h2>
          <label>
            Enter Username
            <br></br>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <br></br>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : shouldVote.shouldVote ? (
        <Vote userName={shouldVote.userName} firstName={shouldVote.firstName} lastName={shouldVote.lastName}/>
      ) : (
        <Register/>
      )}
    </div>
  );
};

export default Login;
