import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// A simple X icon component to be used in buttons
const HiOutlineX = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Modal component for displaying the full event description
const DescriptionModal = ({ description, onClose }) => {
    if (!description) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
                    <HiOutlineX className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Description</h2>
                <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

// Main component for the Past Events section
const Past = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalDescription, setModalDescription] = useState(null);
    const [activeCardId, setActiveCardId] = useState(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const getPast = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/getpast`);
                setData(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch data from backend:", error);
                setData([]); // Set to empty array on error to prevent crashes
            } finally {
                setLoading(false);
            }
        };
        getPast();
    }, []);

    const handleCardClick = (id) => {
        setActiveCardId(id);
    };
    
    const handleCloseOverlay = (e) => {
        e.stopPropagation();
        setActiveCardId(null);
    };

    const handleOpenModal = (e, description) => {
        e.stopPropagation();
        setModalDescription(description);
        setActiveCardId(null); // Close the overlay when opening the modal
    };

    const handleEventLinkClick = (e, link) => {
        e.stopPropagation();
        if (!link) return;

        let correctedLink = link;
        if (!/^https?:\/\//i.test(link)) {
            correctedLink = `https://${link}`;
        }
        
        window.open(correctedLink, '_blank', 'noopener,noreferrer');
        setActiveCardId(null);
    };

    // Custom styles for Swiper pagination bullets
    const swiperCustomStyles = {
        '--swiper-pagination-color': '#2c3286',
        '--swiper-pagination-bullet-inactive-color': '#D1D5DB',
        '--swiper-pagination-bullet-inactive-opacity': '1',
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-xl font-semibold text-gray-700">Curating The Archives...</div>
            </div>
        );
    }

    return (
        <>
            <DescriptionModal description={modalDescription} onClose={() => setModalDescription(null)} />

            <section className="w-full py-20 bg-gray-50" style={swiperCustomStyles} id="ourevents">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins]">
  Past Events
</h1>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
                            A look back at our most memorable moments. Click on any poster for details.
                        </p>
                    </div>

                    <div className="relative px-12">

                        <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </div>
                        <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>

                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
                            loop={data.length > 3}
                            autoplay={{ delay: 4000, disableOnInteraction: true }}
                            pagination={{ clickable: true }}
                            className="!pb-16"
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 24 },
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 40 }
                            }}
                        >
                            {data.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <div 

                                        className="relative w-full aspect-square bg-gray-900 shadow-lg overflow-hidden cursor-pointer group"
                                        onClick={() => handleCardClick(item._id)}
                                    >
                                        <img 
                                            src={item.url} 
                                            alt={item.description} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 mix-blend-screen" 
                                        />


                                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${activeCardId === item._id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <p className="text-white font-semibold text-lg border-2 border-white px-4 py-2">View Details</p>
                                        </div>

                                        <div 
                                            className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col p-6 transition-opacity duration-300 ${activeCardId === item._id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button onClick={handleCloseOverlay} className="absolute top-4 right-4 text-white/70 hover:text-white z-20">
                                                <HiOutlineX className="h-7 w-7" />
                                            </button>
                                            
                                            <div className="flex flex-col flex-grow text-white">
                                                <p className="text-sm text-white/80 mb-2">{new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                <h3 className="text-xl font-light flex-grow line-clamp-6 mb-4">{item.description}</h3>
                                                
                                                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/20">
                                                    <button onClick={(e) => handleOpenModal(e, item.description)} className="text-sm w-full text-center font-semibold hover:underline">
                                                        View Full Description
                                                    </button>
                                                   
                                                    {item.link && (
                                                        <button 
                                                            onClick={(e) => handleEventLinkClick(e, item.link)} 
                                                            className="text-white text-center font-semibold py-2 px-4 text-sm transition-all duration-300 rounded-lg" 
                                                            style={{ backgroundColor: '#2c3286', boxShadow: '0 4px 14px 0 rgba(44, 50, 134, 0.25)' }}
                                                        >
                                                            View Event
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div> 
            </section>
        </>
    );
};

export default Past;