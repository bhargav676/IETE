import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import heroImage from '../../assets/images/h.webp';
import { useNavigate } from "react-router-dom";

const componentStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

  @keyframes subtleZoom {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-subtle-zoom {
    animation: subtleZoom 15s ease-in-out infinite alternate;
  }
  
  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 1s ease-out forwards;
  }

  .hero-btn-explore:hover {
    background-color: #ffffff;
    color: #0a1529;
    transform: translateY(-4px);
  }

  .hero-btn-join:hover {
    transform: translateY(-4px);
  }
`;

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <style>{componentStyles}</style>

      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden font-['Poppins',_sans-serif] lg:mt-15">
        
        <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center z-0 animate-subtle-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="absolute top-0 left-0 h-full w-full bg-[#0a1529]/75 z-10" />

        <div className="relative z-20 flex flex-col items-center text-center text-white px-4">

          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 min-h-[80px] md:min-h-[100px]">
            <TypeAnimation
              sequence={[
                'IETE STUDENT FORUM - GVPCE',
                3000,
                () => {
                  // This callback will hide the cursor after typing completes
                  const cursorElements = document.querySelectorAll('.TypeAnimation__cursor');
                  cursorElements.forEach(el => {
                    el.style.display = 'none';
                  });
                }
              ]}
              wrapper="span"
              speed={40}
              cursor={false} // Initially set to false to prevent default cursor
              repeat={Infinity}
            />
          </h1>
          
          <p 
            className="text-lg md:text-xl font-light mb-10 animate-fade-in-up"
            style={{ animationDelay: '2.5s' }}
          >
            Electronics | Telecommunication | Innovation
          </p>

          <div 
            className="flex items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: '3s' }}
          >
            <button className="hero-btn-explore py-3 px-6 rounded-lg font-bold text-white border-2 border-white transition-all duration-300 text-sm"
            onClick={()=>navigate('/ourevents')}>
              Explore Events
            </button>
            
            <button
  className="hero-btn-join py-3 px-6 rounded-lg font-bold bg-amber-400 text-[#0a1529] transition-all duration-300 text-sm"
  onClick={() => window.open("https://www.linkedin.com/in/iete-student-forum-gvpce-1851b4378/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank")}
>
  Join Us
</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;