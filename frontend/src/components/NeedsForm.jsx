import React, { useState } from 'react';

const NeedsForm = ({ onAddNeed }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'General',
    description: ''
  });

  const categories = ['General', 'Medical', 'Food', 'Logistics'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onAddNeed(formData);
    setFormData({ title: '', location: '', category: 'General', description: '' });
  };

  return (
    <div className="form-card glass-panel" style={{ padding: '2.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Resource Request Detail</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Need Title</label>
          <input 
            type="text" 
            placeholder="e.g. Need 50 blankets"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Location Area</label>
            <input 
              type="text" 
              placeholder="e.g. Downtown Shelter"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea 
            rows="5"
            placeholder="Provide necessary background so our machine learning engine can accurately predict urgency..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
          Submit to ML Priority Engine
        </button>
      </form>
    </div>
  );
};

export default NeedsForm;
