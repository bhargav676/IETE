import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const EditUpcomingEventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [currentEventData, setCurrentEventData] = useState(null);
    const [editLink, setEditLink] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editRegistration, setEditRegistration] = useState('');
    const [editImageFile, setEditImageFile] = useState(null);
    const [editEventDate, setEditEventDate] = useState(''); // NEW
    const [currentEditImageUrl, setCurrentEditImageUrl] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const eventsApiUrl = '/admin/upcoming-events';

    const fetchEvents = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(eventsApiUrl);
            setEvents(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleEventForEdit = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(`${eventsApiUrl}/${id}`);
            const eventData = response.data.data;
            setCurrentEventData(eventData);
            setEditLink(eventData.link || '');
            setEditDescription(eventData.description || '');
            setEditRegistration(eventData.registration || '');
            setEditEventDate(eventData.eventDate ? new Date(eventData.eventDate).toISOString().split('T')[0] : ''); // NEW
            setCurrentEditImageUrl(eventData.url || '');
            setEditImageFile(null);
            setIsEditing(true);
            setEditingEventId(id);
            setFormError('');
            setFormSuccess('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch event for editing.');
            setIsEditing(false);
            setEditingEventId(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditImageFile(file);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this upcoming event?')) {
            return;
        }
        try {
            await apiClient.delete(`${eventsApiUrl}/${id}`);
            setFormSuccess('Upcoming event deleted successfully!');
            fetchEvents();
            if (isEditing && editingEventId === id) {
                handleCancelEdit();
            }
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
        setEditRegistration('');
        setEditImageFile(null);
        setEditEventDate(''); // NEW
        setCurrentEditImageUrl('');
        setFormError('');
        setFormSuccess('');
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        setLoading(true);

        if (!editDescription) {
            setFormError('Description cannot be empty.');
            setLoading(false);
            return;
        }
        if (!editEventDate) {
            setFormError('Event date is required.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        if (editImageFile) {
            formData.append('image', editImageFile);
        }
        formData.append('link', editLink);
        formData.append('description', editDescription);
        formData.append('registration', editRegistration);
        formData.append('eventDate', editEventDate); // NEW

        try {
            const response = await apiClient.put(`${eventsApiUrl}/${editingEventId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormSuccess('Upcoming event updated successfully!');
            fetchEvents();
            setCurrentEventData(response.data.data);
            setEditLink(response.data.data.link || '');
            setEditDescription(response.data.data.description || '');
            setEditRegistration(response.data.data.registration || '');
            setEditEventDate(response.data.data.eventDate ? new Date(response.data.data.eventDate).toISOString().split('T')[0] : '');
            setCurrentEditImageUrl(response.data.data.url || '');
            setEditImageFile(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update event.';
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-8 text-gray-700 text-xl">Loading Data...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600 font-medium text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Upcoming Events</h1>
            <div className="text-left mb-6">
                <Link
                    to="/admin/upcoming-events"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-md inline-flex items-center justify-center transition ease-in-out duration-150 transform hover:scale-105 shadow-lg"
                >
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Add New Upcoming Event
                </Link>
            </div>
            {isEditing && currentEventData && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-10 mt-6 ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                        Edit Upcoming Event: {currentEventData.description.substring(0, 30)}...
                    </h2>
                    {formError && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{formError}</p>}
                    {formSuccess && <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{formSuccess}</p>}
                    <form onSubmit={handleUpdateSubmit} className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Image:</label>
                            {currentEditImageUrl ? (
                                <img src={currentEditImageUrl} alt="Current Event" className="w-64 h-48 object-cover rounded-md shadow-md mb-4" />
                            ) : (
                                <p className="text-gray-500 text-sm mb-4">No image currently associated.</p>
                            )}
                            <label htmlFor="editImage" className="block text-gray-700 text-sm font-bold mb-2">Replace Image (Optional):</label>
                            <input
                                type="file"
                                id="editImage"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={handleImageChange}
                                accept="image/jpeg,image/jpg,image/png"
                            />
                        </div>
                        <div>
                            <label htmlFor="editDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea
                                id="editDescription"
                                rows="4"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                placeholder="Enter a detailed description for the upcoming event..."
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="editLink" className="block text-gray-700 text-sm font-bold mb-2">Event Link (Optional):</label>
                            <input
                                type="text"
                                id="editLink"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., https://example.com/event-page"
                                value={editLink}
                                onChange={(e) => setEditLink(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="editRegistration" className="block text-gray-700 text-sm font-bold mb-2">Registration Link (Optional):</label>
                            <input
                                type="text"
                                id="editRegistration"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., https://example.com/register"
                                value={editRegistration}
                                onChange={(e) => setEditRegistration(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="editEventDate" className="block text-gray-700 text-sm font-bold mb-2">Event Date:</label>
                            <input
                                type="date"
                                id="editEventDate"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={editEventDate}
                                onChange={(e) => setEditEventDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition ease-in-out duration-150 transform hover:scale-105"
                            >
                                Update Event
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-150 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">All Upcoming Events</h2>
                {events.length === 0 ? (
                    <p className="text-gray-600 text-center py-10">No upcoming events found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white flex flex-col">
                                <img
                                    src={event.url}
                                    alt={event.description}
                                    className="w-full h-48 object-cover object-center"
                                />
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg mb-2 line-clamp-2">{event.description}</p>
                                        {event.link && (
                                            <a
                                                href={event.link.startsWith('http://') || event.link.startsWith('https://') ? event.link : `https://${event.link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline text-sm mb-1 block"
                                            >
                                                <span className="inline-block mr-1">🔗</span> Event Link
                                            </a>
                                        )}
                                        {event.registration && (
                                            <a
                                                href={event.registration.startsWith('http://') || event.registration.startsWith('https://') ? event.registration : `https://${event.registration}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline text-sm mb-1 block"
                                            >
                                                <span className="inline-block mr-1">🔗</span> Register
                                            </a>
                                        )}
                                        <p className="text-gray-500 text-xs mt-2">
                                            Event Date: {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'N/A'}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Added: {new Date(event.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex justify-between space-x-2 mt-4">
                                        <button
                                            onClick={() => handleEdit(event._id)}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm font-medium transition ease-in-out duration-150 transform hover:scale-105"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition ease-in-out duration-150 transform hover:scale-105"
                                        >
                                            Delete
                                        </button>
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

export default EditUpcomingEventPage;
