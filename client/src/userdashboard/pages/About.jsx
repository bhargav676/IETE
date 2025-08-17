import React from "react";
import { FiAward, FiUsers, FiTrendingUp, FiCpu, FiBarChart2, FiArrowDown } from "react-icons/fi";
import { FaBullseye, FaFlagCheckered } from "react-icons/fa";
import aboutImg from "../../assets/images/IETE.png"; // Make sure path is correct

// --- Libraries for Number Animation ---
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';


const componentStyles = `
    /* Keyframes for hero text animation */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Animation utility classes */
    .animate-fade-in-up {
        opacity: 0;
        animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    /* Grid pattern for the hero and CTA background */
    .hero-grid-background {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), 
                          linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
        background-size: 4rem 4rem;
    }
`;

const AnimatedStatCard = ({ icon, number, label }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.5,
    });

    return (
        <div className="text-center" ref={ref}>
            {icon}
            <p className="text-4xl font-bold text-white mt-2">
                {inView ? <CountUp end={number} duration={2.5} /> : "0"}+
            </p>
            <p className="text-cyan-200 text-sm font-medium">{label}</p>
        </div>
    );
};


// --- Main About Component ---
const About = () => {
    return (
        <div className="bg-slate-50 text-gray-800 font-sans">
            <style>{componentStyles}</style>

            {/* --- Enhanced Hero Section --- */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-slate-900">
                {/* Background Elements */}
                <div className="absolute inset-0 w-full h-full hero-grid-background opacity-40"></div>
                <div 
                    className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] -translate-x-1/2 -translate-y-1/2 bg-radial-gradient from-cyan-500/20 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                ></div>

                {/* Content */}
                <div className="relative z-10 space-y-6">
                    <p 
                        className="text-cyan-300 font-semibold tracking-wider animate-fade-in-up" 
                        style={{ animationDelay: '0.2s' }}
                    >
                        IETE  STUDENT FORUM – GVPCE
                    </p>
                    <h1 
                        className="text-5xl md:text-7xl font-extrabold text-white mt-4 tracking-tight animate-fade-in-up" 
                        style={{ animationDelay: '0.4s' }}
                    >
                        Engineering the Future, Together.
                    </h1>
                    <p 
                        className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto animate-fade-in-up" 
                        style={{ animationDelay: '0.6s' }}
                    >
                        We are the nexus of innovation, learning, and leadership in electronics and technology at GVP.
                    </p>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 flex flex-col items-center space-y-2 z-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <span className="text-sm text-slate-400">Explore</span>
                    <FiArrowDown className="text-2xl text-slate-400 animate-bounce" />
                </div>
            </section>

            {/* --- Introduction Section --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                           <div className="absolute -top-4 -left-4 w-full h-full bg-cyan-400 rounded-2xl transform -rotate-3"></div>
                           <img
                                src={aboutImg}
                                alt="IETE GVP Team"
                                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                           />
                        </div>
                        <div className="pt-8 md:pt-0">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                Who We Are
                            </h2>
                            <p className="text-gray-600 leading-relaxed mt-4">
                               The Institution of Electronics and Telecommunication Engineers (IETE) is one of India’s premier professional societies in Electronics, Telecommunications, Computer Science, and IT. It is dedicated to advancing technical knowledge, fostering innovation, and bridging the gap between academia and industry through seminars, workshops, research, and student forums.
With its strong national presence, IETE empowers students to become leaders in technology and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Vision & Mission Section --- */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                            <FaBullseye className="text-5xl text-[#233286] mb-4" />
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be a leading professional organization that reaches the unreached and empowers youth by promoting excellence in technical education, skill development, and innovation in the fields of Electronics, Telecommunication, Computer Science, and Information Technology—contributing meaningfully to professional  growth and inclusive development.
                            </p>
                        </div>
                        {/* Mission Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                            <FaFlagCheckered className="text-5xl text-[#233286] mb-4" />
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
                            <ul className="space-y-3 text-gray-600 leading-relaxed">
                                <li className="flex items-start"><span className="text-[#233286] font-bold mr-3 mt-1">✓</span><span>Nurturing competent engineers and technologists in Electronics, Telecommunication, Information Technology, and allied fields by promoting innovation and supporting research and development</span></li>
                                <li className="flex items-start"><span className="text-[#233286] font-bold mr-3 mt-1">✓</span><span>Empowering society through quality technical education, skill development, and capacity building</span></li>
                                <li className="flex items-start"><span className="text-[#233286] font-bold mr-3 mt-1">✓</span><span>Contributing to human resource enrichment, infrastructure growth, and sustainable development.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* --- Impact by Numbers --- */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white">Impact by the Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
                        <AnimatedStatCard icon={<FiUsers className="w-10 h-10 text-cyan-300 mx-auto" />} number={100} label="Active Members" />
                        <AnimatedStatCard icon={<FiAward className="w-10 h-10 text-cyan-300 mx-auto" />} number={80} label="Events Organized" />
                        <AnimatedStatCard icon={<FiCpu className="w-10 h-10 text-cyan-300 mx-auto" />} number={15} label="Workshops Conducted" />
                        <AnimatedStatCard icon={<FiBarChart2 className="w-10 h-10 text-cyan-300 mx-auto" />} number={200} label="Alumini Connections" />
                    </div>
                </div>
            </section>

    
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <h2 className="text-4xl font-bold text-slate-900">Why You Should Join Us</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Unlock exclusive benefits and accelerate your career.</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 [perspective:1000px]">
                        {/* Card 1 */}
                        <div className="group bg-slate-50 border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                            <FiTrendingUp className="w-12 h-12 text-[#233286] mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-slate-900">Accelerated Skill Growth</h3>
                            <p className="text-gray-600 mt-2">Gain hands-on experience with cutting-edge tech through workshops and projects that matter.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="group bg-slate-50 border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                            <FiUsers className="w-12 h-12 text-[#233286] mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-slate-900">Elite Networking</h3>
                            <p className="text-gray-600 mt-2">Connect with a powerful network of industry professionals, alumni, and ambitious peers.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="group bg-slate-50 border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                            <FiAward className="w-12 h-12 text-[#233286] mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-slate-900">Professional Recognition</h3>
                            <p className="text-gray-600 mt-2">Earn certificates and gain access to IETE's national-level events and publications.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MODIFIED Call to Action Section --- */}
            <section className="relative bg-slate-900 py-20 overflow-hidden">
                <div className="absolute inset-0 w-full h-full hero-grid-background opacity-40"></div>
                <div className="relative container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Define Your Future?</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                        Become part of our thriving community. Your journey into the world of technology and innovation starts here.
                    </p>
                    <a
                        href="mailto:isf_ece@gvpce.ac.in"
                        className="inline-block bg-cyan-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105"
                    >
                        Become a Member
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;