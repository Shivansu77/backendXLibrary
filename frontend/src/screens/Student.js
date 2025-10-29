import React, { useState, useEffect } from 'react';
import { LogoutUser } from '../utils/UserApi';
import { useNavigate } from 'react-router-dom';
import { getMyBorrowedBooks } from '../apis/issued-api';

const Student = () => {
  const navigate = useNavigate();
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const books = await getMyBorrowedBooks();
      setBorrowedBooks(books);
      setBorrowedCount(books.length);
    } catch (error) {
      console.error('Failed to fetch borrowed books:', error);
    }
  };

  const handleLogout = async () => {
    await LogoutUser();
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleViewBorrowedBooks = () => {
    setShowBorrowedBooks(!showBorrowedBooks);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">Student Dashboard</h1>
              <p className="text-gray-400">Manage your library activities</p>
            </div>
            <div className="bg-[#20A4F3]/10 px-3 py-1 rounded border border-[#20A4F3]/20">
              <span className="text-[#20A4F3] text-sm font-medium">Student</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Borrowed Books</h3>
            <p className="text-2xl font-semibold text-[#20A4F3]">{borrowedCount}</p>
          </div>
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Available Books</h3>
            <p className="text-2xl font-semibold text-white">1000+</p>
          </div>
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Reading Goal</h3>
            <p className="text-2xl font-semibold text-white">12/20</p>
          </div>
        </div>
        
        {/* Action Cards */}
        <div className="flex gap-4 mb-6 justify-center">
          <div 
            onClick={handleViewBorrowedBooks}
            className="bg-[#20A4F3] hover:bg-[#1B8FD9] rounded-lg p-4 cursor-pointer transition-colors w-48"
          >
            <h2 className="text-base font-medium text-white mb-1">My Library</h2>
            <p className="text-blue-100 text-sm">Borrowed: {borrowedCount}</p>
          </div>
          
          <div 
            onClick={() => navigate('/books')}
            className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-4 cursor-pointer transition-colors w-48"
          >
            <h2 className="text-base font-medium text-white mb-1">Browse Books</h2>
            <p className="text-gray-400 text-sm">View catalog</p>
          </div>
        </div>
        
        {showBorrowedBooks && (
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">My Borrowed Books</h3>
            {borrowedBooks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No books borrowed yet</p>
                <p className="text-gray-500 text-sm mt-1">Start exploring our collection</p>
              </div>
            ) : (
              <div className="space-y-3">
                {borrowedBooks.map((item) => (
                  <div key={item.id} className="bg-[#0F0F0F] rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{item.book.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">by {item.book.author}</p>
                        <p className="text-gray-500 text-xs mt-1">ISBN: {item.book.isbn}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'issued' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        <p className="text-gray-500 text-xs mt-1">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
