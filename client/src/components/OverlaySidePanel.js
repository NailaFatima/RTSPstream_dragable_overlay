import React, { useState } from 'react';
import OverlayForm from './OverlayForm';
import OverlayList from './OverlayList';
import './OverlaySidePanel.css';

const OverlaySidePanel = ({ overlays, onCreateOverlay, onUpdateOverlay, onDeleteOverlay, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingOverlay, setEditingOverlay] = useState(null);

  const handleCreateOverlay = async (overlayData) => {
    try {
      await onCreateOverlay(overlayData);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create overlay:', error);
    }
  };

  const handleEditOverlay = (overlay) => {
    setEditingOverlay(overlay);
    setShowForm(true);
  };

  const handleUpdateOverlay = async (overlayData) => {
    try {
      await onUpdateOverlay(editingOverlay._id, overlayData);
      setShowForm(false);
      setEditingOverlay(null);
    } catch (error) {
      console.error('Failed to update overlay:', error);
    }
  };

  const handleDeleteOverlay = async (overlayId) => {
    if (window.confirm('Are you sure you want to delete this overlay?')) {
      try {
        await onDeleteOverlay(overlayId);
      } catch (error) {
        console.error('Failed to delete overlay:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOverlay(null);
  };

  return (
    <div className="overlay-side-panel">
      <div className="panel-overlay" onClick={onClose}></div>
      <div className="panel-content">
        <div className="panel-header">
          <h3>Overlay Management</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="panel-body">
          {showForm ? (
            <OverlayForm
              overlay={editingOverlay}
              onSubmit={editingOverlay ? handleUpdateOverlay : handleCreateOverlay}
              onCancel={handleCloseForm}
            />
          ) : (
            <>
              <div className="panel-actions">
                <button
                  className="btn btn-primary add-overlay-btn"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Add Overlay
                </button>
              </div>
              
              <OverlayList
                overlays={overlays}
                onEditOverlay={handleEditOverlay}
                onDeleteOverlay={handleDeleteOverlay}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverlaySidePanel;

