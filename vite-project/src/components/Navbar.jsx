import  { useState, useEffect } from 'react';
import './assets/css/Navbar.css';
import {Link} from "react-router-dom"
import LoginButton from './Login';
import { useAuth0 } from "@auth0/auth0-react";
function Navbar() {
  const { isAuthenticated } = useAuth0();
  const [icon, setIcon] = useState('bars');
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  
  const handleIconClick = () => {
    if (icon === 'bars') {
      setIcon('xmark');
      setNavMenuOpen(true);
    } else {
      setIcon('bars');
      setNavMenuOpen(false);
    }
  };

  const closeDropdownMenu = () => {
    // Implement this function if needed
  };

  const setAriaExpandedFalse = () => {
    // Implement this function if needed
  };

  useEffect(() => {
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const dropdowns = document.querySelectorAll('.dropdown');
  
    const links = document.querySelectorAll('.dropdown a');

    function toggleHamburger() {
      setNavMenuOpen(!isNavMenuOpen);
    }

    dropdownBtns.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        const dropdownElement = document.getElementById(dropdownIndex);

        dropdownElement.classList.toggle('active');
        dropdowns.forEach((drop) => {
          if (drop.id !== btn.dataset['dropdown']) {
            drop.classList.remove('active');
          }
        });

        e.stopPropagation();
        btn.setAttribute(
          'aria-expanded',
          btn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
      });
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        closeDropdownMenu();
        setAriaExpandedFalse();
        toggleHamburger();
      });
    });

    document.documentElement.addEventListener('click', () => {
      closeDropdownMenu();
      setAriaExpandedFalse();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdownMenu();
        setAriaExpandedFalse();
      }
    });

    return () => {
      // Cleanup event listeners here if needed
    };
  }, [isNavMenuOpen]); // Added isNavMenuOpen to dependency array

  return (
    <>
      <header id="nav-menu" aria-label="navigation bar">
        <div className="container sticky">
          <div className="nav-start">
            <nav className={`menu ${isNavMenuOpen ? 'show' : ''}`}>
              <ul className="menu-bar">
                <li>
                  <Link
                    to="/"
                    className="nav-link dropdown-btn"
                    data-dropdown="dropdown2"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="discover"
                  >
                    Home
                    <i className="bx bx-chevron-down" aria-hidden="true"></i>
                  </Link>
                
                </li>
                <li>
                  {isAuthenticated ? (<a className="nav-link" href=''>Profile</a> ) : (   <a className="nav-link" href="/">
                    Features
                  </a>)}
               
                </li>
                <li>
                {isAuthenticated ? (<a className="nav-link" href=''>Pricing</a>) : (   <a className="nav-link" href="/">
                    Contact
                  </a>)}
                </li>
                <li>
               <a className="nav-link" href="/">
                    Contact Me
                  </a>
                </li>
                <li>
                  <button  id="hamburger"
              aria-label="hamburger"
              onClick={handleIconClick}
              aria-haspopup="true"
              aria-expanded={isNavMenuOpen ? 'true' : 'false'}><LoginButton></LoginButton></button>
                
                </li>
              </ul>
            </nav>
          </div>
          <div className="nav-end">
            <LoginButton></LoginButton>
            <button
              id="hamburger"
              aria-label="hamburger"
              onClick={handleIconClick}
              aria-haspopup="true"
              aria-expanded={isNavMenuOpen ? 'true' : 'false'}
            >
              <i className={`fa-solid fa-${icon}`}></i>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
