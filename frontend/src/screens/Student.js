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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
              <p className="text-gray-600 text-lg">Welcome back! Manage your library activities</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-700 font-semibold">Student Portal</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Borrowed Books</h3>
            <p className="text-3xl font-bold text-blue-600">{borrowedCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Books</h3>
            <p className="text-3xl font-bold text-green-600">1000+</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Reading Goal</h3>
            <p className="text-3xl font-bold text-purple-600">12/20</p>
          </div>
        </div>
        
        {/* Action Cards */}
        <div className="flex gap-4 mb-8 justify-center">
          <div 
            onClick={handleViewBorrowedBooks}
            className="bg-gray-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-48"
          >
            <h2 className="text-lg font-bold text-white mb-1">My Library</h2>
            <p className="text-gray-200 text-sm">Borrowed Books: {borrowedCount}</p>
          </div>
          
          <div 
            onClick={() => navigate('/books')}
            className="bg-gray-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-48"
          >
            <h2 className="text-lg font-bold text-white mb-1">Discover Books</h2>
            <p className="text-gray-200 text-sm">Browse All Books</p>
          </div>
        </div>
        
        {showBorrowedBooks && (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">My Borrowed Books</h3>
              {borrowedBooks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No books borrowed yet.</p>
                  <p className="text-gray-400 mt-2">Start exploring our collection!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {borrowedBooks.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">{item.book.title}</h4>
                          <p className="text-gray-600 mt-1">by {item.book.author}</p>
                          <p className="text-sm text-gray-500 mt-1">ISBN: {item.book.isbn}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <p className="text-sm text-gray-500 mt-2">
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors font-medium shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
