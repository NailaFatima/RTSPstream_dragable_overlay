import React from 'react';
import './OverlayList.css';

const OverlayList = ({ overlays, onEditOverlay, onDeleteOverlay }) => {
  if (!overlays || !Array.isArray(overlays) || overlays.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎨</div>
        <h3>No Overlays Yet</h3>
        <p>Create your first overlay to get started with customizing your stream</p>
      </div>
    );
  }

  return (
    <div className="overlay-list">
      <div className="list-header">
        <h3>Your Overlays ({overlays ? overlays.length : 0})</h3>
      </div>
      
      <div className="overlay-grid">
        {overlays.map((overlay) => (
          <div key={overlay._id} className="overlay-card">
            <div className="overlay-preview">
              {overlay.type === 'image' ? (
                <div className="image-preview">
                  <img
                    src={overlay.content}
                    alt="Overlay preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-error">
                    <span>📷</span>
                    <span>Image not found</span>
                  </div>
                </div>
              ) : (
                <div
                  className="text-preview"
                  style={{
                    fontSize: Math.min(overlay.style.fontSize, 20),
                    color: overlay.style.color,
                    backgroundColor: overlay.style.backgroundColor,
                    opacity: overlay.style.opacity
                  }}
                >
                  {overlay.content || 'Text overlay'}
                </div>
              )}
            </div>
            
            <div className="overlay-info">
              <div className="overlay-meta">
                <span className="overlay-type">
                  {overlay.type === 'text' ? '📝' : '🖼️'} {overlay.type}
                </span>
                <span className="overlay-size">
                  {overlay.size.width} × {overlay.size.height}
                </span>
              </div>
              
              <div className="overlay-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEditOverlay(overlay)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteOverlay(overlay._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverlayList;
