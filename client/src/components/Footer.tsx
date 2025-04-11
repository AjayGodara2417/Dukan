import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // optional

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold text-gray-800 mb-1">Dukan</h4>
          <p className="text-gray-600">Your one-stop shop for all your needs</p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/about"
            className="text-blue-600 hover:text-blue-800 transition duration-200"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-blue-600 hover:text-blue-800 transition duration-200"
          >
            Contact
          </NavLink>
        </div>

        {/* Social Media (optional) */}
        {/* <div className="flex gap-4 text-xl text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-400" />
          </a>
        </div> */}

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} <span className="font-semibold">Dukan</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
