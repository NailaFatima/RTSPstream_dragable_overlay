import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import './OverlayRenderer.css';

const OverlayRenderer = ({ overlays, onUpdateOverlay }) => {
  const [selectedOverlay, setSelectedOverlay] = useState(null);

  const handleDrag = (overlayId, data) => {
    const updatedOverlay = {
      position: { x: data.x, y: data.y }
    };
    onUpdateOverlay(overlayId, updatedOverlay);
  };

  const handleResize = (overlayId, size) => {
    const updatedOverlay = {
      size: { width: size.width, height: size.height }
    };
    onUpdateOverlay(overlayId, updatedOverlay);
  };

  const renderOverlay = (overlay) => {
    if (!overlay) return null;

    if (overlay.type === 'image') {
      return (
        <img
          src={overlay.content}
          alt="Overlay"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }

    return (
      <span style={{ textAlign: 'center', width: '100%' }}>
        {overlay.content || 'Text overlay'}
      </span>
    );
  };

  return (
    <div className="overlay-container">
      {overlays && Array.isArray(overlays) && overlays.map((overlay) => (
        <Draggable
          key={overlay._id}
          position={{ 
            x: overlay.position?.x || 0, 
            y: overlay.position?.y || 0 
          }}
          onDrag={(e, data) => handleDrag(overlay._id, data)}
          onStart={() => setSelectedOverlay(overlay._id)}
          onStop={() => setSelectedOverlay(null)}
        >
          <div
            className={`overlay-item ${selectedOverlay === overlay._id ? 'selected' : ''}`}
            style={{
              width: overlay.size?.width || 200,
              height: overlay.size?.height || 50,
              fontSize: overlay.style?.fontSize || 16,
              color: overlay.style?.color || '#ffffff',
              backgroundColor: overlay.style?.backgroundColor || 'transparent',
              opacity: overlay.style?.opacity || 1
            }}
            onClick={() => setSelectedOverlay(overlay._id)}
          >
            <Resizable
              width={overlay.size?.width || 200}
              height={overlay.size?.height || 50}
              onResize={(e, { size }) => handleResize(overlay._id, size)}
              minConstraints={[50, 20]}
              maxConstraints={[800, 400]}
            >
              <div style={{ width: '100%', height: '100%' }}>
                {renderOverlay(overlay)}
              </div>
            </Resizable>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default OverlayRenderer;
