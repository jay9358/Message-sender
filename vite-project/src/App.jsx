import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Signin from './components/Signin';
import Works from './components/Works';

function App() {
  return (
    <Router>
      <Navbar />
      <Content />
    </Router>
  );
}

const Content = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <Route exact path="/" element={<Signin />} />
      ) : (
        <Route exact path="/" element={<Main />} />
      )}
      <Route exact path="/Signin" element={<Signin />} />
    </Routes>
  );
};

const Main = ()=>{
  return(
    <>
      <Intro></Intro>
      <Works></Works>
    </>
  );
}

export default App;
