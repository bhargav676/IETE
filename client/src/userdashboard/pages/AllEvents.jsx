import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight, FiHome, FiAlertTriangle } from 'react-icons/fi';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/get`);
                setEvents(res.data.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Could not load the event archive. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event gallery...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <FiAlertTriangle className="text-red-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Events</h2>
                <p className="text-gray-600 mb-6 max-w-md">{error}</p>
                <Link 
                    to="/" 
                    className="flex items-center bg-gray-800 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <FiHome className="mr-2" /> Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 sm:py-16">
                <header className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-3 sm:mb-4">
                        <FiCalendar className="text-xl sm:text-2xl" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-2 sm:mb-3">Event Gallery</h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        Explore our collection of past events and memorable moments
                    </p>
                </header>

                {events.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center max-w-2xl mx-auto">
                        <div className="bg-gray-100 p-4 sm:p-6 rounded-full inline-flex mb-4 sm:mb-6">
                            <FiCalendar className="text-gray-400 text-2xl sm:text-3xl" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">No Events Found</h2>
                        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">We haven't added any events yet. Check back soon!</p>
                        <Link 
                            to="/" 
                            className="inline-flex items-center bg-gray-800 text-white font-medium py-2 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                        >
                            <FiHome className="mr-2" /> Return Home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 px-2 sm:px-0 justify-items-center">
                        {events.map((event, index) => (
                            <div 
                                key={index}
                                className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col relative group w-full max-w-[320px]"
                                onMouseEnter={() => setActiveImage(index)}
                                onMouseLeave={() => setActiveImage(null)}
                                onClick={() => setActiveImage(activeImage === index ? null : index)}
                            >
                                <div className="aspect-w-16 aspect-h-9 w-full relative">
                                    <img 
                                        src={event.url} 
                                        alt={event.description || "Event image"} 
                                        className={`w-full h-full object-cover transition-all duration-300 ${activeImage === index ? 'brightness-50' : ''}`}
                                        onError={(e) => { 
                                            e.currentTarget.src = "https://via.placeholder.com/800x450/cccccc/333333?text=Event+Image"; 
                                            e.currentTarget.className = `w-full h-full object-contain bg-gray-100 p-4 ${activeImage === index ? 'brightness-50' : ''}`;
                                        }}
                                    />
                                    {activeImage === index && (
                                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-3 sm:p-4 text-center transition-opacity duration-300">
                                            <p className="text-white text-xs sm:text-base font-medium line-clamp-6 sm:line-clamp-8 mb-3 sm:mb-4">
                                                {event.description || "No description available"}
                                            </p>
                                            {event.registrationLink && (
                                                <a 
                                                    href={event.registrationLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center bg-white text-gray-800 font-medium py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Details <FiArrowRight className="ml-1 sm:ml-2" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllEvents;