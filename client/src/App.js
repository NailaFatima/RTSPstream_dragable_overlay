import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OverlayManager from './components/OverlayManager';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [overlays, setOverlays] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await fetch('/api/overlays');
      const data = await response.json();
      setOverlays(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching overlays:', error);
      setOverlays([]);
    }
  };

  const handleCreateOverlay = async (overlayData) => {
    try {
      const response = await fetch('/api/overlays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(overlayData),
      });
      const newOverlay = await response.json();
      setOverlays(prev => [...(Array.isArray(prev) ? prev : []), newOverlay]);
      return newOverlay;
    } catch (error) {
      console.error('Error creating overlay:', error);
      throw error;
    }
  };

  const handleUpdateOverlay = async (id, overlayData) => {
    try {
      const response = await fetch(`/api/overlays/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(overlayData),
      });
      const updatedOverlay = await response.json();
      setOverlays(prev => (Array.isArray(prev) ? prev : []).map(overlay => 
        overlay._id === id ? updatedOverlay : overlay
      ));
      return updatedOverlay;
    } catch (error) {
      console.error('Error updating overlay:', error);
      throw error;
    }
  };

  const handleDeleteOverlay = async (id) => {
    try {
      await fetch(`/api/overlays/${id}`, {
        method: 'DELETE',
      });
      setOverlays(prev => (Array.isArray(prev) ? prev : []).filter(overlay => overlay._id !== id));
    } catch (error) {
      console.error('Error deleting overlay:', error);
      throw error;
    }
  };

  return (
    <div className="App">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      <main className="main-content">
        {currentView === 'home' && (
          <Hero 
            streamUrl={streamUrl}
            setStreamUrl={setStreamUrl}
            overlays={overlays}
            onUpdateOverlay={handleUpdateOverlay}
            onCreateOverlay={handleCreateOverlay}
            onDeleteOverlay={handleDeleteOverlay}
          />
        )}
        
        {currentView === 'overlays' && (
          <OverlayManager
            overlays={overlays}
            onCreateOverlay={handleCreateOverlay}
            onUpdateOverlay={handleUpdateOverlay}
            onDeleteOverlay={handleDeleteOverlay}
          />
        )}
        
        {currentView === 'api-docs' && (
          <div className="api-docs">
            <div className="glass container">
              <h2>API Documentation</h2>
              <div className="api-section">
                <h3>Overlay Endpoints</h3>
                <div className="endpoint">
                  <code>GET /api/overlays</code>
                  <p>Retrieve all overlays</p>
                </div>
                <div className="endpoint">
                  <code>POST /api/overlays</code>
                  <p>Create a new overlay</p>
                </div>
                <div className="endpoint">
                  <code>PUT /api/overlays/:id</code>
                  <p>Update an existing overlay</p>
                </div>
                <div className="endpoint">
                  <code>DELETE /api/overlays/:id</code>
                  <p>Delete an overlay</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'get-started' && (
          <div className="get-started">
            <div className="glass container">
              <h2>Get Started</h2>
              <div className="steps">
                <div className="step">
                  <h3>1. Enter RTSP URL</h3>
                  <p>Input your RTSP stream URL in the video player section</p>
                </div>
                <div className="step">
                  <h3>2. Add Overlays</h3>
                  <p>Click the "Add Overlay" button to create text or image overlays</p>
                </div>
                <div className="step">
                  <h3>3. Customize</h3>
                  <p>Drag and resize overlays to position them perfectly</p>
                </div>
                <div className="step">
                  <h3>4. Save & Stream</h3>
                  <p>Your overlays are automatically saved and will appear on your stream</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
