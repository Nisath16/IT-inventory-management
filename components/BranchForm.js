import React, { useState, useEffect } from 'react';
import BranchForm from '../components/BranchForm';
import '../styles/Branches.css';

function Branches() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch all branches from the backend API
    fetch('/api/branches')
      .then(response => response.json())
      .then(data => setBranches(data))
      .catch(err => console.error('Error fetching branches:', err));
  }, []);

  const handleCreateOrUpdate = (branchData) => {
    const method = selectedBranch ? 'PUT' : 'POST';
    const url = selectedBranch ? `/api/branches/${selectedBranch.id}` : '/api/branches';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(branchData),
    })
      .then(() => {
        setShowForm(false);
        setSelectedBranch(null);
        // Refresh branch list
        fetch('/api/branches')
          .then(response => response.json())
          .then(data => setBranches(data));
      })
      .catch(err => console.error('Error saving branch:', err));
  };

  const handleDelete = (id) => {
    fetch(`/api/branches/${id}`, { method: 'DELETE' })
      .then(() => {
        // Update the branch list after deletion
        setBranches(branches.filter(branch => branch.id !== id));
      })
      .catch(err => console.error('Error deleting branch:', err));
  };

  return (
    <div className="branches-page">
      <h1>Branches</h1>
      <button onClick={() => setShowForm(true)}>Add Branch</button>
      {showForm && (
        <BranchForm
          onSubmit={handleCreateOrUpdate}
          branchData={selectedBranch}
        />
      )}
      <ul>
        {branches.map(branch => (
          <li key={branch.id}>
            <span>{branch.name} - {branch.location}</span>
            <button onClick={() => { setSelectedBranch(branch); setShowForm(true); }}>Edit</button>
            <button onClick={() => handleDelete(branch.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Branches;
