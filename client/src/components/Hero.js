import React, { useState, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import OverlayRenderer from './OverlayRenderer';
import OverlaySidePanel from './OverlaySidePanel';
import './Hero.css';

const Hero = ({ streamUrl, setStreamUrl, overlays, onUpdateOverlay, onCreateOverlay, onDeleteOverlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showUrlInput, setShowUrlInput] = useState(!streamUrl);
  const [showOverlayPanel, setShowOverlayPanel] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('streamUrl');
    if (url) {
      setStreamUrl(url);
      setShowUrlInput(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">
            Professional Live Streaming
            <span className="hero-subtitle">with Custom Overlays</span>
          </h2>
          
          <div className="video-section">
            <div className="video-container">
              {showUrlInput ? (
                <div className="url-input-container">
                  <form onSubmit={handleUrlSubmit} className="url-form">
                    <h3>Enter Your RTSP Stream URL</h3>
                    <input
                      type="url"
                      name="streamUrl"
                      placeholder="rtsp://your-stream-url"
                      className="input"
                      value="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Load Stream
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <VideoPlayer
                    ref={videoRef}
                    streamUrl={streamUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  
                  <OverlayRenderer
                    overlays={overlays}
                    onUpdateOverlay={onUpdateOverlay}
                  />
                  
                  <div className="video-controls">
                    <button
                      onClick={handlePlayPause}
                      className="btn btn-secondary control-btn"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    <div className="volume-control">
                      <span>🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                      />
                    </div>
                    
                    <button
                      onClick={() => setShowUrlInput(true)}
                      className="btn btn-secondary"
                    >
                      Change Stream
                    </button>
                    
                    <button
                      onClick={() => setShowOverlayPanel(!showOverlayPanel)}
                      className="btn btn-primary"
                    >
                      🎨 Overlays
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Overlay Side Panel */}
            {showOverlayPanel && (
              <OverlaySidePanel
                overlays={overlays}
                onCreateOverlay={onCreateOverlay}
                onUpdateOverlay={onUpdateOverlay}
                onDeleteOverlay={onDeleteOverlay}
                onClose={() => setShowOverlayPanel(false)}
              />
            )}
          </div>
          
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">🎥</div>
              <h4>RTSP Support</h4>
              <p>Stream directly from RTSP cameras and sources</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <h4>Custom Overlays</h4>
              <p>Add text, logos, and graphics to your stream</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h4>Real-time</h4>
              <p>Live overlay management and positioning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
