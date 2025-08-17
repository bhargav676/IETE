import React from 'react';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';

// --- Reusable SVG Icon Component for Social Links ---
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    <span className="sr-only">{children.props.title}</span>
    {children}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#101828', fontFamily: 'Poppins, sans-serif' }}>
      <div className="container mx-auto px-6 py-12 mt-10">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          
          {/* Column 1: About IETE */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">IETE - GVP</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Institution of Electronics and Telecommunication Engineers student chapter at GVP, dedicated to fostering innovation and technical excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="ourteam" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
              <li><a href="ourevents" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <HiOutlineLocationMarker className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>Gayatri Vidya Parishad College of Engineering, Visakhapatnam, AP</span>
              </li>
              <li className="flex items-center">
                <HiOutlineMail className="w-5 h-5 mr-2" />
                <a href="mailto:isf_ece@gvpce.ac.in" className="hover:text-white transition-colors">isf_ece@gvpce.ac.in</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Follow Us (Title for social links below) */}
          <div>
             <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
             <p className="text-gray-300 text-sm">Join our community on social media.</p>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Social Icons */}
        <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-gray-400 mb-4 md:mb-0 text-center md:text-left">
            <p>© {currentYear} IETE-GVP Student Forum. All Rights Reserved.</p>
            <p>Developed by <a href="https://bhargavkagitala.me" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bhargava prasad</a></p>
          </div>
          <div className="flex space-x-5">
            <SocialIcon href="https://www.linkedin.com/in/iete-student-forum-gvpce-1851b4378/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><title>LinkedIn</title><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/ietegvp?igsh=MXIwanI0cDd4MWVobA%3D%3D">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><title>Instagram</title><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><title>Twitter</title><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.214 3.794 4.66-1.127.308-2.311.13-3.121-.254.629 1.956 2.445 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;