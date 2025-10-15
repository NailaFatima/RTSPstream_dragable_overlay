import React, { useState } from 'react';
import OverlayForm from './OverlayForm';
import OverlayList from './OverlayList';
import './OverlayManager.css';

const OverlayManager = ({ overlays, onCreateOverlay, onUpdateOverlay, onDeleteOverlay }) => {
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
    <div className="overlay-manager">
      <div className="overlay-manager-container">
        <div className="overlay-manager-header">
          <h2>Overlay Management</h2>
          <button
            className="btn btn-primary add-overlay-btn"
            onClick={() => setShowForm(true)}
          >
            ➕ Add Overlay
          </button>
        </div>

        <div className="overlay-manager-content">
          <OverlayList
            overlays={overlays}
            onEditOverlay={handleEditOverlay}
            onDeleteOverlay={handleDeleteOverlay}
          />
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={handleCloseForm}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <OverlayForm
                overlay={editingOverlay}
                onSubmit={editingOverlay ? handleUpdateOverlay : handleCreateOverlay}
                onCancel={handleCloseForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverlayManager;

