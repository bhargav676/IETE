import React from 'react';
import Profile from '../../assets/images/p2.png';
import { FaGithub, FaLinkedin, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Developedby = () => {
    return (
        <section className="py-20 bg-white border-t border-slate-200">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins]">
                        Developed By
                    </h1>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                       
                        <div className="relative w-52 h-52 min-w-[12rem] overflow-hidden rounded-full shadow-md group">
                            <img
                                src={Profile}
                                alt="Developer Profile"
                                className="object-cover object-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>

                     
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-800">
                                K Bhargava Prasad
                            </h3>
                            <p className="text-sm font-medium text-[#2c3286] uppercase tracking-wider mt-4">
                                Full-Stack Developer
                            </p>

                            <p className="mt-4 text-gray-600">
                                
                            </p>

                            <div className="flex justify-center md:justify-start space-x-5 mt-6">
                                <a
                                    href="https://github.com/bhargav676"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={20} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/k-bhargava-prasad-6842b0291/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                                <a
                                    href="https://bhargavkagitala.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-amber-600 transition-colors duration-300"
                                    aria-label="Portfolio"
                                >
                                    <FaBriefcase size={20} />
                                </a>
                                <a
                                    href="mailto:bhargavk1290@gmail.com"
                                    className="text-gray-500 hover:text-red-500 transition-colors duration-300"
                                    aria-label="Email"
                                >
                                    <FaEnvelope size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Developedby;