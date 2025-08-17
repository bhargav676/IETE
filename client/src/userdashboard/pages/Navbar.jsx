import React, { useState, useEffect } from 'react'; // useEffect is still needed
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; 

import banner from '../../assets/images/banner.png';
import logo from '../../assets/images/logo.jpg';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // This state will now be set based on the current page's URL
  const [activeLink, setActiveLink] = useState(''); 

  // --- IMPORTANT: Update these href values to your actual page URLs ---
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/ourevents', text: 'Our Events' },
    { href: '/ourteam', text: 'Our Team' },
  ];

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // --- NEW: useEffect to set the active link based on the current URL ---
  useEffect(() => {
    // Get the current path of the URL (e.g., "/about")
    const currentPath = window.location.pathname;

    // Find the navLink that matches the current path
    const activeNav = navLinks.find(link => link.href === currentPath);

    if (activeNav) {
      setActiveLink(activeNav.text);
    } else if (currentPath === '/') {
      // Handle the default case for the home page
      setActiveLink('Home');
    }
  }, []); // The empty array [] ensures this effect runs only once when the component mounts

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <button onClick={toggleNav} className="text-[#2c3286] focus:outline-none" aria-label="Open menu">
                <HiOutlineMenu className="h-8 w-8" />
              </button>
            </div>
            <div className="flex-grow flex justify-center items-center mx-4 overflow-hidden py-2">
              <img src={banner} alt="Site Banner" className="h-13 lg:h-20 w-auto object-contain" />
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </nav>

      {/* Slide-In Menu (Sidebar) */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out w-full md:w-96 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-24 px-4 sm:px-6 lg:px-8 border-b">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <button onClick={toggleNav} className="text-[#2c3286] focus:outline-none" aria-label="Close menu">
            <HiOutlineX className="h-8 w-8" />
          </button>
        </div>

        {/* --- MODIFIED: Navigation Links for Multi-Page Site --- */}
        <div className="flex flex-col items-start p-4">
          {navLinks.map((link) => {
            const isActive = activeLink === link.text;
            return (
              <a
                key={link.text}
                href={link.href} // This now correctly points to a new page
                onClick={toggleNav} // Close menu on click before navigating
                className={`block py-4 text-2xl w-full text-left font-medium rounded-md px-3 transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#e0e1f3] text-[#2c3286]' // Style for the active page link
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#2c3286]' // Style for other links
                }`}
              >
                {link.text}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;