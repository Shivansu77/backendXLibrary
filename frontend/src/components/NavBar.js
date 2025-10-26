import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-400 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">Library App</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/books" className="hover:text-blue-200 transition">
              Books
            </Link>
            <Link to="/profile" className="hover:text-blue-200 transition">
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" 
              className="block px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              Home
            </Link>
            <Link to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              Dashboard
            </Link>
            <Link to="/books"
              className="block px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              Books
            </Link>
            <Link to="/profile"
              className="block px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}