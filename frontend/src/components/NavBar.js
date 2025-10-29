import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const profileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#1C1C1E] text-white shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">Library App</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-[#20A4F3] transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#20A4F3] transition">
              About Us
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-[#20A4F3] transition">
                  Dashboard
                </Link>
                <Link to="/books" className="hover:text-[#20A4F3] transition">
                  All Books
                </Link>
                {user.role === 'user' && (
                  <Link to="/student" className="hover:text-[#20A4F3] transition">
                    My Books
                  </Link>
                )}
              </>
            )}
            
            {/* Login/Signup */}
            {!user && (
              <>
                <Link to="/login" className="hover:text-[#20A4F3] transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-[#20A4F3] transition">
                  Register
                </Link>
              </>
            )}
            
            {/* Profile Dropdown */}
            {user && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-1 hover:text-[#20A4F3] transition"
                >
                  <span>{user.firstName}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user.role === 'librarian' && (
                      <>
                        <Link to="/add-book" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Add Book
                        </Link>
                        <Link to="/issue-book" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Issue Book
                        </Link>
                        <Link to="/issued-books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Issued Books
                        </Link>
                        <hr className="my-1" />
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#20A4F3] focus:outline-none"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2C2C2E]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
              About Us
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                  Dashboard
                </Link>
                <Link to="/books" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                  All Books
                </Link>
                {user.role === 'user' && (
                  <Link to="/student" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                    My Borrowed Books
                  </Link>
                )}
                {user.role === 'librarian' && (
                  <>
                    <Link to="/add-book" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                      Add Book
                    </Link>
                    <Link to="/issue-book" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                      Issue Book
                    </Link>
                    <Link to="/issued-books" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                      Issued Books
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-[#20A4F3] transition"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded hover:bg-[#20A4F3] transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}