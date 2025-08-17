// src/components/EditPastEventPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const EditPastEventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [currentEventData, setCurrentEventData] = useState(null);
    
    // Form state for editing
    const [editLink, setEditLink] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editClubName, setEditClubName] = useState(''); // State for editing club name
    const [editImageFile, setEditImageFile] = useState(null);
    const [currentEditImageUrl, setCurrentEditImageUrl] = useState('');
    
    // Feedback state
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    // --- CORRECTED URL ---
    // Using the URL pattern you provided, which works with your apiClient setup.
    const eventsApiUrl = '/admin/past-events'; 
    const clubs = ['AI build club', 'Technical club', 'Chess club'];

    // Fetches all events to display in the list
    const fetchEvents = async () => {
        setLoading(true);
        setError('');
        try {
            // Uses the corrected URL: GET /admin/past-events
            const response = await apiClient.get(eventsApiUrl);
            setEvents(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    // Fetches a single event when the "Edit" button is clicked
    const fetchSingleEventForEdit = async (id) => {
        setLoading(true);
        try {
            // Uses the corrected URL: GET /admin/past-events/:id
            const response = await apiClient.get(`${eventsApiUrl}/${id}`);
            const eventData = response.data.data;
            setCurrentEventData(eventData);
            setEditLink(eventData.link || '');
            setEditDescription(eventData.description || '');
            setEditClubName(eventData.clubName || ''); // Populate club name for editing
            setCurrentEditImageUrl(eventData.url || '');
            setEditImageFile(null);
            setIsEditing(true);
            setEditingEventId(id);
            setFormError('');
            setFormSuccess('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch event for editing.');
            setIsEditing(false);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleImageChange = (e) => {
        setEditImageFile(e.target.files[0]);
    };

    // Deletes an event
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this past event?')) return;
        try {
            // Uses the corrected URL: DELETE /admin/past-events/:id
            await apiClient.delete(`${eventsApiUrl}/${id}`);
            setFormSuccess('Past event deleted successfully!');
            fetchEvents(); // Refresh list
            if (isEditing && editingEventId === id) handleCancelEdit();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete event.');
        }
    };

    const handleEdit = (id) => {
        fetchSingleEventForEdit(id);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingEventId(null);
        setCurrentEventData(null);
        setEditLink('');
        setEditDescription('');
        setEditClubName('');
        setEditImageFile(null);
        setCurrentEditImageUrl('');
        setFormError('');
        setFormSuccess('');
    };

    // Submits the updated event data
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        if (!editDescription || !editClubName) {
            setFormError('Description and Club Name are required.');
            return;
        }

        const formData = new FormData();
        if (editImageFile) formData.append('image', editImageFile);
        formData.append('link', editLink);
        formData.append('description', editDescription);
        formData.append('clubName', editClubName);

        try {
            // Uses the corrected URL: PUT /admin/past-events/:id
            await apiClient.put(`${eventsApiUrl}/${editingEventId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setFormSuccess('Event updated successfully!');
            fetchEvents();
            handleCancelEdit();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to update event.');
        }
    };

    if (loading && !isEditing) return <div className="text-center p-8 text-gray-700 text-xl">Loading Data...</div>;
    if (error) return <div className="text-center p-8 text-red-600 font-medium text-xl">{error}</div>;

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Past Events</h1>
            <div className="text-left mb-6">
                <Link to="/admin/past-events" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg inline-flex items-center">
                    Add New Past Event
                </Link>
            </div>

            {isEditing && currentEventData && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-10 mt-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Editing Event</h2>
                    {formError && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{formError}</p>}
                    <form onSubmit={handleUpdateSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="editClubName" className="block text-gray-700 text-sm font-bold mb-2">Club Name:</label>
                            <select
                                id="editClubName" value={editClubName} onChange={(e) => setEditClubName(e.target.value)}
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required >
                                <option value="" disabled>-- Select a Club --</option>
                                {clubs.map(club => <option key={club} value={club}>{club}</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Image:</label>
                            <img src={currentEditImageUrl} alt="Current Event" className="w-64 h-48 object-cover rounded-md shadow-md mb-4" />
                            <label htmlFor="editImage" className="block text-gray-700 text-sm font-bold mb-2">Replace Image (Optional):</label>
                            <input type="file" id="editImage" onChange={handleImageChange} accept="image/*" />
                        </div>
                        <div>
                            <label htmlFor="editDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea id="editDescription" rows="4" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                                className="shadow-sm border rounded-lg w-full py-2 px-4" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="editLink" className="block text-gray-700 text-sm font-bold mb-2">Event Link (Optional):</label>
                            <input type="text" id="editLink" value={editLink} onChange={(e) => setEditLink(e.target.value)}
                                className="shadow-sm border rounded-lg w-full py-2 px-4" />
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg">Update Event</button>
                            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            
            {formSuccess && !isEditing && <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{formSuccess}</p>}

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">All Past Events</h2>
                {events.length === 0 ? (<p className="text-gray-600 text-center py-10">No past events found.</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
                                <img src={event.url} alt={event.description} className="w-full h-48 object-cover" />
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-sm font-semibold text-purple-700 mb-1">{event.clubName}</p>
                                        <p className="text-gray-900 font-bold text-lg mb-2 line-clamp-2">{event.description}</p>
                                        {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Event Link</a>}
                                        <p className="text-gray-500 text-xs mt-2">Added: {new Date(event.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex justify-between space-x-2 mt-4">
                                        <button onClick={() => handleEdit(event._id)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm">Edit</button>
                                        <button onClick={() => handleDelete(event._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditPastEventPage;