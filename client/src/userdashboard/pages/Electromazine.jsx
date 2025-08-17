import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi';

const Electromazine = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const slidesContainerRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const handelfetch = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}/api/get`);
                const latestFourEvents = res.data.data.slice(0, 4);
                setEvents(latestFourEvents);
            } catch (error) {
                console.error("Error fetching data:", error);
                setEvents([]);
            }
            setLoading(false);
        };
        handelfetch();
    }, []);

    const goToSlide = (index) => {
        if (index < 0 || index >= events.length) return;
        setActiveIndex(index);
        if (slidesContainerRef.current) {
            slidesContainerRef.current.style.transform = `translateX(-${index * 100}%)`;
        }
    };

    const goToNext = () => goToSlide(activeIndex === events.length - 1 ? 0 : activeIndex + 1);
    const goToPrev = () => goToSlide(activeIndex === 0 ? events.length - 1 : activeIndex - 1);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2c3286]"></div>
                <p className="mt-4 text-lg text-slate-400">Loading Latest Issues...</p>
            </div>
        );
    }

    if (!loading && events.length === 0) {
        return (
             <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center px-4">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-2">No Events Found</h2>
                <p className="text-lg text-slate-500">The Electromazine portal is ready. Please check back soon for new events!</p>
            </div>
        );
    }

    return (
        <section className="h-screen w-full bg-slate-900 overflow-hidden relative">
            {/* Background Image Layer with Blur */}
            <div className="absolute inset-0 z-0">
                {events.map((item, index) => (
                    <div
                        key={item.url + index}
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out filter blur-lg"
                        style={{ backgroundImage: `url(${item.url})`, opacity: activeIndex === index ? 1 : 0, }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
            </div>

            {/* Content Carousel Layer */}
            <div className="absolute inset-0 z-20 flex transition-transform duration-700 ease-in-out" ref={slidesContainerRef}>
                {events.map((item) => (
                    <div key={item.title} className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-4">
                        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
                           <div className="flex justify-center md:order-last" style={{ perspective: '1000px' }}>
                                <div className="relative w-[240px] h-[320px] md:w-[350px] md:h-[460px] transition-transform duration-300 transform-style-3d">
                                    <img src={item.url} alt={item.title || "Magazine Cover"} className="w-full h-full object-contain rounded-lg shadow-lg" />
                                    <div className="absolute top-4 left-[-10px] bg-[#2c3286] text-white text-xs font-bold px-4 py-1 rounded-r-full shadow-md">
                                        LATEST ISSUE
                                    </div>
                                </div>
                            </div>
                           <div className="text-center md:text-left">
                                <span className="text-blue-300 font-semibold tracking-widest uppercase">{item.time || "Featured Event"}</span>
                                <h2 className="text-3xl lg:text-5xl font-extrabold my-3 leading-tight text-white">
                                    {item.title || "Electrozoom Event"}
                                </h2>
                                <div className='h-24 mb-6'>
                                    <p className="text-base text-slate-300 max-w-lg mx-auto md:mx-0 line-clamp-4">
                                        {item.description}
                                    </p>
                                </div>
                                <a href={item.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gradient-to-r from-[#2c3286] to-[#3b43a9] text-white font-bold py-3 px-8 rounded-full text-base hover:scale-105 transition-transform">
                                    Read now <FiExternalLink className="ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CONTROLS LAYER (NAVIGATION, PAGINATION, VIEW ALL) --- */}
            <div className='absolute inset-0 z-30 pointer-events-none'>
                 {/* This button can link to a page that shows all events, not just the latest 4 */}
                 <Link
                    to="/all-events" // You might want to create this route to show all other events
                    className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 text-white font-semibold py-2 px-6 rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 pointer-events-auto"
                 >
                    View all
                 </Link>

                 {/* Left/Right Arrows */}
                 {events.length > 1 && (
                    <>
                        <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm pointer-events-auto">
                            <FiArrowLeft size={24} />
                        </button>
                        <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm pointer-events-auto">
                            <FiArrowRight size={24} />
                        </button>
                    </>
                 )}

                 {/* Pagination Dots */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 pointer-events-auto">
                    {events.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} 
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#2c3286] scale-125' : 'bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Electromazine;