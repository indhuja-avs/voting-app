import React, { useState } from 'react';
import Register from './Register';
import Vote from './Vote';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [shouldVote, setShouldVote] = useState(null);


  const handleLogin = () => {

    // Replace 'your-api-endpoint' with the actual endpoint you want to send the username to
    const endpoint = 'http://ec2-3-82-19-144.compute-1.amazonaws.com:80/login';

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
    <div>
      {shouldVote === null ? (
        <div>
          <label>
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <br></br>
          <button onClick={handleLogin}>Log</button>
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
