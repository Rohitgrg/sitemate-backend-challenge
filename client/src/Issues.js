import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Issues() {
    const [issues, setIssues] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editIssueId, setEditIssueId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/issues', {
                title,
                description
            });
            setSuccessMessage('Issue added successfully!');
            setTitle('');
            setDescription('');
            fetchIssues();
        } catch (error) {
            setErrorMessage('Error adding issue');
            console.error('Error adding issue:', error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    async function fetchIssues() {
        try {
            const response = await axios.get('/api/issues'); // Assuming '/api/issues' is the endpoint for issues
            setIssues(response.data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/issues/${id}`);
            setIssues(issues.filter(issue => issue.id !== id));
        } catch (error) {
            setErrorMessage('Error deleting issue');
            console.error('Error deleting issue:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/issues/${editIssueId}`, {
                title: editTitle,
                description: editDescription
            });
            setIssues(issues.map(issue =>
                issue.id === editIssueId ? { ...issue, title: editTitle, description: editDescription } : issue
            ));
            setEditIssueId(null);
            setEditTitle('');
            setEditDescription('');
            setSuccessMessage('Issue updated successfully!');
        } catch (error) {
            setErrorMessage('Error updating issue');
            console.error('Error updating issue:', error);
        }
    };

    const handleEditClick = (note) => {
        setEditIssueId(note.id);
        setEditTitle(note.title);
        setEditDescription(note.content);
    };

    return (
        <div>
            <h1>Issues</h1>

            {editIssueId && (
                <form onSubmit={handleEditSubmit}>
                    <h2>Edit Issue</h2>
                    <div>
                        <label htmlFor="editTitle">Title:</label>
                        <input
                            id="editTitle"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="editDescription">Description:</label>
                        <textarea
                            id="editDescription"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setEditIssueId(null)}>Cancel</button>
                </form>
            )}
            
            <ul style={{textAlign:"left"}}>
                {issues.map(issue => (
                    <li key={issue.id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <button onClick={() => handleEditClick(issue)}>Edit</button>
                        <button onClick={() => handleDelete(issue.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div style={{display: "flex", alignItems:"flex-start"}}>
                <div>
                    <h2>Add New Issue</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Add Issue</button>
                    </form>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default Issues;
