import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetForm = ({ assetId, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    type: '',
    status: '',
    assignedTo: '',
    branchId: '',
  });

  // Fetch asset details if an `assetId` is provided (for editing)
  useEffect(() => {
    if (assetId) {
      axios.get(`/api/assets/${assetId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching asset:', error);
        });
    }
  }, [assetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (assetId) {
      // Update existing asset
      axios.put(`/api/assets/${assetId}`, formData)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error('Error updating asset:', error);
        });
    } else {
      // Create new asset
      axios.post('/api/assets', formData)
        .then(response => {
          onSave(response.data);
          setFormData({
            name: '',
            serial: '',
            type: '',
            status: '',
            assignedTo: '',
            branchId: '',
          });
        })
        .catch(error => {
          console.error('Error creating asset:', error);
        });
    }
  };

  const handleDelete = () => {
    if (assetId) {
      axios.delete(`/api/assets/${assetId}`)
        .then(() => {
          onDelete(assetId);
        })
        .catch(error => {
          console.error('Error deleting asset:', error);
        });
    }
  };

  return (
    <div className="asset-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="serial">Serial</label>
          <input type="text" id="serial" name="serial" value={formData.serial} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="assignedTo">Assigned To</label>
          <input type="number" id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="branchId">Branch ID</label>
          <input type="number" id="branchId" name="branchId" value={formData.branchId} onChange={handleChange} required />
        </div>
        <button type="submit">{assetId ? 'Update Asset' : 'Create Asset'}</button>
        {assetId && <button type="button" onClick={handleDelete} className="delete-button">Delete Asset</button>}
      </form>
    </div>
  );
};

export default AssetForm;