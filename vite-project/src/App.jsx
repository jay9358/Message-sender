import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Signin from './components/Signin';
import Works from './components/Works';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import Profile  from './components/Profile';
function App() {
  return (
    <Router>
      <Navbar />
      <Content />
      <Contact></Contact>
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
      <Route exact path='/pricing' element={<Pricing></Pricing>}/>
      <Route exact path="/profile" element={<Profile></Profile>}></Route>
      
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
