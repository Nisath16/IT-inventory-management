import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Userform from '../components/Userform';
import '../styles/Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleCreateUsers = (userData) => {
    axios.post('/api/users', userDataData)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div className="users-page">
      <h2>Users</h2>
      <Userform onSubmit={handleCreateUsers} />
      <ul>
        {assets.map(user => (
          <li key={user.id}>{user.name} - {user.serial}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
