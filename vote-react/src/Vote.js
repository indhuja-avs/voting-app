import React, { useState } from "react";

const Vote = (props) => {
    const [isVoted, setisVoted] = useState(null);
    let voteOption = '';
    let message = '';

    const handleOption = (option) => {

    const endpoint = 'http://localhost:80/vote';

    console.log(option)
    // Assuming the server expects JSON data in the request body
    const data = new FormData();
    data.append("option", option);
    data.append("userName", props.userName);
    voteOption = option;
    console.log(voteOption);
    fetch(endpoint, {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server as needed
      console.log(result);
      setisVoted(result.isVoted);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
    }

    if(isVoted){
        if(voteOption === "a")
            message = "You have chosen iPhone";
        else
            message = "You have chosen Android";
    }

    return (
    <div>
     
    <div id="content-container">
      <div id="content-container-center">
        <h3>Iphone vs Android!</h3>
        <button onClick={() => { handleOption("a") }}>Iphone</button>
        <button onClick={() => { handleOption("b") }}>Android</button>
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




// import React, { useState } from "react";

// const Vote = (props) => {
//     const [isVoted, setisVoted] = useState(null);
//     let voteOption = '';
//     let message = '';
//     const endpoint = 'http://localhost:80/vote';

//     const handleOption = (option) => {
//     console.log(option)
//     // Assuming the server expects JSON data in the request body
//     const data = new FormData();
//     data.append("option", option);
//     data.append("userName", props.userName);
//     voteOption = option;

//     fetch(endpoint, {
//       method: 'POST',
//       body: data,
//     })
//     .then(response => response.json())
//     .then(result => {
//       // Handle the response from the server as needed
//       console.log(result);
//       setisVoted(result.isVoted);
//     })
//     .catch(error => {
//       // Handle any errors that occurred during the fetch
//       console.error('Error:', error);
//     });
//     }

//     if(isVoted){
//         if(voteOption === 'a')
//             message = "You have chosen iPhone";
//         else
//             message = "You have chosen Android";
//     }

//     return (
//     <div>
     
//     <div id="content-container">
//       <div id="content-container-center">
//         <h3>Iphone vs Android!</h3>
//         <form id="choice" name='form' method="POST" action="/">
//           <button id="a" type="submit" name="vote" class="a" value="a" onClick={() => handleOption('a')}>iPhone</button>
//           <button id="b" type="submit" name="vote" class="b" value="b" onClick={() => handleOption('b')}>Android</button>
//         </form>
//         <p>{message}</p>
//         <div id="tip">
//           (Tip: you can change your vote)
//         </div>
//       </div>
//     </div>


//     </div>
//     );
// };

// export default Vote;

// import React, { useState } from 'react';
// import Register from './Register';

// const Vote = (props) => {
//   const [userName, setUserName] = useState('');
//   const [shouldVote, setShouldVote] = useState(null);

//   const handleLogin = () => {

//     // Replace 'your-api-endpoint' with the actual endpoint you want to send the username to
//     const endpoint = 'http://localhost:80/vote';

//     // Assuming the server expects JSON data in the request body
//     const data = new FormData();
//     data.append("userName", userName);
//     data.append("option", "a");

//     fetch(endpoint, {
//       method: 'POST',
//       body: data,
//     })
//     .then(response => response.json())
//     .then(result => {
//       // Handle the response from the server as needed
//       console.log(result);
//       setShouldVote(result.shouldVote);
//     })
//     .catch(error => {
//       // Handle any errors that occurred during the fetch
//       console.error('Error:', error);
//     });
//   };

//   const handleRegisterSuccess = () => {
//     setShouldVote(true); // Set shouldVote to true after successful registration
//   };

//     return (
//     <div>
     
//     <div id="content-container">
//       <div id="content-container-center">
//         <h3>Iphone vs Android!</h3>
//         <form id="choice" name='form' method="POST" action="/">
//           <button id="a" type="submit" name="vote" class="a" value="a" onClick={() => handleLogin()}>iPhone</button>
//           <button id="b" type="submit" name="vote" class="b" value="b" onClick={() => handleLogin()}>Android</button>
//         </form>
//         {/* <p>{message}</p> */}
//         <div id="tip">
//           (Tip: you can change your vote)
//         </div>
//       </div>
//     </div>


//     </div>
//     );
// };

// export default Vote;
