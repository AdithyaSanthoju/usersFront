import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        gender: ''
    });
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const fetchUsers = () => {
        axios.get('https://users-00dg.onrender.com/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (user) => {
        setFormData({ ...user });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        axios.delete(`https://users-00dg.onrender.com/users/${id}`)
            .then(() => fetchUsers())
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            axios.put(`https://users-00dg.onrender.com/users/${formData._id}`, formData)
                .then(() => {
                    fetchUsers();
                    resetForm();
                })
                .catch(error => console.error('Error updating user:', error));
        } 
        
        
        else {
            axios.post('https://users-00dg.onrender.com/users', formData)
                .then(() => {
                    fetchUsers();
                    resetForm();
                })
                .catch(error => console.error('Error adding user:', error));
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            gender: ''
        });
        setIsEditing(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
            </form>
            <table>
    <thead>
        <tr>
            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>

            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {users.map(user => (
            <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
};

export default UserForm;
