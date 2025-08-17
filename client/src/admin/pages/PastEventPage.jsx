// src/admin/components/PastEventPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const PastEventPage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [clubName, setClubName] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const eventsApiUrl = '/admin/past-events/upload';
    const clubs = ['AI build club', 'Technical club', 'Electromazine club'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setImagePreviewUrl(objectUrl);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        if (!imageFile || !clubName || !description) {
            setFormError('Please fill out all required fields: Club, Image, and Description.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('link', link);
        formData.append('description', description);
        formData.append('clubName', clubName);

        try {
            await apiClient.post(eventsApiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormSuccess('Past event added successfully!');
            setImageFile(null);
            setImagePreviewUrl(null);
            setLink('');
            setDescription('');
            setClubName('');
            document.getElementById('image').value = null;
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to add event.');
            console.error('Add event error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const brandColor = "text-[#6367a7]";
    const primaryButtonBg = "bg-[#6367a7]";
    const inputFocusRing = "focus:ring-custom-violet";
    const iconColor = "text-custom-violet";
    const generalDarkText = "text-gray-800";
    const neutralBorder = "border-gray-200";

    return (
        <div className="relative min-h-screen bg-white flex justify-center items-center p-4">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40 z-0">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.12 }}>
                    <path fill="#6367a7" d="M50 0 C70 0 100 20 100 50 C100 70 80 100 50 100 C30 100 0 80 0 50 C0 30 20 0 50 0 Z"></path>
                    <path fill="#e9ebf2" d="M50 10 C65 10 90 25 90 50 C90 65 75 90 50 90 C35 90 10 75 10 50 C10 35 25 10 50 10 Z"></path>
                </svg>
            </div>

            <div className="container max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border p-8 my-8 z-10">
                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h2 className="text-3xl font-extrabold mb-5 border-b pb-3 flex items-center">
                        <svg className={`h-7 w-7 ${iconColor} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        New Event Details
                    </h2>

                    {formError && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5 text-sm">{formError}</div>}
                    {formSuccess && <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg mb-5 text-sm">{formSuccess}</div>}

                    <form onSubmit={handleAddSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="clubName" className={`block ${generalDarkText} text-sm font-semibold mb-2`}>Club Name:</label>
                            <select id="clubName" value={clubName} onChange={(e) => setClubName(e.target.value)}
                                className={`shadow-sm appearance-none ${neutralBorder} rounded-xl w-full py-2.5 px-4 bg-white focus:outline-none ${inputFocusRing}`}
                                required>
                                <option value="" disabled>-- Select a Club --</option>
                                {clubs.map(club => <option key={club} value={club}>{club}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="image" className={`block ${generalDarkText} text-sm font-semibold mb-2`}>Event Image:</label>
                            <input type="file" id="image"
                                className={`block w-full text-sm ${generalDarkText} ${neutralBorder} rounded-xl cursor-pointer bg-white file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 focus:outline-none ${inputFocusRing}`}
                                onChange={handleImageChange} accept="image/*" required />
                            {imagePreviewUrl && (
                                <div className="mt-4"><img src={imagePreviewUrl} alt="Preview" className="max-h-48 rounded-lg shadow-md"/></div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className={`block ${generalDarkText} text-sm font-semibold mb-2`}>Description:</label>
                            <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                className={`shadow-sm ${neutralBorder} rounded-xl w-full py-2.5 px-4 focus:outline-none ${inputFocusRing}`}
                                required></textarea>
                        </div>

                        <div>
                            <label htmlFor="link" className={`block ${generalDarkText} text-sm font-semibold mb-2`}>Event Link (Optional):</label>
                            <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)}
                                className={`shadow-sm ${neutralBorder} rounded-xl w-full py-2.5 px-4 focus:outline-none ${inputFocusRing}`} />
                        </div>

                        <button 
                            type="submit" 
                            className={`${primaryButtonBg} hover:bg-opacity-90 text-white font-bold py-2.5 px-7 rounded-full w-full disabled:opacity-70 disabled:cursor-not-allowed transition-opacity flex items-center justify-center`}
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Adding Event...
                                </>
                            ) : (
                                'Add Past Event'
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <Link to="/admin/past-events/manage"
                        className={`border-2 border-custom-violet ${brandColor} hover:bg-violet-50 font-bold py-3 px-8 rounded-full`}>
                        View & Manage Past Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PastEventPage;