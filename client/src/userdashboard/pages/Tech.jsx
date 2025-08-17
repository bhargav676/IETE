import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importing the Instagram icon

// --- IMAGE IMPORTS (Ensure paths are correct) ---
import technicalClubImage from '../../assets/images/l1.jpg';
import techwikiImage from '../../assets/images/l2.jpg';
import electrozoomImage from '../../assets/images/l3.jpg';

// --- SELF-CONTAINED STYLES ---
const componentStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  /* Keyframe for initial card animation */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  /* White Card on Dark Background Styles */
  .tech-card-contrast {
    background-color: #ffffff;
    border: 1px solid #374151;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .tech-card-contrast:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  }

  /* Image container with a light gray background */
  .card-image-container-contrast {
    background-color: #f9fafb;
    padding: 1.5rem;
    height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .card-logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .card-content-contrast {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  /* Button hover effect */
  .explore-btn-contrast .arrow-icon {
    transition: transform 0.3s ease;
  }
  
  .explore-btn-contrast:hover .arrow-icon {
    transform: translateX(4px);
  }

  /* --- STYLE ADDED TO TRUNCATE DESCRIPTION TEXT --- */
  .description-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8; /* This limits the text to 8 lines */
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// --- CLUB DATA (Updated with instagramUrl) ---
const clubs = [
  {
    image: technicalClubImage,
    title: "Technical Club",
    description: "The ISF Technical Club is a vibrant hub for innovation and technical exploration. It organizes workshops, tech talks, hands-on sessions, and intercollegiate events that encourage students to apply classroom knowledge in practical ways. By creating a culture of learning beyond textbooks, the club plays a vital role in nurturing technical skills and creativity.The club constantly inspires students to push boundaries and turn ideas into impactful projects",
    delay: '0.1s',
    url: 'https://sites.google.com/view/technical-club/',
    instagramUrl: 'https://www.instagram.com/technical_club_aece/profilecard/?igsh=MTNreGQzZXM0MWFpMg%3D%3D'
  },
  {
    image: techwikiImage,
    title: "AI Build club",
    description: "The AI Build Club is dedicated to exploring Artificial Intelligence, Machine Learning, and emerging technologies. Going beyond theory, it integrates AI/ML into embedded systems and Edge AI through workshops, hands-on sessions, and its signature Idea Acceleration Program. The club empowers students to create real-world solutions that blend software intelligence with hardware precision.It equips learners to become future-ready innovators driving AI-powered change.",
    delay: '0.2s',
    url: 'https://aibuildclub.github.io/',
    instagramUrl: 'https://www.instagram.com/aibuildclub?igsh=MW9lM2wwNzJkdnBtOA%3D%3D'
  },
  {
    image: electrozoomImage,
    title: "Electrozoom",
    description: "The Electrozoom & PDC Club uniquely combines technical creativity with personal growth. Through Electrozoom, students publish annual magazines showcasing their ideas, creativity, and achievements. The PDC side focuses on soft skills development by conducting personality development sessions, public speaking events, and panel discussions — empowering students to grow in both confidence and leadership.It is a platform where students learn to express, inspire, and lead with excellence.",
    delay: '0.3s',
    url: 'https://sites.google.com/view/electrozoom/',
    instagramUrl: 'https://www.instagram.com/_electr0zoom_?igsh=NmlwZzZrMDNzend4'
  }
];

const TechPage = () => {
  return (
    <>
      <style>{componentStyles}</style>

      {/* Main Section Container with DARK background */ }
      <div className="min-h-screen bg-gray-900 py-20 sm:py-24" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with WHITE text for dark background */ }
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Innovation Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Welcome to the heart of IETE's student-led activities. Discover our clubs, where creativity meets technology.
            </p>
          </div>

          {/* Responsive Grid with WHITE cards */ }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {clubs.map((club, index) => (
              <div 
                key={index}
                className="tech-card-contrast rounded-2xl shadow-lg overflow-hidden animate-fade-in-up"
                style={{ animationDelay: club.delay }}
              >
                {/* Logo/Image Area */ }
                <div className="card-image-container-contrast">
                    <img 
                      className="card-logo-img" 
                      src={club.image} 
                      alt={`${club.title} Logo`} 
                    />
                </div>

                {/* Content Area with DARK text for white card */ }
                <div className="card-content-contrast">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {club.title}
                  </h2>
                  
                  {/* --- MODIFIED PARAGRAPH: Added the new CSS class to truncate the text --- */}
                  <p className="text-gray-700 text-base leading-relaxed flex-grow description-truncate">
                    {club.description}
                  </p>
                  
                  {/* Explore Button and Social Icon */}
                  <div className="mt-6 flex justify-between items-center">
                    <a 
                      href={club.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="explore-btn-contrast font-semibold text-[#2c3286] inline-flex items-center group"
                    >
                      Explore Club
                      <svg 
                        className="arrow-icon w-5 h-5 ml-2" 
                        fill="none" 
                        viewBox="0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>

                    <a
                      href={club.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#2c3286] transition-colors duration-300"
                      aria-label={`${club.title} on Instagram`}
                    >
                      <FaInstagram className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechPage;