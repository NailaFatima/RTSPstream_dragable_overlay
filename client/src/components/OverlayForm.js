import React, { useState, useEffect } from 'react';
import './OverlayForm.css';

const OverlayForm = ({ overlay, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'text',
    content: '',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 50 },
    style: {
      fontSize: 16,
      color: '#ffffff',
      backgroundColor: 'transparent',
      opacity: 1
    }
  });

  useEffect(() => {
    if (overlay) {
      setFormData({
        type: overlay.type,
        content: overlay.content,
        position: overlay.position,
        size: overlay.size,
        style: overlay.style
      });
    }
  }, [overlay]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? parseFloat(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="overlay-form">
      <div className="form-header">
        <h3>{overlay ? 'Edit Overlay' : 'Create New Overlay'}</h3>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Overlay Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="input"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            {formData.type === 'text' ? 'Text Content' : 'Image URL'}
          </label>
          {formData.type === 'text' ? (
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your text..."
              rows="3"
              required
            />
          ) : (
            <input
              type="url"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="input"
              placeholder="https://example.com/image.png"
              required
            />
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Position X</label>
            <input
              type="number"
              name="position.x"
              value={formData.position.x}
              onChange={handleInputChange}
              className="input"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Position Y</label>
            <input
              type="number"
              name="position.y"
              value={formData.position.y}
              onChange={handleInputChange}
              className="input"
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Width</label>
            <input
              type="number"
              name="size.width"
              value={formData.size.width}
              onChange={handleInputChange}
              className="input"
              min="50"
            />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="number"
              name="size.height"
              value={formData.size.height}
              onChange={handleInputChange}
              className="input"
              min="20"
            />
          </div>
        </div>

        {formData.type === 'text' && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Font Size</label>
                <input
                  type="number"
                  name="style.fontSize"
                  value={formData.style.fontSize}
                  onChange={handleInputChange}
                  className="input"
                  min="8"
                  max="72"
                />
              </div>
              <div className="form-group">
                <label>Text Color</label>
                <input
                  type="color"
                  name="style.color"
                  value={formData.style.color}
                  onChange={handleInputChange}
                  className="input color-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                name="style.backgroundColor"
                value={formData.style.backgroundColor}
                onChange={handleInputChange}
                className="input color-input"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Opacity</label>
          <input
            type="range"
            name="style.opacity"
            value={formData.style.opacity}
            onChange={handleInputChange}
            className="opacity-slider"
            min="0"
            max="1"
            step="0.1"
          />
          <span className="opacity-value">{Math.round(formData.style.opacity * 100)}%</span>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {overlay ? 'Update Overlay' : 'Create Overlay'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OverlayForm;

