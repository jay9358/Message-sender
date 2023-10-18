import "./assets/css/Signup.css"
import  { useEffect, useState  } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Paybutton from "./Paybutton"

    
function Signin() {

    const {user} =useAuth0();
  
    const [inputNumber, setInputData] = useState('');
    const [inputName, setInputName] = useState('');
    const [message, setMessage] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const handleInputChange = (e) => {
      setInputData(e.target.value);
    };

    const handleInputNameChange = (e) => {
      setInputName(e.target.value);
    };
    

  
      // Set up an interval to periodically check and send SMS messages


    

    const [flagStatus, setFlagStatus] = useState(true);
    const userName=user.email;
    useEffect(() => {
      const fetchFlagStatus = async () => {
        try {
          console.log(userName);
          const response = await fetch(`https://message-sender-gfmr.vercel.app/api/getFlagStatus?email=${userName}`, {
            method: 'GET',
          });
  
          if (response.status === 200) {
            const data = await response.json();
            setFlagStatus(data.flag);
            setMessage(`SMS on the Way...`);
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchFlagStatus();
    },[userName,paymentCompleted]);

  return (
 
        <div className="Signin_container">
          <div className="user_info">
            <h1>Welcome {user.name},</h1>
            <h2>Points to remember</h2>
            
              <li>You will receive message before 1 hours of Mess timing</li>
              <li>check if you enterned correct details</li>
              <li>Website in trial phase so if any error contact admin  </li>
            
          </div>
            <div className="user_store">
  {  flagStatus ?(<div className="login">
            <div className="form" >

                <p className="field">
                    <i className="fa fa-user"></i>
                    <input type="text"  onChange={handleInputNameChange}  placeholder="Username" required/>
                    
                </p>

                <p className="field">
                    <i className="fa-solid fa-mobile"></i>
                    <input type="number" onChange={handleInputChange} placeholder="Number" required/>

                </p>
                <p className="submit"><Paybutton onPaymentComplete={() => setPaymentCompleted(true)} inputname={inputName} name={user.name} email={user.email} number={inputNumber}></Paybutton></p>
             
               

            </div>
        </div>):( <div style={{ color:"white" ,textAlign:"left",fontSize:"1.5rem"}}>
                      <div className="icons" style={{display:"flex" , alignItems:"center" , gap:"10px"}}>
                        <i className="fa-solid fa-message" style={{fontSize:"2rem"}}></i>
                        <i className="fa-solid fa-arrow-right"></i>
                      
                        <p style={{animation: "slide-in-and-back 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",textShadow:"5px 0px 14px orange"}}>{message}</p>
                      </div>
                  </div> 
        ) 
        }  
    
        </div>
       
        </div>
  
  )
}

export default Signin