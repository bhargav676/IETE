import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';

const GoverningTeamPage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false); // NEW: Added loading state

    const membersApiUrl = '/admin/governing-team';

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setImagePreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImagePreviewUrl(null);
        }
    }, [imageFile]);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        setIsLoading(true); // Start loading

        if (!imageFile || !name || !designation) {
            setFormError('Please fill all required fields: Image, Name, and Designation.');
            setIsLoading(false); // Stop loading if validation fails
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', name);
        formData.append('designation', designation);

        try {
            await apiClient.post(`${membersApiUrl}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setFormSuccess('Team Member added successfully!');
            setImageFile(null);
            setImagePreviewUrl(null);
            setName('');
            setDesignation('');
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to add member.');
            console.error('Add member error:', err);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const brandColor = "text-[#6367a7]";
    const primaryButtonBg = "bg-[#6367a7]";
    const primaryButtonHover = "hover:bg-custom-darker-violet";
    const primaryButtonFocusRing = "focus:ring-custom-violet";
    const inputFocusRing = "focus:ring-custom-violet";
    const iconColor = "text-custom-violet";
    const generalDarkText = "text-gray-800";
    const neutralBorder = "border-gray-200";
    const formCardBg = "bg-white";
    const innerFormSectionBg = "bg-gray-50";
    const bodyFontClass = "font-body";
    const displayFontClass = { fontFamily: 'Raleway, sans-serif' };

    return (
        <div className={`relative min-h-screen bg-white flex justify-center items-center overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40 z-0">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.12 }}>
                    <path fill="var(--custom-violet-color, #6367a7)" d="M50 0 C70 0 100 20 100 50 C100 70 80 100 50 100 C30 100 0 80 0 50 C0 30 20 0 50 0 Z"></path>
                    <path fill="var(--custom-light-violet-color, #e9ebf2)" d="M50 10 C65 10 90 25 90 50 C90 65 75 90 50 90 C35 90 10 75 10 50 C10 35 25 10 50 10 Z"></path>
                </svg>
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        --custom-violet-color: #6367a7;
                        --custom-darker-violet: #51548a;
                        --custom-light-violet-color: #e9ebf2;
                    }
                ` }} />
            </div>

            <div className={`container max-w-md md:max-w-xl lg:max-w-2xl mx-auto ${formCardBg} rounded-3xl shadow-xl ${neutralBorder} p-6 sm:p-8 lg:p-10 my-6 sm:my-8 z-10`}>
                <div className={`p-6 rounded-2xl ${neutralBorder} mb-8 ${innerFormSectionBg} transition duration-300 ease-in-out hover:shadow-lg`}>
                    <h2 className={`${generalDarkText} text-3xl font-extrabold mb-5 border-b ${neutralBorder} pb-3 flex items-center ${bodyFontClass}`}>
                        <svg className={`h-7 w-7 ${iconColor} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Governing Team
                    </h2>

                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center mb-5 text-sm">
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <p className={`${bodyFontClass} font-medium`}>{formError}</p>
                        </div>
                    )}
                    {formSuccess && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg flex items-center mb-5 text-sm">
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p className={`${bodyFontClass} font-medium`}>{formSuccess}</p>
                        </div>
                    )}

                    <form onSubmit={handleAddSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="image" className={`block ${generalDarkText} text-sm font-semibold mb-2 ${bodyFontClass}`}>
                                Member Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                className={`block w-full text-sm ${generalDarkText} ${neutralBorder} rounded-xl cursor-pointer bg-white file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:transition file:duration-150 focus:outline-none ${inputFocusRing} focus:border-transparent ${bodyFontClass}`}
                                onChange={handleImageChange}
                                accept="image/jpeg,image/jpg,image/png"
                                required
                            />
                            {imagePreviewUrl && (
                                <div className="mt-4 flex flex-col items-center">
                                    <p className={`${generalDarkText} text-sm mb-2 ${bodyFontClass}`}>Image Preview:</p>
                                    <img
                                        src={imagePreviewUrl}
                                        alt="Image Preview"
                                        className="max-w-full h-auto max-h-48 object-contain rounded-lg shadow-md border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="name" className={`block ${generalDarkText} text-sm font-semibold mb-2 ${bodyFontClass}`}>
                                Member Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`shadow-sm appearance-none ${neutralBorder} rounded-xl w-full py-2.5 px-4 ${generalDarkText} leading-tight focus:outline-none ${inputFocusRing} focus:border-transparent ${bodyFontClass}`}
                                placeholder="e.g., John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="designation" className={`block ${generalDarkText} text-sm font-semibold mb-2 ${bodyFontClass}`}>
                                Designation:
                            </label>
                            <input
                                type="text"
                                id="designation"
                                className={`shadow-sm appearance-none ${neutralBorder} rounded-xl w-full py-2.5 px-4 ${generalDarkText} leading-tight focus:outline-none ${inputFocusRing} focus:border-transparent ${bodyFontClass}`}
                                placeholder="e.g., President, Secretary"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`${primaryButtonBg} ${primaryButtonHover} text-white font-bold py-2.5 px-7 rounded-full focus:outline-none focus:ring-2 ${primaryButtonFocusRing} focus:ring-opacity-50 transition ease-in-out duration-200 transform hover:scale-105 shadow-md w-full md:w-auto flex items-center justify-center ${bodyFontClass}`}
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
                                    Adding Member...
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add Member
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <Link
                        to="/admin/governing-team/manage"
                        className={`border-2 border-custom-violet ${brandColor} hover:bg-violet-50 font-bold py-3 px-8 rounded-full inline-flex items-center justify-center transition ease-in-out duration-200 transform hover:-translate-y-0.5 hover:shadow-lg ${bodyFontClass}`}
                    >
                        View & Manage Governing Team
                        <svg className={`ml-2 w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GoverningTeamPage;