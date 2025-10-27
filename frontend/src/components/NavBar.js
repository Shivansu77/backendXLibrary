import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-orange-200 transition">
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-orange-200 transition">
                  Dashboard
                </Link>
                <Link to="/books" className="hover:text-orange-200 transition">
                  All Books
                </Link>
                {user.role === 'librarian' && (
                  <>
                    <Link to="/add-book" className="hover:text-orange-200 transition">
                      Add Book
                    </Link>
                    <Link to="/issue-book" className="hover:text-orange-200 transition">
                      Issue Book
                    </Link>
                    <Link to="/issued-books" className="hover:text-orange-200 transition">
                      Issued Books
                    </Link>
                  </>
                )}
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="hover:text-orange-200 transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-orange-200 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-orange-200 focus:outline-none"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen ? (
        <div className="md:hidden bg-orange-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" 
              className="block px-3 py-2 rounded hover:bg-orange-600 transition"
            >
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard"
                  className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                >
                  Dashboard
                </Link>
                <Link to="/books"
                  className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                >
                  All Books
                </Link>
                {user.role === 'librarian' && (
                  <>
                    <Link to="/add-book"
                      className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                    >
                      Add Book
                    </Link>
                    <Link to="/issue-book"
                      className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                    >
                      Issue Book
                    </Link>
                    <Link to="/issued-books"
                      className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                    >
                      Issued Books
                    </Link>
                  </>
                )}
              </>
            )}
            {!user && (
              <>
                <Link to="/login"
                  className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                >
                  Login
                </Link>
                <Link to="/register"
                  className="block px-3 py-2 rounded hover:bg-orange-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}