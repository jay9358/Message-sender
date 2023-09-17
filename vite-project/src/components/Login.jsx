/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    
  const { loginWithRedirect } = useAuth0();
    // Move the destructuring assignment here
    const { isAuthenticated, isLoading } = useAuth0();
    const { logout } = useAuth0();
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  


  return(<>
    {isAuthenticated ? (<button className="btn btn-primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    Log Out
  </button>):
    (<button className="btn btn-primary" onClick={() => loginWithRedirect()}>Log In</button>)}
 </> );
};

export default LoginButton;