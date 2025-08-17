import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OurEvents = () => {
   
    const clubs = [
        { backendName: 'AI build club', displayName: 'AI Build Club' },
        { backendName: 'Technical club', displayName: 'Technical Club' },
        { backendName: 'Electromazine club', displayName: 'Electrozoom' } 
    ];


    const [selectedClub, setSelectedClub] = useState('AI build club');



    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6); 

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchEventsByClub = async () => {
            setLoading(true);
            setError(null);
            try {
               
                const response = await axios.get(`${API_URL}/api/getpast/club/${encodeURIComponent(selectedClub)}`);
                setEvents(response.data.data || []);
                setCurrentPage(1);
            } catch (err) {
                setError(err.response ? err.response.data.message : "An error occurred while fetching events.");
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedClub) {
            fetchEventsByClub();
        }
    }, [selectedClub]);

    
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const primaryColor = '#2c3286';
    const activeButtonStyle = {
        backgroundColor: primaryColor,
        color: 'white',
    };
    const linkStyle = {
        color: primaryColor,
    };
    const primaryTextColorStyle = {
        color: primaryColor,
    };

    return (
        <div className="bg-gray-50 min-h-screen mt-15">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Our Past Events</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        A showcase of our club's vibrant history. Explore the exciting events we've hosted.
                    </p>
                </div>

                <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
                   
                    {clubs.map((club) => (
                        <button
                            key={club.backendName}
                            onClick={() => setSelectedClub(club.backendName)} 
                            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                                selectedClub === club.backendName 
                                    ? 'text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                            style={selectedClub === club.backendName ? activeButtonStyle : {borderColor: '#e5e7eb', borderWidth: '1px'}}
                        >
                            {club.displayName} 
                        </button>
                    ))}
                  
                </div>


                {loading && (
                    <div className="text-center py-10">
                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto" style={{borderColor: `${primaryColor} transparent`}}></div>
                        <p className="mt-4 text-gray-600">Loading Events...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event) => (
                                    <div key={event._id} className="bg-white border border-gray-200 shadow-sm group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
                                        <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                                            <img src={event.url} alt={`${event.clubName} Event Poster`} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={primaryTextColorStyle}>{event.clubName}</h3> */}
                                            <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">Event: {event.description.substring(0, 20)}...</h2>
                                            <div
                                                className="text-gray-600 mb-6 text-sm flex-grow"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 5,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    height: '5.2rem',
                                                }}
                                            >
                                                {event.description}
                                            </div>
                                            {event.link && (
                                                <a
                                                    href={event.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-sm inline-flex items-center mt-auto group-hover:underline"
                                                    style={linkStyle}
                                                >
                                                    View Details
                                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 py-10">
                                    No past events found for this club.
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
                        {events.length > eventsPerPage && (
                            <div className="flex justify-center mt-12">
                                <nav className="inline-flex rounded-md shadow">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => paginate(index + 1)}
                                            className={`px-3 py-1 border-t border-b ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
                                        className={`px-3 py-1 rounded-r-md border ${currentPage === Math.ceil(events.length / eventsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OurEvents;