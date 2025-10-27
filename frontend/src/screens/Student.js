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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">📚 Student Dashboard</h1>
          <p className="text-blue-600 text-lg">Welcome! You are logged in as a <strong>Student</strong></p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">📖 My Books</h2>
            <p className="text-gray-600 mb-4">View and manage your borrowed books</p>
            <button 
              onClick={handleViewBorrowedBooks}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              View Borrowed Books ({borrowedCount})
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">🔍 Search Books</h2>
            <p className="text-gray-600 mb-4">Find books in the library catalog</p>
            <button 
              onClick={() => navigate('/books')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Browse All Books
            </button>
          </div>
        </div>
        
        {showBorrowedBooks && (
          <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">My Borrowed Books</h3>
            {borrowedBooks.length === 0 ? (
              <p className="text-gray-500">No books borrowed yet.</p>
            ) : (
              <div className="space-y-3">
                {borrowedBooks.map((item) => (
                  <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-gray-900">{item.book.title}</h4>
                    <p className="text-sm text-gray-600">by {item.book.author}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
