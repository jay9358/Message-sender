// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
<Auth0Provider
    domain="dev-fwltgmzgyggw1kyj.us.auth0.com"
    clientId="YYVUv2IQ5rQFcGbySDVaqJsIQnOF38d9"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
     <App />
  </Auth0Provider>
   
 
)
