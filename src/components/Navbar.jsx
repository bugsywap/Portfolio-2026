import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled glass' : ''}`}>
      <div className="nav-content">
        <div className="logo cursor-pointer text-gradient" onClick={() => scrollTo('hero')}>
          Gabe.
        </div>
        <ul className="nav-links">
          <li onClick={() => scrollTo('about')}>About</li>
          <li onClick={() => scrollTo('skills')}>Skills</li>
          <li onClick={() => scrollTo('projects')}>Projects</li>
          <li onClick={() => toggleTheme()} className="theme-toggle" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </li>
          <li onClick={() => scrollTo('contact')} className="contact-btn">Contact Me</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
