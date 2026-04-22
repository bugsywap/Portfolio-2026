import React, { useEffect, useState } from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';

const roles = ['Web Developer', 'Graphic Designer', 'Lead Developer', 'Multimedia Artist'];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="hero-content animate-on-scroll">
        <h2 className="greeting">Hi! I'm Gabe!</h2>
        <h1 className="main-title">
          I build premium digital experiences as a <br/>
          <span className="role-text text-gradient">{roles[currentRole]}</span>
        </h1>
        <p className="hero-subtitle stagger-1 animate-on-scroll">
          Specializing in impactful logos, brand identities, and seamless web applications.
        </p>
        <div className="hero-actions stagger-2 animate-on-scroll">
          <button className="primary-btn" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
