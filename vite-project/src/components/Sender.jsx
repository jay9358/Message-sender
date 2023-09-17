// eslint-disable-next-line no-unused-vars
import React, { useState ,useEffect } from 'react';
import "./assets/css/Signup.css"
function Sender() {
    const [inputNumber, setInputData] = useState('');
    const [inputName, setInputName] = useState('');
    const [message, setMessage] = useState('');
    
    const handleInputChange = (e) => {
      setInputData(e.target.value);
    };

    const handleInputNameChange = (e) => {
      setInputName(e.target.value);
    };

      // Set up an interval to periodically check and send SMS messages

    
    const handleSubmit = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputName, data: inputNumber }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setMessage(`Data inserted with ID: ${data.insertedId}`);
        } else {
          setMessage('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    // Set up an interval to periodically check and send SMS messages
  //setInterval(sendSmsAtSpecificTime, 60000);

    return (
     <>
         <div className="Signin_container">
        <h1>React MongoDB Example</h1>
        <div>
          <input type="text" placeholder="Enter name" onChange={handleInputNameChange} required />
        </div>
        <div>
          <input type="number   " placeholder="Enter number" onChange={handleInputChange} required/>
        </div>
        <button type='submit' onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
        </div>
    </>  
      
    );
}

export default Sender