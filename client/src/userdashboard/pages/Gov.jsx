import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

// No changes needed for TeamMemberCard component
const TeamMemberCard = ({ member }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="text-center group transition-all duration-300 hover:-translate-y-1 flex-shrink-0">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-4 overflow-hidden rounded-full shadow-lg">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
                )}
                <img
                    src={member.url}
                    alt={member.name}
                    className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-[#2c3286]">
                {member.name}
            </h3>
            
            <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                {member.designation}
            </p>
        </div>
    );
};


const Gov = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scrollContainerRef = useRef(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            const currentScrollLeft = container.scrollLeft;
            
            if (maxScrollLeft > 0) {
                const percentage = (currentScrollLeft / maxScrollLeft) * 100;
                setScrollPercentage(percentage);
            } else {
                setScrollPercentage(0);
            }
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [data]);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}/api/getgov`);
                setData(res.data.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch team members. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchdata();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-t-4 border-b-4 border-[#2c3286] rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">Loading our team...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
                <div className="p-6 text-center max-w-md">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">Something went wrong</h3>
                    <p className="mt-2 text-sm text-gray-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-[#2c3286] text-white rounded-md hover:bg-[#2c3286] focus:outline-none"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins]">
                      Our Team
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600">
                        Dedicated professionals working together
                    </p>
                </div>

                {data.length > 0 ? (
                    <div className="relative">
                        {/* Reduced padding-bottom for a tighter layout */}
                        <div ref={scrollContainerRef} className="overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar">
                            <div className="flex space-x-8 w-max mx-auto px-4">
                                {data.map((member, index) => (
                                    <TeamMemberCard
                                        key={index}
                                        member={member}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* --- MODIFIED CUSTOM SCROLLBAR --- */}
                        {/* Track: Made much thinner (h-0.5 which is 2px) */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 max-w-xs h-0.5 rounded-full bg-gray-200">
                            {/* Thumb: Also made thinner and color changed to a neutral gray */}
                            <div
                                className="absolute top-0 h-0.5 w-1/4 rounded-full bg-gray-400"
                                style={{ 
                                    left: `${scrollPercentage}%`, 
                                    transform: `translateX(-${scrollPercentage}%)`
                                }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No team members</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Team members will be added soon
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gov;