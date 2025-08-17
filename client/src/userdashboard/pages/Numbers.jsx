import React from 'react';

// --- Libraries for Animations & Icons ---
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiAward, FiCpu, FiBarChart2 } from 'react-icons/fi';


// --- Reusable Component for Each Statistic ---
// This contains the animation logic and is now styled for a LIGHT background.
const StatItem = ({ icon, end, label }) => {
    // This hook detects when the component is visible on the screen.
    const { ref, inView } = useInView({
        triggerOnce: true,  // Animate only the first time it's visible.
        threshold: 0.5,     // Trigger when 50% of the item is visible.
    });

    return (
        <div ref={ref} className="text-center">
            {/* Icon - Color changed to #233286 */}
            <div className="flex justify-center mb-3">
                {React.cloneElement(icon, { className: "w-12 h-12 text-[#233286]" })}
            </div>
            
            {/* Animated Number - Color changed to black */}
            <p className="text-5xl font-bold text-black">
                {/* The CountUp component animates the number when 'inView' is true */}
                {inView ? <CountUp end={end} duration={3} /> : '0'}+
            </p>
            
            {/* Label - Color changed to a standard gray for readability */}
            <p className="mt-2 text-base text-gray-600">
                {label}
            </p>
        </div>
    );
};


// --- Main Component to Export ---
const Numbers = () => {
    return (
        // The main section now has a white background.
        <section className="py-5 bg-white">
            <div className="container mx-auto px-6">
                
                {/* Section Title - Text is black */}
                <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins] text-center mb-16">
  Highlights
</h2>

                
                {/* Grid container for the statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-x-8 max-w-5xl mx-auto">
                    
                    {/* The unnecessary className props have been removed. Styling is handled inside StatItem. */}
                    <StatItem
                        icon={<FiUsers />}
                        end={100}
                        label="Active Members"
                    />

                    <StatItem
                        icon={<FiAward />}
                        end={80}
                        label="Events Organized"
                    />

                    <StatItem
                        icon={<FiCpu />}
                        end={15}
                        label="Workshops Conducted"
                    />

                    <StatItem
                        icon={<FiBarChart2 />}
                        end={200}
                        label="Alumini Connections"
                    />

                </div>
            </div>
        </section>
    );
};

export default Numbers;