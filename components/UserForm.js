import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import '../styles/Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch all users from the backend API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleCreateOrUpdate = (userData) => {
    const method = selectedUser ? 'PUT' : 'POST';
    const url = selectedUser ? `/api/users/${selectedUser.id}` : '/api/users';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(() => {
        setShowForm(false);
        setSelectedUser(null);
        // Refresh user list
        fetch('/api/users')
          .then(response => response.json())
          .then(data => setUsers(data));
      })
      .catch(err => console.error('Error saving user:', err));
  };

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => {
        // Update the user list after deletion
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.error('Error deleting user:', err));
  };

  return (
    <div className="users-page">
      <h1>Users</h1>
      <button onClick={() => setShowForm(true)}>Add User</button>
      {showForm && (
        <UserForm
          onSubmit={handleCreateOrUpdate}
          userData={selectedUser}
        />
      )}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name} - {user.email} - {user.role}</span>
            <button onClick={() => { setSelectedUser(user); setShowForm(true); }}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
