import React, { useState } from "react";
import "./styles.css";

const Vote = (props) => {
    const [message, setMessage] = useState('');
    let { userName, firstName, lastName } = props;
    const handleOption = (option) => {

    const endpoint = 'http://ec2-54-87-150-40.compute-1.amazonaws.com:80/vote';

    // Assuming the server expects JSON data in the request body
    const data = new FormData();
    data.append("option", option);
    data.append("userName", userName);
    fetch(endpoint, {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server as needed
      console.log(result);
        if (option === 'a') 
            setMessage("You have chosen iPhone");
        else
            setMessage("You have chosen Android");
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
    }

    return (
    <div>
    <div id="content-container">
      <div id="content-form">
        <h2>Welcome {firstName} {lastName}</h2>
        <h3>iPhone vs Android!</h3>
        <button onClick={() => { handleOption('a') }}>iPhone</button>
        <button onClick={() => { handleOption('b') }}>Android</button>
        <p>{message}</p>
        <div id="tip">
          (Tip: you can change your vote)
        </div>
      </div>
    </div>

    </div>
    );
};

export default Vote;
