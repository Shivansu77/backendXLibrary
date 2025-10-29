import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">LibraryApp</h3>
            <p className="text-gray-300">Your digital gateway to knowledge and learning.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/books" className="hover:text-white">Browse Books</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">Contact</h3>
            <p className="text-gray-300">Email: info@libraryapp.com</p>
            <p className="text-gray-300">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 LibraryApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;