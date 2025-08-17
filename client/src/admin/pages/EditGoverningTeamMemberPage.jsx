import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const EditGoverningTeamPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [currentMemberData, setCurrentMemberData] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDesignation, setEditDesignation] = useState('');
    const [editImageFile, setEditImageFile] = useState(null);
    const [currentEditImageUrl, setCurrentEditImageUrl] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const membersApiUrl = '/admin/governing-team';

    const fetchMembers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(membersApiUrl);
            setMembers(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch members');
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleMemberForEdit = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get(`${membersApiUrl}/${id}`);
            const memberData = response.data.data;
            setCurrentMemberData(memberData);
            setEditName(memberData.name || '');
            setEditDesignation(memberData.designation || '');
            setCurrentEditImageUrl(memberData.url || '');
            setEditImageFile(null);
            setIsEditing(true);
            setEditingMemberId(id);
            setFormError('');
            setFormSuccess('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch member for editing.');
            setIsEditing(false);
            setEditingMemberId(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditImageFile(file);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this member?')) {
            return;
        }
        try {
            await apiClient.delete(`${membersApiUrl}/${id}`);
            setFormSuccess('Member deleted successfully!');
            fetchMembers();
            if (isEditing && editingMemberId === id) {
                handleCancelEdit();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete member.');
        }
    };

    const handleEdit = (id) => {
        fetchSingleMemberForEdit(id);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingMemberId(null);
        setCurrentMemberData(null);
        setEditName('');
        setEditDesignation('');
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

        if (!editName || !editDesignation) {
            setFormError('Name and Designation cannot be empty.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        if (editImageFile) {
            formData.append('image', editImageFile);
        }
        formData.append('name', editName);
        formData.append('designation', editDesignation);


        try {
            const response = await apiClient.put(`${membersApiUrl}/${editingMemberId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormSuccess('Team member updated successfully!');
            fetchMembers();
            setCurrentMemberData(response.data.data);
            setEditName(response.data.data.name || '');
            setEditDesignation(response.data.data.designation || '');
            setCurrentEditImageUrl(response.data.data.url || '');
            setEditImageFile(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update member.';
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-8 text-gray-700 text-xl">Loading Governing Team Members...</div>;
    if (error) return <div className="text-center p-8 text-red-600 font-medium text-xl">{error}</div>;

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Existing Governing Team Members</h1>

            <div className="text-left mb-6">
                <Link
                    to="/admin/governing-team"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-md inline-flex items-center justify-center transition ease-in-out duration-150 transform hover:scale-105 shadow-lg"
                >
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Add New Team Member
                </Link>
            </div>

            {isEditing && currentMemberData && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-10 mt-6 ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                        Edit Member: {currentMemberData.name}
                    </h2>
                    {formError && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{formError}</p>}
                    {formSuccess && <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{formSuccess}</p>}
                    <form onSubmit={handleUpdateSubmit} className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Image:</label>
                            {currentEditImageUrl ? (
                                <img src={currentEditImageUrl} alt="Current Member" className="w-64 h-48 object-cover rounded-md shadow-md mb-4" />
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
                            <label htmlFor="editName" className="block text-gray-700 text-sm font-bold mb-2">Member Name:</label>
                            <input
                                type="text"
                                id="editName"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., John Doe"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="editDesignation" className="block text-gray-700 text-sm font-bold mb-2">Designation:</label>
                            <input
                                type="text"
                                id="editDesignation"
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., President, Secretary"
                                value={editDesignation}
                                onChange={(e) => setEditDesignation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition ease-in-out duration-150 transform hover:scale-105"
                            >
                                Update Member
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">All Team Members</h2>
                {members.length === 0 ? (
                    <p className="text-gray-600 text-center py-10">No team members found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.map((member) => (
                            <div key={member._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white flex flex-col">
                                <img
                                    src={member.url}
                                    alt={member.name}
                                    className="w-full h-48 object-cover object-center"
                                />
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg mb-1 line-clamp-1">{member.name}</p>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{member.designation}</p>
                                        <p className="text-gray-500 text-xs mt-2">
                                            Added: {new Date(member.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex justify-between space-x-2 mt-4">
                                        <button
                                            onClick={() => handleEdit(member._id)}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm font-medium transition ease-in-out duration-150 transform hover:scale-105"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member._id)}
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

export default EditGoverningTeamPage;