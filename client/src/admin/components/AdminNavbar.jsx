// src/admin/components/AdminNavbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Using NavLink for active styles
import { useAuth } from '../../App'; // Import useAuth from App.jsx

// --- Icons ---
import {
  FiCalendar, FiClock, FiUsers, FiClipboard, FiLogOut, FiMenu, FiX, FiActivity
} from 'react-icons/fi';

// --- Reusable NavLink for Desktop ---
// Now includes an icon and a proper active state
const DesktopNavLink = ({ to, icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-3 py-2 text-base font-medium transition-colors duration-200 border-b-2 ${
          isActive
            ? 'border-[#6367a7] text-[#6367a7]' // Active State
            : 'border-transparent text-gray-600 hover:text-[#6367a7] hover:border-violet-200' // Inactive State
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
);

// --- Main AdminNavbar Component ---
const AdminNavbar = () => {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const customBrandFontStyle = { fontFamily: 'Merriweather, serif' };

  return (
    <>
      <nav className="bg-white p-4 shadow-md sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          {/* Admin Dashboard Brand */}
          <Link
            to="/admin/past-events"
            className="text-[#6367a7] text-3xl font-semibold tracking-tight"
            style={customBrandFontStyle}
          >
            Admin Dashboard
          </Link>

          {/* Hamburger Menu Button for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-[#6367a7] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-400"
              aria-label="Toggle navigation"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <DesktopNavLink to="/admin/past-events" icon={<FiCalendar size={18} />}>Past Events</DesktopNavLink>
            <DesktopNavLink to="/admin/upcoming-events" icon={<FiClock size={18} />}>Upcoming Events</DesktopNavLink>
            <DesktopNavLink to="/admin/governing-team" icon={<FiUsers size={18} />}>Governing Team</DesktopNavLink>
            <DesktopNavLink to="/admin/electromazine" icon={<FiClipboard size={18} />}>Electromazine</DesktopNavLink>
            <DesktopNavLink to="/admin/our-team-journey" icon={<FiActivity size={18} />}>Our Journey</DesktopNavLink>
          </div>

          {/* Logout Button */}
          <div className="hidden md:block">
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-[#e82626] hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full text-sm shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Upgraded Mobile Off-Canvas Menu --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      ></div>

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#6367a7]" style={customBrandFontStyle}>Menu</h2>
          <button onClick={closeMobileMenu} className="p-2 text-gray-500 hover:text-[#6367a7] rounded-md">
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
            <NavLink to="/admin/past-events" onClick={closeMobileMenu} className="text-gray-700 hover:bg-violet-50 hover:text-[#6367a7] flex items-center p-3 rounded-lg"><FiCalendar className="mr-3" /> Past Events</NavLink>
            <NavLink to="/admin/upcoming-events" onClick={closeMobileMenu} className="text-gray-700 hover:bg-violet-50 hover:text-[#6367a7] flex items-center p-3 rounded-lg"><FiClock className="mr-3" /> Upcoming Events</NavLink>
            <NavLink to="/admin/governing-team" onClick={closeMobileMenu} className="text-gray-700 hover:bg-violet-50 hover:text-[#6367a7] flex items-center p-3 rounded-lg"><FiUsers className="mr-3" /> Governing Team</NavLink>
            <NavLink to="/admin/electromazine" onClick={closeMobileMenu} className="text-gray-700 hover:bg-violet-50 hover:text-[#6367a7] flex items-center p-3 rounded-lg"><FiClipboard className="mr-3" /> Electromazine</NavLink>
            <NavLink to="/admin/our-team-journey" onClick={closeMobileMenu} className="text-gray-700 hover:bg-violet-50 hover:text-[#6367a7] flex items-center p-3 rounded-lg"><FiActivity className="mr-3" /> Our Journey</NavLink>
            <div className="pt-4 mt-4 border-t">
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#e82626] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;