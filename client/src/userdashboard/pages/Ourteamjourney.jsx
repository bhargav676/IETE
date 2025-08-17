import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const OurTeamJourney = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/our-team-journey/image`);
                setData(res.data.data || []);
            } catch (err) {
                console.error("Error fetching images:", err);
                setError("Failed to load images. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="py-12 bg-slate-50">
            <div className="container px-4 mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins] text-center mb-8">
  Alumini
</h2>

                
                {data.length > 0 ? (
                    <div className="relative">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                                type: 'bullets',
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 1,
                                },
                            }}
                            className="w-full"
                        >
                            {data.map((item, index) => (
                                <SwiperSlide key={index} className="flex justify-center">
                                    <div className="relative group max-w-4xl mx-auto">
                                        <img 
                                            src={item.url} 
                                            alt={`Team journey ${index}`}
                                            className="w-full h-auto object-contain max-h-[80vh]"
                                            loading="lazy"
                                        />
                                        {item.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-sm md:text-base">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation buttons */}
                        <div className="swiper-button-next after:hidden !text-blue-500 !w-12 !h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="swiper-button-prev after:hidden !text-blue-500 !w-12 !h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>

                        {/* Pagination */}
                        <div className="swiper-pagination !relative !bottom-0 !mt-8 flex justify-center space-x-2" />
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>No journey images available yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurTeamJourney;