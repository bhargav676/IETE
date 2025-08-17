import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const EditElectromazinePage = () => {
    // State adapted for Electromazines
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingMagazineId, setEditingMagazineId] = useState(null);
    const [currentMagazineData, setCurrentMagazineData] = useState(null);
    const [editRegistrationLink, setEditRegistrationLink] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImageFile, setEditImageFile] = useState(null);
    const [currentEditImageUrl, setCurrentEditImageUrl] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    // API URL for electromazine
    const magazineApiUrl = '/electromazine';

    const fetchMagazines = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(magazineApiUrl);
            setMagazines(response.data.data);
            console.log('[EditElectromazinePage] All magazines fetched:', response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch electromazines');
            console.error('[EditElectromazinePage] Fetch magazines error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleMagazineForEdit = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(`${magazineApiUrl}/${id}`);
            const magazineData = response.data.data;
            setCurrentMagazineData(magazineData);
            setEditRegistrationLink(magazineData.registrationLink || '');
            setEditDescription(magazineData.description || '');
            setCurrentEditImageUrl(magazineData.url || '');
            setEditImageFile(null);
            setIsEditing(true);
            setEditingMagazineId(id);
            setFormError('');
            setFormSuccess('');
            console.log('[EditElectromazinePage] Single magazine fetched:', magazineData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch magazine for editing.');
            console.error('[EditElectromazinePage] Fetch single magazine error:', err);
            setIsEditing(false);
            setEditingMagazineId(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMagazines();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImageFile(file);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this electromazine?')) {
            return;
        }
        try {
            await apiClient.delete(`${magazineApiUrl}/${id}`);
            setFormSuccess('Electromazine deleted successfully!');
            fetchMagazines();
            if (isEditing && editingMagazineId === id) {
                handleCancelEdit();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete electromazine.');
        }
    };

    const handleEdit = (id) => {
        fetchSingleMagazineForEdit(id);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingMagazineId(null);
        setCurrentMagazineData(null);
        setEditRegistrationLink('');
        setEditDescription('');
        setEditImageFile(null);
        setCurrentEditImageUrl('');
        setFormError('');
        setFormSuccess('');
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        setLoading(true);

        if (!editDescription || !editRegistrationLink) {
            setFormError('Description and Registration Link cannot be empty.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        if (editImageFile) {
            formData.append('image', editImageFile);
        }
        formData.append('registrationLink', editRegistrationLink);
        formData.append('description', editDescription);

        try {
            const response = await apiClient.put(`${magazineApiUrl}/${editingMagazineId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setFormSuccess('Electromazine updated successfully!');
            fetchMagazines();
            // Refresh form with new data
            setCurrentMagazineData(response.data.data);
            setEditRegistrationLink(response.data.data.registrationLink || '');
            setEditDescription(response.data.data.description || '');
            setCurrentEditImageUrl(response.data.data.url || '');
            setEditImageFile(null);
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to update electromazine.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !isEditing) { // Show full-page loading only on initial load
        return <div className="text-center p-8 text-gray-700 text-xl">Loading Electromazines...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600 font-medium text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Electromazines</h1>
            <div className="text-left mb-6">
                <Link
                    to="/admin/electromazine"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-md inline-flex items-center justify-center transition ease-in-out duration-150 transform hover:scale-105 shadow-lg"
                >
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add New Electromazine
                </Link>
            </div>
            {isEditing && currentMagazineData && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-10 mt-6 animate-fade-in">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                        Edit Electromazine
                    </h2>
                    {formError && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{formError}</p>}
                    {formSuccess && !formError && <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{formSuccess}</p>}
                    <form onSubmit={handleUpdateSubmit} className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Cover Image:</label>
                            <img src={currentEditImageUrl} alt="Current Cover" className="w-64 h-48 object-cover rounded-md shadow-md mb-4" />
                            <label htmlFor="editImage" className="block text-gray-700 text-sm font-bold mb-2">Replace Image (Optional):</label>
                            <input type="file" id="editImage" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                        </div>
                        <div>
                            <label htmlFor="editDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea id="editDescription" rows="4" className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="editRegistrationLink" className="block text-gray-700 text-sm font-bold mb-2">Registration Link:</label>
                            <input type="url" id="editRegistrationLink" className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500" value={editRegistrationLink} onChange={(e) => setEditRegistrationLink(e.target.value)} required />
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 transition transform hover:scale-105">
                                {loading ? 'Updating...' : 'Update Electromazine'}
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">All Electromazines</h2>
                {magazines.length === 0 ? (
                    <p className="text-gray-600 text-center py-10">No electromazines found. Please add one!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {magazines.map((magazine) => (
                            <div key={magazine._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                                <img src={magazine.url} alt={magazine.description} className="w-full h-48 object-cover" />
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg mb-2 line-clamp-3">{magazine.description}</p>
                                        <a href={magazine.registrationLink} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-800 hover:underline text-sm break-all">
                                            Registration Link
                                        </a>
                                        <p className="text-gray-500 text-xs mt-2">
                                            Added: {new Date(magazine.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex justify-between space-x-2 mt-4">
                                        <button onClick={() => handleEdit(magazine._id)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm font-medium transition transform hover:scale-105">Edit</button>
                                        <button onClick={() => handleDelete(magazine._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition transform hover:scale-105">Delete</button>
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

export default EditElectromazinePage;