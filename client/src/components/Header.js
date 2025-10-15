import React from 'react';
import './Header.css';

const Header = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'overlays', label: 'Overlays' },
    { id: 'api-docs', label: 'API Docs' },
    { id: 'get-started', label: 'Get Started' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>StreamView</h1>
          <span className="tagline">Live Stream Overlays</span>
        </div>
        
        <nav className="nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

